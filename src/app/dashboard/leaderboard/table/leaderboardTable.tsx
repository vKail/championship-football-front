'use client'
import { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { EditIcon } from "@/app/ui/EditIcon";
import { DeleteIcon } from "@/app/ui/DeleteIcon";
import { ILeaderboard } from "../interface/leaderboard.interface";
import LeaderboardForm from "../form/leaderboardForm";

// Datos iniciales de tablas de posiciones
const initialLeaderboards: ILeaderboard[] = [
  {
    leaderboard_id: "LB001",
    season: { season_id: "S001", season_name: "Temporada 2024" },
    category: { category_id: "C001", name: "Category A" },
    team: { team_id: "T001", name: "Team A", dt: { dt_id: "D001", dni: "12345678", firstname: "Juan", lastname: "Pérez", team: "T001" }, category: { category_id: "C001", name: "Category A" } },
    points: 10,
    matches_won: 3,
    matches_draw: 1,
    matches_lost: 1,
    goals_scored: 10,
  },
  // ... más tablas
];

export default function LeaderboardTable() {
  const [leaderboards, setLeaderboards] = useState<ILeaderboard[]>(initialLeaderboards);
  const [selectedLeaderboard, setSelectedLeaderboard] = useState<ILeaderboard | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = (leaderboard: ILeaderboard) => {
    setSelectedLeaderboard(leaderboard);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSaveLeaderboard = (leaderboard: ILeaderboard) => {
    if (isEdit) {
      setLeaderboards((prev) => prev.map((l) => (l.leaderboard_id === leaderboard.leaderboard_id ? leaderboard : l)));
    } else {
      setLeaderboards((prev) => [...prev, leaderboard]);
    }
    setIsOpen(false);
    setSelectedLeaderboard(null);
    setIsEdit(false);
  };

  const handleDelete = (leaderboard_id: string) => {
    setLeaderboards((prev) => prev.filter((l) => l.leaderboard_id !== leaderboard_id));
  };

  const renderCell = (leaderboard: ILeaderboard, columnKey: keyof ILeaderboard | "actions") => {
    const cellValue = leaderboard[columnKey as keyof ILeaderboard];
  
    if (columnKey === "actions") {
      return (
        <div className="flex gap-2">
          <Tooltip content="Edit leaderboard">
            <span onClick={() => handleEdit(leaderboard)}>
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip content="Delete leaderboard">
            <span onClick={() => handleDelete(leaderboard.leaderboard_id)}>
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    }
  
    if (columnKey === "team") {
      return leaderboard.team ? leaderboard.team.name : "Sin equipo";
    }

    if (columnKey === "category") {
      return leaderboard.category ? leaderboard.category.name : "Sin categoría";
    }

    if (columnKey === "season") {
      return leaderboard.season ? leaderboard.season.season_name : "Sin temporada";
    }
  
    return typeof cellValue === 'object' && cellValue !== null ? JSON.stringify(cellValue) : cellValue as React.ReactNode;
  };
  

  return (
    <>
      <Table aria-label="Leaderboard table">
        <TableHeader columns={[
          { uid: "leaderboard_id", name: "Leaderboard ID" },
          { uid: "season", name: "Temporada" },
          { uid: "category", name: "Categoría" },
          { uid: "team", name: "Equipo" },
          { uid: "points", name: "Puntos" },
            { uid: "matches_won", name: "Partidos Ganados" },
            { uid: "matches_draw", name: "Partidos Empatados" },
            { uid: "matches_lost", name: "Partidos Perdidos" },
            { uid: "goals_scored", name: "Goles a favor" },
            { uid: "actions", name: "Acciones" },
        ]}>
          {(column) => (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={leaderboards}>
          {(item) => (
            <TableRow key={item.leaderboard_id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof ILeaderboard | "actions")}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isOpen && (
        <LeaderboardForm
          leaderboard={selectedLeaderboard}
          isEdit={isEdit}
          onSave={handleSaveLeaderboard}
          onClose={() => {
            setIsOpen(false);
            setSelectedLeaderboard(null);
            setIsEdit(false);
          }}
          teams={[]} // Pasar equipos aquí
          seasons={[]} // Pasar temporadas aquí
        />
      )}
    </>
  );
}
