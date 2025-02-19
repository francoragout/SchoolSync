import ClassroomCreateForm from "@/components/classrooms/classroom-create-form";
import { UserSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

type User = z.infer<typeof UserSchema>;

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

export default async function CreateClassroomPage() {
  const preceptors = await GetPreceptors();
  return <ClassroomCreateForm preceptors={preceptors} />;
}
