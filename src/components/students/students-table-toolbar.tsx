"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarX2, ClockAlert } from "lucide-react";
import { z } from "zod";
// import { toast } from "sonner";
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
import { ClassroomSchema } from "@/lib/zod";
import { Separator } from "../ui/separator";

type Classroom = z.infer<typeof ClassroomSchema>;
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  classroom: Classroom;
}

export function StudentsTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const isSomeRowsSelected =
    table.getIsSomeRowsSelected() || table.getIsAllPageRowsSelected();

  const handleAbsentSelected = () => {
    // const selectedRows = table.getSelectedRowModel().rows;
    // const studentIds = selectedRows.map(
    //   (row) => (row.original as { id: string }).id
    // );
    // CreateAbsent(studentIds, classroom.id || "").then((response) => {
    //   if (response.success) {
    //     toast.success(response.message);
    //     table.resetRowSelection();
    //   } else {
    //     toast.error(response.message);
    //   }
    // });
  };

  const handleLateSelected = () => {
    // const selectedRows = table.getSelectedRowModel().rows;
    // const studentIds = selectedRows.map(
    //   (row) => (row.original as { id: string }).id
    // );
    // createLate(studentIds, classroom.id || "").then((response) => {
    //   if (response.success) {
    //     toast.success(response.message);
    //     table.resetRowSelection();
    //   } else {
    //     toast.error(response.message);
    //   }
    // });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-4">
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
        {isSomeRowsSelected && (
          <>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 flex border-dashed"
                >
                  <CalendarX2 className="flex h-4 w-4 mr-1" />
                  <span className="hidden sm:flex">Ausente</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar Falta</AlertDialogTitle>
                  <Separator />
                  <AlertDialogDescription className="flex flex-col">
                    {table.getSelectedRowModel().rows.map((row) => (
                      <span key={row.id}>
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
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleAbsentSelected}>
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
                  className="h-8 flex border-dashed mr-1"
                >
                  <ClockAlert className="flex h-4 w-4" />
                  <span className="hidden sm:flex">Tarde</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar Media Falta</AlertDialogTitle>
                  <Separator />
                  <AlertDialogDescription className="flex flex-col">
                    {table.getSelectedRowModel().rows.map((row) => (
                      <span key={row.id}>
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
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLateSelected}>
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>
      <div className="flex">
      </div>
    </div>
  );
}
