"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  BarChart3,
  FileText,
  MessageSquare,
  Gavel,
  Users,
  UserCircle,
  Settings,
  Mail,
  BookOpen,
  LifeBuoy,
  MessageCircle,
  ChevronDown,
  Trash2,
  LogOut,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  {
    title: "Project Status",
    href: "/dashboard/admin/project-status",
    icon: BarChart3,
  },
  {
    title: "Documentation",
    href: "/dashboard/admin/documentation",
    icon: FileText,
  },
  {
    title: "View Consultations",
    href: "/dashboard/admin/consultations",
    icon: MessageSquare,
  },
  {
    title: "Post Bidings",
    href: "/dashboard/admin/post-bidings",
    icon: Gavel,
  },
  {
    title: "Client Profiles",
    href: "/dashboard/admin/client-profiles",
    icon: Users,
  },
  {
    title: "Freelancer Profiles",
    href: "/dashboard/admin/freelancer-profiles",
    icon: UserCircle,
  },
  {
    title: "Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
  },
  {
    title: "Newsletter",
    href: "/dashboard/admin/newsletter",
    icon: Mail,
  },
  {
    title: "Blogs",
    href: "/dashboard/admin/blogs",
    icon: BookOpen,
  },
  {
    title: "Support",
    href: "/dashboard/admin/support",
    icon: LifeBuoy,
  },
  {
    title: "Contact Us",
    href: "/dashboard/admin/contact-us",
    icon: MessageCircle,
  },
  {
    title: "Trash",
    href: "/dashboard/admin/trash",
    icon: Trash2,
  },
]

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen">
      <motion.aside
        initial={{ width: 280 }}
        animate={{ width: isCollapsed ? 80 : 280 }}
        className="fixed left-0 top-0 z-20 flex h-screen flex-col"
        style={{
          background: "linear-gradient(180deg, rgba(167, 139, 250, 0.1) 0%, rgba(255, 179, 145, 0.1) 100%)",
        }}
      >
        <div className="flex h-14 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            {!isCollapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-lg">
                Admin Dashboard
              </motion.span>
            )}
          </Link>
        </div>
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-2 py-4">
            {navItems.map((item) => (
              <Button
                key={item.title}
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname === item.href &&
                    "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon className={cn("h-4 w-4", pathname === item.href && "text-primary")} />
                  {!isCollapsed && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {item.title}
                    </motion.span>
                  )}
                </Link>
              </Button>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                // Add logout logic here
                console.log("Logout clicked")
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {!isCollapsed && <span>Logout</span>}
            </Button>
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="flex items-center gap-3 rounded-lg bg-white/80 p-3 shadow-sm">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-1 flex-col"
              >
                <span className="text-sm font-medium">Admin Name</span>
                <span className="text-xs text-muted-foreground">admin@example.com</span>
              </motion.div>
            )}
            {!isCollapsed && (
              <Button variant="ghost" size="icon" className="ml-auto">
                <ChevronDown className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </motion.aside>
      <main className="flex-1 pl-[280px]">
        <div className="sticky top-0 z-10 h-14 border-b bg-background/95 backdrop-blur">
          <div className="flex h-full items-center gap-4 px-6">
            <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
              <ChevronDown className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
            </Button>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}

