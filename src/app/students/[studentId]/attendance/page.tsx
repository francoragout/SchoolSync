import { AttendanceColumns } from "@/components/home/attedance/attendance-columns";
import { AttendanceTable } from "@/components/home/attedance/attendance-table";
import { AttendanceSchema, StudentSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

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

type Student = z.infer<typeof StudentSchema>;

export default async function AttendancePage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const studentId = (await params).studentId;
  const student = await GetStudent(studentId);
  const data = await GetAttendance(studentId);
  return (
    <AttendanceTable
      data={data}
      columns={AttendanceColumns}
      student={student}
    />
  );
}
