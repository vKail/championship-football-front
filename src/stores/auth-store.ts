
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IUser } from '../app/dashboard/users/interfaces/users.interfaces'

interface AuthState {
  token: string | null
  user: IUser | null
  isAuthenticated: boolean
  login: (token: string, user: any) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token, user) => 
        set({ 
          token, 
          user, 
          isAuthenticated: true 
        }),
      logout: () => 
        set({ 
          token: null, 
          user: null, 
          isAuthenticated: false 
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
