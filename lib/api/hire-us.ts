import axios from "axios";
import { apiInstance } from "./axiosInstance";

// Fetch all the Hire Us Requests
export async function getAllHireUsRequests() {
  try {
    const response = await apiInstance.get("/hireUs/getAllHireUsRequests");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch Hire Us Requests"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}


// Trash a Hire Us Request
export async function trashHireUsRequest(id: number) {
    try {
        const response = await apiInstance.patch(`/hireUs/trashHireUsRequest/${id}`);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data || error.message);
          throw new Error(
            error.response?.data?.message || "Failed to Trash Hire Us Requests"
          );
        } else {
          console.error("Unexpected error:", error);
          throw new Error("An unexpected error occurred");
        }
      }
}