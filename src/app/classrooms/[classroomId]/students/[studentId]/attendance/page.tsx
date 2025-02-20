import { AttendanceColumns } from "@/components/attendance/attendance-columns";
import { AttendanceTable } from "@/components/attendance/attendance-table";
import { AttendanceSchema } from "@/lib/zod";
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
      createdAt: new Date(attendance.createdAt),
    });
  });
}

export default async function AttendancePage({
  params,
}: {
  params: Promise<{ classroomId: string; studentId: string }>;
}) {
  const studentId = (await params).studentId;

  const data = await GetAttendance(studentId);
  return <AttendanceTable data={data} columns={AttendanceColumns} />;
}
