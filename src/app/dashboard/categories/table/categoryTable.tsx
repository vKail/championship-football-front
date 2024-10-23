"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon } from "@/app/ui/EditIcon";
import { DeleteIcon } from "@/app/ui/DeleteIcon";
import { ICategory } from "../interface/categories.interface";
import CategoryForm from "../form/categoryForm";

// Datos iniciales de categorías (puedes reemplazarlos con tus datos reales)
const initialCategories: ICategory[] = [
  {
    category_id: "C001",
    name: "Category A",
  },
  {
    category_id: "C002",
    name: "Category B",
  },
  // Agrega más categorías según sea necesario
];

export default function CategoryTable() {
  const [categories, setCategories] = useState<ICategory[]>(initialCategories); // Estado para las categorías
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null); // Categoría seleccionada para editar
  const [isEdit, setIsEdit] = useState(false); // Estado para saber si estamos en modo edición
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad del formulario

  // Función para manejar la apertura del formulario en modo edición
  const handleEdit = (category: ICategory) => {
    setSelectedCategory(category); // Guardamos la categoría seleccionada
    setIsEdit(true); // Cambiamos a modo de edición
    setIsOpen(true); // Abrimos el formulario modal
  };

  // Función para manejar el guardado de una categoría (creación o edición)
  const handleSaveCategory = (category: ICategory) => {
    if (isEdit) {
      // Modo edición: actualizamos la categoría existente
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.category_id === category.category_id ? category : cat
        )
      );
    } else {
      // Modo creación: agregamos una nueva categoría
      setCategories((prevCategories) => [...prevCategories, category]);
    }

    // Cerramos el formulario y reseteamos los estados
    setIsOpen(false);
    setSelectedCategory(null);
    setIsEdit(false);
  };

  // Función para eliminar una categoría
  const handleDelete = (categoryId: string) => {
    setCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.category_id !== categoryId)
    );
  };

  // Función para renderizar las celdas de la tabla
  const renderCell = React.useCallback((category: ICategory, columnKey: keyof ICategory | "actions") => {
    const cellValue = category[columnKey as keyof ICategory];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit category">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => handleEdit(category)} // Editar categoría
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete category">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => handleDelete(category.category_id)} // Eliminar categoría
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue as React.ReactNode; // Retorna el valor directamente para los demás casos
    }
  }, []);

  return (
    <>
      <Table aria-label="Category table">
        <TableHeader columns={[
          { uid: "category_id", name: "Category ID" },
          { uid: "name", name: "Category Name" },
          { uid: "actions", name: "Actions" },
        ]}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={categories}>
          {(item) => (
            <TableRow key={item.category_id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof ICategory | "actions")}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Renderizar el formulario para creación/edición */}
      {isOpen && (
        <CategoryForm
          category={selectedCategory}
          isEdit={isEdit}
          onSave={handleSaveCategory} // Llamar a la función onSave al guardar
          onClose={() => {
            setIsOpen(false); // Cerrar el modal
            setSelectedCategory(null); // Limpiar categoría seleccionada
            setIsEdit(false); // Cambiar a modo de creación
          }}
        />
      )}
    </>
  );
}
