import { championshipApi } from "@/apis/championshipApi"
import { IDt } from "../interfaces/dts.interface"


export const getAllDts = async () => {
    return await championshipApi.get('/dts')
}

export const createDt = async (dt : IDt) => {
    return await championshipApi.post('/dts', dt)
}

export const updateDt = async (dt : IDt) => {
    return await championshipApi.put(`/dts/${dt.dt_id}`, dt)
}

export const deleteDt = async (id : number) => {
    return await championshipApi.delete(`/dts/${id}`)
}

export const getDtById = async (id: number) => {
    return await championshipApi.get(`/dts/${id}`)
}