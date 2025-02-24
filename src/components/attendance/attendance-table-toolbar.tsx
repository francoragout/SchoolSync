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
import { statuses } from "@/constants/data";
import { Button } from "../ui/button";
import Link from "next/link";
import { PlusCircle, Trash } from "lucide-react";
import { toast } from "sonner";
import { DeleteAttendances } from "@/actions/attendance";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  classroomId: string;
  studentId: string;
}

export function AttendanceTableToolbar<TData>({
  table,
  classroomId,
  studentId,
}: DataTableToolbarProps<TData>) {
  const selectedRowsCount = table.getSelectedRowModel().rows.length;

  const handleDeleteSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const tasksIds = selectedRows.map(
      (row) => (row.original as { id: string }).id
    );

    DeleteAttendances(tasksIds).then((response) => {
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
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Estado"
            options={statuses}
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
                    permanentemente los registros de asistencia seleccionados y
                    todos los datos asociados de nuestros servidores.
                  </span>

                  <div className="flex flex-col">
                    Items seleccionados:
                    {table.getSelectedRowModel().rows.map((row) => (
                      <span key={row.id} className="text-foreground">
                        {new Date(
                          (row.original as { id: string; date: string }).date
                        ).toLocaleDateString()}
                      </span>
                    ))}
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteSelected}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        <Button size="sm" className="h-8 flex" asChild>
          <Link
            href={`/classrooms/${classroomId}/students/${studentId}/attendance/create`}
          >
            <PlusCircle className="flex sm:hidden h-4 w-4" />
            <span className="hidden sm:flex">Agregar</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
