import { auth } from "@/auth";
import { StudentsColumns } from "@/components/home/students/students-columns";
import { StudentsTable } from "@/components/home/students/students-table";
import { AttendanceSchema, StudentSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

type Student = z.infer<typeof StudentSchema>;
type Attendance = z.infer<typeof AttendanceSchema>;

async function GetStudents(userId: string): Promise<Student[]> {
  const response = await fetch(`${URL}/api/users/user/${userId}`, {
    cache: "no-store",
  });

  const students = await response.json();

  return students.map((student: Student) => {
    student.attendance = student.attendance?.map(
      (attendanceItem: Attendance) => {
        attendanceItem.date = new Date(attendanceItem.date);
        return attendanceItem;
      }
    );
    return StudentSchema.parse(student);
  });
}

export default async function StudentsPage() {
  const session = await auth();
  const userId = session?.user?.id as string;
  const data = await GetStudents(userId);
  return <StudentsTable data={data} columns={StudentsColumns} />;
}
