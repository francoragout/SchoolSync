"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { PersonIcon } from "@radix-ui/react-icons";

// import { PreceptorTableRowActions } from "./preceptor-table-row-actions"
import { DataTableColumnHeader } from "../data-table-column-header";
import { z } from "zod";
import { UserSchema } from "@/lib/zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type User = z.infer<typeof UserSchema>;
export const PreceptorsColumns: ColumnDef<User>[] = [
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
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellido" />
    ),
    cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rol" />
    ),
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "createAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Create At" />
    ),
    cell: ({ row }) => <div>{row.getValue("createAt")}</div>,
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <PreceptorTableRowActions row={row} />,
  // },
];
