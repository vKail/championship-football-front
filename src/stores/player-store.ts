import { IPlayer, IPlayerResponse } from "@/app/dashboard/players/interface/player.interface";
import { createPlayer, deletePlayer, getAllPlayers, getPlayerById, updatePlayer } from "@/app/dashboard/players/service/playerService";
import { create } from "zustand";


interface PlayerState {
    players: IPlayerResponse[] | null;
    player: IPlayerResponse | null;
    loading: boolean;
    error: string | null;
    fetchAllPlayers: () => Promise<boolean>;
    fetchPlayerById: (id: number) => Promise<boolean>;
    addPlayer: (player: IPlayer) => Promise<boolean>;
    modifyPlayer: (player: IPlayer) => Promise<boolean>;
    removePlayer: (id: number) => Promise<boolean>;
    clearError: () => void;
    clearPlayer: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
    players: null,
    player: null,
    loading: false,
    error: null,

    fetchAllPlayers: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getAllPlayers();
            
            if (response?.status === 200) {
                set({ players: response.data });
                return true;
            }
            
            set({ error: 'No se pudieron obtener los jugadores' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener jugadores' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    fetchPlayerById: async (id: number) => {
        try {
            set({ loading: true, error: null });
            const response = await getPlayerById(id);
            
            if (response?.status === 200) {
                set({ player: response.data });
                return true;
            }
            
            set({ error: 'No se pudo obtener el jugador' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener el jugador' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    addPlayer: async (player: IPlayer) => {
        try {
            set({ loading: true, error: null });
            const response = await createPlayer(player);
            
            if (response?.status === 200) {
                const currentPlayers = get().players || [];
                set({ 
                    players: [...currentPlayers, response.data],
                    player: response.data
                 });
                return true;
            }
            
            set({ error: 'No se pudo crear el jugador' });
            return false;
        } catch (error) {
            set({ error: 'Error al crear el jugador' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    modifyPlayer: async (player: IPlayer) => {
        try {
            set({ loading: true, error: null });
            const response = await updatePlayer(player);
            
            if (response?.status === 200) {
                const currentPlayers = get().players || [];
                const updatedPlayers = currentPlayers.map(p => p.playerId === player.playerId ? { ...p, ...player } : p);
                set({ 
                    players: updatedPlayers,
                    player: response.data
                 });
                return true;
            }
            
            set({ error: 'No se pudo modificar el jugador' });
            return false;
        } catch (error) {
            set({ error: 'Error al modificar el jugador' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    removePlayer: async (id: number) => {
        try {
            set({ loading: true, error: null });
            const response = await deletePlayer(id);
            
            if (response?.status === 200) {
                const currentPlayers = get().players || [];
                set({ 
                    players: currentPlayers.filter(p => p.playerId !== id),
                    player: get().player?.playerId === id ? null : get().player
                 });
                
                return true;
            }
            
            set({ error: 'No se pudo eliminar el jugador' });
            return false;
        } catch (error) {
            set({ error: 'Error al eliminar el jugador' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    clearError: () => set({ error: null }),
    clearPlayer: () => set({ player: null }),
}))
