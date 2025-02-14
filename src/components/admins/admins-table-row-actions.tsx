"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UserSchema } from "@/lib/zod";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { DeleteUser } from "@/actions/user";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function AdminTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const user = UserSchema.parse(row.original);

  const handleDelete = async () => {
    DeleteUser(user.id ?? "").then((response) => {
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col">
          <Button
            asChild
            variant="ghost"
            className="flex justify-start pl-2"
            size="sm"
          >
            <Link href={`/admins/${user.id}/update`}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex justify-start pl-2 w-full"
              >
                <Trash className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Estas completamente seguro?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Esto eliminará
                  permanentemente al administrador:
                  {
                    <span className="text-primary">
                      {" "}
                      &apos;{user.firstName} {user.lastName}&apos;
                    </span>
                  }{" "}
                  y todos los datos asociados de nuestros servidores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
