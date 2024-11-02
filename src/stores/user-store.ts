import { create } from "zustand";
import { IUser } from "@/app/dashboard/users/interfaces/users.interfaces";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser} from "@/app/dashboard/users/service/userService";


interface UserState {
    // Estado
    users: IUser[] | null;
    user: IUser | null;
    isLoading: boolean;
    error: string | null;

    // Acciones
    fetchAllUsers: () => Promise<boolean>;
    fetchUserById: (id: number) => Promise<boolean>;
    addUser: (user: IUser) => Promise<boolean>;
    modifyUser: (user: IUser) => Promise<boolean>;
    removeUser: (id: number) => Promise<boolean>;
    clearError: () => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>()((set, get) => ({
    // Estado inicial
    users: null,
    user: null,
    isLoading: false,
    error: null,

    // Acciones
    fetchAllUsers: async () => {
        try {
            set({ isLoading: true, error: null });
            const response = await getAllUsers();
            
            if (response?.status === 200) {
                set({ users: response.data });
                return true;
            }
            
            set({ error: 'No se pudieron obtener los usuarios' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener usuarios' });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    fetchUserById: async (id: number) => {
        try {
            set({ isLoading: true, error: null });
            const response = await getUserById(id);
            
            if (response?.status === 200) {
                set({ user: response.data });
                return true;
            }
            
            set({ error: 'No se pudo obtener el usuario' });
            return false;
        } catch (error) {
            set({ error: 'Error al obtener el usuario' });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    addUser: async (user: IUser) => {
        try {
            set({ isLoading: true, error: null });
            const response = await createUser(user);
            
            if (response?.status === 200) {
                const currentUsers = get().users || [];
                set({ users: [...currentUsers, response.data] });
                return true;
            }
            
            set({ error: 'No se pudo crear el usuario' });
            return false;
        } catch (error) {
            set({ error: 'Error al crear el usuario' });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    modifyUser: async (user: IUser) => {
        try {
            set({ isLoading: true, error: null });
            const response = await updateUser(user);
            
            if (response?.status === 200) {
                const currentUsers = get().users || [];
                const updatedUsers = currentUsers.map(u => 
                    u.userId === user.userId ? response.data : u
                );
                set({ users: updatedUsers, user: response.data });
                return true;
            }
            
            set({ error: 'No se pudo actualizar el usuario' });
            return false;
        } catch (error) {
            set({ error: 'Error al actualizar el usuario' });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    removeUser: async (id: number) => {
        try {
            set({ isLoading: true, error: null });
            const response = await deleteUser(id);
            
            if (response?.status === 200) {
                const currentUsers = get().users || [];
                set({ 
                    users: currentUsers.filter(u => u.userId !== id),
                    // Si el usuario actual es el que se eliminó, lo limpiamos
                    user: get().user?.userId === id ? null : get().user 
                });
                return true;
            }
            
            set({ error: 'No se pudo eliminar el usuario' });
            return false;
        } catch (error) {
            set({ error: 'Error al eliminar el usuario' });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    clearError: () => set({ error: null }),
    clearUser: () => set({ user: null })
}));