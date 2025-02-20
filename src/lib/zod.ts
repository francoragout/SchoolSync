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
  phone: z.string().nullish(),
  createdAt: z.date().optional(),
});

const Division = z.enum(["A", "B", "C", "D"], {
  message: "Seleccionar una división",
});
const Grade = z.enum(["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH"], {
  message: "Seleccionar un grado",
});
const Shift = z.enum(["MORNING", "AFTERNOON"], {
  message: "Seleccionar un turno",
});

const Status = z.enum(["ABSENT", "TARDY", "JUSTIFIED"], {
  message: "Seleccionar un estado",
});

export const ClassroomSchema = z.object({
  id: z.string().optional(),
  grade: Grade,
  division: Division,
  shift: Shift,
  userId: z.string().nullish(),
  user: UserSchema.nullish(),
  _count: z
    .object({
      students: z.number().optional(),
    })
    .optional(),
});

export const StudentSchema = z.object({
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
  image: z.string().nullish(),
  classroomId: z.string().optional(),
  classroom: ClassroomSchema.nullish(),
});

export const AttendanceSchema = z.object({
  id: z.string().optional(),
  studentId: z.string(),
  student: StudentSchema.optional(),
  status: Status,
  createdAt: z.date(),
});

export const AttendancesSchema = z.object({
  ids: z.array(z.string()),
  status: Status,
});


