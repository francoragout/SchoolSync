"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { StudentsTableRowActions } from "./students-table-row-actions";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AttendanceSchema, StudentSchema } from "@/lib/zod";
import { Checkbox } from "../ui/checkbox";
import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Image from "next/image";

type Student = z.infer<typeof StudentSchema>;
type Attendance = z.infer<typeof AttendanceSchema>;

export const StudentsColumns: ColumnDef<Student>[] = [
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
    accessorKey: "image",
    header: () => <div className="sr-only">Image</div>,
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="rounded-full p-0">
              <Avatar>
                {image ? (
                  <AvatarImage src={image} alt="avatar" />
                ) : (
                  <AvatarFallback className="bg-secondary">
                    <PersonIcon />
                  </AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {row.getValue("firstName") + " " + row.getValue("lastName")}
              </DialogTitle>
            </DialogHeader>
            {image ? (
              <Image src={image} alt="avatar" width={500} height={500} />
            ) : (
              <div>Imagen no disponible</div>
            )}
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellido" />
    ),
    cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
  },
  {
    accessorKey: "attendance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asistencia" />
    ),
    cell: ({ row }) => {
      const attendance = row.original.attendance ?? [];
      const absent = attendance.filter(
        (a: Attendance) => a.status === "ABSENT"
      ).length;
      const late =
        attendance.filter((a: Attendance) => a.status === "TARDY").length / 2;
      const totalAbsences = absent + late;
      const totalAllowedAbsences = 15;
      const attendancePercentage =
        100 - (totalAbsences / totalAllowedAbsences) * 100;
      return <div>{attendancePercentage.toFixed(1)}%</div>;
    },
  },
  {
    accessorKey: "absent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ausente" />
    ),
    cell: ({ row }) => {
      const attendance = row.original.attendance ?? [];
      const absent = attendance.filter(
        (a: Attendance) => a.status === "ABSENT"
      ).length;

      return <div>{absent}</div>;
    },
  },
  {
    accessorKey: "late",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tarde" />
    ),
    cell: ({ row }) => {
      const attendance = row.original.attendance ?? [];
      const late = attendance.filter(
        (a: Attendance) => a.status === "TARDY"
      ).length;
      return <div>{late}</div>;
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const attendance = row.original.attendance ?? [];
      const absent = attendance.filter(
        (a: Attendance) => a.status === "ABSENT"
      ).length;
      const late =
        attendance.filter((a: Attendance) => a.status === "TARDY").length / 2;
      return <div>{absent + late}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <StudentsTableRowActions row={row} />,
  },
];
