import { championshipApi } from "@/apis/championshipApi"
import { ICategory } from "../interface/categories.interface"


export const getAllCategories = async () => {
    return await championshipApi.get('/categories')
}

export const createCategory = async (category : ICategory) => {
    return await championshipApi.post('/categories', category)
}

export const updateCategory = async (category : ICategory) => {
    return await championshipApi.put(`/categories/${category.categoryId}`, category)
}

export const deleteCategory = async (id : number) => {
    return await championshipApi.delete(`/categories/${id}`)
}

export const getCategoryById = async (id : number) => {
    return await championshipApi.get(`/categories/${id}`)
}