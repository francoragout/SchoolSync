"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { z } from "zod";
import { UserSchema } from "@/lib/zod";
import { PersonIcon } from "@radix-ui/react-icons";
import { formatDate } from "date-fns";

type User = z.infer<typeof UserSchema>;

export const TutorsColumns: ColumnDef<User>[] = [
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
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Teléfono" />
    ),
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creado el" />
    ),
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"));
      return <div>{formatDate(createdAt, "dd/MM/yyyy")}</div>;
    },
  },
];
