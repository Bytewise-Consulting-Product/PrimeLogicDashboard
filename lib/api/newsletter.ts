import { apiInstance } from "@/lib/axios"

export interface Newsletter {
  id: string
  subject: string
  content: string
  sentAt: string
  recipientType: "all" | "single"
  recipientEmail?: string
}

// Send newsletter to all subscribers
export const sendNewsletterToAll = async (newsletter: string) => {
  try {
    const response = await apiInstance.post("/PLS_NEWSLETTER/sendToAll", {
      newsLetter: newsletter,
    })
    return response.data
  } catch (error) {
    console.error("Failed to send newsletter:", error)
    throw error
  }
}

// Send newsletter to single subscriber
export const sendNewsletterToSingle = async (email: string, newsletter: string) => {
  try {
    const response = await apiInstance.post("/PLS_NEWSLETTER/sendToSingle", {
      email,
      newsLetter: newsletter,
    })
    return response.data
  } catch (error) {
    console.error("Failed to send newsletter:", error)
    throw error
  }
}

// Get all newsletters
export const getAllNewsletters = async () => {
  try {
    const response = await apiInstance.get("/newsletters")
    return response.data
  } catch (error) {
    console.error("Failed to fetch newsletters:", error)
    throw error
  }
}

/*
API Documentation:

1. Send Newsletter to All Subscribers
POST /PLS_NEWSLETTER/sendToAll
Request Body: {
  newsLetter: string // HTML content
}
Response: {
  success: boolean
  message: string
}

2. Send Newsletter to Single Subscriber
POST /PLS_NEWSLETTER/sendToSingle
Request Body: {
  email: string
  newsLetter: string // HTML content
}
Response: {
  success: boolean
  message: string
}

3. Get All Newsletters
GET /newsletters
Response: {
  success: boolean
  data: Newsletter[]
}
*/

