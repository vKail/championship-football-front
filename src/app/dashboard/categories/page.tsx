'use client';
import { useState } from "react";
import CategoryTable from "./components/table/categoryTable";
import { ICategory } from "./interface/categories.interface";
import CategoryForm from "./components/form/categoryForm";
import useCategory from "./hooks/useCategry";

export default function Page() {
  const {handleCreateCategory} = useCategory();
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreate = () => {
    setSelectedCategory(null); 
    setIsEdit(false); 
    setIsFormOpen(true); 
  };

  // Función para cerrar el formulario
  const handleCloseForm = () => {
    setIsFormOpen(false); // Cerrar el modal
    setSelectedCategory(null); // Limpiar la categoría seleccionada
    setIsEdit(false); // Cambiar a modo de creación
  };

  const handleSaveCategory = (category: ICategory) => {
    handleCreateCategory(category);
    handleCloseForm(); 
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
      
      <CategoryTable
      />

      {isFormOpen && (
        <CategoryForm
          category={selectedCategory}
          isEdit={isEdit}
          onSave={handleSaveCategory} 
          onClose={handleCloseForm} 
        />
      )}
    </div>
  );
}
