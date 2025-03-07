import { auth } from "@/auth";
import PreceptorCreateForm from "@/components/preceptors/preceptor-create-form";

export default async function PreceptorCreatePage() {
  const session = await auth();
  const role = session?.user?.role as string;
  return <PreceptorCreateForm role={role} />;
}
