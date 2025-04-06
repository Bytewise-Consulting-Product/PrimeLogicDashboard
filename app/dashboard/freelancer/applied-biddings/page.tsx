"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { appliedBiddings } from "@/data/applied-biddings"
import type { AppliedBidding } from "@/data/applied-biddings"

function StatusBadge({ status }: { status: AppliedBidding["status"] }) {
  const statusColors = {
    selected: "bg-green-500",
    rejected: "bg-red-500",
    onhold: "bg-yellow-500",
  }

  return (
    <Badge className={`${statusColors[status]} text-white`}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  )
}

function AppliedBiddingCard({ bidding }: { bidding: AppliedBidding }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{bidding.projectTitle}</CardTitle>
          <StatusBadge status={bidding.status} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{bidding.projectDescription}</p>
        <p className="text-sm">
          <strong>Applied Quotation:</strong> ${bidding.appliedQuotation}
        </p>
        <p className="text-sm">
          <strong>Proposed Delivery:</strong> {bidding.proposedDelivery} days
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-4">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{bidding.projectTitle}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <p>
                <strong>Status:</strong> <StatusBadge status={bidding.status} />
              </p>
              <p>
                <strong>Project Description:</strong> {bidding.projectDescription}
              </p>
              <p>
                <strong>Applied Quotation:</strong> ${bidding.appliedQuotation}
              </p>
              <p>
                <strong>Proposed Delivery:</strong> {bidding.proposedDelivery} days
              </p>
              <p>
                <strong>Your Proposal:</strong> {bidding.proposal}
              </p>
              {bidding.clientFeedback && (
                <p>
                  <strong>Client Feedback:</strong> {bidding.clientFeedback}
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

export default function AppliedBiddingsPage() {
  const [biddingsData, setBiddingsData] = useState<AppliedBidding[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Commented out API call
        // const data = await getAppliedBiddings();
        // setAllBiddings(data.biddings);

        // Using dummy data
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
        setBiddingsData(appliedBiddings)
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching applied biddings:", err)
        setError("Failed to fetch applied biddings. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div className="text-center mt-8">Loading applied biddings...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Applied Biddings</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {biddingsData.map((bidding, index) => (
            <motion.div
              key={bidding.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <AppliedBiddingCard bidding={bidding} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

/*
API Documentation:

1. Get Freelancer's Applied Biddings
Endpoint: GET /api/freelancer/applied-biddings
Headers:
  Authorization: Bearer <token>
Query Parameters:
  page: number (optional)
  limit: number (optional)
  status: string (optional, e.g., 'selected', 'rejected', 'onhold')
Response:
{
  success: boolean,
  data: {
    biddings: AppliedBidding[],
    totalPages: number,
    currentPage: number
  }
}

2. Get Applied Bidding Details
Endpoint: GET /api/freelancer/applied-biddings/:biddingId
Headers:
  Authorization: Bearer <token>
Response:
{
  success: boolean,
  data: AppliedBidding
}

3. Update Applied Bidding
Endpoint: PATCH /api/freelancer/applied-biddings/:biddingId
Headers:
  Authorization: Bearer <token>
  Content-Type: application/json
Body:
{
  proposedDelivery?: number,
  appliedQuotation?: number,
  proposal?: string
}
Response:
{
  success: boolean,
  data: AppliedBidding
}

Note: All endpoints require authentication as a freelancer.
The dummy data is imported from "@/data/applied-biddings" file.
*/

