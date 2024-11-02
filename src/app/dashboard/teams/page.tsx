'use client';
import { useState } from "react";
import { ITeam } from "./interfaces/teams.interface";
import TeamTable from "./components/table/teamTable";
import TeamForm from "./components/form/teamForm";
import useTeams from "./hooks/useTeams";


export default function Page() {
  const {team, handleCreateTeam, handleGetAllTeams} = useTeams();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreate = () => {
   
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    
  };

  const handleSaveTeam = (team: ITeam) => {
    handleCreateTeam(team);
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
          team={null}
          isEdit={false}
          onSave={handleSaveTeam}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
