import { ExamsColumns } from "@/components/home/exams/exams-columns";
import { ExamsTable } from "@/components/home/exams/exams-table";
import { AttendanceSchema, ExamSchema, StudentSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

type Attendance = z.infer<typeof AttendanceSchema>;
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

type Exam = z.infer<typeof ExamSchema>;

async function GetExams(studentId: string): Promise<Exam[]> {
  const data = await fetch(`${URL}/api/exams/student/${studentId}`, {
    cache: "no-store",
  });

  const exams = await data.json();

  return exams.map((exam: Exam) => {
    return ExamSchema.parse({
      ...exam,
      date: exam.date ? new Date(exam.date) : undefined,
    });
  });
}

export default async function ExamsPage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const studentId = (await params).studentId;
  const data = await GetExams(studentId);
  const student = await GetStudent(studentId);

  return <ExamsTable data={data} columns={ExamsColumns} student={student} />;
}
