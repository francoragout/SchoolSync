import { ExamsColumns } from "@/components/exams/exams-columns";
import { ExamsTable } from "@/components/exams/exams-table";
import { ClassroomSchema, ExamSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

type Exam = z.infer<typeof ExamSchema>;

async function GetExams(classroomId: string): Promise<Exam[]> {
  const data = await fetch(`${URL}/api/exams/classroom/${classroomId}`, {
    cache: "no-store",
  });

  const exams = await data.json();

  return exams.map((exam: Exam) => {
    exam.date = new Date(exam.date);
    return ExamSchema.parse(exam);
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

export default async function ExamsPage({
  params,
}: {
  params: Promise<{ classroomId: string }>;
}) {
  const classroomId = (await params).classroomId;
  const data = await GetExams(classroomId);
  const classroom = await GetClassroom(classroomId);
  return (
    <ExamsTable columns={ExamsColumns} data={data} classroom={classroom} />
  );
}
