"use server";

import { StudentSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const URL = process.env.API_URL;

export async function CreateStudent(
  values: z.infer<typeof StudentSchema>,
  classroomId: string
) {
  try {
    const response = await fetch(`${URL}/api/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, classroomId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create student: ${errorText}`);
    }

    return {
      success: true,
      message: "Alumno creado exitosamente",
    };
  } catch (error) {
    console.log("Failed to create student:", error);
    return {
      success: false,
      message: "Error al crear alumno",
    };
  }
}

export async function UpdateStudent(
  values: z.infer<typeof StudentSchema>,
  studentId: string
) {
  try {
    const response = await fetch(`${URL}/api/students/${studentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update student: ${errorText}`);
    }

    return {
      success: true,
      message: "Alumno actualizado exitosamente",
    };
  } catch (error) {
    console.log("Failed to update student:", error);
    return {
      success: false,
      message: "Error al actualizar alumno",
    };
  }
}

export async function DeleteStudents(ids: string[], pathname: string) {
  try {
    const response = await fetch(`${URL}/api/students`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete users: ${errorText}`);
    }

    revalidatePath(pathname);

    return {
      success: true,
      message: "Alumnos eliminados exitosamente",
    };
  } catch (error) {
    console.log("Failed to delete users:", error);
    return {
      success: false,
      message: "Error al eliminar alumnos",
    };
  }
}
