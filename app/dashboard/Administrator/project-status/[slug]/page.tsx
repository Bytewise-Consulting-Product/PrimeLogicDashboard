"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { getSingleProject } from "@/lib/api/projects";
import { toast } from "sonner";
import {
  TKPIRANK,
  TPROJECT,
} from "@/types/project";
import ProjectInformation from "@/components/project-components/projectInformation";
import { Feedback } from "@/components/project-components/feedback";
import InterestedFreeLancersForProject from "@/components/project-components/InterestedFreelancers";

// Get KPI rank color
const getKpiRankColor = (rank: TKPIRANK) => {
  switch (rank) {
    case "BRONZE":
      return "bg-amber-700";
    case "SILVER":
      return "bg-gray-400";
    case "GOLD":
      return "bg-yellow-400";
    case "PLATINIUM":
      return "bg-blue-300";
    case "DIAMOND":
      return "bg-cyan-400";
    case "CROWN":
      return "bg-purple-500";
    case "ACE":
      return "bg-red-500";
    case "CONQUERER":
      return "bg-gradient-to-r from-red-500 to-purple-500";
    default:
      return "bg-gray-500";
  }
};

const freelancers = [
  {
    id: "freelancer1",
    name: "John Doe",
    expertise: "Frontend Development",
    experience: "5 years",
    kpiRank: "GOLD" as TKPIRANK,
  },
  {
    id: "freelancer2",
    name: "Jane Smith",
    expertise: "Backend Development",
    experience: "7 years",
    kpiRank: "PLATINIUM" as TKPIRANK,
  },
  {
    id: "freelancer3",
    name: "Mike Johnson",
    expertise: "Full Stack",
    experience: "4 years",
    kpiRank: "SILVER" as TKPIRANK,
  },
  {
    id: "freelancer4",
    name: "Sarah Williams",
    expertise: "UI/UX Design",
    experience: "6 years",
    kpiRank: "DIAMOND" as TKPIRANK,
  },
  {
    id: "freelancer5",
    name: "Robert Brown",
    expertise: "DevOps",
    experience: "3 years",
    kpiRank: "BRONZE" as TKPIRANK,
  },
];

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<TPROJECT | null>(null);

  useEffect(() => {
    if (typeof slug === "string") {
      getSingleProjectByProjectSlug(slug);
      console.log(`Fetching details for project: ${slug}`);
    } else {
      console.error("Invalid slug:", slug);
    }
  }, []);

  const getSingleProjectByProjectSlug = async (slug: string) => {
    const response = await getSingleProject(slug);
    if (response.status === 200) {
      toast.success("Project data fetched successfully");
      setProject(response.data);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Project Details</h1>

      <div>
        {/* Project Details Section */}
        {typeof slug === "string" && <ProjectInformation project={project} slug={slug} />}

        {/* Interested Freelancers Section */}
        {/* <Card className="lg:col-span-1 lg:row-span-2">
          <CardHeader>
            <CardTitle>Interested Freelancers</CardTitle>
            <CardDescription>
              {project.interestedFreelancerWhoWantToWorkOnThisProject.length} freelancers interested
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Expertise</TableHead>
                    <TableHead>Rank</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.interestedFreelancerWhoWantToWorkOnThisProject.length > 0 ? (
                    project.interestedFreelancerWhoWantToWorkOnThisProject.map((id) => {
                      const freelancer = freelancers.find((f) => f.id === id)
                      if (!freelancer) return null

                      return (
                        <TableRow key={id}>
                          <TableCell className="font-medium">
                            {freelancer.name}
                            {project.selectedFreelancersForThisProject.includes(id) && (
                              <Badge variant="outline" className="ml-2 bg-green-100 text-green-800">
                                Selected
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{freelancer.expertise}</TableCell>
                          <TableCell>
                            <Badge className={getKpiRankColor(freelancer.kpiRank)}>{freelancer.kpiRank}</Badge>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        No interested freelancers yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card> */}
        {typeof slug === "string" && <InterestedFreeLancersForProject project={project} slug={slug} />}

        {/* Project Timeline/Comments Section */}
        <Feedback project={project} />
      </div>
    </div>
  );
}
