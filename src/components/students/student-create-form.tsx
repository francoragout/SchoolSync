"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { ClassroomSchema, StudentSchema } from "@/lib/zod";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreateStudent } from "@/actions/student";
import { divisions, grades, shifts } from "@/constants/data";
import { useDispatch } from "react-redux";
import { setBreadcrumb } from "@/lib/features/breadcrumb/breadcrumbSlice";
import { RestrictionAlert } from "../restricted-alert";

type Classroom = z.infer<typeof ClassroomSchema>;

export default function StudentCreateForm({
  classroom,
  role
}: {
  classroom: Classroom;
  role: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof StudentSchema>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  function onSubmit(values: z.infer<typeof StudentSchema>) {
    startTransition(() => {
      CreateStudent(values, classroom.id ?? "").then((response) => {
        if (response.success) {
          toast.success(response.message);
          form.reset(values);
          router.push(`/school/classrooms/${classroom.id}/students`);
        } else {
          toast.error(response.message);
        }
      });
    });
  }

  const classroomName =
    grades.find((g) => g.value === classroom.grade)?.label +
    " " +
    divisions.find((d) => d.value === classroom.division)?.label +
    " " +
    shifts.find((s) => s.value === classroom.shift)?.label;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBreadcrumb(`Escuela/Aulas/${classroomName}/Alumnos/Crear`));
  }, [dispatch, classroomName]);

  if (role !== "ADMIN") {
      return <RestrictionAlert />;
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Alumno</CardTitle>
        <CardDescription>
          Utilice Tabs para navegar más rápido entre los campos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre (requerido)"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Apellido (requerido)"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Imagen URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Imagen URL (opcional)"
                        {...field}
                        disabled={isPending}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-8"
                disabled={isPending}
              >
                <Link href={`/school/classrooms/${classroom.id}/students`}>
                  Cancelar
                </Link>
              </Button>
              <Button
                type="submit"
                size="sm"
                className="h-8"
                disabled={isPending}
              >
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
