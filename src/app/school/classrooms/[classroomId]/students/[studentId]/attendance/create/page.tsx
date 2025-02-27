import AttendanceCreateForm from "@/components/attendance/attendance-create-form";
import { ClassroomSchema, StudentSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

type Classroom = z.infer<typeof ClassroomSchema>;

async function GetClassroom(classroomId: string): Promise<Classroom> {
  const data = await fetch(`${URL}/api/classrooms/${classroomId}`, {
    cache: "no-store",
  });

  const classroom = await data.json();

  return ClassroomSchema.parse(classroom);
}

type Student = z.infer<typeof StudentSchema>;

async function GetStudent(studentId: string): Promise<Student> {
  const data = await fetch(`${URL}/api/students/${studentId}`, {
    cache: "no-store",
  });

  const student = await data.json();

  return StudentSchema.parse(student);
}

export default async function AttendanceCreatePage({
  params,
}: {
  params: Promise<{ classroomId: string; studentId: string }>;
}) {
  const studentId = (await params).studentId;
  const classroomId = (await params).classroomId;
  const classroom = await GetClassroom(classroomId);
  const student = await GetStudent(studentId);
  return (
    <AttendanceCreateForm classroom={classroom} student={student} />
  );
}
