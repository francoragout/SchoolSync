import { auth } from "@/auth";
import TutorUpdateForm from "@/components/tutors/tutor-update-form";
import { AttendanceSchema, ClassroomSchema, StudentSchema, UserSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

type User = z.infer<typeof UserSchema>;

async function GetTutor(tutorId: string): Promise<User> {
  const data = await fetch(`${URL}/api/users/${tutorId}`, {
    cache: "no-store",
  });

  const user = await data.json();
  const userWithDate = {
    ...user,
    createdAt: user.createdAt ? new Date(user.createdAt) : undefined,
  };

  return UserSchema.parse(userWithDate);
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

export default async function AttendanceUpdatePage({
  params,
}: {
  params: Promise<{
    classroomId: string;
    studentId: string;
    tutorId: string;
  }>;
}) {
  const classroomId = (await params).classroomId;
  const studentId = (await params).studentId;
  const tutorId = (await params).tutorId;

  const user = await GetTutor(tutorId);
  const classroom = await GetClassroom(classroomId);
  const student = await GetStudent(studentId);

  const session = await auth();
  const role = session?.user?.role as string;

  return (
    <TutorUpdateForm
      classroom={classroom}
      student={student}
      user={user}
      role={role}
    />
  );
}
