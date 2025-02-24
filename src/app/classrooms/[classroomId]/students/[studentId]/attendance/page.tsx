import { AttendanceColumns } from "@/components/attendance/attendance-columns";
import { AttendanceTable } from "@/components/attendance/attendance-table";
import { AttendanceSchema, ClassroomSchema, StudentSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

type Attendance = z.infer<typeof AttendanceSchema>;

async function GetAttendance(studentId: string): Promise<Attendance[]> {
  const data = await fetch(`${URL}/api/attendance/student/${studentId}`, {
    cache: "no-store",
  });

  const attendance = await data.json();

  return attendance.map((attendance: Attendance) => {
    return AttendanceSchema.parse({
      ...attendance,
      date: attendance.date ? new Date(attendance.date) : undefined,
    });
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

type Student = z.infer<typeof StudentSchema>;

async function GetStudent(studentId: string): Promise<Student> {
  const data = await fetch(`${URL}/api/students/${studentId}`, {
    cache: "no-store",
  });

  const student = await data.json();

  return StudentSchema.parse(student);
}

export default async function AttendancePage({
  params,
}: {
  params: Promise<{ classroomId: string; studentId: string }>;
}) {
  const studentId = (await params).studentId;
  const classroomId = (await params).classroomId;
  const data = await GetAttendance(studentId);
  const classroom = await GetClassroom(classroomId);
  const student = await GetStudent(studentId);
  return (
    <AttendanceTable
      data={data}
      columns={AttendanceColumns}
      classroom={classroom}
      student={student}
    />
  );
}
