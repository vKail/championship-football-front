import { championshipApi } from "@/apis/championshipApi"
import { ISeason } from "../interface/season.interface"


export const getAllSeasons = async () => {
    return await championshipApi.get('/seasons')
}

export const createSeason = async (season : ISeason) => {
    return await championshipApi.post('/seasons', season)
}

export const updateSeason = async (season : ISeason) => {
    return await championshipApi.put(`/seasons/${season.seasonId}`, season)
}

export const deleteSeason = async (id : number) => {
    return await championshipApi.delete(`/seasons/${id}`)
}

export const getSeasonById = async (id : number) => {
    return await championshipApi.get(`/seasons/${id}`)
}
