import StudentCreateForm from "@/components/students/student-create-form";

export default async function CreateStudentPage({
  params,
}: {
  params: Promise<{ classroomId: string }>;
}) {
  const classroomId = (await params).classroomId;
  return <StudentCreateForm classroomId={classroomId} />;
}
