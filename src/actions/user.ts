'use server';

import { UserSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

export async function CreateUser(values: z.infer<typeof UserSchema>) {
  try {
    const response = await fetch(`${URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create user: ${errorText}`);
    }

    return {
      success: true,
      message: "Usuario creado exitosamente",
    };
  } catch (error) {
    console.log("Failed to create user:", error);
    return {
      success: false,
      message: "Error al crear usuario",
    };
  }
}
