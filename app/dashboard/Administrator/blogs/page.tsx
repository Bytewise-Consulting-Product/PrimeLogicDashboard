"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { blogs as initialBlogs, type Blog } from "@/data/blogs"

// Commented out API functions
/*
async function getBlogs() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Role': 'moderator'
    }
  });
  if (!response.ok) throw new Error('Failed to fetch blogs');
  return response.json();
}

async function createBlog(blogData) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Role': 'moderator'
    },
    body: JSON.stringify(blogData)
  });
  if (!response.ok) throw new Error('Failed to create blog');
  return response.json();
}

async function updateBlog(id, blogData) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Role': 'moderator'
    },
    body: JSON.stringify(blogData)
  });
  if (!response.ok) throw new Error('Failed to update blog');
  return response.json();
}

async function deleteBlog(id) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Role': 'moderator'
    }
  });
  if (!response.ok) throw new Error('Failed to delete blog');
  return response.json();
}
*/

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Fetch blogs from API (commented out for now)
    // getBlogs().then(setBlogs).catch(console.error);
  }, [])

  const filteredBlogs = blogs.filter((blog) => blog.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleCreateBlog = async (blogData) => {
    // Implement create blog logic
    console.log("Creating blog:", blogData)
    // const newBlog = await createBlog(blogData);
    // setBlogs([...blogs, newBlog]);
  }

  const handleUpdateBlog = async (id, blogData) => {
    // Implement update blog logic
    console.log("Updating blog:", id, blogData)
    // const updatedBlog = await updateBlog(id, blogData);
    // setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog));
  }

  const handleDeleteBlog = async (id) => {
    // Implement delete blog logic
    console.log("Deleting blog:", id)
    // await deleteBlog(id);
    // setBlogs(blogs.filter(blog => blog.id !== id));
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <Button asChild>
          <Link href="/dashboard/moderator/blogs/create">
            <Plus className="mr-2 h-4 w-4" /> Create Blog
          </Link>
        </Button>
      </div>

      <Input
        type="text"
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <Card key={blog.id}>
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                By {blog.author} on {format(new Date(blog.createdAt), "PPP")}
              </p>
              <p className="line-clamp-3">{blog.content}</p>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => handleUpdateBlog(blog.id, blog)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteBlog(blog.id)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

/*
API Documentation:

GET /api/blogs
Headers: 
  Authorization: Bearer <token>
  Role: moderator
Response: {
  success: boolean,
  data: Blog[]
}

POST /api/blogs
Headers: 
  Authorization: Bearer <token>
  Role: moderator
Body: {
  title: string,
  content: string,
  author: string
}
Response: {
  success: boolean,
  data: Blog
}

PUT /api/blogs/:id
Headers: 
  Authorization: Bearer <token>
  Role: moderator
Body: {
  title?: string,
  content?: string,
  author?: string
}
Response: {
  success: boolean,
  data: Blog
}

DELETE /api/blogs/:id
Headers: 
  Authorization: Bearer <token>
  Role: moderator
Response: {
  success: boolean,
  message: string
}
*/

