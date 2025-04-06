"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Upload, Search, Calendar } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

import { projects } from "@/data/projects"

// Commented-out API functions for future implementation
/*
async function getProjects() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
  if (!response.ok) throw new Error('Failed to fetch projects')
  return response.json()
}

async function uploadDocument(projectId: string, file: File, userType: string) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('userType', userType)
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/documents`, {
    method: 'POST',
    body: formData
  })
  if (!response.ok) throw new Error('Failed to upload document')
  return response.json()
}

async function getDocuments(projectId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/documents`)
  if (!response.ok) throw new Error('Failed to fetch documents')
  return response.json()
}
*/

// Mock function to simulate document upload
const mockUploadDocument = (projectId: string, file: File, userType: string) => {
  console.log(`Uploading ${file.name} for project ${projectId} by ${userType}`)
  // In a real implementation, this would return a Promise that resolves with the uploaded document data
  return Promise.resolve({ id: Date.now().toString(), name: file.name, uploadedBy: userType })
}

export default function DocumentationPage() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState<Date>()
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [activeTab, setActiveTab] = useState("ongoing")

  const filterProjects = (projects) => {
    return projects.filter(
      (project) =>
        (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.client.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!dateFilter || new Date(project.deadline).toDateString() === dateFilter.toDateString()),
    )
  }

  const upcomingProjects = filterProjects(projects.filter((project) => project.status === "upcoming"))
  const ongoingProjects = filterProjects(projects.filter((project) => project.status === "in-progress"))
  const completedProjects = filterProjects(projects.filter((project) => project.status === "completed"))

  const getProjectsForActiveTab = () => {
    switch (activeTab) {
      case "upcoming":
        return upcomingProjects
      case "ongoing":
        return ongoingProjects
      case "completed":
        return completedProjects
      default:
        return []
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && selectedProject) {
      try {
        // In a real implementation, you would use the API function instead of the mock
        // await uploadDocument(selectedProject.id, file, 'moderator')
        await mockUploadDocument(selectedProject.id, file, "moderator")
        // After successful upload, you would typically refresh the documents list
        // For now, we'll just close the dialog
        setUploadDialogOpen(false)
      } catch (error) {
        console.error("Failed to upload document:", error)
      }
    }
  }

  const ProjectTable = ({ projects }: { projects: any[] }) => {
    // Added type annotation here
    const pageCount = Math.ceil(projects.length / rowsPerPage)
    const visibleProjects = projects.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

    return (
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell>{new Date(project.deadline).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => setSelectedProject(project)}>
                    <FileText className="mr-2 h-4 w-4" />
                    View Docs
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedProject(project)
                      setUploadDialogOpen(true)
                    }}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <span>Rows per page:</span>
            <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder={rowsPerPage} />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize}
                  </SelectItem>
                ))}
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span>{`Page ${currentPage} of ${pageCount}`}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((old) => Math.min(old + 1, pageCount))}
              disabled={currentPage === pageCount}
            >
              Next
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">Project Documentation</h1>

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-[240px] justify-start text-left font-normal",
                !dateFilter && "text-muted-foreground",
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {dateFilter ? format(dateFilter, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <Tabs defaultValue="ongoing" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming Projects</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <ProjectTable projects={upcomingProjects} />
        </TabsContent>

        <TabsContent value="ongoing">
          <ProjectTable projects={ongoingProjects} />
        </TabsContent>

        <TabsContent value="completed">
          <ProjectTable projects={completedProjects} />
        </TabsContent>
      </Tabs>

      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedProject.title} - Documents</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Project Details</h3>
              <p>
                <strong>Client:</strong> {selectedProject.client}
              </p>
              <p>
                <strong>Deadline:</strong> {new Date(selectedProject.deadline).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {selectedProject.status}
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Documents</h3>
              {/* In a real implementation, you would fetch and display actual documents here */}
              <p>No documents uploaded yet.</p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Label htmlFor="document-upload">Select a file to upload</Label>
            <Input id="document-upload" type="file" onChange={handleFileUpload} />
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

/*
API Documentation:

All endpoints require authentication and authorization as a moderator.
Headers: 
  Authorization: Bearer <token>
  Role: moderator

1. Get All Projects
GET /api/moderator/projects
Query Parameters:
  status: 'upcoming' | 'ongoing' | 'completed'
  search: string
  dateFilter: string (YYYY-MM-DD)
  page: number
  limit: number
Response: {
  success: boolean
  data: {
    projects: Project[]
    totalPages: number
    currentPage: number
  }
}

2. Get Project Documents
GET /api/moderator/projects/:projectId/documents
Response: {
  success: boolean
  data: Document[]
}

3. Upload Document
POST /api/moderator/projects/:projectId/documents
Body: FormData (file)
Response: {
  success: boolean
  data: Document
}
*/

