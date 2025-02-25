"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { StudentSchema } from "@/lib/zod";
import Link from "next/link";
import { Calendar, Pencil } from "lucide-react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function StudentsTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const student = StudentSchema.parse(row.original);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col">
          <Button
            asChild
            variant="ghost"
            className="flex justify-start pl-2"
            size="sm"
          >
            <Link
              href={`/classrooms/${student.classroomId}/students/${student.id}/attendance`}
            >
              <Calendar className="mr-2 h-4 w-4" />
              <span>Asistencia</span>
            </Link>
          </Button>
          
          <Button
            asChild
            variant="ghost"
            className="flex justify-start pl-2"
            size="sm"
          >
            <Link
              href={`/classrooms/${student.classroomId}/students/${student.id}/update`}
            >
              <Pencil className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
