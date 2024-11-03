'use client'
import { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { EditIcon } from "@/app/ui/EditIcon";
import { DeleteIcon } from "@/app/ui/DeleteIcon";
import { IGoal, IGoalsResponse } from "../../interface/goal.interface";
import GoalForm from "../form/goalForm";
import useGoal from "../../hooks/useGoal";
import useMatch from "@/app/dashboard/matches/hooks/useMatch";

export default function GoalTable() {
  const {fetchMatchById} = useMatch();
  const {goals, handleGetAllGoals, handleUpdateGoal, handleRemoveGoal} = useGoal();
  const [selectedGoal, setSelectedGoal] = useState<IGoal | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    handleGetAllGoals();
  }, []);

  const handleEdit = (goal: IGoal) => {
    setSelectedGoal(goal);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSaveGoal = (goal: IGoal) => {
    if (isEdit) {
      handleUpdateGoal(goal);
    } 
    setIsOpen(false);
    setSelectedGoal(null);
    setIsEdit(false);
  };

  const handleDelete = (goalId : number) => {
    handleRemoveGoal(goalId ?? 0);
  };

  const renderCell = (goal: IGoalsResponse, columnKey: keyof IGoalsResponse | "actions") => {
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
              <span onClick={() => handleDelete(goal.goalId ?? 0)}>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return typeof cellValue === "object" ? JSON.stringify(cellValue) : cellValue;
    }
  };

  return (
    <>
      <Table aria-label="Goals Table">
        <TableHeader columns={[
          { uid: "goalId", name: "Goal ID" },
          { uid: "playerName", name: "Player" },
          { uid: "matchId", name: "Match" },
          { uid: "minute", name: "Minute" },
          { uid: "teamName", name: "Team" },
          { uid: "actions", name: "Actions" },
        ]}>
          {(column) => (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={goals ?? []}>
          {(item) => (
            <TableRow key={item.goalId ?? 0}>
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
