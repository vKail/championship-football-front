import { ICategory } from "@/app/dashboard/categories/interface/categories.interface";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "@/app/dashboard/categories/service/categoryService";
import { create } from "zustand";


interface CaegoryStatus {
    categories: ICategory[] | null;
    category: ICategory | null;
    loading: boolean;
    error: string;
    fetchAllCategories: () => Promise<boolean>;
    fetchCategoryById: (id: number) => Promise<boolean>;
    addCategory: (category: ICategory) => Promise<boolean>;
    modifyCategory: (category: ICategory) => Promise<boolean>;
    removeCategory: (id: number) => Promise<boolean>;
    clearError: () => void;
    clearCategory: () => void;
}

export const useCategoryStore = create<CaegoryStatus>((set, get) => ({
    categories: null,
    category: null,
    loading: false,
    error: '',
    fetchAllCategories: async () => {
        try {
            set({ loading: true, error: '' });
            const response = await getAllCategories();
            
            if (response?.status === 200) {
                set({ categories: response.data });
                return true;
            }
            
            set({ error: 'No se pudieron obtener las categorias' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener categorias' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    fetchCategoryById: async (id: number) => {
        try {
            set({ loading: true, error: '' });
            const response = await getCategoryById(id);
            
            if (response?.status === 200) {
                set({ category: response.data });
                return true;
            }
            
            set({ error: 'No se pudo obtener la categoria' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener la categoria' });
            return false;
        }
    },

    addCategory: async (category: ICategory) => {
        try {
            set({ loading: true, error: '' });
            const response = await createCategory(category);
            
            if (response?.status === 200) {
                const currentsCategories = get().categories || [];
                set({ categories: [...currentsCategories, response.data], category: response.data });
                return true;
            }
            
            set({ error: 'No se pudo agregar la categoria' });
            return false;
        } catch (error) {
            set({ error: 'Error al agregar la categoria' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    modifyCategory: async (category: ICategory) => {
        try {
            set({ loading: true, error: '' });
            const response = await updateCategory(category);
            
            if (response?.status === 200) {
               const currentCategories = get().categories || [];
               const updatedCategories = currentCategories.map((cat) => cat.categoryId === category.categoryId ? response.data : cat);
                set({ categories: updatedCategories, category: response.data });
                return true;
            }
            
            set({ error: 'No se pudo modificar la categoria' });
            return false;
        } catch (error) {
            set({ error: 'Error al modificar la categoria' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    removeCategory: async (id: number) => {
        try {
            set({ loading: true, error: '' });
            const response = await deleteCategory(id);
            
            if (response?.status === 200) {
                const currentCategories = get().categories || [];
                set({ 
                    categories: currentCategories.filter((cat) => cat.categoryId !== id),
                    category: get().category?.categoryId === id ? null : get().category
                 });
                return true;
            }
            
            set({ error: 'No se pudo eliminar la categoria' });
            return false;
        } catch (error) {
            set({ error: 'Error al eliminar la categoria' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    clearError: () => set({ error: '' }),
    clearCategory: () => set({ category: null })
}));