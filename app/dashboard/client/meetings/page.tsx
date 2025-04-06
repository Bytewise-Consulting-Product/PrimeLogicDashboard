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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Import dummy data
import { meetings as dummyMeetings } from "@/data/meetings"

const formSchema = z.object({
  moderator: z.string({
    required_error: "Please select a moderator.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string({
    required_error: "Please select a time.",
  }),
  topic: z.string().min(2, {
    message: "Topic must be at least 2 characters.",
  }),
})

// Commented out API functions
/*
async function getMeetings() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client/meetings`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch meetings');
  }
  return response.json();
}

async function scheduleMeeting(meetingData) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client/meetings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(meetingData)
  });
  if (!response.ok) {
    throw new Error('Failed to schedule meeting');
  }
  return response.json();
}

async function updateMeeting(meetingId, updateData) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client/meetings/${meetingId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(updateData)
  });
  if (!response.ok) {
    throw new Error('Failed to update meeting');
  }
  return response.json();
}
*/

export default function ClientMeetingsPage() {
  const { toast } = useToast()
  const [meetings, setMeetings] = useState(dummyMeetings)
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [isAddingNotes, setIsAddingNotes] = useState(false)
  const [newNote, setNewNote] = useState("")
  const [meetingDetails, setMeetingDetails] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      moderator: "",
      topic: "",
    },
  })

  useEffect(() => {
    // Fetch meetings from API (commented out for now)
    /*
    const fetchMeetings = async () => {
      try {
        const data = await getMeetings();
        setMeetings(data.meetings);
      } catch (error) {
        console.error('Error fetching meetings:', error);
        toast({
          title: "Error",
          description: "Failed to fetch meetings. Please try again.",
          variant: "destructive",
        });
      }
    };
    fetchMeetings();
    */

    // Using dummy data
    setMeetings(dummyMeetings)
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call
    setTimeout(() => {
      // Commented out API call
      /*
      try {
        const newMeeting = await scheduleMeeting({
          moderatorName: values.moderator,
          date: new Date(`${values.date.toISOString().split('T')[0]}T${values.time}:00Z`).toISOString(),
          topic: values.topic,
        });
        setMeetings([newMeeting, ...meetings]);
        toast({
          title: "Meeting Scheduled",
          description: "Your meeting has been successfully scheduled.",
        });
        form.reset();
      } catch (error) {
        console.error('Error scheduling meeting:', error);
        toast({
          title: "Error",
          description: "Failed to schedule meeting. Please try again.",
          variant: "destructive",
        });
      }
      */

      // Using dummy data
      const newMeeting = {
        id: (meetings.length + 1).toString(),
        moderatorName: values.moderator,
        date: new Date(`${values.date.toISOString().split("T")[0]}T${values.time}:00Z`).toISOString(),
        topic: values.topic,
        status: "scheduled",
        notes: "",
        details: "",
      }
      setMeetings([newMeeting, ...meetings])
      toast({
        title: "Meeting Scheduled",
        description: "Your meeting has been successfully scheduled.",
      })
      form.reset()
    }, 1000)
  }

  const handleAddNotes = () => {
    if (selectedMeeting && newNote.trim() !== "") {
      // Commented out API call
      /*
      try {
        const updatedMeeting = await updateMeeting(selectedMeeting.id, {
          notes: selectedMeeting.notes ? `${selectedMeeting.notes}\n\n${newNote}` : newNote
        });
        setMeetings(meetings.map(meeting => meeting.id === updatedMeeting.id ? updatedMeeting : meeting));
        setNewNote("");
        setIsAddingNotes(false);
        toast({
          title: "Notes Added",
          description: "Your notes have been added to the meeting.",
        });
      } catch (error) {
        console.error('Error adding notes:', error);
        toast({
          title: "Error",
          description: "Failed to add notes. Please try again.",
          variant: "destructive",
        });
      }
      */

      // Using dummy data
      const updatedMeetings = meetings.map((meeting) =>
        meeting.id === selectedMeeting.id
          ? { ...meeting, notes: meeting.notes ? `${meeting.notes}\n\n${newNote}` : newNote }
          : meeting,
      )
      setMeetings(updatedMeetings)
      setNewNote("")
      setIsAddingNotes(false)
      toast({
        title: "Notes Added",
        description: "Your notes have been added to the meeting.",
      })
    }
  }

  const handleSaveMeetingDetails = () => {
    if (selectedMeeting && meetingDetails.trim() !== "") {
      // Commented out API call
      /*
      try {
        const updatedMeeting = await updateMeeting(selectedMeeting.id, {
          details: meetingDetails
        });
        setMeetings(meetings.map(meeting => meeting.id === updatedMeeting.id ? updatedMeeting : meeting));
        setMeetingDetails("");
        toast({
          title: "Meeting Details Saved",
          description: "Your meeting details have been saved successfully.",
        });
      } catch (error) {
        console.error('Error saving meeting details:', error);
        toast({
          title: "Error",
          description: "Failed to save meeting details. Please try again.",
          variant: "destructive",
        });
      }
      */

      // Using dummy data
      const updatedMeetings = meetings.map((meeting) =>
        meeting.id === selectedMeeting.id ? { ...meeting, details: meetingDetails } : meeting,
      )
      setMeetings(updatedMeetings)
      setMeetingDetails("")
      toast({
        title: "Meeting Details Saved",
        description: "Your meeting details have been saved successfully.",
      })
    }
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
          <CardTitle>Schedule a Meeting</CardTitle>
          <CardDescription>Schedule a meeting with a moderator.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="moderator"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Moderator</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a moderator" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="John Doe">John Doe</SelectItem>
                        <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                        <SelectItem value="Alice Johnson">Alice Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the meeting topic" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Schedule Meeting</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Meetings</CardTitle>
          <CardDescription>View your scheduled and past meetings.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Moderator</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell>{format(new Date(meeting.date), "PPP p")}</TableCell>
                  <TableCell>{meeting.moderatorName}</TableCell>
                  <TableCell>{meeting.topic}</TableCell>
                  <TableCell>{meeting.status}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedMeeting(meeting)}>
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{meeting.topic}</DialogTitle>
                          <DialogDescription>
                            Meeting with {meeting.moderatorName} on {format(new Date(meeting.date), "PPP p")}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold">Status:</h4>
                            <p>{meeting.status}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Notes:</h4>
                            <p>{meeting.notes || "No notes available."}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Meeting Details:</h4>
                            {isAddingNotes ? (
                              <div className="space-y-2">
                                <Textarea
                                  value={meetingDetails}
                                  onChange={(e) => setMeetingDetails(e.target.value)}
                                  placeholder="Enter meeting details here..."
                                />
                                <Button onClick={handleSaveMeetingDetails}>Save Details</Button>
                                <Button variant="outline" onClick={() => setIsAddingNotes(false)}>
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <>
                                <p>{meeting.details || "No details available."}</p>
                                <Button onClick={() => setIsAddingNotes(true)} className="mt-2">
                                  {meeting.details ? "Edit Details" : "Add Details"}
                                </Button>
                              </>
                            )}
                          </div>
                          {meeting.status === "completed" && (
                            <div>
                              {isAddingNotes ? (
                                <div className="space-y-2">
                                  <Textarea
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    placeholder="Enter your notes here..."
                                  />
                                  <Button onClick={handleAddNotes}>Save Notes</Button>
                                  <Button variant="outline" onClick={() => setIsAddingNotes(false)}>
                                    Cancel
                                  </Button>
                                </div>
                              ) : (
                                <Button onClick={() => setIsAddingNotes(true)}>Add Notes</Button>
                              )}
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

1. Get Meetings
GET /api/client/meetings
Headers:
  Authorization: Bearer <token>
Response:
{
  success: boolean,
  data: {
    meetings: Array<{
      id: string,
      moderatorName: string,
      date: string,
      topic: string,
      status: "scheduled" | "completed",
      notes: string,
      details: string
    }>
  }
}

2. Schedule Meeting
POST /api/client/meetings
Headers:
  Authorization: Bearer <token>
  Content-Type: application/json
Request Body:
{
  moderatorName: string,
  date: string, // ISO 8601 format
  topic: string
}
Response:
{
  success: boolean,
  data: {
    id: string,
    moderatorName: string,
    date: string,
    topic: string,
    status: "scheduled",
    notes: "",
    details: ""
  }
}

3. Update Meeting
PATCH /api/client/meetings/:id
Headers:
  Authorization: Bearer <token>
  Content-Type: application/json
Request Body:
{
  notes?: string,
  details?: string
}
Response:
{
  success: boolean,
  data: {
    id: string,
    moderatorName: string,
    date: string,
    topic: string,
    status: "scheduled" | "completed",
    notes: string,
    details: string
  }
}

Dummy Data:
The dummy data is imported from "@/data/meetings" and has the following structure:
export const meetings: Meeting[] = [
  {
    id: "1",
    moderatorName: "John Doe",
    date: "2024-03-15T10:00:00Z",
    topic: "Project Discussion",
    status: "scheduled",
    notes: "",
    details: "",
  },
  // More meeting entries...
];
*/

