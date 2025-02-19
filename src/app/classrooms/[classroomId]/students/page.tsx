import { StudentsColumns } from "@/components/students/students-columns";
import { StudentsTable } from "@/components/students/students-table";
import { ClassroomSchema, StudentSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

type Student = z.infer<typeof StudentSchema>;

async function GetStudents(classroomId: string): Promise<Student[]> {
  const data = await fetch(`${URL}/api/students/classroom/${classroomId}`, {
    cache: "no-store",
  });

  const students = await data.json();

  return students.map((student: Student) => {
    return StudentSchema.parse(student);
  });
}

type Classroom = z.infer<typeof ClassroomSchema>;

async function GetClassroom(classroomId: string): Promise<Classroom> {
  const data = await fetch(`${URL}/api/classrooms/${classroomId}`, {
    cache: "no-store",
  });

  const classroom = await data.json();

  return ClassroomSchema.parse(classroom);
}

export default async function StudentsPage({
  params,
}: {
  params: Promise<{ classroomId: string }>;
}) {
  const classroomId = (await params).classroomId;
  const data = await GetStudents(classroomId);
  const classroom = await GetClassroom(classroomId);
  return (
    <StudentsTable
      data={data}
      columns={StudentsColumns}
      classroom={classroom}
    />
  );
}
