import { useUserStore } from "@/stores/user-store";
import { IUser } from "../interfaces/users.interfaces";
import Swal from "sweetalert2";

const useUser = () => {
    const { 
        users, 
        user, 
        isLoading,
        error,
        fetchAllUsers, 
        fetchUserById,
        addUser,
        modifyUser,
        removeUser,
        clearError,
        clearUser
    } = useUserStore();

    const handleGetAllUsers = async () => {
        const success = await fetchAllUsers();
        if (!success && error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error
            });
        }
    };

    const handleCreateUser = async (user: IUser) => {
        const success = await addUser(user);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Usuario creado',
                text: 'El usuario se ha creado correctamente',
            });
            return true;
        } 
        
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo crear el usuario'
        });
        return false;
    };

    const handleUpdateUser = async (user: IUser) => {
        const success = await modifyUser(user);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado',
                text: 'El usuario se ha actualizado correctamente',
            });
            return true;
        }
        
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo actualizar el usuario'
        });
        return false;
    };

    const handleDeleteUser = async (id: number) => {
        const success = await removeUser(id);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Usuario eliminado',
                text: 'El usuario se ha eliminado correctamente',
            });
            return true;
        }
        
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo eliminar el usuario'
        });
        return false;
    };

    return {
        // Estado
        users,
        user,
        isLoading,
        error,
        // Acciones del store
        fetchUserById,
        clearError,
        clearUser,
        // Acciones con UI
        handleGetAllUsers,
        handleCreateUser,
        handleUpdateUser,
        handleDeleteUser,
    };
};

export default useUser;