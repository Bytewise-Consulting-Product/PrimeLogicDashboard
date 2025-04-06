import { CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { format } from "date-fns";
import { TPROJECT } from "@/types/project";

interface FeedbackProps {
  project: TPROJECT | null;
}

export function Feedback({ project }: FeedbackProps) {
  return (
    <section className="mt-4">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Project Timeline & Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="timeline">
            <TabsList className="mb-4">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="feedback">Client Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Project Created</p>
                  <p className="text-xs text-muted-foreground">
                    {format(
                      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                      "PPP"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Freelancers Selected</p>
                  <p className="text-xs text-muted-foreground">
                    {format(
                      new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                      "PPP"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Project Started</p>
                  <p className="text-xs text-muted-foreground">
                    {format(
                      new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                      "PPP"
                    )}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="feedback">
              {project && project.commentByClientAfterProjectCompletion ? (
                <div>
                  <p className="text-sm font-medium mb-2">Client Comment:</p>
                  <p className="text-sm">
                    {project.commentByClientAfterProjectCompletion}
                  </p>

                  {project.starsByClientAfterProjectCompletion && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Rating:</p>
                      <p className="text-sm">
                        {project.starsByClientAfterProjectCompletion}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No feedback available yet. Feedback will be provided after
                  project completion.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
