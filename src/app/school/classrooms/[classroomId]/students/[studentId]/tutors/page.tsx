import { auth } from "@/auth";
import { TutorsColumns } from "@/components/tutors/tutors-columns";
import { TutorsTable } from "@/components/tutors/tutors-table";
import {
  AttendanceSchema,
  ClassroomSchema,
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

type Classroom = z.infer<typeof ClassroomSchema>;

async function GetClassroom(classroomId: string): Promise<Classroom> {
  const data = await fetch(`${URL}/api/classrooms/${classroomId}`, {
    cache: "no-store",
  });

  const classroom = await data.json();

  return ClassroomSchema.parse(classroom);
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
  params: Promise<{ classroomId: string; studentId: string }>;
}) {
  const studentId = (await params).studentId;
  const classroomId = (await params).classroomId;

  const data = await GetTutors(studentId);
  const classroom = await GetClassroom(classroomId);
  const student = await GetStudent(studentId);
  const session = await auth();
  const role = session?.user?.role as string;
  return (
    <TutorsTable
      data={data}
      columns={TutorsColumns}
      classroom={classroom}
      student={student}
      role={role}
    />
  );
}
