"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { projects as initialProjects, type TPROJECT } from "@/data/projects"
import { Pagination } from "@/components/ui/pagination"

// Commented out API function
/*
async function getProjects(page = 1, limit = 10, search = '') {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects?page=${page}&limit=${limit}&search=${search}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Role': 'client'
    }
  });
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
}
*/

const statusColors = {
  PENDING: "bg-yellow-200 text-yellow-800",
  CANCELLED: "bg-red-200 text-red-800",
  ONGOING: "bg-blue-200 text-blue-800",
  COMPLETED: "bg-green-200 text-green-800",
}

export default function ClientProjectsPage() {
  const [projects, setProjects] = useState<TPROJECT[]>(initialProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setIsLoading(true)
    try {
      // const data = await getProjects(currentPage, 10, searchTerm);
      // setProjects(data.projects);
      // setTotalPages(data.totalPages);
      // Simulating API call with local data
      const filteredProjects = initialProjects.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.detail.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setProjects(filteredProjects)
      setTotalPages(Math.ceil(filteredProjects.length / 10))
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">My Projects</h1>

      <div className="relative w-full mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {project.niche} - {project.projectType}
                </p>
                <p className="line-clamp-3 mb-2">{project.detail}</p>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[project.projectStatus]}`}
                  >
                    {project.projectStatus}
                  </span>
                  <span className="text-sm font-medium">${project.bounty}</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm">Deadline: {format(new Date(project.deadline), "PPP")}</p>
                  <p className="text-sm">Progress: {project.progressPercentage}%</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </motion.div>
  )
}

