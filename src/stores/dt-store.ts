import { IDt, IDtResponse } from "@/app/dashboard/dts/interfaces/dts.interface";
import { createDt, deleteDt, getAllDts, getDtById, updateDt } from "@/app/dashboard/dts/service/dtService";
import { create } from "zustand";


interface DtStatus {
    dts: IDtResponse[] | null;
    dt: IDtResponse | null;
    isLoading: boolean;
    error: string | null;
    fetchAllDts: () => Promise<boolean>;
    fetchDtById: (id: number) => Promise<boolean>;
    addDt: (dt: IDt) => Promise<boolean>;
    modifyDt: (dt: IDt) => Promise<boolean>;
    removeDt: (id: number) => Promise<boolean>;
    clearError: () => void;
    clearDt: () => void;
}

export const useDtStore = create<DtStatus>()((set, get) => ({
    dts: null,
    dt: null,
    isLoading: false,
    error: null,

    fetchAllDts: async () => {
        try {
            set({ isLoading: true, error: null });
            const response = await getAllDts();
            
            if (response?.status === 200) {
                set({ dts: response.data });
                return true;
            }
            
            set({ error: 'No se pudieron obtener los dt' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener dts' });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    fetchDtById: async (id: number) => {
        try {
            set({ isLoading: true, error: null });
            const response = await getDtById(id);
            
            if (response?.status === 200) {
                set({ dt: response.data });
                return true;
            }
            
            set({ error: 'No se pudo obtener el dt' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener el dt' });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    addDt: async (dt: IDt) => {
        try {
            set({ isLoading: true, error: null });
            const response = await createDt(dt);
            
            if (response?.status === 200) {
                const currentDts = get().dts || [];
                set({ dts: [...currentDts, response.data], dt: response.data });
                return true;
            }
            
            set({ error: 'No se pudo agregar el dt' });
            return false;
        } catch (error) {
            set({ error: 'Error al agregar el dt' });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    modifyDt: async (dt: IDt) => {
        try {
            set({ isLoading: true, error: null });
            const response = await updateDt(dt);
            
            if (response?.status === 200) {
                const currentDts = get().dts || [];
                const updatedDts = currentDts.map(d => d.dtId === dt.dtId ? { ...d, ...dt } : d);
                set({ dts: updatedDts, dt: response.data });
                return true;
            }
            
            set({ error: 'No se pudo modificar el dt' });
            return false;
        } catch (error) {
            set({ error: 'Error al modificar el dt' });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    removeDt: async (id: number) => {
        try {
            set({ isLoading: true, error: null });
            const response = await deleteDt(id);
            
            if (response?.status === 204) {
                const currentDts = get().dts || [];
                set({ 
                    dts: currentDts.filter(d => d.dtId !== id),
                    dt: get().dt?.dtId === id ? null : get().dt
                 });
                return true;
            }
            
            set({ error: 'No se pudo eliminar el dt' });
            return false;
        } catch (error) {
            set({ error: 'Error al eliminar el dt' });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    clearError: () => set({ error: null }),
    clearDt: () => set({ dt: null }),
}));