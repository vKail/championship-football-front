'use client';
import { useState } from "react";
import { ILeaderboard } from "./interface/leaderboard.interface";
import LeaderboardTable from "./table/leaderboardTable";
import LeaderboardForm from "./form/leaderboardForm";

export default function Page() {
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
    if (isEdit && selectedLeaderboard) {
      setLeaderboards((prev) =>
        prev.map((l) =>
          l.leaderboard_id === selectedLeaderboard.leaderboard_id ? leaderboard : l
        )
      );
    } else {
      setLeaderboards((prev) => [...prev, leaderboard]);
    }
    handleCloseForm();
  };

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
          onClose={handleCloseForm} teams={[]} seasons={[]}        />
      )}
    </div>
  );
}
