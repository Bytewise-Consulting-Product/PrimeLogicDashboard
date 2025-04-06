"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  content: z.string().min(50, {
    message: "Content must be at least 50 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  clientSignature: z.string().min(2, {
    message: "Client signature is required.",
  }),
  freelancerSignature: z.string().min(2, {
    message: "Freelancer signature is required.",
  }),
  businessSignature: z.string().min(2, {
    message: "Business signature is required.",
  }),
})

export default function CreateDocumentPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      category: "",
      clientSignature: "",
      freelancerSignature: "",
      businessSignature: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here you would typically submit to your API
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Card>
        <CardHeader>
          <CardTitle>Create New Document</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter document title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter a brief description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter the main content" className="min-h-[200px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="proposal">Proposal</SelectItem>
                        <SelectItem value="agreement">Agreement</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientSignature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Signature</FormLabel>
                    <FormControl>
                      <Input placeholder="Client's full name" {...field} />
                    </FormControl>
                    <FormDescription>Type your full name as signature.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="freelancerSignature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Freelancer Signature</FormLabel>
                    <FormControl>
                      <Input placeholder="Freelancer's full name" {...field} />
                    </FormControl>
                    <FormDescription>Type your full name as signature.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessSignature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Signature</FormLabel>
                    <FormControl>
                      <Input placeholder="Business representative's full name" {...field} />
                    </FormControl>
                    <FormDescription>Type the full name of the business representative as signature.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create Document</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

/*
API Documentation:
POST /api/documents
Request Body:
{
  title: string;
  description: string;
  content: string;
  category: string;
  clientSignature: string;
  freelancerSignature: string;
  businessSignature: string;
}

Response:
{
  success: boolean;
  data: {
    document: {
      id: string;
      title: string;
      description: string;
      content: string;
      category: string;
      clientSignature: string;
      freelancerSignature: string;
      businessSignature: string;
      createdAt: string;
      updatedAt: string;
    }
  }
}
*/

