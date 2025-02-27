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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ClassroomSchema, UserSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";
import { divisions, grades, shifts } from "@/constants/data";
import { cn } from "@/lib/utils";
import { CreateClassroom } from "@/actions/classroom";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setBreadcrumb } from "@/lib/features/breadcrumb/breadcrumbSlice";

type User = z.infer<typeof UserSchema>;

export default function ClassroomCreateForm({
  preceptors,
}: {
  preceptors: User[];
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof ClassroomSchema>>({
    resolver: zodResolver(ClassroomSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof ClassroomSchema>) {
    startTransition(() => {
      CreateClassroom(values).then((response) => {
        if (response.success) {
          toast.success(response.message);
          form.reset();
          router.push("/school/classrooms");
        } else {
          toast.error(response.message);
        }
      });
    });
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBreadcrumb("Escuela/Aulas/Crear"));
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Aula</CardTitle>
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
                name="grade"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Grado</FormLabel>
                    <Select onValueChange={field.onChange} disabled={isPending}>
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <SelectValue placeholder="Seleccionar grado (requerido)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {grades.map((grade) => (
                            <SelectItem key={grade.value} value={grade.value}>
                              {grade.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>División</FormLabel>
                    <Select onValueChange={field.onChange} disabled={isPending}>
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <SelectValue placeholder="Seleccionar división (requrido)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {divisions.map((division) => (
                            <SelectItem
                              key={division.value}
                              value={division.value}
                            >
                              {division.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shift"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Turno</FormLabel>
                    <Select onValueChange={field.onChange} disabled={isPending}>
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <SelectValue placeholder="Seleccionar turno (requerido)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {shifts.map((shift) => (
                            <SelectItem key={shift.value} value={shift.value}>
                              {shift.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Preceptor</FormLabel>
                    <Select onValueChange={field.onChange} disabled={isPending}>
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <SelectValue placeholder="Preceptor (opcional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {preceptors.map((preceptor) => (
                            <SelectItem
                              key={preceptor.id}
                              value={preceptor.id || ""}
                            >
                              {preceptor.email}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                <Link href="/school/classrooms">Cancelar</Link>
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
