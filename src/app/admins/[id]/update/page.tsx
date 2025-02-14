import AdminUpdateForm from "@/components/admins/admin-update-form";
import { UserSchema } from "@/lib/zod";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;
const URL = process.env.API_URL || "http://localhost:5000";

async function GetAdmin(id: string): Promise<User> {
  const data = await fetch(`${URL}/api/users/${id}`, {
    cache: "no-store",
  });

  const user = await data.json();
  const userWithDate = {
    ...user,
    createdAt: user.createdAt ? new Date(user.createdAt) : undefined,
  };

  return UserSchema.parse(userWithDate);
}

export default async function AdminUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const data = await GetAdmin(userId);
  return <AdminUpdateForm user={data} />;
}
