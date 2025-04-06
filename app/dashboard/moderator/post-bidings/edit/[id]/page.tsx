"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { projects as initialProjects, type TPROJECT } from "@/data/projects"

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  detail: z.string().min(1, "Detail is required"),
  projectType: z.enum(["INHOUSE", "OUTSOURCE"]),
  niche: z.string().min(1, "Niche is required"),
  bounty: z.number().min(0, "Bounty must be a positive number"),
  deadline: z.string().min(1, "Deadline is required"),
  projectStatus: z.enum(["PENDING", "CANCELLED", "ONGOING", "COMPLETED"]),
  progressPercentage: z.number().min(0).max(100),
  isDeadlineNeedToBeExtend: z.boolean(),
  difficultyLevel: z.enum(["EASY", "MEDIUM", "HARD"]),
})

export default function EditPostBidingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [project, setProject] = useState<TPROJECT | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      // In a real application, you would fetch the project from an API
      const fetchedProject = initialProjects.find((p) => p.id === params.id)
      if (fetchedProject) {
        setProject(fetchedProject)
      } else {
        // Handle not found
        router.push("/dashboard/moderator/post-bidings")
      }
    }

    fetchProject()
  }, [params.id, router])

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      detail: project?.detail || "",
      projectType: project?.projectType || "OUTSOURCE",
      niche: project?.niche || "",
      bounty: project?.bounty || 0,
      deadline: project?.deadline || "",
      projectStatus: project?.projectStatus || "PENDING",
      progressPercentage: project?.progressPercentage || 0,
      isDeadlineNeedToBeExtend: project?.isDeadlineNeedToBeExtend || false,
      difficultyLevel: project?.difficultyLevel || "MEDIUM",
    },
  })

  useEffect(() => {
    if (project) {
      form.reset({
        title: project.title,
        detail: project.detail,
        projectType: project.projectType,
        niche: project.niche,
        bounty: project.bounty,
        deadline: project.deadline,
        projectStatus: project.projectStatus,
        progressPercentage: project.progressPercentage,
        isDeadlineNeedToBeExtend: project.isDeadlineNeedToBeExtend,
        difficultyLevel: project.difficultyLevel,
      })
    }
  }, [project, form])

  async function onSubmit(values: z.infer<typeof projectSchema>) {
    setIsLoading(true)
    try {
      // Here you would typically send the data to your API
      console.log("Updating project:", params.id, values)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/dashboard/moderator/post-bidings")
    } catch (error) {
      console.error("Failed to update project:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!project) {
    return <div>Loading...</div>
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
          <CardTitle>Edit Post Biding</CardTitle>
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
                      <Input placeholder="Project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="detail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detail</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Project details" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="INHOUSE">In-house</SelectItem>
                        <SelectItem value="OUTSOURCE">Outsource</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="niche"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Niche</FormLabel>
                    <FormControl>
                      <Input placeholder="Project niche" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bounty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bounty</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Project bounty"
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        <SelectItem value="ONGOING">Ongoing</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="progressPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Progress Percentage</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Progress percentage"
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isDeadlineNeedToBeExtend"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Deadline Extension Needed</FormLabel>
                      <FormDescription>Check this if the project deadline needs to be extended</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="difficultyLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="EASY">Easy</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HARD">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Post Biding"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

