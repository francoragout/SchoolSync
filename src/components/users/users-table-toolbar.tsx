"use client";

import { Table } from "@tanstack/react-table";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function UsersTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const pathname = usePathname();

  const [user, setUser] = useState('');

  useEffect(() => {
    if (pathname === "/admins") {
      setUser("administrador");
    } else if (pathname === "/preceptors") {
      setUser("preceptor");
    } else if (pathname === "/professors") {
      setUser("profesor");
    } else {
      setUser("tutor");
    }
  }, [pathname]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filtrar ${
            pathname === "/admins"
              ? "administradores"
              : pathname === "/preceptors"
              ? "preceptores"
              : pathname === "/professors"
              ? "profesores"
              : "tutores"
          }...`}
          value={
            (table.getColumn("firstName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("firstName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reiniciar
            <X />
          </Button>
        )}
      </div>
      <Button size="sm" className="h-8 flex" asChild>
        <Link href={`${pathname}/create`}>
          <PlusCircle className="flex sm:hidden h-4 w-4" />
          <span className="hidden sm:flex">{`Agregar ${user}`}</span>
        </Link>
      </Button>
    </div>
  );
}
