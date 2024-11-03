import { championshipApi } from "@/apis/championshipApi"
import { ILeaderboard } from "../interface/leaderboard.interface"


export const getAllLeaderboard = async () => {
    return await championshipApi.get('/leaderboards')
}

export const createLeaderboard = async (leaderboard : ILeaderboard) => {
    return await championshipApi.post('/leaderboards', leaderboard)
}

export const updateLeaderboard = async (leaderboard : ILeaderboard) => {
    return await championshipApi.put(`/leaderboards/${leaderboard.leaderboardId}`, leaderboard)
}

export const deleteLeaderboard = async (id : number) => {
    return await championshipApi.delete(`/leaderboards/${id}`)
}

export const getLeaderboardById = async (id : number) => {
    return await championshipApi.get(`/leaderboards/${id}`)
}

export const getLeaderboardsBySeasonAndCategory = async (seasonId : number, categoryId : number) => {
    return await championshipApi.get(`/leaderboards/season/${seasonId}/category/${categoryId}`)
}