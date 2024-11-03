'use client';
import { useState } from "react";

import { IMatch } from "./interface/matches.interface";
import MatchTable from "./components/table/matchTable";
import MatchForm from "./components/form/matchForm";
import useMatch from "./hooks/useMatch";

export default function Page() {
  const {handleCreateMatch} = useMatch();
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<IMatch | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreate = () => {
    setSelectedMatch(null);
    setIsEdit(false);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedMatch(null);
    setIsEdit(false);
  };

  const handleSaveMatch = (match: IMatch) => {
    handleCreateMatch(match);
    handleCloseForm();
  };

  const handleEditMatch = (match: IMatch) => {
    setSelectedMatch(match);
    setIsEdit(true);
    setIsFormOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Partidos</h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Crear Nuevo Partido
        </button>
      </div>
      
      <MatchTable  />

      {isFormOpen && (
        <MatchForm
          match={selectedMatch}
          isEdit={isEdit}
          onSave={handleSaveMatch}
          onClose={handleCloseForm} 
        />
      )}
    </div>
  );
}
