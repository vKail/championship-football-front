'use client';
import { useState } from "react";
import { IGoal } from "./interface/goal.interface";
import GoalTable from "./table/goalTable";
import GoalForm from "./form/goalForm";


export default function GoalPage() {
  const [goals, setGoals] = useState<IGoal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<IGoal | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreate = () => {
    setSelectedGoal(null);
    setIsEdit(false);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedGoal(null);
    setIsEdit(false);
  };

  const handleSaveGoal = (goal: IGoal) => {
    if (isEdit && selectedGoal) {
      setGoals((prev) =>
        prev.map((g) =>
          g.goal_id === selectedGoal.goal_id ? goal : g
        )
      );
    } else {
      setGoals((prev) => [...prev, goal]);
    }
    handleCloseForm();
  };

  const handleEditGoal = (goal: IGoal) => {
    setSelectedGoal(goal);
    setIsEdit(true);
    setIsFormOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Goles</h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Crear Nuevo Gol
        </button>
      </div>

      <GoalTable />

      {isFormOpen && (
        <GoalForm
          goal={selectedGoal}
          isEdit={isEdit}
          onSave={handleSaveGoal}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
