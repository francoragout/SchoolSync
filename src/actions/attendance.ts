"use server";

import { AttendanceSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

export async function CreateAttendance(
  values: z.infer<typeof AttendanceSchema>,
  studentId: string
) {
  try {
    const response = await fetch(`${URL}/api/attendance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, studentId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create attendance: ${errorText}`);
    }

    return {
      success: true,
      message: "Asistencia creada exitosamente",
    };
  } catch (error) {
    console.log("Failed to create attendance:", error);
    return {
      success: false,
      message: "Error al crear asistencia",
    };
  }
}
