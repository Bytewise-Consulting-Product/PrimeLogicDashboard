"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { projects as initialProjects, type TPROJECT } from "@/data/projects"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"

export default function PostBidingsPage() {
  const [projects, setProjects] = useState<TPROJECT[]>(initialProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(Math.ceil(initialProjects.length / 10))
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, []) // Only depend on searchTerm

  const fetchProjects = () => {
    setIsLoading(true)
    const filteredProjects = initialProjects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.detail.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    const paginatedProjects = filteredProjects.slice((currentPage - 1) * 10, currentPage * 10)
    setProjects(paginatedProjects)
    setTotalPages(Math.ceil(filteredProjects.length / 10))
    setIsLoading(false)
  }

  const handleUpdateProject = (id: string) => {
    // Navigate to the edit page
    window.location.href = `/dashboard/moderator/post-bidings/edit/${id}`
  }

  const handleDeleteProject = (id: string) => {
    // Implement delete functionality here
    console.log("Deleting project:", id)
    // After deletion, refetch the projects
    fetchProjects()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Post Bidings</h1>
        <Button asChild>
          <Link href="/dashboard/moderator/post-bidings/create">
            <Plus className="mr-2 h-4 w-4" /> Create Post Biding
          </Link>
        </Button>
      </div>

      <div className="relative w-full mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search post bidings..."
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
                  <span className="text-sm font-medium">${project.bounty}</span>
                  <span className="text-sm">Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleUpdateProject(project.id)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project.id)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </motion.div>
  )
}

