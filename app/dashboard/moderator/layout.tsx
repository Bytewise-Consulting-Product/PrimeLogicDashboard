"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FileText,
  BarChart3,
  MessageCircle,
  Settings,
  ChevronDown,
  Mail,
  BookOpen,
  Calendar,
  LogOut,
  MessageSquare,
  Gavel,
  Users,
  UserCircle,
  LifeBuoy,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserDetails, removeUserDetails } from "@/lib/api/storage";
import { getCurrentUserDetails } from "@/lib/api/auth";


const navItems = [
  {
    title: "Project Status",
    href: "/dashboard/moderator/project-status",
    icon: BarChart3,
  },
  // {
  //   title: "Documentation",
  //   href: "/dashboard/moderator/documentation",
  //   icon: FileText,
  // },
  {
    title: "View Consultations",
    href: "/dashboard/moderator/consultations",
    icon: MessageSquare,
  },
  {
    title: "Post Bidings",
    href: "/dashboard/moderator/post-bidings",
    icon: Gavel,
  },
  {
    title: "Client Profiles",
    href: "/dashboard/moderator/client-profiles",
    icon: Users,
  },
  {
    title: "Freelancer Profiles",
    href: "/dashboard/moderator/freelancer-profiles",
    icon: UserCircle,
  },
  // {
  //   title: "Meetings",
  //   href: "/dashboard/moderator/meetings",
  //   icon: Calendar,
  // },
  {
    title: "Newsletter",
    href: "/dashboard/moderator/newsletter",
    icon: Mail,
  },
  {
    title: "Blogs",
    href: "/dashboard/moderator/blogs",
    icon: BookOpen,
  }, 
  // {
    //   title: "Support",
    //   href: "/dashboard/moderator/support",
    //   icon: LifeBuoy,
    // },
    {
      title: "Contact Us",
      href: "/dashboard/moderator/contactUs",
      icon: MessageCircle,
    },
    {
      title: "Settings",
      href: "/dashboard/moderator/settings",
      icon: Settings,
    },
  ]
export default function ClientDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getCurrentUserDetail();
  }, []);

  async function getCurrentUserDetail() {
    try {
      const userDetails = await getCurrentUserDetails();
      setFullName(userDetails.data.fullName);
      setEmail(userDetails.data.email);
      console.log(userDetails);
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = () => {
    // Add your logout logic here
    const userDetails = getUserDetails();
    console.log("Logging out user:", userDetails);
    removeUserDetails();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen">
      <motion.aside
        initial={{ width: 250 }}
        animate={{ width: isCollapsed ? 80 : 280 }}
        className="fixed left-0 top-0 z-20 flex h-screen flex-col"
        style={{
          background:
            "linear-gradient(180deg, rgba(167, 139, 250, 0.1) 0%, rgba(255, 179, 145, 0.1) 100%)",
        }}
      >
        <div className="flex h-14 items-center border-b px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-lg"
                style={{ color: "#003087" }}
              >
                Moderator Dashboard
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
                    "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon
                    className={cn(
                      "h-4 w-4",
                      pathname === item.href && "text-primary"
                    )}
                  />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {item.title}
                    </motion.span>
                  )}
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="flex items-center gap-3 rounded-lg bg-white/80 p-3 shadow-sm">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" alt="Client" />
              <AvatarFallback>
                {fullName
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}{" "}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-1 flex-col"
              >
                <span className="text-sm font-medium">{fullName}</span>
                <span className="text-xs text-muted-foreground">{email}</span>
              </motion.div>
            )}
          </div>
          <Button
            variant="ghost"
            className="mt-2 w-full justify-start text-red-500 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </motion.aside>
      <main
        className={cn(
          "flex-1 transition-all",
          isCollapsed ? "pl-[80px]" : "pl-[280px]"
        )}
      >
        <div className="sticky top-0 z-10 h-14 border-b bg-blue-950 backdrop-blur">
          <div className="flex h-full items-center gap-4 px-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  isCollapsed && "rotate-180"
                )}
              />
            </Button>
            <div style={{color: "#FF6B35", fontSize: "1.2rem", fontWeight: "bolder"}}>{(pathname.split("/").pop() || "").toUpperCase()}</div>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

