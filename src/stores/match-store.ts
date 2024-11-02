import { IMatch } from "@/app/dashboard/matches/interface/matches.interface";
import { createMatch, deleteMatch, getAllMatches, getMatchById, updateMatch } from "@/app/dashboard/matches/service/matchService";
import { s } from "framer-motion/client";
import { create } from "zustand";


interface MatchState {
    matches: IMatch[] | null;
    match: IMatch | null;
    loading: boolean;
    error: string;
    fetchAllMatches: () => Promise<boolean>;
    fetchMatchById: (id: number) => Promise<boolean>;
    addMatch: (match: IMatch) => Promise<boolean>;
    modifyMatch: (match: IMatch) => Promise<boolean>;
    removeMatch: (id: number) => Promise<boolean>;
    clearError: () => void;
    clearMatch: () => void;
}

export const useMatchStore = create<MatchState>((set, get) => ({
    matches: null,
    match: null,
    loading: false,
    error: '',

    fetchAllMatches: async () => {
        try {
            set({ loading: true, error: '' });
            const response = await getAllMatches();
            
            if (response?.status === 200) {
                set({ matches: response.data });
                return true;
            }
            
            set({ error: 'No se pudieron obtener los partidos' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener partidos' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    fetchMatchById: async (id: number) => {
        try {
            set({ loading: true, error: '' });
            const response = await getMatchById(id);
            
            if (response?.status === 200) {
                set({ match: response.data });
                return true;
            }
            
            set({ error: 'No se pudo obtener el partido' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener el partido' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    addMatch: async (match: IMatch) => {
        try {
            set({ loading: true, error: '' });
            const response = await createMatch(match);
            
            if (response?.status === 201) {
                const currentMatches = get().matches || [];
                set({ matches: [...currentMatches, response.data], match: response.data });
                return true;
            }
            
            set({ error: 'No se pudo crear el partido' });
            return false;
        } catch (error) {
            set({ error: 'Error al crear el partido' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    modifyMatch: async (match: IMatch) => {
        try {
            set({ loading: true, error: '' });
            const response = await updateMatch(match);
            
            if (response?.status === 200) {
                const currentMatches = get().matches || [];
                const updatedMatches = currentMatches.map(m => m.match_id === match.match_id ? match : m);
                set({ 
                    matches: updatedMatches, 
                    match: response.data 
                });
                return true;
            }
            
            set({ error: 'No se pudo modificar el partido' });
            return false;
        } catch (error) {
            set({ error: 'Error al modificar el partido' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    removeMatch: async (id: number) => {
        try {
            set({ loading: true, error: '' });
            const response = await deleteMatch(id);
            
            if (response?.status === 200) {
                const currentMatches = get().matches || [];
                set({ matches: currentMatches.filter(m => m.match_id !== id.toString()),
                    match: get().match?.match_id === id.toString() ? null : get().match
                 });                
                return true;
            }
            
            set({ error: 'No se pudo eliminar el partido' });
            return false;
        } catch (error) {
            set({ error: 'Error al eliminar el partido' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    clearError: () => set({ error: '' }),
    clearMatch: () => set({ match: null }),
}));