"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { z } from "zod";
import { ExamSchema } from "@/lib/zod";
import { subjects } from "@/constants/data";
import { es } from "date-fns/locale";
import { format } from "date-fns";


type Exam = z.infer<typeof ExamSchema>;

export const ExamsColumns: ColumnDef<Exam>[] = [
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
];
