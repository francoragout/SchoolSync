import StudentUpdateForm from "@/components/students/student-update-form";
import { StudentSchema } from "@/lib/zod";
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

export default async function StudentUpdatePage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const studentId = (await params).studentId;
  const student = await GetStudent(studentId);
  return <StudentUpdateForm student={student} />;
}
