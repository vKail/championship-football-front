'use client';
import { useState } from "react";
import { IPlayer } from "./interface/player.interface";
import PlayerTable from "./components/table/playerTable";
import PlayerForm from "./components/form/playerForm";
import usePlayers from "./hooks/usePlayer";



export default function Page() {
  const {player, players, handleGetAllPlayers,  handleCreatePlayer} = usePlayers();
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreate = () => {
    setSelectedPlayer(null);
    setIsEdit(false);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedPlayer(null);
    setIsEdit(false);
  };

  const handleSavePlayer = (player: IPlayer) => {
    handleCreatePlayer(player);
    handleCloseForm();
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Jugadores</h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Crear Nuevo Jugador
        </button>
      </div>
      
      <PlayerTable  />

      {isFormOpen && (
        <PlayerForm
          player={selectedPlayer}
          isEdit={isEdit}
          onSave={handleSavePlayer}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
