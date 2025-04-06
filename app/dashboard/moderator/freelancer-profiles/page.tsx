"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FreelancerCard } from "@/components/freelancer-card"
import { freelancers as initialFreelancers } from "@/data/freelancers"
import type { Freelancer } from "@/data/freelancers"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FreelancerProfilesPage() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>(initialFreelancers)
  const [recentFreelancers, setRecentFreelancers] = useState<Freelancer[]>([])
  const [olderFreelancers, setOlderFreelancers] = useState<Freelancer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [selectedFreelancer, setSelectedFreelancer] = useState<Freelancer | null>(null)

  useEffect(() => {
    // Fetch freelancers from API (commented out for now)
    // const fetchFreelancers = async () => {
    //   try {
    //     const response = await getAllFreelancers()
    //     setFreelancers(response.data)
    //   } catch (error) {
    //     console.error('Failed to fetch freelancers:', error)
    //   }
    // }
    // fetchFreelancers()

    const recent = freelancers.slice(0, 3)
    const older = freelancers.slice(3)
    setRecentFreelancers(recent)
    setOlderFreelancers(older)
  }, [freelancers])

  const filteredFreelancers = olderFreelancers.filter(
    (freelancer) =>
      freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelancer.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredFreelancers.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleUpdateFreelancer = (updatedFreelancer: Freelancer) => {
    // Update freelancer logic here
    // For now, we'll just update the local state
    setFreelancers(
      freelancers.map((freelancer) => (freelancer.id === updatedFreelancer.id ? updatedFreelancer : freelancer)),
    )
    setSelectedFreelancer(null)
  }

  const handleTrashFreelancer = (id: string) => {
    // Trash freelancer logic here
    // For now, we'll just remove it from the local state
    setFreelancers(freelancers.filter((freelancer) => freelancer.id !== id))
  }

  const handleRateFreelancer = (id: string, rating: "basic" | "silver" | "gold") => {
    // Rate freelancer logic here
    // For now, we'll just update the local state
    setFreelancers(freelancers.map((freelancer) => (freelancer.id === id ? { ...freelancer, rating } : freelancer)))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Freelancer Profiles</h1>
        <Button asChild>
          <Link href="/dashboard/moderator/freelancer-profiles/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Freelancer
          </Link>
        </Button>
      </div>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search freelancers"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <h2 className="mb-4 text-2xl font-semibold">Recent Freelancers</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recentFreelancers.map((freelancer, index) => (
          <motion.div
            key={freelancer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <FreelancerCard freelancer={freelancer} />
          </motion.div>
        ))}
      </div>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">All Freelancers</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Profile Rating</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((freelancer) => (
            <TableRow key={freelancer.id}>
              <TableCell>{freelancer.name}</TableCell>
              <TableCell>{freelancer.role}</TableCell>
              <TableCell>{freelancer.rating}</TableCell>
              <TableCell>{freelancer.experience} years</TableCell>
              <TableCell>
                <Select
                  value={freelancer.profileRating || "basic"}
                  onValueChange={(value: "basic" | "silver" | "gold") => handleRateFreelancer(freelancer.id, value)}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedFreelancer(freelancer)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Freelancer Profile</DialogTitle>
                    </DialogHeader>
                    {selectedFreelancer && (
                      <FreelancerCard freelancer={selectedFreelancer} editable onUpdate={handleUpdateFreelancer} />
                    )}
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  size="sm"
                  className="ml-2"
                  onClick={() => handleTrashFreelancer(freelancer.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Trash
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(filteredFreelancers.length / itemsPerPage) }, (_, i) => (
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
    </motion.div>
  )
}

/*
API Documentation:

1. Get All Freelancer Profiles
GET /api/freelancer-profiles
Query Parameters:
  page: number
  limit: number
  search: string
Response: {
  success: boolean
  data: {
    profiles: FreelancerProfile[]
    totalPages: number
    currentPage: number
  }
}

2. Update Freelancer Profile
PATCH /api/freelancer-profiles/:id
Request Body: Partial<FreelancerProfile>
Response: {
  success: boolean
  data: FreelancerProfile
}

3. Trash Freelancer Profile
DELETE /api/freelancer-profiles/:id
Response: {
  success: boolean
  message: string
}

4. Rate Freelancer Profile
PATCH /api/freelancer-profiles/:id/rate
Request Body: {
  rating: "basic" | "silver" | "gold"
}
Response: {
  success: boolean
  data: {
    id: string
    profileRating: "basic" | "silver" | "gold"
  }
}
*/

