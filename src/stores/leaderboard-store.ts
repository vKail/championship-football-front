import { ILeaderboard, ILeaderboardResponse } from "@/app/dashboard/leaderboard/interface/leaderboard.interface";
import { createLeaderboard, deleteLeaderboard, getAllLeaderboard, getLeaderboardById, getLeaderboardsBySeasonAndCategory, updateLeaderboard } from "@/app/dashboard/leaderboard/service/leaderboardService";
import { create } from "zustand";


interface LeaderboardaState{
    leaderboards: ILeaderboardResponse[] | null;
    leaderboard: ILeaderboardResponse | null;
    loading: boolean;
    error: string | null;
    fetchAllLeaderboards: () => Promise<boolean>;
    fetchLeaderboardById: (id: number) => Promise<boolean>;
    addLeaderboard: (leaderboard: ILeaderboard) => Promise<boolean>;
    modifyLeaderboard: (leaderboard: ILeaderboard) => Promise<boolean>;
    removeLeaderboard: (id: number) => Promise<boolean>;
    findLeaderboardsBySeasonAndCategory: (seasonId: number, categoryId: number) => Promise<boolean>;
    clearError: () => void;
    clearLeaderboard: () => void;
}

export const useLeaderboardaStore = create<LeaderboardaState>((set, get) => ({
    leaderboards: null,
    leaderboard: null,
    loading: false,
    error: null,

    fetchAllLeaderboards: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getAllLeaderboard();
            
            if (response?.status === 200) {
                set({ leaderboards: response.data });
                return true;
            }
            
            set({ error: 'No se pudieron obtener los lideres' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener lideres' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    fetchLeaderboardById: async (id: number) => {
        try {
            set({ loading: true, error: null });
            const response = await getLeaderboardById(id);
            
            if (response?.status === 200) {
                set({ leaderboard: response.data });
                return true;
            }
            
            set({ error: 'No se pudo obtener el lider' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener el lider' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    addLeaderboard: async (leaderboard: ILeaderboard) => {
        try {
            set({ loading: true, error: null });
            const response = await createLeaderboard(leaderboard);
            
            if (response?.status === 200) {
                const currentLeaderboards = get().leaderboards || [];
                set({ leaderboards: [...currentLeaderboards, response.data], leaderboard: response.data });
                return true;
            }
            
            set({ error: 'No se pudo agregar el lider' });
            return false;
        } catch (error) {
            set({ error: 'Error al agregar lider' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    modifyLeaderboard: async (leaderboard: ILeaderboard) => {
        try {
            set({ loading: true, error: null });
            const response = await updateLeaderboard(leaderboard);
            
            if (response?.status === 200) {
                const currentLeaderboards = get().leaderboards || [];
                const updatedLeaderboards = currentLeaderboards.map(l => l.leaderboardId === leaderboard.leaderboardId ? { ...l, ...leaderboard } : l);
                set({ 
                    leaderboards: updatedLeaderboards, 
                    leaderboard : response.data });
                return true;
            }
            
            set({ error: 'No se pudo modificar el lider' });
            return false;
        } catch (error) {
            set({ error: 'Error al modificar lider' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    removeLeaderboard: async (id: number) => {
        try {
            set({ loading: true, error: null });
            const response = await deleteLeaderboard(id);
            
            if (response?.status === 200) {
                const currentLeaderboards = get().leaderboards || [];
                set({ 
                    leaderboards: currentLeaderboards.filter(l => l.leaderboardId !== id),
                    leaderboard: get().leaderboard?.leaderboardId === id ? null : get().leaderboard
                 });
                return true;
            }
            
            set({ error: 'No se pudo eliminar el lider' });
            return false;
        } catch (error) {
            set({ error: 'Error al eliminar lider' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    findLeaderboardsBySeasonAndCategory: async (seasonId: number, categoryId: number) => {
        try {
            set({ loading: true, error: null });
            const response = await getLeaderboardsBySeasonAndCategory(seasonId, categoryId);
            
            if (response?.status === 200) {
                set({ leaderboards: response.data });
                return true;
            }
            
            set({ error: 'No se pudieron obtener los lideres' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener lideres' });
            return false;
        } finally {
            set({ loading: false });
        }
    },
    
    clearError: () => set({ error: null }),
    clearLeaderboard: () => set({ leaderboard: null })
}));

