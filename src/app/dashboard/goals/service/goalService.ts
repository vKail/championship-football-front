import { championshipApi } from "@/apis/championshipApi"
import { IGoal } from "../interface/goal.interface"


export const getAllGoals = async () => {
    return await championshipApi.get('/goals')
}

export const createGoal = async (goal : IGoal) => {
    return await championshipApi.post('/goals', goal)
}

export const updateGoal = async (goal : IGoal) => {
    return await championshipApi.put(`/goals/${goal.goalId}`, goal)
}

export const deleteGoal = async (id : number) => {
    return await championshipApi.delete(`/goals/${id}`)
}

export const getGoalById = async (id: number) => {
    return await championshipApi.get(`/goals/${id}`)
}