import { championshipApi } from "@/apis/championshipApi"
import { ILeaderboard } from "../interface/leaderboard.interface"


export const getAllLeaderboard = async () => {
    return await championshipApi.get('/leaderboard')
}

export const createLeaderboard = async (leaderboard : ILeaderboard) => {
    return await championshipApi.post('/leaderboard', leaderboard)
}

export const updateLeaderboard = async (leaderboard : ILeaderboard) => {
    return await championshipApi.put(`/leaderboard/${leaderboard.leaderboard_id}`, leaderboard)
}

export const deleteLeaderboard = async (id : number) => {
    return await championshipApi.delete(`/leaderboard/${id}`)
}

export const getLeaderboardById = async (id : number) => {
    return await championshipApi.get(`/leaderboard/${id}`)
}