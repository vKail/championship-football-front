'use client'

import { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { EditIcon } from "@/app/ui/EditIcon";
import { DeleteIcon } from "@/app/ui/DeleteIcon";
import { IPlayer, IPlayerResponse } from "../../interface/player.interface";
import PlayerForm from "../form/playerForm";
import usePlayers from "../../hooks/usePlayer";

export default function PlayerTable() {
  const { players, handleGetAllPlayers, handleUpdatePlayer, handleDeletePlayer } = usePlayers();
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    handleGetAllPlayers();
    
  }, []);

  const handleEdit = (player: IPlayerResponse) => {
    setSelectedPlayer(player);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSavePlayer = (player: IPlayer) => {
      handleUpdatePlayer(player);
    setIsOpen(false);
    setSelectedPlayer(null);
    setIsEdit(false);
  };

  const handleDelete = (player_id: number) => {
    handleDeletePlayer(player_id);
  };

  const renderCell = (player: IPlayerResponse, columnKey: keyof IPlayerResponse | "actions") => {
    const cellValue = player[columnKey as keyof IPlayer];
    
    if (columnKey === "actions") {
      return (
        <div className="flex gap-2">
          <Tooltip content="Edit player">
            <span onClick={() => handleEdit(player)}>
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip content="Delete player">
            <span onClick={() => handleDelete(player.playerId ?? 0)}>
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    }

    if (columnKey === "teamName") {
      return player.teamName || "Sin equipo";
    }

    if (typeof cellValue === "object" && cellValue !== null) {
      return JSON.stringify(cellValue);
    }

    return cellValue as React.ReactNode;
  };

  return (
    <>
      <Table aria-label="Player table">
        <TableHeader columns={[
          { uid: "playerId", name: "Player ID" },
          { uid: "dni", name: "DNI" },
          { uid: "firstname", name: "Nombre" },
          { uid: "lastname", name: "Apellido" },
          { uid: "bib", name: "Bib" },
          { uid: "teamName", name: "Equipo" },
          { uid: "categoryName", name: "Categoría" },
          { uid: "actions", name: "Acciones" }
        ]}>
          {(column) => (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={players ?? []}>
          {(item) => (
            <TableRow key={item.playerId}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof IPlayer | "actions")}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isOpen && (
        <PlayerForm
          player={selectedPlayer}
          isEdit={isEdit}
          onSave={handleSavePlayer}
          onClose={() => {
            setIsOpen(false);
            setSelectedPlayer(null);
            setIsEdit(false);
          }}
        />
      )}
    </>
  );
}