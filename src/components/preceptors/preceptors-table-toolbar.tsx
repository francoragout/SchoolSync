"use client";

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
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PlusCircle, Trash } from "lucide-react";
import { toast } from "sonner";
import { DeleteUsers } from "@/actions/user";
import { usePathname } from "next/navigation";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function PreceptorsTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRowsCount = table.getSelectedRowModel().rows.length;
  const pathname = usePathname();

  const handleDeleteSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const tasksIds = selectedRows.map(
      (row) => (row.original as { id: string }).id
    );

    DeleteUsers(tasksIds, pathname).then((response) => {
      if (response.success) {
        toast.success(response.message);
        table.resetRowSelection();
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar administradores..."
          value={
            (table.getColumn("lastName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("lastName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reiniciar
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex space-x-3">
        {selectedRowsCount > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="h-8"
                size="sm"
                variant="destructive"
                disabled={selectedRowsCount === 0}
              >
                <Trash className="flex sm:hidden h-4 w-4" />
                <span className="hidden sm:flex">Eliminar</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Estas completamente seguro?
                </AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col space-y-3">
                  <span>
                    Esta acción no se puede deshacer. Esto eliminará
                    permanentemente los preceptores seleccionados y todos los datos
                    asociados de nuestros servidores.
                  </span>

                  <span className="flex flex-col">
                    Items seleccionados:
                    {table.getSelectedRowModel().rows.map((row) => (
                      <span key={row.id} className="text-foreground">
                        {
                          (
                            row.original as {
                              firstName: string;
                              lastName: string;
                            }
                          ).firstName
                        }{" "}
                        {
                          (
                            row.original as {
                              firstName: string;
                              lastName: string;
                            }
                          ).lastName
                        }
                      </span>
                    ))}
                  </span>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteSelected}>
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <Button size="sm" className="h-8 flex" asChild>
          <Link href="/admins/create">
            <PlusCircle className="flex sm:hidden h-4 w-4" />
            <span className="hidden sm:flex">Agregar</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
