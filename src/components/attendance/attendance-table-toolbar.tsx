"use client";

import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";
import { statuses } from "@/constants/data";
import { Button } from "../ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

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
      <Button size="sm" className="h-8 flex" asChild>
        <Link href={`/classrooms/${classroomId}/students/${studentId}/attendance/create`}>
          <PlusCircle className="flex sm:hidden h-4 w-4" />
          <span className="hidden sm:flex">Agregar</span>
        </Link>
      </Button>
    </div>
  );
}
