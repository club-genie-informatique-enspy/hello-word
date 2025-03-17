import { Activity } from "@/type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { fetchAPI } from "./api";



export async function getAllActivities(): Promise<Activity[]> {
  return fetchAPI("/activities");
}

export async function getActivity(uuid: string): Promise<Activity> {
  return fetchAPI(`/activity/${uuid}`);
}

export async function createActivity(activityData: Omit<Activity, 'activity_uuid'>): Promise<Activity> {
  return fetchAPI("/activity", {
    method: "POST",
    body: JSON.stringify(activityData),
  });
}

export async function updateActivity(uuid: string, activityData: Partial<Activity>): Promise<Activity> {
  return fetchAPI(`/activity/${uuid}`, {
    method: "PUT",
    body: JSON.stringify(activityData),
  });
}

export async function deleteActivity(uuid: string): Promise<void> {
  return fetchAPI(`/activity/${uuid}`, {
    method: "DELETE",
  });
}

export async function toggleLikeActivity(uuid: string): Promise<{ message: string }> {
    return fetchAPI(`/activity/${uuid}/toogle-like`, {
      method: "POST",
    });
  }
  
  export async function incrementActivityViews(uuid: string): Promise<{ message: string }> {
    return fetchAPI(`/activity/${uuid}/increment-views`, {
      method: "POST",
    });
  }

  export async function getActivityLikesCount(uuid: string): Promise<{ message: string }> {
    return fetchAPI(`/activity/${uuid}/likes`);
      
  }

  export async function getActivityViewsCount(uuid: string): Promise<{ message: string }> {
    return fetchAPI(`/activity/${uuid}/views`);
      
  }
  
