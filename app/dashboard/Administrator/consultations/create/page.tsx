"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const consultationFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  bookingDate: z.string(),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
})

export default function CreateConsultationPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof consultationFormSchema>>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      bookingDate: "",
      address: "",
    },
  })

  async function onSubmit(values: z.infer<typeof consultationFormSchema>) {
    setIsSubmitting(true)
    try {
      // In a real application, you would send this data to your API
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultation/requestAConsultation`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //   },
      //   body: JSON.stringify(values)
      // });
      // if (!response.ok) {
      //   throw new Error('Failed to create consultation');
      // }
      // const data = await response.json();
      console.log(values)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/dashboard/moderator/consultations")
    } catch (error) {
      console.error("Failed to create consultation:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Card>
        <CardHeader>
          <CardTitle>Create New Consultation</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
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
                      <Textarea placeholder="Enter consultation message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bookingDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Booking Date</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Consultation"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

/*
API Documentation:

1. Create Consultation
POST /consultation/requestAConsultation
Headers:
  Authorization: Bearer <token>
  Content-Type: application/json
Request Body:
{
  name: string,
  email: string,
  phone: string,
  message: string,
  bookingDate: string, // Format: "YYYY-MM-DDTHH:mm"
  address: string
}
Response:
{
  success: boolean,
  data: {
    consultation: {
      id: string,
      name: string,
      email: string,
      phone: string,
      message: string,
      bookingDate: string,
      address: string,
      status: "pending"
    }
  }
}

Note: This endpoint requires authentication. Ensure the token is included in the Authorization header.
*/

