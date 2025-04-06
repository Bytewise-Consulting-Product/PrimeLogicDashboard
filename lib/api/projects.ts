import { apiInstance } from "./axiosInstance";
import { getUserDetails } from "./storage";
import axios from "axios";

export async function getAllProjects(page: number = 1) {
  try {
    const response = await apiInstance.get(
      `/project/getAllProjects?page=${page}`
    );

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

export async function getAllProjectsWithThierClient(page: number = 1) {
  try {
    const userDetails = getUserDetails();
    const accessToken = userDetails?.accessToken;
    const clientId = userDetails?.uid; // Ensure this is the correct client ID

    if (!accessToken) {
      throw new Error("User not authenticated");
    }
    if (!clientId) {
      throw new Error("Client ID is required");
    }

    const response = await apiInstance.get(
      `/project/getAllProjectsWithThierClient/${clientId}?page=${page}`,
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
        error.response?.data?.message || "Failed to fetch projects"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

// Get single particular project according to the slug
export async function getSingleProject(projectSlug: string) {
  try {
    const response = await apiInstance.get(
      `/project/getSingleProject/${projectSlug}`
    );
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

// Select Freelancer for project
export async function selectFreelancerForProject(
  projectSlug: string,
  userName: string
) {
  try {
    const response = await apiInstance.patch(
      `/project/selectFreelancerForProject/${projectSlug}`,
      {
        selectedFreelancersForThisProject: [userName], // Sending body as required
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to select freelancer"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

//Remove Freelancer from Requested List
export async function removeInterestedFreelancerFromProject(
  projectSlug: string,
  fullName: string
) {
  try {
    const response = await apiInstance.patch(
      `/project/removeSelectedFreelancer/${projectSlug}`,
      {
        selectedFreelancersForThisProject: fullName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to select freelancer"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

// Update Project By Slug
export async function updateProjectBySlug(slug: string, data: any) {
  const {
    title,
    detail,
    deadline,
    projectType,
    projectStatus,
    bounty,
    difficultyLevel,
    niche,
    progressPercentage,
  } = data;
  try {
    const response = await apiInstance.patch(`/project/updateProjectBySlug/${slug}`, {
      title: title,
      detail: detail,
      deadline: deadline,
      projectType: projectType,
      projectStatus: projectStatus,
      bounty: bounty,
      difficultyLevel: difficultyLevel,
      niche: niche,
      progressPercentage: progressPercentage,
    });
    if(response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to update the Project"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}
