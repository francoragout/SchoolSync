"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { z } from "zod";
import { ClassroomSchema, UserSchema } from "@/lib/zod";
import { divisions, grades, shifts } from "@/constants/data";
import { ClassroomTableRowActions } from "./classrooms-table-row-actions";

type Classroom = z.infer<typeof ClassroomSchema>;
type User = z.infer<typeof UserSchema>;

export const ClassroomsColumns: ColumnDef<Classroom>[] = [
  {
    accessorKey: "grade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grado" />
    ),
    cell: ({ row }) => {
      const grade = grades.find(
        (grade) => grade.value === row.getValue("grade")
      );

      if (!grade) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{grade.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "division",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="División" />
    ),
    cell: ({ row }) => {
      const division = divisions.find(
        (division) => division.value === row.getValue("division")
      );

      if (!division) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{division.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "shift",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Turno" />
    ),
    cell: ({ row }) => {
      const shift = shifts.find(
        (shift) => shift.value === row.getValue("shift")
      );

      if (!shift) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{shift.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alumnos" />
    ),
    cell: ({ row }) => {
      const count = row.getValue("_count") as { students?: number };
      return count?.students ?? 0;
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preceptor" />
    ),
    cell: ({ row }) => {
      const preceptor = row.getValue("user") as User;
      return (
        <div className="flex items-center">
          <span>
            {preceptor?.firstName} {preceptor?.lastName}
          </span>
        </div>
      );
    },
  },
    {
      id: "actions",
      cell: ({ row }) => <ClassroomTableRowActions row={row} />,
    },
];
