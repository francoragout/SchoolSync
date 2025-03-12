import { auth } from "@/auth";
import { ClassroomsColumns } from "@/components/classrooms/classrooms-columns";
import { ClassroomsTable } from "@/components/classrooms/classrooms-table";
import { ClassroomSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

type Classroom = z.infer<typeof ClassroomSchema>;

async function GetClassrooms(
  role: string,
  userId: string
): Promise<Classroom[]> {

  let data = null;

  if (role === "ADMIN") {
    data = await fetch(`${URL}/api/classrooms`, {
      cache: "no-store",
    }).then((res) => res.json());
  } else {
    data = await fetch(`${URL}/api/classrooms/user/${userId}`, {
      cache: "no-store",
    }).then((res) => res.json());
  }

  return data.map((classroom: Classroom) => {
    if (classroom.user && classroom.user.createdAt) {
      classroom.user.createdAt = new Date(classroom.user.createdAt);
    }
    return ClassroomSchema.parse(classroom);
  });
}

export default async function ClassroomsPage() {
  const session = await auth();
  const userId = session?.user?.id as string;
  const role = session?.user?.role as string;
  const data = await GetClassrooms(role, userId);
  return (
    <ClassroomsTable columns={ClassroomsColumns} data={data} role={role} />
  );
}
