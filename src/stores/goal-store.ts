import { IGoal } from "@/app/dashboard/goals/interface/goal.interface";
import { createGoal, deleteGoal, getAllGoals, getGoalById, updateGoal } from "@/app/dashboard/goals/service/goalService";
import { create } from "zustand";


interface GoalState {
    goals: IGoal[] | null;
    goal: IGoal | null;
    loading: boolean;
    error: string | null;
    fetchAllGoals: () => Promise<boolean>;
    fetchGoalById: (id: number) => Promise<boolean>;
    addGoal: (goal: IGoal) => Promise<boolean>;
    modifyGoal: (goal: IGoal) => Promise<boolean>;
    removeGoal: (id: number) => Promise<boolean>;
    clearError: () => void;
    clearGoal: () => void;
}

export const useGoalStore = create<GoalState>((set, get) => ({
    goals: null,
    goal: null,
    loading: false,
    error: null,

    fetchAllGoals: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getAllGoals();
            
            if (response?.status === 200) {
                set({ goals: response.data });
                return true;
            }
            
            set({ error: 'No se pudieron obtener las metas' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener metas' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    fetchGoalById: async (id: number) => {
        try {
            set({ loading: true, error: null });
            const response = await getGoalById(id);
            
            if (response?.status === 200) {
                set({ goal: response.data });
                return true;
            }
            
            set({ error: 'No se pudo obtener la meta' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener la meta' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    addGoal: async (goal: IGoal) => {
        try {
            set({ loading: true, error: null });
            const response = await createGoal(goal);
            
            if (response?.status === 200) {
                const currentGoals = get().goals || [];
                set({ goals: [...currentGoals, response.data], goal: response.data });
                return true;
            }
            
            set({ error: 'No se pudo agregar la meta' });
            return false;
        } catch (error) {
            set({ error: 'Error al agregar la meta' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    modifyGoal: async (goal: IGoal) => {
        try {
            set({ loading: true, error: null });
            const response = await updateGoal(goal);
            
            if (response?.status === 200) {
                const currentGoals = get().goals || [];
                const updatedGoals = currentGoals.map(g => g.goal_id === goal.goal_id ? goal : g);
                set({ goals: updatedGoals, goal : response.data });
                return true;
            }
            
            set({ error: 'No se pudo modificar la meta' });
            return false;
        } catch (error) {
            set({ error: 'Error al modificar la meta' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    removeGoal: async (id: number) => {
        try {
            set({ loading: true, error: null });
            const response = await deleteGoal(id);
            
            if (response?.status === 204) {
                const currentGoals = get().goals || [];
                set({ 
                    goals: currentGoals.filter(g => g.goal_id !== id.toString()), 
                    goal: get().goal?.goal_id === id.toString() ? null : get().goal
                 });
                return true;
            }
            
            set({ error: 'No se pudo eliminar la meta' });
            return false;
        } catch (error) {
            set({ error: 'Error al eliminar la meta' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    clearError: () => set({ error: null }),
    clearGoal: () => set({ goal: null })

}));