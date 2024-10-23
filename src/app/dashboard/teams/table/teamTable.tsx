"use client";
import { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { EditIcon } from "@/app/ui/EditIcon";
import { DeleteIcon } from "@/app/ui/DeleteIcon";
import { ITeam } from "../interfaces/teams.interface";
import TeamForm from "../form/teamForm";

// Datos iniciales de equipos
const initialTeams: ITeam[] = [
  { team_id: "T001", name: "Team A", dt: { dt_id: "D001", dni: "12345678", firstname: "Juan", lastname: "Pérez", team: "T001" }, category: { category_id: "C001", name: "Category A" } },
  // ... más equipos
];

export default function TeamTable() {
  const [teams, setTeams] = useState<ITeam[]>(initialTeams);
  const [selectedTeam, setSelectedTeam] = useState<ITeam | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = (team: ITeam) => {
    setSelectedTeam(team);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSaveTeam = (team: ITeam) => {
    if (isEdit) {
      setTeams((prev) => prev.map((t) => (t.team_id === team.team_id ? team : t)));
    } else {
      setTeams((prev) => [...prev, team]);
    }
    setIsOpen(false);
    setSelectedTeam(null);
    setIsEdit(false);
  };

  const handleDelete = (team_id: string) => {
    setTeams((prev) => prev.filter((t) => t.team_id !== team_id));
  };

  const renderCell = (team: ITeam, columnKey: keyof ITeam | "actions") => {
    const cellValue = team[columnKey as keyof ITeam];
    if (columnKey === "actions") {
      return (
        <div className="flex gap-2">
          <Tooltip content="Edit team">
            <span onClick={() => handleEdit(team)}>
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip content="Delete team">
            <span onClick={() => handleDelete(team.team_id)}>
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    }
    if (typeof cellValue === "object" && cellValue !== null) {
      return JSON.stringify(cellValue);
    }
    return cellValue as React.ReactNode;
  };

  return (
    <>
      <Table aria-label="Team table">
        <TableHeader columns={[
          { uid: "team_id", name: "Team ID" },
          { uid: "name", name: "Team Name" },
          { uid: "actions", name: "Actions" },
        ]}>
          {(column) => (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={teams}>
          {(item) => (
            <TableRow key={item.team_id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof ITeam | "actions")}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isOpen && (
        <TeamForm
          team={selectedTeam}
          isEdit={isEdit}
          onSave={handleSaveTeam}
          onClose={() => {
            setIsOpen(false);
            setSelectedTeam(null);
            setIsEdit(false);
          }}
        />
      )}
    </>
  );
}
