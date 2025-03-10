import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (session?.user?.role !== "TUTOR") {
    redirect("/school/classrooms");
  } else {
    redirect("/students");
  }
}
