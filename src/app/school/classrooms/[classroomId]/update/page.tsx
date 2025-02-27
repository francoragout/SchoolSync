import ClassroomUpdateForm from "@/components/classrooms/classroom-update-form";
import { ClassroomSchema, UserSchema } from "@/lib/zod";
import { z } from "zod";

type Classroom = z.infer<typeof ClassroomSchema>;
type User = z.infer<typeof UserSchema>;

const URL = process.env.API_URL;

async function GetClassroom(id: string): Promise<Classroom> {
  const data = await fetch(`${URL}/api/classrooms/${id}`, {
    cache: "no-store",
  });

  const classroom = await data.json();

  return ClassroomSchema.parse(classroom);
}

async function GetPreceptors(): Promise<User[]> {
  const data = await fetch(`${URL}/api/users`, {
    cache: "no-store",
  });

  const users = await data.json();
  const preceptors = users.filter((user: User) => user.role === "PRECEPTOR");

  const preceptorsWithDate = preceptors.map((preceptor: User) => ({
    ...preceptor,
    createdAt: preceptor.createdAt ? new Date(preceptor.createdAt) : undefined,
  }));

  return preceptorsWithDate.map((preceptor: User) =>
    UserSchema.parse(preceptor)
  );
}

export default async function ClassroomUpdatePage({
  params,
}: {
  params: Promise<{ classroomId: string }>;
}) {
  const classroomId = (await params).classroomId;
  const classroom = await GetClassroom(classroomId);
  const preceptors = await GetPreceptors();
  return <ClassroomUpdateForm classroom={classroom} preceptors={preceptors}/>;
}
