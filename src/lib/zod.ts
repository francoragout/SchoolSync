import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  role: z.enum(["ADMIN", "PRECEPTOR", "PROFESSOR", "TUTOR"]),
  image: z.string().nullish(),
  createdAt: z.date().optional(),
});
