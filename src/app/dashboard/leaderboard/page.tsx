'use client';
import { useState } from "react";
import { ILeaderboard } from "./interface/leaderboard.interface";
import LeaderboardTable from "./components/table/leaderboardTable";
import LeaderboardForm from "./components/form/leaderboardForm";
import useLeaderboard from "./hooks/useLeaderboard";

export default function Page() {
  const {handleCreateLeaderboard} = useLeaderboard();
  const [leaderboards, setLeaderboards] = useState<ILeaderboard[]>([]);
  const [selectedLeaderboard, setSelectedLeaderboard] = useState<ILeaderboard | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreate = () => {
    setSelectedLeaderboard(null);
    setIsEdit(false);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedLeaderboard(null);
    setIsEdit(false);
  };

  const handleSaveLeaderboard = (leaderboard: ILeaderboard) => {
    handleCreateLeaderboard(leaderboard);
    handleCloseForm();
}
  const handleEditLeaderboard = (leaderboard: ILeaderboard) => {
    setSelectedLeaderboard(leaderboard);
    setIsEdit(true);
    setIsFormOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Clasificaciones</h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Crear Nueva Clasificación
        </button>
      </div>
      
      <LeaderboardTable  />

      {isFormOpen && (
        <LeaderboardForm
          leaderboard={selectedLeaderboard}
          isEdit={isEdit}
          onSave={handleSaveLeaderboard}
          onClose={handleCloseForm}         />
      )}
    </div>
  );
}

