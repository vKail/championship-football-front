"use client";
import { use, useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { EditIcon } from "@/app/ui/EditIcon";
import { DeleteIcon } from "@/app/ui/DeleteIcon";
import { ITeam } from "../../interfaces/teams.interface";
import TeamForm from "../form/teamForm";
import useTeams from "../../hooks/useTeams";


export default function TeamTable() {
  const {teams, team, handleUpdateTeam, handleGetAllTeams, handleRemoveTeam} = useTeams();
  const [selectedTeam, setSelectedTeam] = useState<ITeam | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    handleGetAllTeams();
    
  }
  , []);

  const handleEdit = (team: ITeam) => {
    setSelectedTeam(team);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSaveTeam = (team: ITeam) => {
    if (isEdit) {
      handleUpdateTeam(team);
      console.log(team); 
    }
    setIsOpen(false);
    setSelectedTeam(null);
    setIsEdit(false);
  };

  const handleDelete = (team_id: number) => {
    handleRemoveTeam(team_id);
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
            <span onClick={() => handleDelete(team.teamId ?? 0)}>
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
          { uid: "teamId", name: "Team ID" },
          { uid: "name", name: "Team Name" },
          { uid: "actions", name: "Actions" },
        ]}>
          {(column) => (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={teams ?? []}>
          {(item) => (
            <TableRow key={item.teamId}>
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
