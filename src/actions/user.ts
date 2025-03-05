"use server";

import { UserSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
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

    const data = await response.json();

    if (response.status === 409) {
      return { success: false, status: "exists", message: data.message };
    }

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

export async function CreateUserOnStudent(values: z.infer<typeof UserSchema>, studentId: string) {
  try {
    const response = await fetch(`${URL}/api/users/student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, studentId }),
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

export async function UpdateUser(
  values: z.infer<typeof UserSchema>,
  id: string
) {
  try {
    const response = await fetch(`${URL}/api/users/${id}`, {
      method: "PATCH",
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
      throw new Error(`Failed to update user: ${errorText}`);
    }

    return {
      success: true,
      message: "Usuario actualizado exitosamente",
    };
  } catch (error) {
    console.log("Failed to update user:", error);
    return {
      success: false,
      message: "Error al actualizar usuario",
    };
  }
}

export async function DeleteUsers(ids: string[], pathname: string) {
  try {
    const response = await fetch(`${URL}/api/users`, {
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
      message: "Usuarios eliminados exitosamente",
    };
  } catch (error) {
    console.log("Failed to delete users:", error);
    return {
      success: false,
      message: "Error al eliminar usuarios",
    };
  }
}

export async function DeleteUserOnStudent(ids: string[], studentId: string, pathname: string) {
  try {
    const response = await fetch(`${URL}/api/users/student`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids, studentId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete users: ${errorText}`);
    }

    revalidatePath(pathname);

    return {
      success: true,
      message: "Usuarios eliminados exitosamente",
    };
  } catch (error) {
    console.log("Failed to delete users:", error);
    return {
      success: false,
      message: "Error al eliminar usuarios",
    };
  }
}
