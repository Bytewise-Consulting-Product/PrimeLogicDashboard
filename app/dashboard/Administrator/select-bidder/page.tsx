"use client"

import { motion } from "framer-motion"
import { Star, Award, DollarSign, Clock } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { bidders } from "@/data/bidders"

export default function SelectBidderPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="mb-8 text-3xl font-bold">Select Bidder</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bidders.map((bidder, index) => (
          <motion.div
            key={bidder.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden transition-shadow hover:shadow-lg">
              <CardHeader className="bg-primary/10 pb-2">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={bidder.avatar} alt={bidder.name} />
                    <AvatarFallback>{bidder.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{bidder.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Star className="mr-2 h-4 w-4 text-yellow-400" />
                    Rating: {bidder.rating}
                  </div>
                  <div className="flex items-center text-sm">
                    <Award className="mr-2 h-4 w-4 text-blue-500" />
                    Completed Projects: {bidder.completedProjects}
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="mr-2 h-4 w-4 text-green-500" />
                    Bid Amount: {bidder.bidAmount}
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-red-500" />
                    Delivery Time: {bidder.deliveryTime}
                  </div>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">{bidder.proposal}</p>
                <Button className="w-full">Select Bidder</Button>
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
GET /api/bidders
Response:
{
  success: boolean;
  data: {
    bidders: Array<{
      id: string;
      name: string;
      avatar: string;
      rating: number;
      completedProjects: number;
      bidAmount: string;
      deliveryTime: string;
      proposal: string;
    }>;
  }
}

POST /api/bidders/select
Request Body:
{
  bidderId: string;
  projectId: string;
}

Response:
{
  success: boolean;
  data: {
    selectedBidder: {
      id: string;
      name: string;
      projectId: string;
      selectedAt: string;
    }
  }
}
*/

