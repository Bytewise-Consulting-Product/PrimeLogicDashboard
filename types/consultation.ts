export interface Consultation {
  id: string
  name: string
  email: string
  phone: string
  message: string
  bookingDate: string
  address: string
  status: "PENDING" | "ACCEPTED" | "REJECTED"
}

