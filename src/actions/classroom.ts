"use server";

import { ClassroomSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const URL = process.env.API_URL;

export async function CreateClassroom(values: z.infer<typeof ClassroomSchema>) {
  try {
    const response = await fetch(`${URL}/api/classrooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.status === 409) {
      return { success: false, status: "exists", message: data.message };
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create classroom: ${errorText}`);
    }

    return {
      success: true,
      message: "Aula creada exitosamente",
    };
  } catch (error) {
    console.log("Failed to create classroom:", error);
    return {
      success: false,
      message: "Error al crear aula",
    };
  }
}

export async function UpdateClassroom(
  values: z.infer<typeof ClassroomSchema>,
  id: string
) {
  try {
    const response = await fetch(`${URL}/api/classrooms/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.status === 409) {
      const data = await response.json();
      return { success: false, status: "exists", message: data.message };
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update classroom: ${errorText}`);
    }

    return {
      success: true,
      message: "Aula actualizada exitosamente",
    };
  } catch (error) {
    console.log("Failed to update classroom:", error);
    return {
      success: false,
      message: "Error al actualizar aula",
    };
  }
}

export async function DeleteClassroom(id: string) {
  try {
    const response = await fetch(`${URL}/api/classrooms/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete classroom: ${errorText}`);
    }

    revalidatePath("/classrooms");

    return {
      success: true,
      message: "Aula eliminada exitosamente",
    };
  } catch (error) {
    console.log("Failed to delete classroom:", error);
    return {
      success: false,
      message: "Error al eliminar aula",
    };
  }
}

export async function DeleteClassrooms(ids: string[]) {
  try {
    const response = await fetch(`${URL}/api/classrooms`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete classrooms: ${errorText}`);
    }

    revalidatePath("/classrooms");

    return {
      success: true,
      message: "Aulas eliminadas exitosamente",
    };
  } catch (error) {
    console.log("Failed to delete classrooms:", error);
    return {
      success: false,
      message: "Error al eliminar aulas",
    };
  }
}
