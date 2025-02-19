"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { StudentsTableRowActions } from "./students-table-row-actions";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StudentSchema } from "@/lib/zod";
// import clsx from "clsx";
import { Checkbox } from "../ui/checkbox";
import { PersonIcon } from "@radix-ui/react-icons";

type Student = z.infer<typeof StudentSchema>;
// type Attendance = z.infer<typeof AttendanceSchema>;

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
        <Avatar>
          <AvatarImage src={image} alt="avatar" />
          <AvatarFallback className="bg-secondary">
            <PersonIcon />
          </AvatarFallback>
        </Avatar>
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
  // {
  //   accessorKey: "attendance",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Asistencia" />
  //   ),
  //   cell: ({ row }) => {
  //     const attendance = row.original.attendance ?? [];
  //     const absent = attendance.filter(
  //       (a: Attendance) => a.status === "ABSENT"
  //     ).length;
  //     const late =
  //       attendance.filter((a: Attendance) => a.status === "LATE").length / 2;
  //     const totalAbsences = absent + late;
  //     const totalAllowedAbsences = 15;
  //     const attendancePercentage =
  //       100 - (totalAbsences / totalAllowedAbsences) * 100;

  //     return (
  //       <div
  //       className={clsx(
  //         attendancePercentage === 100 && "text-green-500",
  //         attendancePercentage >= 50 &&
  //           attendancePercentage < 100 &&
  //           "text-yellow-500",
  //         attendancePercentage < 50 && "text-red-500",

  //         "font-medium"
  //       )}
  //       >
  //         {attendancePercentage.toFixed(1)}%
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "absent",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Ausente" />
  //   ),
  //   cell: ({ row }) => {
  //     const attendance = row.original.attendance ?? [];
  //     const absent = attendance.filter(
  //       (a: Attendance) => a.status === "ABSENT"
  //     ).length;

  //     return <div>{absent}</div>;
  //   },
  // },
  // {
  //   accessorKey: "late",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Tarde" />
  //   ),
  //   cell: ({ row }) => {
  //     const attendance = row.original.attendance ?? [];
  //     const late = attendance.filter(
  //       (a: Attendance) => a.status === "LATE"
  //     ).length;
  //     return <div>{late}</div>;
  //   },
  // },
  // {
  //   accessorKey: "total",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Total" />
  //   ),
  //   cell: ({ row }) => {
  //     const attendance = row.original.attendance ?? [];
  //     const absent = attendance.filter(
  //       (a: Attendance) => a.status === "ABSENT"
  //     ).length;
  //     const late =
  //       attendance.filter((a: Attendance) => a.status === "LATE").length / 2;
  //     return <div>{absent + late}</div>;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => <StudentsTableRowActions row={row} />,
  },
];
