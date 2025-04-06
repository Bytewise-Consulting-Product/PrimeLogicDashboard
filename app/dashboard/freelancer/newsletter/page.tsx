"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { Search, Calendar, Mail } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import type { Newsletter } from "@/types/newsletter"

// Import dummy data
import { newsletters } from "@/data/newsletters"

export default function FreelancerNewsletterPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState<Date>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newsletterData, setNewsletterData] = useState<Newsletter[]>([])

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        setLoading(true)
        // Commented out actual API call - using dummy data instead
        // const response = await getFreelancerNewsletters()
        // setNewsletterData(response.data.newsletters)
        setNewsletterData(newsletters)
      } catch (err) {
        console.error("Error fetching newsletters:", err)
        setError("Failed to load newsletters")
        toast.error("Failed to load newsletters")
      } finally {
        setLoading(false)
      }
    }

    fetchNewsletters()
  }, [])

  const filteredNewsletters = newsletterData.filter(
    (newsletter) =>
      newsletter.subject.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!dateFilter || new Date(newsletter.sentAt).toDateString() === dateFilter.toDateString()),
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">Newsletters</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search newsletters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
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
              {dateFilter ? format(dateFilter, "PPP") : <span>Filter by date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredNewsletters.map((newsletter) => (
          <motion.div
            key={newsletter.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{newsletter.subject}</span>
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-2">
                  {format(new Date(newsletter.sentAt), "MMMM d, yyyy")}
                </p>
                <div className="text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: newsletter.content }} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredNewsletters.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">No newsletters found matching your criteria.</p>
      )}
    </motion.div>
  )
}

/*
API Documentation:

1. Get Freelancer Newsletters
GET /api/freelancer/newsletters
Headers:
  Authorization: Bearer <token>
Query Parameters:
  search?: string
  date?: string (YYYY-MM-DD)
Response: {
  success: boolean
  data: {
    newsletters: Array<{
      id: string
      subject: string
      content: string
      sentAt: string
      recipientType: "all" | "single"
      recipientEmail?: string
    }>
    totalCount: number
  }
}

2. Get Newsletter by ID
GET /api/freelancer/newsletters/:id
Headers:
  Authorization: Bearer <token>
Response: {
  success: boolean
  data: {
    newsletter: {
      id: string
      subject: string
      content: string
      sentAt: string
      recipientType: "all" | "single"
      recipientEmail?: string
    }
  }
}

3. Subscribe to Newsletter
POST /api/freelancer/newsletters/subscribe
Headers:
  Authorization: Bearer <token>
Body: {
  email: string
}
Response: {
  success: boolean
  message: string
}

4. Unsubscribe from Newsletter
POST /api/freelancer/newsletters/unsubscribe
Headers:
  Authorization: Bearer <token>
Body: {
  email: string
}
Response: {
  success: boolean
  message: string
}

Note: All endpoints require authentication as a freelancer.
*/

