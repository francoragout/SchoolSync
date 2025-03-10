import { redirect } from "next/navigation";

export default async function ExamsPage({
  params,
}: {
  params: Promise<{ classroomId: string }>;
}) {
  const classroomId = (await params).classroomId;
  redirect(`/school/classrooms/${classroomId}/exams`);
}
