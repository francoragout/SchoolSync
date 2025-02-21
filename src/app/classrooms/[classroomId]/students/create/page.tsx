import StudentCreateForm from "@/components/students/student-create-form";
import { ClassroomSchema } from "@/lib/zod";
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

export default async function CreateStudentPage({
  params,
}: {
  params: Promise<{ classroomId: string }>;
}) {
  const classroomId = (await params).classroomId;
  const classroom = await GetClassroom(classroomId);
  return <StudentCreateForm classroom={classroom} />;
}
