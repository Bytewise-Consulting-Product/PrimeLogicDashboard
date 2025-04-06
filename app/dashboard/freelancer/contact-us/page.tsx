"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Import dummy data
import { messages as initialMessages } from "@/data/messages"

const formSchema = z.object({
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Please select a priority level.",
  }),
})

export default function FreelancerContactUsPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contactHistory, setContactHistory] = useState(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      message: "",
      priority: "medium",
    },
  })

  useEffect(() => {
    // Fetch contact history from API (commented out for now)
    /*
    const fetchContactHistory = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/freelancer/contact-history`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch contact history');
        }
        const data = await response.json();
        setContactHistory(data.messages);
      } catch (error) {
        console.error('Error fetching contact history:', error);
        toast({
          title: "Error",
          description: "Failed to fetch contact history. Please try again.",
          variant: "destructive",
        });
      }
    };
    fetchContactHistory();
    */

    // Using dummy data from data folder
    setContactHistory(initialMessages)
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      // Commented out API call
      /*
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/freelancer/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(values)
        });
        if (!response.ok) {
          throw new Error('Failed to send message');
        }
        const data = await response.json();
        setContactHistory(prevHistory => [data.message, ...prevHistory]);
        toast({
          title: "Message Sent",
          description: "Your message has been successfully sent to support.",
        });
        form.reset();
      } catch (error) {
        console.error('Error sending message:', error);
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
      */

      // Using dummy data
      const newMessage = {
        id: (contactHistory.length + 1).toString(),
        firstName: "Freelancer",
        lastName: "User",
        email: "freelancer@example.com",
        subject: values.subject,
        message: values.message,
        priority: values.priority,
        status: "active",
        createdAt: new Date().toISOString(),
        response: null,
      }
      setContactHistory([newMessage, ...contactHistory])
      setIsSubmitting(false)
      toast({
        title: "Message Sent",
        description: "Your message has been successfully sent to support.",
      })
      form.reset()
    }, 1000)
  }

  const getStatusBadge = (status) => {
    const statusColors = {
      active: "bg-yellow-500",
      resolved: "bg-green-500",
      closed: "bg-gray-500",
    }
    return <Badge className={`${statusColors[status]} text-white`}>{status}</Badge>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 space-y-8"
    >
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>Send a message to our support team for assistance.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the subject of your message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Type your message here." className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a priority level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact History</CardTitle>
          <CardDescription>View your previous support requests and their statuses.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contactHistory.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>{format(new Date(message.createdAt), "PPP")}</TableCell>
                  <TableCell>{message.subject}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        message.priority === "high"
                          ? "destructive"
                          : message.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {message.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(message.status)}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedMessage(message)}>
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{message.subject}</DialogTitle>
                          <DialogDescription>Sent on {format(new Date(message.createdAt), "PPP")}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold">Message:</h4>
                            <p>{message.message}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Priority:</h4>
                            <p>{message.priority}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Status:</h4>
                            <p>{message.status}</p>
                          </div>
                          {message.response && (
                            <div>
                              <h4 className="font-semibold">Response:</h4>
                              <p>{message.response}</p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}

/*
API Documentation:

1. Send Contact Message
POST /api/freelancer/contact
Headers:
  Authorization: Bearer <token>
  Content-Type: application/json
Request Body:
{
  subject: string,
  message: string,
  priority: "low" | "medium" | "high"
}
Response:
{
  success: boolean,
  data: {
    message: {
      id: string,
      subject: string,
      message: string,
      priority: "low" | "medium" | "high",
      status: "active",
      createdAt: string
    }
  }
}

2. Get Contact History
GET /api/freelancer/contact-history
Headers:
  Authorization: Bearer <token>
Response:
{
  success: boolean,
  data: {
    messages: Array<{
      id: string,
      firstName: string,
      lastName: string,
      email: string,
      subject: string,
      message: string,
      priority: "low" | "medium" | "high",
      status: "active" | "resolved" | "closed",
      createdAt: string,
      response: string | null
    }>
  }
}

Dummy Data:
The dummy data is imported from "@/data/messages" and has the following structure:
export const messages = [
  {
    id: "1",
    firstName: "Freelancer",
    lastName: "User",
    email: "freelancer@example.com",
    subject: "Payment Issue",
    message: "I haven't received my payment for the completed project.",
    priority: "high",
    status: "active",
    createdAt: "2024-02-10T12:00:00Z",
    response: null,
  },
  // More message entries...
];

Note: All endpoints require authentication as a freelancer.
*/

