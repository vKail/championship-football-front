import { useMatchStore } from "@/stores/match-store";
import Swal from "sweetalert2";
import { IMatch } from "../interface/matches.interface";


const useMatch = () => {
    const {
        matches,
        match,
        loading,
        error,
        fetchAllMatches,
        fetchMatchById,
        addMatch,
        modifyMatch,
        removeMatch,
        clearError,
        clearMatch
    } = useMatchStore();

    const handleGetAllMatches = async () => {
        const success = await fetchAllMatches();
        if (!success && error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error
            });
        }
    };

    const handleCreateMatch = async (match: IMatch) => {
        const success = await addMatch(match);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Partido creado',
                text: 'El partido se ha creado correctamente',
            });
            return true;
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo crear el partido'
        });
        return false;
    };

    const handleUpdateMatch = async (match: IMatch) => {
        const success = await modifyMatch(match);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Partido actualizado',
                text: 'El partido se ha actualizado correctamente',
            });
            return true;
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo actualizar el partido'
        });
        return false;
    };

    const handleRemoveMatch = async (id: number) => {
        const success = await removeMatch(id);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Partido eliminado',
                text: 'El partido se ha eliminado correctamente',
            });
            return true;
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo eliminar el partido'
        });
        return false;
    }

    return {
        matches,
        match,
        loading,
        error,
        handleGetAllMatches,
        handleCreateMatch,
        handleUpdateMatch,
        handleRemoveMatch,
        clearError,
        clearMatch
    };
}

export default useMatch;