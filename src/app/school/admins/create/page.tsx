import { auth } from "@/auth";
import AdminCreateForm from "@/components/admins/admin-create-form";


export default async function AdminCreatePage() {
  const session = await auth();
  const role = session?.user?.role as string;

  return <AdminCreateForm role={role}/>;
}
