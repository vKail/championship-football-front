'user client'
import { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { EditIcon } from "@/app/ui/EditIcon";
import { DeleteIcon } from "@/app/ui/DeleteIcon";
import { IPlayer } from "../interface/player.interface";
import PlayerForm from "../form/playerForm";

// Datos iniciales de jugadores
const initialPlayers: IPlayer[] = [
  { player_id: "P001", dni: "12345678", firstname: "Carlos", lastname: "Sánchez", bib: "10", team: { team_id: "T001", name: "Team A", dt: { dt_id: "D001", dni: "12345678", firstname: "Juan", lastname: "Pérez", team: "T001" }, category: { category_id: "C001", name: "Category A" } } },
  // ... más jugadores
];

export default function PlayerTable() {
  const [players, setPlayers] = useState<IPlayer[]>(initialPlayers);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = (player: IPlayer) => {
    setSelectedPlayer(player);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSavePlayer = (player: IPlayer) => {
    if (isEdit) {
      setPlayers((prev) => prev.map((p) => (p.player_id === player.player_id ? player : p)));
      console.log("Editando jugador", player);
    } else {
      setPlayers((prev) => [...prev, player]);
    }
    setIsOpen(false);
    setSelectedPlayer(null);
    setIsEdit(false);
  };

  const handleDelete = (player_id: string) => {
    setPlayers((prev) => prev.filter((p) => p.player_id !== player_id));
  };

  const renderCell = (player: IPlayer, columnKey: keyof IPlayer | "actions") => {
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
            <span onClick={() => handleDelete(player.player_id)}>
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    }
  
    if (columnKey === "team") {
      return player.team ? player.team.name : "Sin equipo";
    }
  
    if (typeof cellValue === 'object' && cellValue !== null) {
      return JSON.stringify(cellValue); // Esto solo para columnas que puedan ser objetos no deseados
    }
  
    return cellValue;
  };
  

  return (
    <>
      <Table aria-label="Player table">
        <TableHeader columns={[
          { uid: "player_id", name: "Player ID" },
          { uid: "dni", name: "DNI" },
          { uid: "firstname", name: "Nombre" },
          { uid: "lastname", name: "Apellido" },
          { uid: "bib", name: "Bib" },
          { uid: "team", name: "Equipo" },
          { uid: "actions", name: "Acciones" },
        ]}>
          {(column) => (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={players}>
          {(item) => (
            <TableRow key={item.player_id}>
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
