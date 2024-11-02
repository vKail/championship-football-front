import { ISeason } from "@/app/dashboard/seasons/interface/season.interface";
import { createSeason, deleteSeason, getAllSeasons, getSeasonById, updateSeason } from "@/app/dashboard/seasons/service/seasonService";
import { create } from "zustand";


interface SeasonState {
    seasons: ISeason[] | null;
    season: ISeason | null;
    loading: boolean;
    error: string | null;
    fetchAllSeasons: () => Promise<boolean>;
    fetchSeasonById: (id: number) => Promise<boolean>;
    addSeason: (season: ISeason) => Promise<boolean>;
    modifySeason: (season: ISeason) => Promise<boolean>;
    removeSeason: (id: number) => Promise<boolean>;
    clearError: () => void;
    clearSeason: () => void;
}

export const useSeasonStore = create<SeasonState>((set, get) => ({
    seasons: null,
    season: null,
    loading: false,
    error: null,

    fetchAllSeasons: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getAllSeasons();
            
            if (response?.status === 200) {
                set({ seasons: response.data });
                return true;
            }
            
            set({ error: 'No se pudieron obtener las temporadas' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener temporadas' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    fetchSeasonById: async (id: number) => {
        try {
            set({ loading: true, error: null });
            const response = await getSeasonById(id);
            
            if (response?.status === 200) {
                set({ season: response.data });
                return true;
            }
            
            set({ error: 'No se pudo obtener la temporada' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener la temporada' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    addSeason: async (season: ISeason) => {
        try {
            set({ loading: true, error: null });
            const response = await createSeason(season);
            
            if (response?.status === 201) {
                const currentSeasons = get().seasons || [];
                set({ seasons: [...currentSeasons, response.data],
                    season: response.data
                 });
                return true;
            }
            
            set({ error: 'No se pudo crear la temporada' });
            return false;
        } catch (error) {
            set({ error: 'Error al crear la temporada' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    modifySeason: async (season: ISeason) => {
        try {
            set({ loading: true, error: null });
            const response = await updateSeason(season);
            
            if (response?.status === 200) {
               const currentSeasons = get().seasons || [];
                const updatedSeasons = currentSeasons.map(s => s.season_id === season.season_id ? season : s);
                set({ seasons: updatedSeasons, season: response.data });
                return true;
            }
            
            set({ error: 'No se pudo modificar la temporada' });
            return false;
        } catch (error) {
            set({ error: 'Error al modificar la temporada' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    removeSeason: async (id: number) => {
        try {
            set({ loading: true, error: null });
            const response = await deleteSeason(id);
            
            if (response?.status === 200) {
                const currentSeasons = get().seasons || [];
                set({ seasons: currentSeasons.filter(s => s.season_id !== id.toString()),
                    season: get().season?.season_id === id.toString() ? null : get().season
                 });
                return true;
            }
            
            set({ error: 'No se pudo eliminar la temporada' });
            return false;
        } catch (error) {
            set({ error: 'Error al eliminar la temporada' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    clearError: () => set({ error: null }),
    clearSeason: () => set({ season: null })
}))

