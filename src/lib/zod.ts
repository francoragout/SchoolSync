import { z } from "zod";

const Division = z.enum(["A", "B", "C", "D"], {
  message: "Seleccione una división",
});
const Grade = z.enum(["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH"], {
  message: "Seleccione un grado",
});
const Shift = z.enum(["MORNING", "AFTERNOON"], {
  message: "Seleccione un turno",
});

const Status = z.enum(["ABSENT", "TARDY", "JUSTIFIED"], {
  message: "Seleccione un estado",
});

const Role = z.enum(["ADMIN", "PRECEPTOR", "TUTOR"]);

const Subject = z.enum(
  [
    "MATH",
    "LITERATURE",
    "HISTORY",
    "GEOGRAPHY",
    "BIOLOGY",
    "PHYSICS",
    "CHEMISTRY",
    "ENGLISH",
    "PHYSICAL_EDUCATION",
    "RELIGION",
  ],
  {
    message: "Seleccione una materia",
  }
);

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
  role: Role,
  image: z.string().nullish(),
  phone: z.string().nullish(),
  createdAt: z.date().optional(),
  classrooms: z
    .array(
      z.object({
        id: z.string(),
        grade: Grade,
        division: Division,
        shift: Shift,
      })
    )
    .optional(),
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
      exams: z.number().optional(),
    })
    .optional(),
});

export const AttendanceSchema = z.object({
  id: z.string().optional(),
  studentId: z.string().optional(),
  status: Status,
  date: z.date({ required_error: "Seleccione una fecha" }),
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
  classroom: ClassroomSchema.optional(),
  attendance: z.array(AttendanceSchema).optional(),
  user: UserSchema.optional(),
});

export const ExamSchema = z.object({
  id: z.string().optional(),
  subject: Subject,
  date: z.date({ required_error: "Seleccione una fecha" }),
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Seleccione una hora"),
  note: z.string().nullish(),
  classroomId: z.string().optional(),
});

export const NotificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  link: z.string(),
  read: z.boolean(),
  createdAt: z.date(),
  userId: z.string()
});
