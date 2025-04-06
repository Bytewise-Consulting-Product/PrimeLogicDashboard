"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2, RefreshCw } from "lucide-react"

// Import dummy data
import { trashedConsultations } from "@/data/trashed-consultations"
import { trashedNewsletters } from "@/data/trashed-newsletters"
import { trashedBlogs } from "@/data/trashed-blogs"

async function getTrashedItems(type: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/trash/${type}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Role: "admin",
    },
  })
  if (!response.ok) throw new Error(`Failed to fetch trashed ${type}`)
  return response.json()
}

async function restoreItem(type: string, id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/trash/${type}/${id}/restore`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Role: "admin",
    },
  })
  if (!response.ok) throw new Error(`Failed to restore ${type}`)
  return response.json()
}

async function deleteItemPermanently(type: string, id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/trash/${type}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Role: "admin",
    },
  })
  if (!response.ok) throw new Error(`Failed to delete ${type} permanently`)
  return response.json()
}

export default function TrashPage() {
  const [consultations, setConsultations] = useState(trashedConsultations)
  const [newsletters, setNewsletters] = useState(trashedNewsletters)
  const [blogs, setBlogs] = useState(trashedBlogs)

  useEffect(() => {
    getTrashedItems("consultations").then(setConsultations).catch(console.error)
    getTrashedItems("newsletters").then(setNewsletters).catch(console.error)
    getTrashedItems("blogs").then(setBlogs).catch(console.error)
  }, [])

  const handleRestore = async (type, id) => {
    try {
      await restoreItem(type, id)
    } catch (error) {
      console.error(`Failed to restore ${type}:`, error)
    }
  }

  const handleDelete = async (type, id) => {
    try {
      await deleteItemPermanently(type, id)
    } catch (error) {
      console.error(`Failed to delete ${type} permanently:`, error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="mb-8 text-3xl font-bold">Trash</h1>
      <Tabs defaultValue="consultations">
        <TabsList>
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
          <TabsTrigger value="newsletters">Newsletters</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
        </TabsList>
        <TabsContent value="consultations">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Deleted At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consultations.map((consultation) => (
                <TableRow key={consultation.id}>
                  <TableCell>{consultation.name}</TableCell>
                  <TableCell>{consultation.email}</TableCell>
                  <TableCell>{new Date(consultation.deletedAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRestore("consultations", consultation.id)}
                      className="mr-2"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Restore
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete("consultations", consultation.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Permanently
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="newsletters">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Deleted At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsletters.map((newsletter) => (
                <TableRow key={newsletter.id}>
                  <TableCell>{newsletter.subject}</TableCell>
                  <TableCell>{new Date(newsletter.deletedAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRestore("newsletters", newsletter.id)}
                      className="mr-2"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Restore
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete("newsletters", newsletter.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Permanently
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="blogs">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Deleted At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{new Date(blog.deletedAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRestore("blogs", blog.id)}
                      className="mr-2"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Restore
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete("blogs", blog.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Permanently
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

/*
API Documentation:

All endpoints require authentication and authorization as an admin.
Headers: 
  Authorization: Bearer <token>
  Role: admin

1. Get Trashed Items
GET /api/admin/trash/:type
Response: {
  success: boolean
  data: TrashedItem[]
}

2. Restore Trashed Item
PATCH /api/admin/trash/:type/:id/restore
Response: {
  success: boolean
  message: string
}

3. Delete Trashed Item Permanently
DELETE /api/admin/trash/:type/:id
Response: {
  success: boolean
  message: string
}
*/

