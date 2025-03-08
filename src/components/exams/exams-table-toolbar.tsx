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
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";
import { subjects } from "@/constants/data";
import { Button } from "../ui/button";
import Link from "next/link";
import { PlusCircle, Trash } from "lucide-react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { DeleteExams } from "@/actions/exam";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function ExamsTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const selectedRowsCount = table.getSelectedRowModel().rows.length;
  const pathname = usePathname();

  const handleDeleteSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const examsIds = selectedRows.map(
      (row) => (row.original as { id: string }).id
    );

    DeleteExams(examsIds, pathname).then((response) => {
      if (response.success) {
        toast.success(response.message);
        table.resetRowSelection();
      } else {
        toast.error(response.message);
      }
    });
  };

  const getSubjectLabel = (value: string) => {
    const subject = subjects.find((subject) => subject.value === value);
    return subject ? subject.label : value;
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("subject") && (
          <DataTableFacetedFilter
            column={table.getColumn("subject")}
            title="Asignatura"
            options={subjects}
          />
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
                    permanentemente los registros de examenes seleccionados y
                    todos los datos asociados de nuestros servidores.
                  </span>

                  <span className="flex flex-col">
                    Seleccionados:
                    {table.getSelectedRowModel().rows.map((row) => (
                      <span key={row.id} className="text-foreground">
                        {getSubjectLabel(
                          (row.original as { subject: string }).subject
                        )}{" "}
                        -{" "}
                        {new Date(
                          (row.original as { id: string; date: string }).date
                        ).toLocaleDateString()}{" "}
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
          <Link href={`${pathname}/create`}>
            <PlusCircle className="flex sm:hidden h-4 w-4" />
            <span className="hidden sm:flex">Agregar</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
