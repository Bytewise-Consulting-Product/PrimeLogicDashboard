"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

// Import dummy data
import { assignedProjects, assignedProjectUpdates, projectStats } from "@/data/freelancer-assigned-projects"

function ProjectCard({ project, projectUpdates, onUpdateProgress }) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [newProgress, setNewProgress] = useState(project.progressPercentage)
  const [updateDescription, setUpdateDescription] = useState("")
  const [proofOfWork, setProofOfWork] = useState("")
  const { toast } = useToast()

  const handleUpdateProgress = async () => {
    setIsUpdating(true)
    try {
      const updateData = {
        progress: newProgress,
        description: updateDescription,
        proofOfWork: proofOfWork,
      }
      // Commented out API call
      // await createProjectUpdate(project.id, updateData)
      onUpdateProgress(project.id, updateData)
      toast({
        title: "Success",
        description: "Project progress updated successfully",
      })
      setIsUpdating(false)
      setUpdateDescription("")
      setProofOfWork("")
    } catch (error) {
      console.error("Failed to update project progress:", error)
      toast({
        title: "Error",
        description: "Failed to update project progress",
        variant: "destructive",
      })
      setIsUpdating(false)
    }
  }

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-medium">{project.progressPercentage}%</span>
        </div>
        <Progress value={project.progressPercentage} className="w-full" />
        <div className="space-y-2">
          <p className="text-sm">Client: {project.clientWhoPostedThisProjectForeignId}</p>
          <p className="text-sm">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
          <p className="text-sm">Status: {project.projectStatus}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Update Progress
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Project Progress</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="progress" className="text-right">
                  Progress (%)
                </Label>
                <Input
                  id="progress"
                  type="number"
                  className="col-span-3"
                  value={newProgress}
                  onChange={(e) => setNewProgress(Number(e.target.value))}
                  min={0}
                  max={100}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Update Description
                </Label>
                <Textarea
                  id="description"
                  className="col-span-3"
                  value={updateDescription}
                  onChange={(e) => setUpdateDescription(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="proofOfWork" className="text-right">
                  Proof of Work (URL)
                </Label>
                <Input
                  id="proofOfWork"
                  type="url"
                  className="col-span-3"
                  value={proofOfWork}
                  onChange={(e) => setProofOfWork(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleUpdateProgress} disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Progress"}
            </Button>
          </DialogContent>
        </Dialog>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Previous Updates</h3>
          {projectUpdates
            .filter((update) => update.projectId === project.id)
            .map((update, index) => (
              <div key={index} className="text-sm">
                <p>Date: {new Date(update.date).toLocaleDateString()}</p>
                <p>Progress: {update.progress}%</p>
                <p>Description: {update.description}</p>
                {update.proofOfWork && (
                  <p>
                    Proof of Work:{" "}
                    <a
                      href={update.proofOfWork}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {update.proofOfWork}
                    </a>
                  </p>
                )}
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function FreelancerProjectStatusPage() {
  const [projects, setProjects] = useState([])
  const [updates, setUpdates] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Commented out API calls
        // const projectsData = await getAssignedProjects();
        // const statsData = await getProjectStats();
        // setProjects(projectsData.data.projects);
        // setStats(statsData.data);

        // Using dummy data
        setProjects(assignedProjects)
        setUpdates(assignedProjectUpdates)
        setStats(projectStats)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
        toast({
          title: "Error",
          description: "Failed to fetch project data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const handleUpdateProgress = (
    projectId: string,
    updateData: { progress: number; description: string; proofOfWork: string },
  ) => {
    setProjects((projects) =>
      projects.map((project) =>
        project.id === projectId ? { ...project, progressPercentage: updateData.progress } : project,
      ),
    )

    const newUpdate = {
      id: Date.now().toString(),
      projectId,
      date: new Date().toISOString(),
      progress: updateData.progress,
      description: updateData.description,
      proofOfWork: updateData.proofOfWork,
    }

    setUpdates((prevUpdates) => [...prevUpdates, newUpdate])
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Project Status</h1>
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalProjects}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.completedProjects}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm">Ongoing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.ongoingProjects}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm">Average Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.averageProgress}%</p>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProjectCard
                project={project}
                projectUpdates={updates.filter((update) => update.projectId === project.id)}
                onUpdateProgress={handleUpdateProgress}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

/*
API Documentation:

1. Get Assigned Projects
GET /api/freelancer/projects/assigned
Headers:
  Authorization: Bearer <token>
Response: {
  success: boolean
  data: {
    projects: Array<TPROJECT>
    totalCount: number
  }
}

2. Get Project Updates
GET /api/freelancer/projects/:projectId/updates
Headers:
  Authorization: Bearer <token>
Query Parameters:
  limit?: number
  page?: number
Response: {
  success: boolean
  data: {
    updates: Array<ProjectUpdate>
    totalCount: number
    currentPage: number
    totalPages: number
  }
}

3. Create Project Update
POST /api/freelancer/projects/:projectId/updates
Headers:
  Authorization: Bearer <token>
  Content-Type: application/json
Request Body: {
  progress: number
  description: string
  proofOfWork?: string
}
Response: {
  success: boolean
  data: {
    update: ProjectUpdate
  }
}

4. Get Project Statistics
GET /api/freelancer/projects/stats
Headers:
  Authorization: Bearer <token>
Response: {
  success: boolean
  data: {
    totalProjects: number
    completedProjects: number
    ongoingProjects: number
    averageProgress: number
  }
}

Error Response:
{
  success: false
  error: {
    code: string
    message: string
    details?: any
  }
}

Note: All endpoints require authentication as a freelancer.
The dummy data is imported from "@/data/freelancer-assigned-projects" which includes:
- assignedProjects: Array of TPROJECT
- assignedProjectUpdates: Array of ProjectUpdate
- projectStats: Project statistics
*/

