"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name must not be longer than 50 characters.",
    }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z
    .string()
    .max(500, {
      message: "Bio must not be longer than 500 characters.",
    })
    .optional(),
  skills: z.string().max(200, {
    message: "Skills must not be longer than 200 characters.",
  }),
  hourlyRate: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Please enter a valid hourly rate (e.g., 25 or 25.50).",
  }),
})

const notificationFormSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  weeklyDigest: z.boolean(),
  newProjectAlerts: z.boolean(),
})

export default function FreelancerSettingsPage() {
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "John Doe",
      email: "john@example.com",
      bio: "",
      skills: "React, Node.js, TypeScript",
      hourlyRate: "25",
    },
  })

  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: false,
      weeklyDigest: true,
      newProjectAlerts: true,
    },
  })

  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(values)
    // Here you would typically submit to your API
  }

  function onNotificationSubmit(values: z.infer<typeof notificationFormSchema>) {
    console.log(values)
    // Here you would typically submit to your API
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-8">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell clients about your background and experience..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Brief description for your profile. URLs are hyperlinked.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., React, Node.js, TypeScript" />
                        </FormControl>
                        <FormDescription>Enter your skills, separated by commas.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="hourlyRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hourly Rate ($)</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" placeholder="e.g., 25 or 25.50" />
                        </FormControl>
                        <FormDescription>Your default hourly rate for projects.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Save Changes</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-8">
                  <FormField
                    control={notificationForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Email Notifications</FormLabel>
                          <FormDescription>
                            Receive notifications about your projects and messages via email.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="pushNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Push Notifications</FormLabel>
                          <FormDescription>Receive push notifications on your device.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="weeklyDigest"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Weekly Digest</FormLabel>
                          <FormDescription>Receive a weekly summary of your account activity.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="newProjectAlerts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">New Project Alerts</FormLabel>
                          <FormDescription>
                            Get notified when new projects matching your skills are posted.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Save Preferences</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

/*
API Documentation:
PATCH /settings/profile
Request Body:
{
  name: string;
  email: string;
  bio?: string;
  skills: string;
  hourlyRate: string;
}

Response:
{
  success: boolean;
  data: {
    profile: {
      id: string;
      name: string;
      email: string;
      bio: string;
      skills: string;
      hourlyRate: string;
      updatedAt: string;
    }
  }
}

PATCH /settings/notifications
Request Body:
{
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
  newProjectAlerts: boolean;
}

Response:
{
  success: boolean;
  data: {
    notifications: {
      id: string;
      emailNotifications: boolean;
      pushNotifications: boolean;
      weeklyDigest: boolean;
      newProjectAlerts: boolean;
      updatedAt: string;
    }
  }
}

1. Get Freelancer Profile
GET /api/freelancer/profile
Headers: Authorization: Bearer <token>
Response: {
  success: boolean
  data: FreelancerProfile
}

2. Update Freelancer Profile
PATCH /api/freelancer/profile
Headers: Authorization: Bearer <token>
Body: {
  name?: string
  email?: string
  bio?: string
  skills?: string[]
  hourlyRate?: number
}
Response: {
  success: boolean
  data: FreelancerProfile
}

3. Update Notification Settings
PATCH /api/freelancer/notification-settings
Headers: Authorization: Bearer <token>
Body: {
  emailNotifications: boolean
  pushNotifications: boolean
  weeklyDigest: boolean
  newProjectAlerts: boolean
}
Response: {
  success: boolean
  data: NotificationSettings
}

Note: All endpoints require authentication and authorization as a freelancer.
*/

