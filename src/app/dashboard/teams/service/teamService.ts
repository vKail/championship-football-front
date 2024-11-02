import { championshipApi } from "@/apis/championshipApi"
import { ITeam } from "../interfaces/teams.interface"


export const getAllTeams = async () => {
    return await championshipApi.get('/teams')
}

export const createTeam = async (team : ITeam) => {
    return await championshipApi.post('/teams', team)
}

export const updateTeam = async (team : ITeam) => {
    return await championshipApi.put(`/teams/${team.teamId}`, team)
}

export const deleteTeam = async (id : number) => {
    return await championshipApi.delete(`/teams/${id}`)
}

export const getTeamById = async (id : number) => {
    return await championshipApi.get(`/teams/${id}`)
}

