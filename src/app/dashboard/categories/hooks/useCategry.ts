import { useCategoryStore } from "@/stores/category-store";
import Swal from "sweetalert2";
import { ICategory } from "../interface/categories.interface";


const useCategory = () => {
    const {
        categories,
        category,
        loading,
        error,
        fetchAllCategories,
        fetchCategoryById,
        addCategory,
        modifyCategory,
        removeCategory,
        clearError,
        clearCategory
    } = useCategoryStore();

    const handleGetAllCategories = async () => {
        const success = await fetchAllCategories();
        if (!success && error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error
            });
        }
    };  

    const handleCreateCategory = async (category : ICategory) => {
        const success = await addCategory(category);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Categoria creada',
                text: 'La categoria se ha creado correctamente',
            });
            return true;
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo crear la categoria'
        });
        return false;
    };

    const handleUpdateCategory = async (category : ICategory) => {
        const success = await modifyCategory(category);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Categoria actualizada',
                text: 'La categoria se ha actualizado correctamente',
            });
            return true;
        }
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo actualizar la categoria'
        });
    }

    const handleRemoveCategory = async (id: number) => {
        const success = await removeCategory(id);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Categoria eliminada',
                text: 'La categoria se ha eliminado correctamente',
            });
            return true;
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo eliminar la categoria'
        });
        return false;
    }

    return {
        categories,
        category,
        loading,
        error,
        handleGetAllCategories,
        handleCreateCategory,
        handleUpdateCategory,
        handleRemoveCategory,
        fetchCategoryById,
        clearError,
        clearCategory
    }
}

export default useCategory;