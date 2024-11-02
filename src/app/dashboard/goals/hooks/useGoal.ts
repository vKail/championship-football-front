import { useGoalStore } from "@/stores/goal-store"
import Swal from "sweetalert2";
import { IGoal } from "../interface/goal.interface";


const useGoal = () => {
    const {
        goals,
        goal,
        loading,
        error,
        fetchAllGoals,
        fetchGoalById,
        addGoal,
        modifyGoal,
        removeGoal,
        clearError,
        clearGoal
    } = useGoalStore();

    const handleGetAllGoals = async () => {
        const success = await fetchAllGoals();
        if (!success && error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error
            });
        }
    };

    const handleCreateGoal = async (goal : IGoal) => {
        const success = await addGoal(goal);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Meta creada',
                text: 'El gol se ha creado correctamente',
            });
            return true;
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo crear la meta'
        });
        return false;
    };

    const handleUpdateGoal = async (goal : IGoal) => {
        const success = await modifyGoal(goal);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Meta actualizada',
                text: 'El gol se ha actualizado correctamente',
            });
            return true;
        }
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo actualizar el gol'
        });
    };

    const handleRemoveGoal = async (goal : number) => {
        const success = await removeGoal(goal);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Meta eliminada',
                text: 'El gol se ha eliminado correctamente',
            });
            return true;
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo eliminar el gol'
        });
        return false;
    };

    return {
        goals,
        goal,
        loading,
        error,
        handleGetAllGoals,
        handleCreateGoal,
        handleUpdateGoal,
        handleRemoveGoal,
        fetchGoalById,
        clearError,
        clearGoal
    };
}