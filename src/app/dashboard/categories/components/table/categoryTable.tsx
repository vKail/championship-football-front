"use client";
import React, { use, useEffect, useState } from "react";
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
import { ICategory } from "../../interface/categories.interface";
import CategoryForm from "../form/categoryForm";
import useCategory from "../../hooks/useCategry";



export default function CategoryTable() {
  const {categories, category , handleGetAllCategories, handleUpdateCategory, handleRemoveCategory} = useCategory();
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null); // Categoría seleccionada para editar
  const [isEdit, setIsEdit] = useState(false); // Estado para saber si estamos en modo edición
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad del formulario

  useEffect(() => {
    handleGetAllCategories();
  }, []);
  const handleEdit = (category: ICategory) => {
    setSelectedCategory(category); 
    setIsEdit(true); 
    setIsOpen(true); 
  };

  const handleSaveCategory = (category: ICategory) => {
    if (isEdit) {
      handleUpdateCategory(category); 
    } 
    setIsOpen(false);
    setSelectedCategory(null);
    setIsEdit(false);
  };

  // Función para eliminar una categoría
  const handleDelete = (categoryId: number) => {
    handleRemoveCategory(categoryId);
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
                onClick={() => handleDelete(category.categoryId ?? 0)} // Eliminar categoría
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
          { uid: "categoryId", name: "Category ID" },
          { uid: "categoryName", name: "Category Name" },
          { uid: "ageMin", name: "Edad Mínima"},
          {uid: "ageMax", name: "Edad Máxima"},
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
        <TableBody items={categories || []}>
          {(item) => (
            <TableRow key={item.categoryId}>
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
