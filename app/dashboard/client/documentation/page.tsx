"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { FileText, Download, Upload, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Import dummy data
import { projects } from "@/data/projects"
import { clientDocuments } from "@/data/documents"

// Commented out API functions
/*
async function getProjects() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client/projects`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
}

async function getProjectDocuments(projectId) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client/projects/${projectId}/documents`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch project documents');
  }
  return response.json();
}

async function uploadDocument(projectId, file) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client/projects/${projectId}/documents`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: formData
  });
  if (!response.ok) {
    throw new Error('Failed to upload document');
  }
  return response.json();
}
*/

export default function ClientDocumentationPage() {
  const [clientProjects, setClientProjects] = useState(projects)
  const [documents, setDocuments] = useState<Record<string, typeof clientDocuments>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState(null)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  useEffect(() => {
    // Fetch projects from API (commented out for now)
    /*
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setClientProjects(data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
    */

    // Using dummy data from data folder
    setClientProjects(projects)

    // Initialize documents for each project
    const initialDocuments = projects.reduce((acc, project) => {
      acc[project.id] = clientDocuments.filter((doc) => doc.projectId === project.id)
      return acc
    }, {})
    setDocuments(initialDocuments)
  }, [])

  const handleViewDocuments = (project) => {
    setSelectedProject(project)
    // Fetch documents for the selected project (commented out for now)
    /*
    const fetchProjectDocuments = async () => {
      try {
        const data = await getProjectDocuments(project.id);
        setDocuments(prevDocuments => ({
          ...prevDocuments,
          [project.id]: data.documents
        }));
      } catch (error) {
        console.error('Error fetching project documents:', error);
      }
    };
    fetchProjectDocuments();
    */

    // Using dummy data from data folder
    setDocuments((prevDocuments) => ({
      ...prevDocuments,
      [project.id]: clientDocuments.filter((doc) => doc.projectId === project.id),
    }))
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (file && selectedProject) {
      // Upload document (commented out for now)
      /*
      try {
        const uploadedDocument = await uploadDocument(selectedProject.id, file);
        setDocuments(prevDocuments => ({
          ...prevDocuments,
          [selectedProject.id]: [...prevDocuments[selectedProject.id], uploadedDocument]
        }));
      } catch (error) {
        console.error('Error uploading document:', error);
      }
      */

      // Simulating document upload with dummy data
      const newDocument = {
        id: `doc${Date.now()}`,
        projectId: selectedProject.id,
        name: file.name,
        uploadedBy: "client",
        uploadedAt: new Date().toISOString(),
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      }
      setDocuments((prevDocuments) => ({
        ...prevDocuments,
        [selectedProject.id]: [...prevDocuments[selectedProject.id], newDocument],
      }))
    }
    setIsUploadDialogOpen(false)
  }

  const filteredProjects = clientProjects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">Project Documentation</h1>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {filteredProjects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Status: {project.status}</p>
              <p className="text-sm text-muted-foreground">Deadline: {format(new Date(project.deadline), "PPP")}</p>
              <Button variant="outline" className="mt-4 w-full" onClick={() => handleViewDocuments(project)}>
                View Documents
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedProject && (
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {selectedProject.title} - Documents
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Document</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="document" className="text-right">
                        File
                      </Label>
                      <Input id="document" type="file" className="col-span-3" onChange={handleFileUpload} />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>File Size</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents[selectedProject.id]?.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        {doc.name}
                      </div>
                    </TableCell>
                    <TableCell>{doc.uploadedBy}</TableCell>
                    <TableCell>{format(new Date(doc.uploadedAt), "PPP")}</TableCell>
                    <TableCell>{doc.fileSize}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}

/*
API Documentation:

1. Get Client Projects
GET /api/client/projects
Headers:
  Authorization: Bearer <token>
Response:
{
  success: boolean,
  data: {
    projects: Array<{
      id: string,
      title: string,
      status: string,
      deadline: string,
    }>
  }
}

2. Get Project Documents
GET /api/client/projects/:projectId/documents
Headers:
  Authorization: Bearer <token>
Response:
{
  success: boolean,
  data: {
    documents: Array<{
      id: string,
      projectId: string,
      name: string,
      uploadedBy: string,
      uploadedAt: string,
      fileSize: string,
    }>
  }
}

3. Upload Document
POST /api/client/projects/:projectId/documents
Headers:
  Authorization: Bearer <token>
Body:
  FormData containing the file
Response:
{
  success: boolean,
  data: {
    document: {
      id: string,
      projectId: string,
      name: string,
      uploadedBy: string,
      uploadedAt: string,
      fileSize: string,
    }
  }
}

Dummy Data:
The dummy data is imported from "@/data/projects" and "@/data/documents" and has the following structure:

// projects.ts
export const projects = [
  {
    id: "1",
    title: "E-commerce Website Redesign",
    status: "in-progress",
    deadline: "2024-06-30",
  },
  // More project entries...
];

// documents.ts
export const clientDocuments = [
  {
    id: "1",
    projectId: "1",
    name: "Project Scope Document",
    uploadedBy: "client",
    uploadedAt: "2024-03-01T10:00:00Z",
    fileSize: "2.5 MB",
  },
  // More document entries...
];
*/

