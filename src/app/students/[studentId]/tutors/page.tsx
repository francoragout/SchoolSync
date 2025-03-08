import { TutorsColumns } from "@/components/home/tutors/tutors-columns";
import { TutorsTable } from "@/components/home/tutors/tutors-table";
import {
  AttendanceSchema,
  StudentSchema,
  UserSchema,
} from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

type User = z.infer<typeof UserSchema>;

async function GetTutors(studentId: string): Promise<User[]> {
  const response = await fetch(`${URL}/api/users/student/${studentId}`, {
    cache: "no-store",
  });

  const users = await response.json();

  const tutors = users.map(
    (userOnStudent: { user: User }) => userOnStudent.user
  );

  const tutorsWithDate = tutors.map((tutor: User) => ({
    ...tutor,
    createdAt: tutor.createdAt ? new Date(tutor.createdAt) : undefined,
  }));

  return tutorsWithDate.map((tutor: User) => UserSchema.parse(tutor));
}

type Student = z.infer<typeof StudentSchema>;
type Attendance = z.infer<typeof AttendanceSchema>;

async function GetStudent(studentId: string): Promise<Student> {
  const data = await fetch(`${URL}/api/students/${studentId}`, {
    cache: "no-store",
  });

  const student = await data.json();

  // Convert string dates to Date objects
  if (student.attendance) {
    student.attendance = student.attendance.map((record: Attendance) => ({
      ...record,
      date: record.date ? new Date(record.date) : undefined,
    }));
  }

  return StudentSchema.parse(student);
}

export default async function TutorsPage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const studentId = (await params).studentId;
  const data = await GetTutors(studentId);
  const student = await GetStudent(studentId);
  return (
    <TutorsTable
      data={data}
      columns={TutorsColumns}
      student={student}
    />
  );
}
