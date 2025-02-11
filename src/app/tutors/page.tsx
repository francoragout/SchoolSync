import { UsersColumns } from "@/components/users/users-columns";
import { UsersTable } from "@/components/users/users-table";
import { UserSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL || "http://localhost:5000";

type User = z.infer<typeof UserSchema>;

async function GetTutors(): Promise<User[]> {
  const data = await fetch(`${URL}/api/users`, {
    cache: "no-store",
  });

  const users = await data.json();
  const tutors = users.filter((user: User) => user.role === "TUTOR");

  const tutorsWithDate = tutors.map((tutor: User) => ({
    ...tutor,
    createdAt: tutor.createdAt ? new Date(tutor.createdAt) : undefined,
  }));

  return tutorsWithDate.map((tutor: User) => UserSchema.parse(tutor));
}

export default async function TutorsPage() {
  const data = await GetTutors();
  return <UsersTable columns={UsersColumns} data={data} />;
}
