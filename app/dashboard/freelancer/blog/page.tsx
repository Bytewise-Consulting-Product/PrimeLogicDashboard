"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { blogs as initialBlogs, type Blog } from "@/data/blogs"

export default function FreelancerBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // In a real application, you would fetch data from an API here
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/freelancer/blogs`, {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //   },
        // });
        // if (!response.ok) {
        //   throw new Error('Failed to fetch blogs');
        // }
        // const data = await response.json();
        // setBlogs(data.blogs);

        // Simulating API call with dummy data
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
        setBlogs(initialBlogs)
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching blogs:", err)
        setError("Failed to fetch blogs. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const filteredBlogs = blogs.filter((blog) => blog.title.toLowerCase().includes(searchTerm.toLowerCase()))

  if (isLoading) {
    return <div className="text-center mt-8">Loading blogs...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>

      <div className="relative w-full mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="line-clamp-2 h-14">{blog.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    By {blog.author} on {format(new Date(blog.createdAt), "PPP")}
                  </p>
                  <p className="line-clamp-3 mb-4">{blog.content}</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Read More
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{blog.title}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        By {blog.author} on {format(new Date(blog.createdAt), "PPP")}
                      </p>
                      {blog.image && (
                        <div className="mb-4">
                          <img
                            src={blog.image || "/placeholder.svg"}
                            alt={blog.title}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                      )}
                      <div className="prose max-w-none">
                        {blog.content.split("\n").map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/*
API Documentation:

1. Fetch Blogs for Freelancers
GET /api/freelancer/blogs
Headers:
  Authorization: Bearer <token>
Query Parameters:
  page: number (optional, default: 1)
  limit: number (optional, default: 10)
  search: string (optional)
Response:
{
  success: boolean,
  data: {
    blogs: Array<{
      id: string,
      title: string,
      content: string,
      author: string,
      createdAt: string,
      updatedAt: string,
      image?: string
    }>,
    totalPages: number,
    currentPage: number
  }
}

Dummy Data:
The dummy data is imported from "@/data/blogs" and has the following structure:

// blogs.ts
export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
}

export const blogs: Blog[] = [
  {
    id: "1",
    title: "The Future of Freelancing: Trends and Predictions",
    content: "...",
    author: "Jane Smith",
    createdAt: "2024-03-15T09:00:00Z",
    updatedAt: "2024-03-15T09:00:00Z",
    image: "https://example.com/image1.jpg"
  },
  // More blog entries...
];

Note: This endpoint requires authentication as a freelancer.
*/

