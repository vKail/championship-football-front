import { useSeasonStore } from "@/stores/season-store"
import Swal from "sweetalert2";
import { ISeason } from "../interface/season.interface";

const useSeason = () => {
    const {
        seasons,
        season,
        loading,
        error,
        fetchAllSeasons,
        fetchSeasonById,
        addSeason,
        modifySeason,
        removeSeason,
        clearError,
        clearSeason
    } = useSeasonStore();

    const handleGetAllSeasons = async () => {
        const success = await fetchAllSeasons();
        if (!success && error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error
            });
        }
    };

    const handleCreateSeason = async (season: ISeason) => {
        const success = await addSeason(season);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Temporada creada',
                text: 'La temporada se ha creado correctamente',
            });
            return true;
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo crear la temporada'
        });
        return false;
    };

    const handleUpdateSeason = async (season: ISeason) => {
        const success = await modifySeason(season);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Temporada actualizada',
                text: 'La temporada se ha actualizado correctamente',
            });
            return true;
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo actualizar la temporada'
        });
        return false;
    };

    const handleDeleteSeason = async (id: number) => {
        const success = await removeSeason(id);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Temporada eliminada',
                text: 'La temporada se ha eliminado correctamente',
            });
            return true;
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo eliminar la temporada'
        });
        return false;
    };

    return {
        seasons,
        season,
        loading,
        error,
        handleGetAllSeasons,
        handleCreateSeason,
        handleUpdateSeason,
        handleDeleteSeason,
        fetchSeasonById,
        clearError,
        clearSeason

    };
}

export default useSeason;