import ExamUpdateForm from "@/components/exams/exam-update-form";
import { ClassroomSchema, ExamSchema } from "@/lib/zod";
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

type Exam = z.infer<typeof ExamSchema>;

async function GetExam(examId: string): Promise<Exam> {
  const data = await fetch(`${URL}/api/exams/${examId}`, {
    cache: "no-store",
  });

  const exam = await data.json();

  exam.date = new Date(exam.date);

  return ExamSchema.parse(exam);
}

export default async function ExamCreatePage({
  params,
}: {
  params: Promise<{ classroomId: string; examId: string }>;
}) {
  const classroomId = (await params).classroomId;
  const examId = (await params).examId;

  const classroom = await GetClassroom(classroomId);
  const exam = await GetExam(examId);

  return <ExamUpdateForm classroom={classroom} exam={exam}/>;
}
