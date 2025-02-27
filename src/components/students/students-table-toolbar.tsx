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
import { CalendarX2, ClockAlert, PlusCircle, Trash } from "lucide-react";
import Link from "next/link";
import { CreateAttendances } from "@/actions/attendance";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { DeleteStudents } from "@/actions/student";
import { usePathname } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function StudentsTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRows = table.getSelectedRowModel().rows;
  const selectedRowsCount = table.getSelectedRowModel().rows.length;
  const pathname = usePathname();

  const [status, setStatus] = useState("");
  const handleSelected = () => {
    const studentsIds = selectedRows.map(
      (row) => (row.original as { id: string }).id
    );

    CreateAttendances(studentsIds, status, pathname).then((response) => {
      if (response.success) {
        toast.success(response.message);
        table.resetRowSelection();
      } else {
        toast.error(response.message);
      }
    });
  };

  const handleDeleteSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const studentsIds = selectedRows.map(
      (row) => (row.original as { id: string }).id
    );

    DeleteStudents(studentsIds, pathname).then((response) => {
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
      <div className="flex flex-1 items-center space-x-3">
        <Input
          placeholder="Filtrar alumnos..."
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
                    permanentemente los alumnos seleccionados y todos los datos
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 flex"
              disabled={selectedRows.length === 0}
              onClick={() => setStatus("ABSENT")}
            >
              <CalendarX2 className="flex sm:hidden h-4 w-4" />
              <span className="hidden sm:flex">Ausente</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¡Confirmar falta!</AlertDialogTitle>
              <Separator />
              <AlertDialogDescription className="flex flex-col space-y-3">
                <span>
                  Confirmar que los siguientes alumnos estuvieron ausentes el
                  dia {format(new Date(), "PPP", { locale: es })}.
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
              <AlertDialogAction onClick={handleSelected}>
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 flex"
              disabled={selectedRows.length === 0}
              onClick={() => setStatus("TARDY")}
            >
              <ClockAlert className="flex sm:hidden h-4 w-4" />
              <span className="hidden sm:flex">Tarde</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¡Confirmar media falta!</AlertDialogTitle>
              <Separator />
              <AlertDialogDescription className="flex flex-col space-y-3">
                <span>
                  Confirmar que los siguientes alumnos llegaron tarde el dia{" "}
                  {format(new Date(), "PPP", { locale: es })}.
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
              <AlertDialogAction onClick={handleSelected}>
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button size="sm" className="h-8 flex" asChild>
          <Link href={`${pathname}/create`}>
            <PlusCircle className="flex sm:hidden h-4 w-4" />
            <span className="hidden sm:flex">Agregar</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
