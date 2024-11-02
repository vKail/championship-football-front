import { useTeamStore } from "@/stores/team-store";
import Swal from "sweetalert2";
import { ITeam } from "../interfaces/teams.interface";


const useTeams = () => {
  const {
    teams,
    team,
    loading,
    error,
    fetchAllTeams,
    fetchTeamById,
    addTeam,
    modifyTeam,
    removeTeam,
    clearError,
    clearTeam
  } = useTeamStore();

    const handleGetAllTeams = async () => {
        const success = await fetchAllTeams();
        if (!success && error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error
        });
        }
    };

    const handleCreateTeam = async (team: ITeam) => {
        const success = await addTeam(team);
        if (success) {
        Swal.fire({
            icon: 'success',
            title: 'Equipo creado',
            text: 'El equipo se ha creado correctamente',
        });
        return true;
        } 
        
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error || 'No se pudo crear el equipo'
        });
        return false;
    };

    const handleUpdateTeam = async (team: ITeam) => {
        const success = await modifyTeam(team);
        if (success) {
        Swal.fire({
            icon: 'success',
            title: 'Equipo actualizado',
            text: 'El equipo se ha actualizado correctamente',
        });
        return true;
        }
        
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error || 'No se pudo actualizar el equipo'
        });
        return false;
    };

    const handleRemoveTeam = async (id: number) => {
        const success = await removeTeam(id);
        if (success) {
        Swal.fire({
            icon: 'success',
            title: 'Equipo eliminado',
            text: 'El equipo se ha eliminado correctamente',
        });
        return true;
        }
        
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error || 'No se pudo eliminar el equipo'
        });
        return false;
    };



    return {
        teams,
        team,
        loading,
        error,
        handleGetAllTeams,
        handleCreateTeam,
        handleUpdateTeam,
        handleRemoveTeam,
        fetchTeamById,
        removeTeam,
        clearError,
        clearTeam
    };
}

export default useTeams;