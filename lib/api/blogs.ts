import { apiInstance } from "@/lib/axios"

export interface Blog {
  id: string
  blogTitle: string
  blogThumbnail: string
  blogOverview: string
  blogBody: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

// Create new blog
export const createBlog = async (blogData: Omit<Blog, "id" | "isPublic" | "createdAt" | "updatedAt">) => {
  try {
    const response = await apiInstance.post("/blogs", blogData)
    return response.data
  } catch (error) {
    console.error("Failed to create blog:", error)
    throw error
  }
}

// Get all public blogs
export const getAllPublicBlogs = async () => {
  try {
    const response = await apiInstance.get("/blogs/public")
    return response.data
  } catch (error) {
    console.error("Failed to fetch blogs:", error)
    throw error
  }
}

// Update blog
export const updateBlog = async (id: string, updates: Partial<Blog>) => {
  try {
    const response = await apiInstance.patch(`/blogs/${id}`, updates)
    return response.data
  } catch (error) {
    console.error("Failed to update blog:", error)
    throw error
  }
}

// Toggle blog public/private status
export const toggleBlogPublicStatus = async (id: string, isPublic: boolean) => {
  try {
    const response = await apiInstance.patch(`/blogs/${id}/visibility`, { isPublic })
    return response.data
  } catch (error) {
    console.error("Failed to update blog visibility:", error)
    throw error
  }
}

// Delete blog
export const deleteBlog = async (id: string) => {
  try {
    const response = await apiInstance.delete(`/blogs/${id}`)
    return response.data
  } catch (error) {
    console.error("Failed to delete blog:", error)
    throw error
  }
}

/*
API Documentation:

1. Create Blog
POST /blogs
Request Body: {
  blogTitle: string
  blogThumbnail: string
  blogOverview: string
  blogBody: string
}
Response: {
  success: boolean
  data: Blog
}

2. Get All Public Blogs
GET /blogs/public
Response: {
  success: boolean
  data: Blog[]
}

3. Update Blog
PATCH /blogs/:id
Request Body: Partial<Blog>
Response: {
  success: boolean
  data: Blog
}

4. Toggle Blog Visibility
PATCH /blogs/:id/visibility
Request Body: {
  isPublic: boolean
}
Response: {
  success: boolean
  data: Blog
}

5. Delete Blog
DELETE /blogs/:id
Response: {
  success: boolean
  message: string
}
*/

