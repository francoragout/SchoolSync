import { UsersColumns } from "@/components/users/users-columns";
import { UsersTable } from "@/components/users/users-table";
import { UserSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL || "http://localhost:5000";

type User = z.infer<typeof UserSchema>;

async function GetProfessors(): Promise<User[]> {
  const data = await fetch(`${URL}/api/users`, {
    cache: "no-store",
  });

  const users = await data.json();
  const professors = users.filter((user: User) => user.role === "PRECEPTOR");

  const professorsWithDate = professors.map((professor: User) => ({
    ...professor,
    createdAt: professor.createdAt ? new Date(professor.createdAt) : undefined,
  }));

  return professorsWithDate.map((professor: User) =>
    UserSchema.parse(professor)
  );
}

export default async function ProfessorsPage() {
  const data = await GetProfessors();
  return <UsersTable columns={UsersColumns} data={data} />;
}
