import { championshipApi } from "@/apis/championshipApi"
import axios from "axios"



export const sing_in = async (username: string, password: string) => {
    try {
        return await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/login`, { username, password })
        
    } catch (error) {
        console.error(error)
    }
}