import AttendanceUpdateForm from "@/components/attendance/attendance-update-form";
import { AttendanceSchema, ClassroomSchema, StudentSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

type Attendance = z.infer<typeof AttendanceSchema>;

async function GetAttendance(attendanceId: string): Promise<Attendance> {
  const data = await fetch(`${URL}/api/attendance/${attendanceId}`, {
    cache: "no-store",
  });

  const attendance = await data.json();

  attendance.date = new Date(attendance.date);

  return AttendanceSchema.parse(attendance);
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
    attendanceId: string;
  }>;
}) {
  const classroomId = (await params).classroomId;
  const studentId = (await params).studentId;
  const attendanceId = (await params).attendanceId;
  const classroom = await GetClassroom(classroomId);
  const student = await GetStudent(studentId);
  const attendance = await GetAttendance(attendanceId);
  return (
    <AttendanceUpdateForm
      classroom={classroom}
      student={student}
      attendance={attendance}
    />
  );
}
