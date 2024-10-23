'use client';
import { useState } from "react";
import { IPlayer } from "./interface/player.interface";
import PlayerTable from "./table/playerTable";
import PlayerForm from "./form/playerForm";


export default function Page() {
  const [players, setPlayers] = useState<IPlayer[]>([]);
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
    if (isEdit && selectedPlayer) {
      setPlayers((prev) =>
        prev.map((p) =>
          p.dni === selectedPlayer.dni ? player : p
        )
      );
    } else {
      setPlayers((prev) => [...prev, player]);
    }
    handleCloseForm();
  };

  const handleEditPlayer = (player: IPlayer) => {
    setSelectedPlayer(player);
    setIsEdit(true);
    setIsFormOpen(true);
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
