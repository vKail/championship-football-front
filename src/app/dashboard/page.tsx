'use client';

import { useState } from "react";
import useLeaderboard from "./leaderboard/hooks/useLeaderboard";
import DashboardForm from "./components/form/dashboardForm";
import DashboardTable from "./components/table/dashboardTable";
import { Button } from "@nextui-org/button";

export default function Page() {
  const { leaderboards, handleFindLeaderboardsBySeasonAndCategory } = useLeaderboard();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const handleSaveForm = async (formData: { seasonId: number; categoryId: number }) => {
    await handleFindLeaderboardsBySeasonAndCategory(formData.seasonId, formData.categoryId);
    setIsFormOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Tabla de Posiciones</h1>
      
      <div className="flex justify-center mb-6">
        <Button 
          onClick={handleOpenForm}
          color="primary"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Selección de Tabla
        </Button>
      </div>
      
      <DashboardForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveForm}
      />

      <div className="mt-6">
        <DashboardTable leaderboards={leaderboards || []} />
      </div>
    </div>
  );
}
