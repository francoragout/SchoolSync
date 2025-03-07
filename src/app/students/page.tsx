import { auth } from "@/auth";
import { StudentsColumns } from "@/components/home/students/students-columns";
import { StudentsTable } from "@/components/home/students/students-table";
import { StudentSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

type Student = z.infer<typeof StudentSchema>;

async function GetStudents(userId: string): Promise<Student[]> {
  const response = await fetch(`${URL}/api/user-on-student/user/${userId}`, {
    cache: "no-store",
  });

  const students = await response.json();

  return students;
}

export default async function StudentsPage() {
  const session = await auth();
  console.log("sesion:", session);
  const userId = "cm7xxihr30004u4nono8cbftj"
  console.log(userId);
  const data = await GetStudents(userId ?? "");
  return <StudentsTable data={data} columns={StudentsColumns} />;
}
