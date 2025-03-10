'use server';

const URL = process.env.API_URL;

export async function UpdateNotifications(userId: string, ids: string[]) {
  try {
    const response = await fetch(`${URL}/api/notifications/user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ids,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update notification: ${errorText}`);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.log("Failed to update notification:", error);
    return {
      success: false,
    };
  }
}
