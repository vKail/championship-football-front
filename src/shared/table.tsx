"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { IField } from "@/shared/interfaces/InputField.interface";
import React from "react";
import { ColumnElement } from "@react-types/table";

interface ITable {
  header: IField[];
  rows: { [key: string]: string }[];
  onEdit?: (data: any) => void;
  onDelete?: (id: string) => void;
}

export default function UseTable({ header, rows, onEdit, onDelete }: ITable) {
  return (
    <Table
      aria-label="Tabla de Usuarios"
      classNames={{
        wrapper: "min-h-[400px]",
      }}
    >
      <TableHeader>
        {(header as any).map((field: { id: React.Key | null | undefined; label: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | ColumnElement<unknown> | ColumnElement<unknown>[] | null | undefined; }) => (
          <TableColumn key={field.id}>{field.label}</TableColumn>
        ))} 
        <TableColumn>Acciones</TableColumn>
      </TableHeader>

      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {(header as any).map((field: { id: string; }) => (
              <TableCell key={`${row.id}-${field.id}`}>
                {field.id === "password" ? "••••••••" : row[field.id]}
              </TableCell>
            ))}
            <TableCell key={`actions-${row.id}`}>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  color="warning"
                  onClick={() => onEdit && onEdit(row)}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => onDelete && onDelete(row.id)}
                >
                  Eliminar
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
