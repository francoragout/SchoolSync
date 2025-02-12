import { AdminsColumns } from "@/components/admins/admins-columns";
import { AdminsTable } from "@/components/admins/admins-table";
import { UserSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL || "http://localhost:5000";

type User = z.infer<typeof UserSchema>;

async function GetAdmins(): Promise<User[]> {
  const data = await fetch(`${URL}/api/users`, {
    cache: "no-store",
  });

  const users = await data.json();
  const admins = users.filter((user: User) => user.role === "ADMIN");

  const adminsWithDate = admins.map((admin: User) => ({
    ...admin,
    createdAt: admin.createdAt ? new Date(admin.createdAt) : undefined,
  }));

  return adminsWithDate.map((admin: User) => UserSchema.parse(admin));
}

export default async function AdminsPage() {
  const data = await GetAdmins();
  return <AdminsTable columns={AdminsColumns} data={data} />;
}
