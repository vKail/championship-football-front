import axios from 'axios'

export const championshipApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ROUTE
})
championshipApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  })
