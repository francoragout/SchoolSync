"use server";

import { ExamSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const URL = process.env.API_URL;

export async function CreateExam(
  values: z.infer<typeof ExamSchema>,
  classroomId: string
) {
  try {
    const date = new Date(values.date);
    const localDate = new Date();
    date.setHours(
      localDate.getHours(),
      localDate.getMinutes(),
      localDate.getSeconds()
    );

    const response = await fetch(`${URL}/api/exams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, classroomId, date }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create exam: ${errorText}`);
    }

    return {
      success: true,
      message: "Examen creado exitosamente",
    };
  } catch (error) {
    console.log("Failed to create exam:", error);
    return {
      success: false,
      message: "Error al crear examen",
    };
  }
}

export async function UpdateExam(
  values: z.infer<typeof ExamSchema>,
  examId: string
) {
  try {
    const date = new Date(values.date);
    const localDate = new Date();
    date.setHours(
      localDate.getHours(),
      localDate.getMinutes(),
      localDate.getSeconds()
    );

    const response = await fetch(`${URL}/api/exams/${examId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, date, examId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update exam: ${errorText}`);
    }

    return {
      success: true,
      message: "Examen actualizado exitosamente",
    };
  } catch (error) {
    console.log("Failed to update exam:", error);
    return {
      success: false,
      message: "Error al actualizar examen",
    };
  }
}

export async function DeleteExams(ids: string[], pathname: string) {
  try {
    const response = await fetch(`${URL}/api/exams`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete exams: ${errorText}`);
    }

    revalidatePath(pathname);

    return {
      success: true,
      message: "Examenes eliminados exitosamente",
    };
  } catch (error) {
    console.log("Failed to delete exams:", error);
    return {
      success: false,
      message: "Error al eliminar examenes",
    };
  }
}
