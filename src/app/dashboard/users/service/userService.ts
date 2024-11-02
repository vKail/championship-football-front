import { championshipApi } from "@/apis/championshipApi"
import { IUser } from "../interfaces/users.interfaces"

export const getAllUsers = async () => {
    try {
        return await championshipApi.get('/users')
    } catch (error) {
        console.error(error)
    }
}

export const createUser = async (user: IUser) => {
    try {
        return await championshipApi.post('/users', user)
    } catch (error) {
        console.error(error)
    }
}

export const updateUser = async (user: IUser) => {
    try {
        return await championshipApi.put(`/users/${user.userId}`, user)
    } catch (error) {
        console.error(error)
    }
}

export const deleteUser = async (id: number) => {
    try {
        return await championshipApi.delete(`/users/${id}`)
    } catch (error) {
        console.error(error)
    }
}

export const getUserById = async (id: number) => {
    try {
        return await championshipApi.get(`/users/${id}`)
    } catch (error) {
        console.error(error)
    }
}

