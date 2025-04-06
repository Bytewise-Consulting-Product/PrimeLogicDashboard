"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { getAllClientProfiles } from "@/lib/api/users";
import { getUserDetails } from "@/lib/api/storage";

interface UserDetails {
  uid: string;
  username: string;
  fullName: string;
  email: string;
  role: "ADMIN" | "MODERATOR" | "CLIENT";
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  totalPages: number;
  totalUsers: number;
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export default function ClientProfilePage() {
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchUsers(currentPage);
    console.log("Pagination State:", pagination);
  }, [currentPage]);

  async function fetchUsers(page: number) {
    try {
      const response = await getAllClientProfiles(page);

      if (response && response.success) {
        const clientUsers = response.data.users.filter(
          (user: UserDetails) => user.role === "CLIENT"
        );

        setUsers(clientUsers);
        setFilteredUsers(clientUsers);

        // ✅ Correctly extract pagination
        setPagination(response.data.pagination);

        console.log("Updated Pagination:", response.data.pagination); // 🛠 Debug
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.fullName.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }
  }

  return (
    <div className="p-6">
      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search clients..."
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 w-full md:w-1/3"
      />

      {/* Table */}
      <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="text-center">Username</TableHead>
      <TableHead className="text-center">Full Name</TableHead>
      <TableHead className="text-center">Email</TableHead>
      <TableHead className="text-center">Email Verified</TableHead>
      <TableHead className="text-center">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {filteredUsers.length > 0 ? (
      filteredUsers.map((user) => (
        <TableRow key={user.uid}>
          <TableCell className="text-center">{user.username}</TableCell>
          <TableCell className="text-center">{user.fullName}</TableCell>
          <TableCell className="text-center">{user.email}</TableCell>
          <TableCell className="text-center">
            <span
              className={`px-3 py-1 rounded-lg border text-sm font-medium ${
                user.emailVerifiedAt
                  ? "border-green-500 text-green-500"
                  : "border-red-500 text-red-500"
              }`}
            >
              {user.emailVerifiedAt ? "Verified" : "Not Verified"}
            </span>
          </TableCell>
          <TableCell className="text-center">
            <Button variant="destructive" className="flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Trash
            </Button>
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={5} className="text-center text-gray-500">
          No clients found.
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>


      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            disabled={pagination.currentPage <= 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            variant="outline"
          >
            Previous
          </Button>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <Button
            disabled={pagination.currentPage >= pagination.totalPages}
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(pagination.totalPages, prev + 1)
              )
            }
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
