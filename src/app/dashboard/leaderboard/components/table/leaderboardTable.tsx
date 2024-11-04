'use client'
import { use, useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { EditIcon } from "@/app/ui/EditIcon";
import { DeleteIcon } from "@/app/ui/DeleteIcon";
import { ILeaderboard } from "../../interface/leaderboard.interface";
import LeaderboardForm from "../form/leaderboardForm";
import useLeaderboard from "../../hooks/useLeaderboard";

// Datos iniciales de tablas de posiciones

export default function LeaderboardTable() {
  const {leaderboards, handleRemoveLeaderboard, handleUpdateLeaderboard, handleGetAllLeaderboards} = useLeaderboard();
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
      handleUpdateLeaderboard(leaderboard);
    }
    setIsOpen(false);
    setSelectedLeaderboard(null);
    setIsEdit(false);
  };

  const handleDelete = (leaderboardId: number) => {
    handleRemoveLeaderboard(leaderboardId);
  };

  useEffect(() => {
    handleGetAllLeaderboards();
  }, []);


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
            <span onClick={() => handleDelete(leaderboard.leaderboardId ?? 0)}>
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    }
    return typeof cellValue === 'object' && cellValue !== null ? JSON.stringify(cellValue) : cellValue as React.ReactNode;
  };
  

  return (
    <>
      <Table aria-label="Leaderboard table">
        <TableHeader columns={[
          { uid: "leaderboardId", name: "Leaderboard ID" },
          { uid: "seasonName", name: "Temporada" },
          { uid: "category", name: "Categoría" },
          { uid: "teamName", name: "Equipo" },
          { uid: "points", name: "Puntos" },
            { uid: "matchesWon", name: "Partidos Ganados" },
            { uid: "matchesDrawn", name: "Partidos Empatados" },
            { uid: "matchesLost", name: "Partidos Perdidos" },
            { uid: "goalsScored", name: "Goles a favor" },
            { uid: "actions", name: "Acciones" },
        ]}>
          {(column) => (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={leaderboards ?? []}>
          {(item) => (
            <TableRow key={item.leaderboardId}>
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
        />
      )}
    </>
  );
}
