'use client';
import { useState } from "react";
import { ISeason } from "./interface/season.interface";
import SeasonTable from "./table/seasonTable";
import SeasonForm from "./form/seasonForm";


export default function Page() {
  const [seasons, setSeasons] = useState<ISeason[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<ISeason | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreate = () => {
    setSelectedSeason(null);
    setIsEdit(false);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedSeason(null);
    setIsEdit(false);
  };

  const handleSaveSeason = (season: ISeason) => {
    if (isEdit && selectedSeason) {
      setSeasons((prev) =>
        prev.map((s) =>
          s.season_id === selectedSeason.season_id ? season : s
        )
      );
    } else {
      setSeasons((prev) => [...prev, season]);
    }
    handleCloseForm();
  };

  const handleEditSeason = (season: ISeason) => {
    setSelectedSeason(season);
    setIsEdit(true);
    setIsFormOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Temporadas</h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Crear Nueva Temporada
        </button>
      </div>
      
      <SeasonTable  />

      {isFormOpen && (
        <SeasonForm
          season={selectedSeason}
          isEdit={isEdit}
          onSave={handleSaveSeason}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
