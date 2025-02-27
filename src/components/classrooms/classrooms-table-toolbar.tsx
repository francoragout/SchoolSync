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
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";
import { Button } from "@/components/ui/button";
import { divisions, grades, shifts } from "@/constants/data";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { PlusCircle, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { DeleteClassrooms } from "@/actions/classroom";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function ClassroomsTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRowsCount = table.getSelectedRowModel().rows.length;

  const handleDeleteSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const studentsIds = selectedRows.map(
      (row) => (row.original as { id: string }).id
    );

    DeleteClassrooms(studentsIds).then((response) => {
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
        {table.getColumn("grade") && (
          <DataTableFacetedFilter
            column={table.getColumn("grade")}
            title="Grado"
            options={grades}
          />
        )}
        {table.getColumn("division") && (
          <DataTableFacetedFilter
            column={table.getColumn("division")}
            title="División"
            options={divisions}
          />
        )}
        {table.getColumn("shift") && (
          <DataTableFacetedFilter
            column={table.getColumn("shift")}
            title="Turno"
            options={shifts}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            <Cross2Icon className="flex xl:hidden h-4 w-4" />
            <span className="hidden xl:block">Reiniciar</span>
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
                    permanentemente las aulas seleccionadas y todos los datos
                    asociados de nuestros servidores.
                  </span>

                  <span className="flex flex-col">
                    Items seleccionados:
                    {table.getSelectedRowModel().rows.map((row) => (
                      <span key={row.id} className="text-foreground">
                        {
                          grades.find(
                            (grade) =>
                              grade.value ===
                              (row.original as { grade: string }).grade
                          )?.label
                        }{" "}
                        {
                          divisions.find(
                            (division) =>
                              division.value ===
                              (row.original as { division: string }).division
                          )?.label
                        }{" "}
                        {
                          shifts.find(
                            (shift) =>
                              shift.value ===
                              (row.original as { shift: string }).shift
                          )?.label
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
          <Link href="/school/classrooms/create">
            <PlusCircle className="flex sm:hidden h-4 w-4" />
            <span className="hidden sm:flex">Agregar</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
