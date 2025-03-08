"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { z } from "zod";
import { ExamSchema } from "@/lib/zod";
import { subjects } from "@/constants/data";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { Checkbox } from "../ui/checkbox";
import { ExamsTableRowActions } from "./exams-table-row-actions";

type Exam = z.infer<typeof ExamSchema>;

export const ExamsColumns: ColumnDef<Exam>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asignatura" />
    ),
    cell: ({ row }) => {
      const subject = subjects.find(
        (subject) => subject.value === row.getValue("subject")
      );

      if (!subject) {
        return null;
      }

      return <div className="flex items-center">{subject.label}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("date") as Date;
      return <div>{format(date, "PPP", { locale: es })}</div>;
    },
  },
  {
    accessorKey: "time",
    header: () => <div className="text-left">Hora</div>,
    cell: ({ row }) => <div>{row.getValue("time")}</div>,
  },
  {
    accessorKey: "note",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nota" />
    ),
    cell: ({ row }) => <div>{row.getValue("note")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <ExamsTableRowActions row={row} />,
  },
];
