import { StudentsColumns } from "@/components/students/students-columns";
import { StudentsTable } from "@/components/students/students-table";
import { StudentSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

type Student = z.infer<typeof StudentSchema>;

async function GetStudents(id: string): Promise<Student[]> {
  const data = await fetch(`${URL}/api/students/classroom/${id}`, {
    cache: "no-store",
  });

  const students = await data.json();

  return students.map((student: Student) => {
    return StudentSchema.parse(student);
  });
}

export default async function StudentsPage({
  params,
}: {
  params: Promise<{ classroomId: string }>;
}) {
  const classroomId = (await params).classroomId;
  const data = await GetStudents(classroomId);
  return <StudentsTable data={data} columns={StudentsColumns} />;
}
