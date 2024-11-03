import { useLeaderboardaStore } from "@/stores/leaderboard-store"
import Swal from "sweetalert2";
import { ILeaderboard } from "../interface/leaderboard.interface";


const useLeaderboard = () => {
    const {
        leaderboards,
        leaderboard,
        loading,
        error,
        fetchAllLeaderboards,
        fetchLeaderboardById,
        addLeaderboard,
        modifyLeaderboard,
        removeLeaderboard,
        clearError,
        clearLeaderboard, 
        findLeaderboardsBySeasonAndCategory
    } = useLeaderboardaStore();

    const handleGetAllLeaderboards = async () => {
        const success = await fetchAllLeaderboards();
        if (!success && error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error
            });
        }
    };

    const handleCreateLeaderboard = async (leaderboard : ILeaderboard) => {
        const success = await addLeaderboard(leaderboard);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Leaderboard creado',
                text: 'El leaderboard se ha creado correctamente',
            });
            return true;
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo crear el leaderboard'
        });
        return false;
    };


    const handleUpdateLeaderboard = async (leaderboard : ILeaderboard) => {
        const success = await modifyLeaderboard(leaderboard);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Leaderboard actualizado',
                text: 'El leaderboard se ha actualizado correctamente',
            });
            
            return true;
        }
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo actualizar la tabla'
        });
    }

    const handleRemoveLeaderboard = async (leaderboard : number) => {
        const success = await removeLeaderboard(leaderboard);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Leaderboard eliminado',
                text: 'El leaderboard se ha eliminado correctamente',
            });
            return true;
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo eliminar el leaderboard'
        });
        return false;
    }

    const handleFindLeaderboardsBySeasonAndCategory = async (seasonId : number, categoryId : number) => {  
        const success = await findLeaderboardsBySeasonAndCategory(seasonId, categoryId);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Leaderboard encontrado',
                text: 'El leaderboard se ha encontrado correctamente',
            });
            return true;
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo encontrar la tabla'
        });
        return false;


    }



    return {
        leaderboards,
        leaderboard,
        loading,
        error,
        handleGetAllLeaderboards,
        handleCreateLeaderboard,
        handleUpdateLeaderboard,
        handleRemoveLeaderboard,
        fetchLeaderboardById,
        handleFindLeaderboardsBySeasonAndCategory,
        clearError,
        clearLeaderboard
    }
}

export default useLeaderboard;
