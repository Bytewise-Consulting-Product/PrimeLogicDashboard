"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Check, X } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Import dummy data
import { meetings as initialMeetings, clients, freelancers } from "@/data/meetings"
import type { Meeting } from "@/types/meeting"

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)
  const [showMeetingDialog, setShowMeetingDialog] = useState(false)
  const [meetingData, setMeetingData] = useState({
    clientId: "",
    freelancerId: "",
    date: "",
    time: "",
    description: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        // Commented out API call
        // const response = await getMeetings();
        // setMeetings(response.data.meetings);

        // Using dummy data
        setMeetings(initialMeetings)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching meetings:", err)
        setError("Failed to fetch meetings")
        setLoading(false)
      }
    }

    fetchMeetings()
  }, [])

  const handleTrash = async (id: string) => {
    // Implement trashing logic (using dummy data for now)
    setMeetings(meetings.filter((meeting) => meeting.id !== id))
  }

  const handleUpdateMeeting = async (meetingId: string, status: "attended" | "not_attended") => {
    try {
      // Commented out API call
      // await updateMeetingStatus(meetingId, status);

      // Update local state
      setMeetings(meetings.map((meeting) => (meeting.id === meetingId ? { ...meeting, status } : meeting)))
    } catch (err) {
      console.error("Error updating meeting status:", err)
    }
  }

  const handleScheduleMeeting = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Commented out API call
      // const response = await scheduleMeeting(meetingData);
      // setMeetings([...meetings, response.data.meeting]);

      // Using dummy data
      const newMeeting: Meeting = {
        id: (meetings.length + 1).toString(),
        title: "New Meeting",
        date: `${meetingData.date}T${meetingData.time}`,
        attendees: [
          clients.find((c) => c.id === meetingData.clientId)?.name || "",
          freelancers.find((f) => f.id === meetingData.freelancerId)?.name || "",
        ],
        status: "upcoming",
        description: meetingData.description,
      }
      setMeetings([...meetings, newMeeting])
      setShowMeetingDialog(false)
      setMeetingData({
        clientId: "",
        freelancerId: "",
        date: "",
        time: "",
        description: "",
      })
    } catch (err) {
      console.error("Failed to schedule meeting:", err)
    }
  }

  if (loading) {
    return <div className="text-center mt-8">Loading meetings...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>
  }

  const todayMeetings = meetings.filter(
    (meeting) => new Date(meeting.date).toDateString() === new Date().toDateString(),
  )
  const upcomingMeetings = meetings.filter(
    (meeting) => new Date(meeting.date) > new Date() && !todayMeetings.includes(meeting),
  )
  const pastMeetings = meetings.filter((meeting) => new Date(meeting.date) < new Date())

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meetings</h1>
        <Button onClick={() => setShowMeetingDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> Schedule Meeting
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          {todayMeetings.length > 0 ? (
            todayMeetings.map((meeting) => (
              <MeetingItem
                key={meeting.id}
                meeting={meeting}
                onUpdateStatus={handleUpdateMeeting}
                onSelectMeeting={setSelectedMeeting}
              />
            ))
          ) : (
            <p>No meetings scheduled for today.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingMeetings.map((meeting) => (
            <MeetingItem
              key={meeting.id}
              meeting={meeting}
              onUpdateStatus={handleUpdateMeeting}
              onSelectMeeting={setSelectedMeeting}
            />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Past Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          {pastMeetings.map((meeting) => (
            <MeetingItem
              key={meeting.id}
              meeting={meeting}
              onUpdateStatus={handleUpdateMeeting}
              onSelectMeeting={setSelectedMeeting}
            />
          ))}
        </CardContent>
      </Card>

      <ScheduleMeetingDialog
        isOpen={showMeetingDialog}
        onClose={() => setShowMeetingDialog(false)}
        onSchedule={handleScheduleMeeting}
        meetingData={meetingData}
        setMeetingData={setMeetingData}
      />

      <MeetingNotesDialog meeting={selectedMeeting} onClose={() => setSelectedMeeting(null)} onSaveNotes={() => {}} />
    </div>
  )
}

function MeetingItem({ meeting, onUpdateStatus, onSelectMeeting }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <h3 className="font-semibold">{meeting.title}</h3>
        <p className="text-sm text-muted-foreground">
          {format(new Date(meeting.date), "PPp")} - {meeting.attendees.join(", ")}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        {meeting.status === "upcoming" && (
          <>
            <Button size="sm" onClick={() => onUpdateStatus(meeting.id, "attended")}>
              <Check className="mr-2 h-4 w-4" /> Attended
            </Button>
            <Button size="sm" variant="outline" onClick={() => onUpdateStatus(meeting.id, "not_attended")}>
              <X className="mr-2 h-4 w-4" /> Not Attended
            </Button>
          </>
        )}
        {(meeting.status === "attended" || meeting.status === "not_attended") && (
          <Button size="sm" variant="outline" onClick={() => onSelectMeeting(meeting)}>
            View Notes
          </Button>
        )}
      </div>
    </div>
  )
}

function ScheduleMeetingDialog({ isOpen, onClose, onSchedule, meetingData, setMeetingData }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    setMeetingData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule a Meeting</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSchedule} className="space-y-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" value={meetingData.date} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input id="time" name="time" type="time" value={meetingData.time} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="clientId">Client</Label>
            <Select
              name="clientId"
              value={meetingData.clientId}
              onValueChange={(value) => handleChange({ target: { name: "clientId", value } })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="freelancerId">Freelancer</Label>
            <Select
              name="freelancerId"
              value={meetingData.freelancerId}
              onValueChange={(value) => handleChange({ target: { name: "freelancerId", value } })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a freelancer" />
              </SelectTrigger>
              <SelectContent>
                {freelancers.map((freelancer) => (
                  <SelectItem key={freelancer.id} value={freelancer.id}>
                    {freelancer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={meetingData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <Button type="submit">Schedule Meeting</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function MeetingNotesDialog({ meeting, onClose, onSaveNotes }) {
  const [notes, setNotes] = useState(meeting?.notes || "")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSaveNotes(meeting.id, notes)
  }

  if (!meeting) return null

  return (
    <Dialog open={!!meeting} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Meeting Notes: {meeting.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              placeholder="Enter meeting notes..."
            />
          </div>
          <Button type="submit">Save Notes</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/*
API Documentation:

1. Get All Meetings
GET /api/moderator/meetings
Headers:
Authorization: Bearer <token>
Query Parameters:
status?: string
search?: string
sortOrder?: "asc" | "desc"
dateFrom?: string
dateTo?: string
page?: number
limit?: number
Response: {
  success: boolean
  data: {
    meetings: Array<{
      id: string
      title: string
      date: string
      attendees: string[]
      status: "upcoming" | "attended" | "not_attended"
      notes?: string
      description?: string
    }>
    totalCount: number
  }
}

2. Create Meeting
POST /api/moderator/meetings
Headers:
Authorization: Bearer <token>
Content-Type: application/json
Request Body: {
  title: string
  date: string
  time: string
  attendees: string[]
  description?: string
}
Response: {
  success: boolean
  data: {
    meeting: Meeting
  }
}

3. Update Meeting Status
PATCH /api/moderator/meetings/:id/status
Headers:
Authorization: Bearer <token>
Content-Type: application/json
Request Body: {
  status: "attended" | "not_attended"
}
Response: {
  success: boolean
  data: {
    id: string
    status: "attended" | "not_attended"
  }
}

4. Add Meeting Notes
POST /api/moderator/meetings/:id/notes
Headers:
Authorization: Bearer <token>
Content-Type: application/json
Request Body: {
  notes: string
}
Response: {
  success: boolean
  data: {
    id: string
    notes: string
  }
}

5. Schedule Meeting
POST /api/moderator/meetings/schedule
Headers:
Authorization: Bearer <token>
Content-Type: application/json
Request Body: {
  clientId: string
  freelancerId: string
  date: string
  time: string
  description: string
}
Response: {
  success: boolean
  data: {
    meeting: Meeting
  }
}

6. Get Meeting Details
GET /api/moderator/meetings/:id
Headers:
Authorization: Bearer <token>
Response: {
  success: boolean
  data: {
    meeting: Meeting
  }
}

Dummy Data:
The dummy data is imported from "@/data/meetings" and includes:
- meetings: Array of Meeting objects
- clients: Array of client objects
- freelancers: Array of freelancer objects

Note: All endpoints require authentication as a moderator or admin.
*/

