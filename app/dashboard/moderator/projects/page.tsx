"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { TPROJECT } from "@/types/project"
import { projects as initialProjects } from "@/data/projects"
import Link from "next/link"

const ProjectsPage = () => {
  const [projects, setProjects] = useState<TPROJECT[]>(initialProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [projectsPerPage] = useState(10)

  useEffect(() => {
    // In a real application, you would fetch projects from an API here
    // setProjects(fetchedProjects);
  }, [])

  const filteredProjects = projects.filter((project) => project.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleDelete = async (id: string) => {
    // In a real application, you would call an API to delete the project
    setProjects(projects.filter((project) => project.id !== id))
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Projects</h1>
      <div className="flex justify-between mb-5">
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Link href="/dashboard/moderator/projects/create">
          <Button>Create New Project</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.detail}</TableCell>
              <TableCell>{project.projectStatus}</TableCell>
              <TableCell>
                <Link href={`/dashboard/moderator/projects/edit/${project.id}`}>
                  <Button variant="outline" className="mr-2">
                    Edit
                  </Button>
                </Link>
                <Button variant="destructive" onClick={() => handleDelete(project.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-5">
        {Array.from({ length: Math.ceil(filteredProjects.length / projectsPerPage) }, (_, i) => (
          <Button
            key={i}
            onClick={() => paginate(i + 1)}
            variant={currentPage === i + 1 ? "default" : "outline"}
            className="mx-1"
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default ProjectsPage

