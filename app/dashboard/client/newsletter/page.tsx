"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { Mail, Calendar, ImageIcon, ChevronRight } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Import dummy data
import { newsletters as initialNewsletters } from "@/data/newsletters"

// Commented out API function
/*
async function getNewsletters() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client/newsletters`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch newsletters');
  }
  return response.json();
}
*/

export default function NewsletterPage() {
  const [newsletters, setNewsletters] = useState(initialNewsletters)
  const [selectedNewsletter, setSelectedNewsletter] = useState<(typeof newsletters)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Fetch newsletters from API (commented out for now)
    /*
    const fetchNewsletters = async () => {
      try {
        const data = await getNewsletters();
        setNewsletters(data.newsletters);
      } catch (error) {
        console.error('Error fetching newsletters:', error);
      }
    };
    fetchNewsletters();
    */

    // Using dummy data from data folder
    setNewsletters(initialNewsletters)
  }, [])

  const handleReadMore = (newsletter: (typeof newsletters)[0]) => {
    setSelectedNewsletter(newsletter)
    setIsModalOpen(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="mb-8 text-3xl font-bold">Newsletters</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsletters.map((newsletter, index) => (
          <motion.div
            key={newsletter.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
              {newsletter.image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={newsletter.image || "/placeholder.svg"}
                    alt={newsletter.imageAlt || "Newsletter image"}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="line-clamp-2 text-lg">{newsletter.subject}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                    {format(new Date(newsletter.sentAt), "PPP")}
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="mr-2 h-4 w-4 text-primary" />
                    Newsletter
                  </div>
                  {newsletter.image && (
                    <div className="flex items-center text-sm">
                      <ImageIcon className="mr-2 h-4 w-4 text-primary" />
                      Contains image
                    </div>
                  )}
                </div>
                <div
                  className="line-clamp-3 text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: newsletter.content }}
                />
                <Button variant="outline" className="mt-4 w-full" onClick={() => handleReadMore(newsletter)}>
                  Read More
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedNewsletter?.subject}</DialogTitle>
            <DialogDescription>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedNewsletter && format(new Date(selectedNewsletter.sentAt), "PPP")}
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Newsletter
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>

          {selectedNewsletter?.image && (
            <div className="relative mb-6 mt-4 h-[400px] w-full overflow-hidden rounded-lg">
              <Image
                src={selectedNewsletter.image || "/placeholder.svg"}
                alt={selectedNewsletter.imageAlt || "Newsletter image"}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: selectedNewsletter?.content || "" }}
          />
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

/*
API Documentation:

1. Get Newsletters
GET /api/client/newsletters
Headers:
  Authorization: Bearer <token>
Response:
{
  success: boolean,
  data: {
    newsletters: Array<{
      id: string,
      subject: string,
      content: string,
      sentAt: string,
      recipientType: "all" | "single",
      recipientEmail?: string,
      image?: string,
      imageAlt?: string
    }>
  }
}

Dummy Data:
The dummy data is imported from "@/data/newsletters" and has the following structure:
export const newsletters: Newsletter[] = [
  {
    id: "1",
    subject: "Welcome to Our Platform",
    content: "<h1>Hello there!</h1><p><strong>Welcome to our platform!</strong></p>",
    sentAt: "2024-02-08T10:00:00Z",
    recipientType: "all",
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "Welcome image"
  },
  // More newsletter entries...
];

Note: The actual content of newsletters may contain HTML markup for rich text formatting.
*/

