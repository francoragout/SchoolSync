import { AttendanceColumns } from "@/components/home/attedance/attendance-columns";
import { AttendanceTable } from "@/components/home/attedance/attendance-table";
import { AttendanceSchema, ClassroomSchema, StudentSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

type Attendance = z.infer<typeof AttendanceSchema>;

async function GetStudent(
  studentId: string
): Promise<{ student: Student; classroomId: string }> {
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

  const parsedStudent = StudentSchema.parse(student);

  return { student: parsedStudent, classroomId: student.classroomId };
}

async function GetClassroom(classroomId: string): Promise<Classroom> {
  const data = await fetch(`${URL}/api/classrooms/${classroomId}`, {
    cache: "no-store",
  });

  const classroom = await data.json();

  return ClassroomSchema.parse(classroom);
}

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

type Student = z.infer<typeof StudentSchema>;

export default async function AttendancePage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const studentId = (await params).studentId;
  const { student, classroomId } = await GetStudent(studentId);
  const data = await GetAttendance(studentId);
  const classroom = await GetClassroom(classroomId);
  return (
    <AttendanceTable
      data={data}
      columns={AttendanceColumns}
      classroom={classroom}
      student={student}
    />
  );
}
