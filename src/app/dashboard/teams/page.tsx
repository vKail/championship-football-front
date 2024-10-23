'use client';
import { useState } from "react";
import { ITeam } from "./interfaces/teams.interface";
import TeamTable from "./table/teamTable";
import TeamForm from "./form/teamForm";


export default function Page() {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<ITeam | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreate = () => {
    setSelectedTeam(null);
    setIsEdit(false);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTeam(null);
    setIsEdit(false);
  };

  const handleSaveTeam = (team: ITeam) => {
    if (isEdit && selectedTeam) {
      setTeams((prev) =>
        prev.map((t) =>
          t.team_id === selectedTeam.team_id ? team : t
        )
      );
    } else {
      setTeams((prev) => [...prev, team]);
    }
    handleCloseForm();
  };

  const handleEditTeam = (team: ITeam) => {
    setSelectedTeam(team);
    setIsEdit(true);
    setIsFormOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Equipos</h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Crear Nuevo Equipo
        </button>
      </div>
      
      <TeamTable/>

      {isFormOpen && (
        <TeamForm
          team={selectedTeam}
          isEdit={isEdit}
          onSave={handleSaveTeam}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
