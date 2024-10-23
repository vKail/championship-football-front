'use client';
import { useState } from "react";

import { IMatch } from "./interface/matches.interface";
import MatchTable from "./table/matchTable";
import MatchForm from "./form/matchForm";

export default function Page() {
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
    if (isEdit && selectedMatch) {
      setMatches((prev) =>
        prev.map((m) =>
          m.match_id === selectedMatch.match_id ? match : m
        )
      );
    } else {
      setMatches((prev) => [...prev, match]);
    }
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
          onClose={handleCloseForm} teams={[]} seasons={[]}        />
      )}
    </div>
  );
}
