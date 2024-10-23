'use client'
import { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { EditIcon } from "@/app/ui/EditIcon";
import { DeleteIcon } from "@/app/ui/DeleteIcon";

import GoalForm from "../form/goalForm";
import { IGoal } from "../interface/goal.interface";

// Datos iniciales de goles
const initialGoals: IGoal[] = [
  {
    goal_id: "G001",
    player: { player_id: "P001", firstname: "Carlos", lastname: "Sánchez", dni: "12345678", bib: "10", team: { team_id: "T001", name: "Team A", dt: { dt_id: "D001", dni: "12345678", firstname: "Juan", lastname: "Pérez", team: "T001" }, category: { category_id: "C001", name: "Category A" } } },
    match: { match_id: "M001", date: "2024-10-01", team_1: "Team A", team_2: "Team B", result: "2-1", status: "Finished", season: { season_id: "S001", season_name: "Season 2024" }, category: { category_id: "C001", name: "Category A" } },
    minute: 45,
    team: { team_id: "T001", name: "Team A", dt: { dt_id: "D001", dni: "12345678", firstname: "Juan", lastname: "Pérez", team: "T001" }, category: { category_id: "C001", name: "Category A" } },
  },
  // Más goles...
];

export default function GoalTable() {
  const [goals, setGoals] = useState<IGoal[]>(initialGoals);
  const [selectedGoal, setSelectedGoal] = useState<IGoal | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = (goal: IGoal) => {
    setSelectedGoal(goal);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSaveGoal = (goal: IGoal) => {
    if (isEdit) {
      setGoals((prevGoals) =>
        prevGoals.map((g) => (g.goal_id === goal.goal_id ? goal : g))
      );
    } else {
      setGoals((prevGoals) => [...prevGoals, goal]);
    }
    setIsOpen(false);
    setSelectedGoal(null);
    setIsEdit(false);
  };

  const handleDelete = (goal_id: string) => {
    setGoals((prevGoals) => prevGoals.filter((g) => g.goal_id !== goal_id));
  };

  const renderCell = (goal: IGoal, columnKey: keyof IGoal | "actions") => {
    const cellValue = goal[columnKey as keyof IGoal];

    switch (columnKey) {
      case "actions":
        return (
          <div className="flex gap-2">
            <Tooltip content="Edit goal">
              <span onClick={() => handleEdit(goal)}>
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip content="Delete goal">
              <span onClick={() => handleDelete(goal.goal_id)}>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
        case "player":
            return goal.player ? `${goal.player.firstname} ${goal.player.lastname}` : "Sin jugador";
        case "match":
            return goal.match ? `${goal.match.team_1} vs ${goal.match.team_2}` : "Sin partido";
        case "team":
          return goal ? goal.team.name : "Sin equipo";
      default:
        return typeof cellValue === "object" ? JSON.stringify(cellValue) : cellValue;
    }
  };

  return (
    <>
      <Table aria-label="Goals Table">
        <TableHeader columns={[
          { uid: "goal_id", name: "Goal ID" },
          { uid: "player", name: "Player" },
          { uid: "match", name: "Match" },
          { uid: "minute", name: "Minute" },
          { uid: "team", name: "Team" },
          { uid: "actions", name: "Actions" },
        ]}>
          {(column) => (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={goals}>
          {(item) => (
            <TableRow key={item.goal_id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof IGoal | "actions")}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isOpen && (
        <GoalForm
          goal={selectedGoal}
          isEdit={isEdit}
          onSave={handleSaveGoal}
          onClose={() => {
            setIsOpen(false);
            setSelectedGoal(null);
            setIsEdit(false);
          }}
        />
      )}
    </>
  );
}
