import TutorCreateForm from "@/components/tutors/tutor-create-form";
import { AttendanceSchema, ClassroomSchema, StudentSchema } from "@/lib/zod";
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

export default async function TutorCreatePage({
  params,
}: {
  params: Promise<{ classroomId: string; studentId: string }>;
}) {
  const studentId = (await params).studentId;
  const classroomId = (await params).classroomId;
  const classroom = await GetClassroom(classroomId);
  const student = await GetStudent(studentId);
  return (
    <TutorCreateForm classroom={classroom} student={student} />
  );
}
