"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PlusCircle, Trash } from "lucide-react";
import { toast } from "sonner";
import { DeleteUsers } from "@/actions/user";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function AdminsTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRowsCount = table.getSelectedRowModel().rows.length;

  const handleDeleteSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const tasksIds = selectedRows.map(
      (row) => (row.original as { id: string }).id
    );

    DeleteUsers(tasksIds).then((response) => {
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
        {selectedRowsCount > 1 && (
          <Button
            className="h-8"
            onClick={handleDeleteSelected}
            size="sm"
            variant="outline"
          >
            <div className="space-x-2 flex">
              <Trash className="h-4 w-4" />
              <span className="hidden sm:flex">Eliminar</span>
            </div>
          </Button>
        )}
        <Button size="sm" className="h-8 flex" asChild>
          <Link href="/admins/create">
            <PlusCircle className="flex sm:hidden h-4 w-4" />
            <span className="hidden sm:flex">Nuevo Administrador</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
