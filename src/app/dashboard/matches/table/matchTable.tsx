'use client'
import { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { EditIcon } from "@/app/ui/EditIcon";
import { DeleteIcon } from "@/app/ui/DeleteIcon";
import { IMatch } from "../interface/matches.interface";
import MatchForm from "../form/matchForm";


// Datos iniciales de partidos
const initialMatches: IMatch[] = [
  {
    match_id: "M001",
    date: "2024-10-22",
    team_1: "Team A",
    team_2: "Team B",
    result: "1-0",
    status: "Finalizado",
    season: { season_id: "S001", season_name: "Temporada 2024" },
    category: { category_id: "C001", name: "Category A" },
  },
  // ... más partidos
];

export default function MatchTable() {
  const [matches, setMatches] = useState<IMatch[]>(initialMatches);
  const [selectedMatch, setSelectedMatch] = useState<IMatch | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = (match: IMatch) => {
    setSelectedMatch(match);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSaveMatch = (match: IMatch) => {
    if (isEdit) {
      setMatches((prev) => prev.map((m) => (m.match_id === match.match_id ? match : m)));
    } else {
      setMatches((prev) => [...prev, match]);
    }
    setIsOpen(false);
    setSelectedMatch(null);
    setIsEdit(false);
  };

  const handleDelete = (match_id: string) => {
    setMatches((prev) => prev.filter((m) => m.match_id !== match_id));
  };

  const renderCell = (match: IMatch, columnKey: keyof IMatch | "actions") => {
    const cellValue = match[columnKey as keyof IMatch];
    if (columnKey === "actions") {
      return (
        <div className="flex gap-2">
          <Tooltip content="Edit match">
            <span onClick={() => handleEdit(match)}>
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip content="Delete match">
            <span onClick={() => handleDelete(match.match_id)}>
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    }
    if (typeof cellValue === 'object' && cellValue !== null) {
      return JSON.stringify(cellValue);
    }
    return cellValue as React.ReactNode;
  };

  return (
    <>
      <Table aria-label="Match table">
        <TableHeader columns={[
          { uid: "match_id", name: "Match ID" },
          { uid: "date", name: "Date" },
          { uid: "team_1", name: "Equipo 1" },
          { uid: "team_2", name: "Equipo 2" },
          { uid: "result", name: "Resultado" },
          { uid: "status", name: "Estado" },
          { uid: "actions", name: "Acciones" },
        ]}>
          {(column) => (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={matches}>
          {(item) => (
            <TableRow key={item.match_id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof IMatch | "actions")}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isOpen && (
        <MatchForm
          match={selectedMatch}
          isEdit={isEdit}
          onSave={handleSaveMatch}
          onClose={() => {
            setIsOpen(false);
            setSelectedMatch(null);
            setIsEdit(false);
          }}
          teams={[]} // Pasar equipos aquí
          seasons={[]} // Pasar temporadas aquí
        />
      )}
    </>
  );
}
