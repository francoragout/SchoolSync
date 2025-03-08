"use client";

import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";
import { subjects } from "@/constants/data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function ExamsTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
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
    </div>
  );
}
