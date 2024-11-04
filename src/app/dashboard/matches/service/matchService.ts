import { championshipApi } from "@/apis/championshipApi"
import { IMatch } from "../interface/matches.interface"


export const getAllMatches = async () => {
    return await championshipApi.get('/matches')
}

export const createMatch = async (match : IMatch) => {
    return await championshipApi.post('/matches', match)
}

export const updateMatch = async (matchId : number , updateData: Partial<IMatch>) => {
    return await championshipApi.put(`/matches/${matchId}`, updateData)
}

export const deleteMatch = async (id : number) => {
    return await championshipApi.delete(`/matches/${id}`)
}

export const getMatchById = async (id : number) => {
    return await championshipApi.get(`/matches/${id}`)
}