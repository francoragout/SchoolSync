"use client";

import { GetStudent } from "@/actions/student";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { statuses } from "@/constants/data";
import { StudentSchema } from "@/lib/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Search } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

type Student = z.infer<typeof StudentSchema>;

export default function Searcher() {
  const [DNI, setDNI] = useState("");
  const [student, setStudent] = useState<Student | null>(null);

  const handleSubmit = async () => {
    try {
      const student = await GetStudent(DNI);
      setStudent(student);
    } catch {
      setStudent(null);
    }
  };

  const totalAttendanceValue = student?.attendance?.reduce(
    (total, attendance) => {
      const attendanceValue =
        attendance.status === "ABSENT"
          ? 1
          : attendance.status === "TARDY"
          ? 0.5
          : 0;
      return total + attendanceValue;
    },
    0
  );

  return (
    <div className="container mx-auto space-y-4 p-4">
      <div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Buscar alumno por documento nacional de identidad (DNI)
        </h3>
        <p className="text-sm text-muted-foreground">
          Ingresa el DNI sin puntos y sin espacios.
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <Input
          placeholder="Buscar alumno..."
          className="h-8 w-[150px] lg:w-[250px]"
          value={DNI}
          onChange={(e) => setDNI(e.target.value)}
        />
        <Button size="sm" className="h-8 flex" onClick={handleSubmit}>
          <Search className="flex sm:hidden h-4 w-4" />
          <span className="hidden sm:flex">Buscar</span>
        </Button>
      </div>

      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        {student?.firstName} {student?.lastName}
      </h4>

      <Table>
        <TableCaption>Lista de asistencia</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Falta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {student?.attendance?.map((attendance) => {
            const date = new Date(attendance.date);
            const statusLabel =
              statuses.find((status) => status.value === attendance.status)
                ?.label || attendance.status;
            const attendanceValue =
              attendance.status === "ABSENT"
                ? 1
                : attendance.status === "TARDY"
                ? 0.5
                : 0;
            return (
              <TableRow key={attendance.id}>
                <TableCell>{format(date, "PPP", { locale: es })}</TableCell>
                <TableCell>{format(date, "p", { locale: es })}</TableCell>
                <TableCell>{statusLabel}</TableCell>
                <TableCell className="text-right">{attendanceValue}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{totalAttendanceValue}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
