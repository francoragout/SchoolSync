"use client";

import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";
import { statuses } from "@/constants/data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function AttendanceTableToolbar<TData>({
  table,
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
    </div>
  );
}
