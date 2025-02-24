"use server";

import { AttendanceSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const URL = process.env.API_URL;

export async function CreateAttendance(
  values: z.infer<typeof AttendanceSchema>,
  studentId: string
) {
  try {
    const date = new Date(values.date);
    const localDate = new Date();
    date.setHours(
      localDate.getHours(),
      localDate.getMinutes(),
      localDate.getSeconds()
    );

    const response = await fetch(`${URL}/api/attendance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, studentId, date }),
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

export async function CreateAttendances(studentsIds: string[], status: string) {
  try {
    const date = new Date().toISOString();

    const requestBody = {
      ids: studentsIds,
      status,
      date,
    };

    const response = await fetch(`${URL}/api/attendance/multiple`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create absent: ${errorText}`);
    }

    revalidatePath("/classrooms");

    return {
      success: true,
      message: "Asistencia creada exitosamente",
    };
  } catch (error) {
    console.log("Failed to create absent:", error);
    return {
      success: false,
      message: "Error al crear asistencia",
    };
  }
}

export async function UpdateAttendance(
  values: z.infer<typeof AttendanceSchema>,
  studentId: string,
  attendanceId: string
) {
  try {
    const date = new Date(values.date);
    const localDate = new Date();
    date.setHours(
      localDate.getHours(),
      localDate.getMinutes(),
      localDate.getSeconds()
    );

    const response = await fetch(`${URL}/api/attendance/${attendanceId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, studentId, date }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update attendance: ${errorText}`);
    }

    return {
      success: true,
      message: "Asistencia actualizada exitosamente",
    };
  } catch (error) {
    console.log("Failed to update attendance:", error);
    return {
      success: false,
      message: "Error al actualizar asistencia",
    };
  }
}

export async function DeleteAttendances(ids: string[]) {
  try {
    const response = await fetch(`${URL}/api/attendance`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }), 
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete attendance: ${errorText}`);
    }

    revalidatePath("/");

    return {
      success: true,
      message: "Asistencia eliminada exitosamente",
    };
  } catch (error) {
    console.log("Failed to delete users:", error);
    return {
      success: false,
      message: "Error al eliminar asistencia",
    };
  }
}
