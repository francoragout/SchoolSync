import { ClassroomsColumns } from "@/components/classrooms/classrooms-columns";
import { ClassroomsTable } from "@/components/classrooms/classrooms-table";
import { ClassroomSchema } from "@/lib/zod";
import { z } from "zod";

const URL = process.env.API_URL;

type Classroom = z.infer<typeof ClassroomSchema>;

async function GetClassrooms(): Promise<Classroom[]> {
  const data = await fetch(`${URL}/api/classrooms`, {
    cache: "no-store",
  });

  const classrooms = await data.json();

  return classrooms.map((classroom: Classroom) => {
    if (classroom.user && classroom.user.createdAt) {
      classroom.user.createdAt = new Date(classroom.user.createdAt);
    }
    return ClassroomSchema.parse(classroom);
  });
}

export default async function ClassroomsPage() {
  const data = await GetClassrooms();
  return <ClassroomsTable columns={ClassroomsColumns} data={data} />;
}