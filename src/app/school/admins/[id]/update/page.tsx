import { auth } from "@/auth";
import AdminUpdateForm from "@/components/admins/admin-update-form";
import { UserSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

type User = z.infer<typeof UserSchema>;

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
  const session = await auth();
  const role = session?.user?.role as string;
  return <AdminUpdateForm user={data} role={role} />;
}
