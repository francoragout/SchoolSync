import StudentUpdateForm from "@/components/students/student-update-form";
import { ClassroomSchema, StudentSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

type Student = z.infer<typeof StudentSchema>;

async function GetStudent(studentId: string): Promise<Student> {
  const data = await fetch(`${URL}/api/students/${studentId}`, {
    cache: "no-store",
  });

  const student = await data.json();

  return StudentSchema.parse(student);
}

type Classroom = z.infer<typeof ClassroomSchema>;

async function GetClassroom(classroomId: string): Promise<Classroom> {
  const data = await fetch(`${URL}/api/classrooms/${classroomId}`, {
    cache: "no-store",
  });

  const classroom = await data.json();

  return ClassroomSchema.parse(classroom);
}

export default async function StudentUpdatePage({
  params,
}: {
  params: Promise<{ studentId: string; classroomId: string }>;
}) {
  const studentId = (await params).studentId;
  const classroomId = (await params).classroomId;
  const student = await GetStudent(studentId);
  const classroom = await GetClassroom(classroomId);
  return <StudentUpdateForm student={student} classroom={classroom} />;
}
