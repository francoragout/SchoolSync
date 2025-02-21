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
import { UserSchema } from "@/lib/zod";
import { Input } from "@/components/ui/input";
import { UpdateUser } from "@/actions/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setBreadcrumb } from "@/lib/features/breadcrumb/breadcrumbSlice";

type User = z.infer<typeof UserSchema>;

export default function AdminUpdateForm({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: "ADMIN",
    },
  });

  function onSubmit(values: z.infer<typeof UserSchema>) {
    startTransition(() => {
      UpdateUser(values, user.id ?? "").then((response) => {
        if (response.success) {
          toast.success(response.message);
          form.reset(values);
          router.push("/admins");
        } else {
          toast.error(response.message);
        }
      });
    });
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBreadcrumb(`Administradores/${user.firstName} ${user.lastName}/Editar`));
  }, [dispatch, user.firstName, user.lastName]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar Administrador</CardTitle>
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
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email (requerido)"
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
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Teléfono (opcional)"
                        {...field}
                        disabled={isPending}
                        type="tel"
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
                <Link href="/admins">Cancelar</Link>
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
