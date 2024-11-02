import { ITeam } from "@/app/dashboard/teams/interfaces/teams.interface";
import { createTeam, deleteTeam, getAllTeams, getTeamById, updateTeam } from "@/app/dashboard/teams/service/teamService";
import { create } from "zustand";

interface TeamState {
    teams: ITeam[] | null;
    team: ITeam | null;
    loading: boolean;
    error: string | null;
    fetchAllTeams: () => Promise<boolean>;
    fetchTeamById: (id: number) => Promise<boolean>;
    addTeam: (team: ITeam) => Promise<boolean>;
    modifyTeam: (team: ITeam) => Promise<boolean>;
    removeTeam: (id: number) => Promise<boolean>;
    clearError: () => void;
    clearTeam: () => void;
}

export const useTeamStore = create<TeamState>()((set, get) => ({
    teams: null,
    team: null,
    loading: false,
    error: null,

    fetchAllTeams: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getAllTeams();
            
            if (response?.status === 200) {
                set({ teams: response.data });
                return true;
            }
            
            set({ error: 'No se pudieron obtener los equipos' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener equipos' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    fetchTeamById: async (id: number) => {
        try {
            set({ loading: true, error: null });
            const response = await getTeamById(id);
            
            if (response?.status === 200) {
                set({ team: response.data });
                return true;
            }
            
            set({ error: 'No se pudo obtener el equipo' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener el equipo' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    addTeam: async (team: ITeam) => {
        try {
            set({ loading: true, error: null });
            const response = await createTeam(team);
            
            if (response?.status === 200) {
                const currentTeams = get().teams || [];
                set({ 
                    teams: [...currentTeams, response.data],
                    team: response.data 
                });
                return true;
            }
            
            set({ error: 'No se pudo crear el equipo' });
            return false;
        } catch (error) {
            set({ error: 'Error al crear el equipo' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    modifyTeam: async (team: ITeam) => {
        try {
            set({ loading: true, error: null });
            const response = await updateTeam(team);
            
            if (response?.status === 200) {
                const currentTeams = get().teams || [];
                const updatedTeams = currentTeams.map(t => 
                    t.teamId === team.teamId ? response.data : t
                );
                set({ 
                    teams: updatedTeams,
                    team: response.data 
                });
                return true;
            }
            
            set({ error: 'No se pudo actualizar el equipo' });
            return false;
        } catch (error) {
            set({ error: 'Error al actualizar el equipo' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    removeTeam: async (id: number) => {
        try {
            set({ loading: true, error: null });
            const response = await deleteTeam(id);
            
            if (response?.status === 200) {
                const currentTeams = get().teams || [];
                set({ 
                    teams: currentTeams.filter(t => t.teamId !== id),
                    team: get().team?.teamId === id ? null : get().team
                });
                return true;
            }
            
            set({ error: 'No se pudo eliminar el equipo' });
            return false;
        } catch (error) {
            set({ error: 'Error al eliminar el equipo' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    clearError: () => set({ error: null }),
    clearTeam: () => set({ team: null })
}));