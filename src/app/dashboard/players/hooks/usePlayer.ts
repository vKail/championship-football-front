import { usePlayerStore } from "@/stores/player-store"
import Swal from "sweetalert2";
import { IPlayer } from "../interface/player.interface";


const usePlayers = () => {
    const {
        players,
        player,
        loading,
        error,
        fetchAllPlayers,
        fetchPlayerById,
        addPlayer,
        modifyPlayer,
        removePlayer,
        clearError,
        clearPlayer
    } = usePlayerStore();

    const handleGetAllPlayers = async () => {
        const success = await fetchAllPlayers();
        if (!success && error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error
            });
        }
    };

    const handleCreatePlayer = async (player: IPlayer) => {
        const success = await addPlayer(player);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Jugador creado',
                text: 'El jugador se ha creado correctamente',
            });
            return true;
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo crear el jugador'
        });
        return false;
    };

    const handleUpdatePlayer = async (player : IPlayer) => {
        const success = await modifyPlayer(player);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Jugador actualizado',
                text: 'El jugador se ha actualizado correctamente',
            });
            return true;
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo actualizar el jugador'
        });
        return false;
    };

    const handleDeletePlayer = async (playerId: number) => {    
        const success = await removePlayer(playerId);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Jugador eliminado',
                text: 'El jugador se ha eliminado correctamente',
            });
            return true;
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo eliminar el jugador'
        });
        return false;
    }

    return {
        players,
        player,
        loading,
        error,
        handleGetAllPlayers,
        handleCreatePlayer,
        handleUpdatePlayer,
        handleDeletePlayer,
        fetchPlayerById,
        clearError,
        clearPlayer
    };
}

export default usePlayers;