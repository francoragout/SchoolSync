import { PreceptorsColumns } from "@/components/preceptors/preceptors-columns";
import { PreceptorsTable } from "@/components/preceptors/preceptors-table";
import { UserSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL

type User = z.infer<typeof UserSchema>;

async function GetPreceptors(): Promise<User[]> {
  const data = await fetch(`${URL}/api/users`, {
    cache: "no-store",
  });

  const users = await data.json();

  console.log("Fetched users:", users);

  if (!Array.isArray(users)) {
    throw new Error("API response is not an array");
  }
  
  const preceptors = users.filter((user: User) => user.role === "PRECEPTOR");

  const preceptorsWithDate = preceptors.map((preceptor: User) => ({
    ...preceptor,
    createdAt: preceptor.createdAt ? new Date(preceptor.createdAt) : undefined,
  }));

  return preceptorsWithDate.map((preceptor: User) =>
    UserSchema.parse(preceptor)
  );
}

export default async function PreceptorsPage() {
  const data = await GetPreceptors();
  return <PreceptorsTable columns={PreceptorsColumns} data={data} />;
}
