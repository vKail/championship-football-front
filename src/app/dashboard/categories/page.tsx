'use client';
import { useState } from "react";
import CategoryForm from "./form/categoryForm";
import CategoryTable from "./table/categoryTable";
import { ICategory } from "./interface/categories.interface";

export default function Page() {
  const [categories, setCategories] = useState<ICategory[]>([]); // Estado para las categorías
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Función para abrir el formulario en modo creación
  const handleCreate = () => {
    setSelectedCategory(null); // Sin categoría seleccionada
    setIsEdit(false); // No estamos editando
    setIsFormOpen(true); // Abrir el modal
  };

  // Función para cerrar el formulario
  const handleCloseForm = () => {
    setIsFormOpen(false); // Cerrar el modal
    setSelectedCategory(null); // Limpiar la categoría seleccionada
    setIsEdit(false); // Cambiar a modo de creación
  };

  // Función para manejar la creación o edición de categorías
  const handleSaveCategory = (category: ICategory) => {
    if (isEdit && selectedCategory) {
      // Editar la categoría existente
      setCategories((prev) =>
        prev.map((cat) =>
          cat.category_id === selectedCategory.category_id ? category : cat
        )
      );
    } else {
      // Crear una nueva categoría
      setCategories((prev) => [...prev, category]);
    }
    handleCloseForm(); // Cerrar el formulario después de guardar
  };

  // Función para manejar la edición de una categoría seleccionada desde la tabla
  const handleEditCategory = (category: ICategory) => {
    setSelectedCategory(category); // Seleccionamos la categoría a editar
    setIsEdit(true); // Cambiamos a modo edición
    setIsFormOpen(true); // Abrimos el formulario
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categorías</h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Crear Nueva Categoría
        </button>
      </div>
      
      {/* Tabla de categorías */}
      <CategoryTable
      />

      {/* Formulario de categoría para crear o editar */}
      {isFormOpen && (
        <CategoryForm
          category={selectedCategory}
          isEdit={isEdit}
          onSave={handleSaveCategory} // Guardar la categoría (crear o editar)
          onClose={handleCloseForm} // Cerrar el formulario
        />
      )}
    </div>
  );
}
