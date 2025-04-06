import { apiInstance } from "@/lib/axios"

// Get available projects for bidding
export const getAvailableProjects = async (params?: { search?: string; dateFilter?: string }) => {
  try {
    const response = await apiInstance.get("/api/freelancer/available-projects", { params })
    return response.data
  } catch (error) {
    console.error("Failed to fetch available projects:", error)
    throw error
  }
}

// Submit a bid for a project
export const submitBid = async (
  projectId: string,
  bidData: {
    bidAmount: number
    deliveryTime: number
    proposal: string
    paymentType: string
    documents: File[]
  },
) => {
  try {
    const formData = new FormData()
    formData.append("bidAmount", bidData.bidAmount.toString())
    formData.append("deliveryTime", bidData.deliveryTime.toString())
    formData.append("proposal", bidData.proposal)
    formData.append("paymentType", bidData.paymentType)
    bidData.documents.forEach((file) => {
      formData.append("documents", file)
    })

    const response = await apiInstance.post(`/api/freelancer/projects/${projectId}/bid`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error) {
    console.error("Failed to submit bid:", error)
    throw error
  }
}

// Get submitted bids
export const getSubmittedBids = async () => {
  try {
    const response = await apiInstance.get("/api/freelancer/submitted-bids")
    return response.data
  } catch (error) {
    console.error("Failed to fetch submitted bids:", error)
    throw error
  }
}

// Get bid details
export const getBidDetails = async (bidId: string) => {
  try {
    const response = await apiInstance.get(`/api/freelancer/bids/${bidId}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch bid details:", error)
    throw error
  }
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
    projects: Bidding[]
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
    bid: BidSubmission
  }
}

3. Get Submitted Bids
GET /api/freelancer/submitted-bids
Headers:
  Authorization: Bearer <token>
Query Parameters:
  status?: "pending" | "accepted" | "rejected"
  page?: number
  limit?: number
Response: {
  success: boolean
  data: {
    bids: BidSubmission[]
    totalPages: number
    currentPage: number
  }
}

4. Get Bid Details
GET /api/freelancer/bids/:bidId
Headers:
  Authorization: Bearer <token>
Response: {
  success: boolean
  data: {
    bid: BidSubmission
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
*/

