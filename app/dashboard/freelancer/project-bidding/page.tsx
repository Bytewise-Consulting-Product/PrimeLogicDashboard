"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Search, Calendar } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { availableProjects } from "@/data/biddings"

export default function ProjectBiddingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState<Date>()
  const [selectedBidding, setSelectedBidding] = useState(null)
  const [bidAmount, setBidAmount] = useState("")
  const [deliveryTime, setDeliveryTime] = useState("")
  const [proposal, setProposal] = useState("")
  const [paymentType, setPaymentType] = useState("")
  const [documents, setDocuments] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState([])

  // Fetch projects with search and date filter
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      // Commented out actual API call
      // const response = await getAvailableProjects({
      //   search: searchTerm,
      //   dateFilter: dateFilter?.toISOString(),
      // });
      // setProjects(response.data.projects);

      // Using dummy data
      const filtered = availableProjects.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setProjects(filtered)
    } catch (error) {
      toast.error("Failed to fetch projects")
    } finally {
      setLoading(false)
    }
  }, [searchTerm])

  // Handle bid submission
  const handleApply = async (biddingId: string) => {
    try {
      setLoading(true)
      // Commented out actual API call
      // await submitBid(biddingId, {
      //   bidAmount: Number(bidAmount),
      //   deliveryTime: Number(deliveryTime),
      //   proposal,
      //   paymentType,
      //   documents,
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Bid submitted successfully")
      setSelectedBidding(null)
      // Reset form fields
      setBidAmount("")
      setDeliveryTime("")
      setProposal("")
      setPaymentType("")
      setDocuments([])
    } catch (error) {
      toast.error("Failed to submit bid")
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const validFiles = Array.from(e.target.files).filter((file) => file.size <= 5 * 1024 * 1024)
      setDocuments(validFiles)
      if (validFiles.length < e.target.files.length) {
        toast.warning("Some files were not added because they exceed the 5MB size limit.")
      }
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">Project Bidding</h1>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-[240px] justify-start text-left font-normal", !dateFilter && "text-muted-foreground")}
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

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((bidding) => (
            <Card key={bidding.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{bidding.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-2">{bidding.description}</p>
                <p className="text-sm">Budget: ${bidding.budget}</p>
                <p className="text-sm">Deadline: {new Date(bidding.deadline).toLocaleDateString()}</p>
                <p className="text-sm">Applicants: {bidding.applicants}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-2">Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {bidding.requiredSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedBidding(bidding)} disabled={loading}>
                      Apply for Bidding
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Apply for {bidding.title}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bidAmount" className="text-right">
                          Bid Amount
                        </Label>
                        <Input
                          id="bidAmount"
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="deliveryTime" className="text-right">
                          Delivery Time (days)
                        </Label>
                        <Input
                          id="deliveryTime"
                          type="number"
                          value={deliveryTime}
                          onChange={(e) => setDeliveryTime(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="proposal" className="text-right">
                          Proposal
                        </Label>
                        <Textarea
                          id="proposal"
                          value={proposal}
                          onChange={(e) => setProposal(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="paymentType" className="text-right">
                          Payment Type
                        </Label>
                        <Select value={paymentType} onValueChange={setPaymentType}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select payment type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Milestone">Milestone</SelectItem>
                            <SelectItem value="Fixed">Fixed</SelectItem>
                            <SelectItem value="Hourly">Hourly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="documents" className="text-right">
                          Documents
                        </Label>
                        <div className="col-span-3">
                          <Input id="documents" type="file" multiple onChange={handleFileChange} />
                          <p className="text-sm text-muted-foreground mt-1">
                            Max file size: 5MB. Multiple files allowed.
                          </p>
                          {documents.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm font-medium">Selected files:</p>
                              <ul className="list-disc list-inside">
                                {documents.map((doc, index) => (
                                  <li key={index} className="text-sm">
                                    {doc.name} ({(doc.size / 1024 / 1024).toFixed(2)} MB)
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => handleApply(bidding.id)} disabled={loading}>
                      {loading ? "Submitting..." : "Submit Application"}
                    </Button>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  )
}

/*
API Documentation:

1. Get Available Projects
GET /api/freelancer/available-projects
Headers:
  Authorization: Bearer <token>
Query Parameters:
  search?: string
  dateFilter?: string (YYYY-MM-DD)
  page?: number
  limit?: number
Response: {
  success: boolean
  data: {
    projects: Array<{
      id: string
      title: string
      description: string
      budget: number
      deadline: string
      applicants: number
      status: "ongoing" | "completed" | "hold" | "cancelled"
      requiredSkills: string[]
      assignedFreelancer?: string
      documents?: Array<{ name: string, url: string }>
      holdReason?: string
      cancelReason?: string
    }>
    totalPages: number
    currentPage: number
  }
}

2. Submit Bid
POST /api/freelancer/projects/:projectId/bid
Headers:
  Authorization: Bearer <token>
  Content-Type: multipart/form-data
Body: FormData
  bidAmount: number
  deliveryTime: number
  proposal: string
  paymentType: string
  documents: File[]
Response: {
  success: boolean
  data: {
    bid: {
      id: string
      biddingId: string
      freelancerId: string
      freelancerName: string
      bidAmount: number
      deliveryTime: number
      proposal: string
      paymentType: string
      documents: string[]
      status: "pending"
      submittedAt: string
    }
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
The dummy data is imported from "@/data/biddings" which includes:
- availableProjects: Array of projects available for bidding
- submittedBids: Array of bids submitted by freelancers
*/

