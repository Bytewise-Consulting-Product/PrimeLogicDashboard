import axios from "axios";
import { authInstance, trashInstance } from "./axiosInstance";
import { getUserDetails } from "./storage";

// Get all client profiles
export async function getAllClientProfiles(page: number = 1) {
  try {
    const userDetails = getUserDetails();
    const accessToken = userDetails?.accessToken;
    if (!accessToken) {
      throw new Error("User not authenticated");
    }
    const response = await authInstance.get(`/getAllClients?page=${page}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch projects"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

// Get trashed Users
export async function getTrashedUsers() {
  try {
    const userDetails = getUserDetails();
    const accessToken = userDetails?.accessToken;
    if (!accessToken) {
      throw new Error("User not authenticated");
    }
    const response = await trashInstance.get("/getTrashedUsers", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch trashed Users"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

// Trash the user
export async function trashUser(uid: string) {
  try {
    const userDetails = getUserDetails();
    const accessToken = userDetails?.accessToken;
    if (!accessToken) {
      throw new Error("User not authenticated");
    }
    const response = await authInstance.patch(
      "/trashTheUser",
      { victimUid: uid }, // Passing the required body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to trash the user"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

//Untrash the User
export async function unTrashUser(uid: string) {
  try {
    const userDetails = getUserDetails();
    const accessToken = userDetails?.accessToken;
    if (!accessToken) {
      throw new Error("User not authenticated");
    }
    const response = await authInstance.patch(
      "/unTrashTheUser",
      { victimUid: uid }, // Passing the required body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to untrash the user"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

//Deleting the User
export async function deleteUser(uid: string) {
  try {
    const userDetails = getUserDetails();
    const accessToken = userDetails?.accessToken;

    if (!accessToken) {
      throw new Error("User not authenticated");
    }

    const response = await authInstance.delete(`/deleteUser/${uid}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to delete the user"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

