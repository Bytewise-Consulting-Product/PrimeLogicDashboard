"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UsersTable from "@/components/trash-management/UsersTable"; // Import UsersTable component
import ContactUsTable from "@/components/trash-management/ContactUsTable";
import QuotesTable from "@/components/trash-management/QuotesTable";

const demoData = {
  consultations: ["Consultation 1", "Consultation 2", "Consultation 3"],
  hireUs: ["Hire Us 1", "Hire Us 2", "Hire Us 3"],
};

export default function Page() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="container mx-auto p-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        {/* Tabs Navigation */}
        <TabsList className="flex space-x-4 bg-gray-100 p-2 rounded-md">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="messages">Contact Messages</TabsTrigger>
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
          <TabsTrigger value="hireUs">Hire Us</TabsTrigger>
        </TabsList>

        {/* Users Tab - Render UsersTable Component */}
        <TabsContent value="users">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <UsersTable /> 
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Contact Us Messages</CardTitle>
            </CardHeader>
            <CardContent>
               <ContactUsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quotes">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Quotes</CardTitle>
            </CardHeader>
            <CardContent>
                <QuotesTable />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other Tabs - Render Demo Data */}
        {Object.keys(demoData).map((key) => (
          <TabsContent key={key} value={key}>
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>{key.charAt(0).toUpperCase() + key.slice(1)}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  {demoData[key as keyof typeof demoData].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
