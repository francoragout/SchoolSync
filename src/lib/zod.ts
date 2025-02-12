import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().optional(),
  firstName: z
    .string()
    .min(1, {
      message: "El nombre es requerido",
    })
    .max(30, {
      message: "El nombre debe tener menos de 30 caracteres",
    }),
  lastName: z
    .string()
    .min(1, {
      message: "El apellido es requerido",
    })
    .max(30, {
      message: "El apellido debe tener menos de 30 caracteres",
    }),
  email: z.string().email({
    message: "El email no es válido",
  }),
  role: z.enum(["ADMIN", "PRECEPTOR", "PROFESSOR", "TUTOR"]),
  image: z.string().nullish(),
  phone: z.string().optional(),
  createdAt: z.date().optional(),
});
