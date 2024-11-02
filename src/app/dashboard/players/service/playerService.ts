import { championshipApi } from "@/apis/championshipApi"
import { IPlayer } from "../interface/player.interface"


export const getAllPlayers = async () => {
    return await championshipApi.get('/players')
}

export const createPlayer = async (player : IPlayer) => {
    return await championshipApi.post('/players', player)
}

export const updatePlayer = async (player : IPlayer) => {
    return await championshipApi.put(`/players/${player.playerId}`, player)
}

export const deletePlayer = async (id : number) => {
    return await championshipApi.delete(`/players/${id}`)
}

export const getPlayerById = async (id : number) => {
    return await championshipApi.get(`/players/${id}`)
}