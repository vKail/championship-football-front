import { IUser } from "@/app/dashboard/users/interfaces/users.interfaces";
import { useAuthStore } from "@/stores/auth-store";
import { sing_in } from "../service/authService";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
    const router = useRouter();
    const user   = useAuthStore(state => state.user);
    const login  = useAuthStore(state => state.login);
    const logout = useAuthStore(state => state.logout);


    
    const handlerLogin = async (username: string, password: string) => {
        try {
            const response = await sing_in(username, password);  
            if(response && response.status === 200){
                login(response.data.token, response.data.user);
                localStorage.setItem('token', response.data.token);
                Swal.fire({
                    icon: 'success',
                    title: 'Bienvenido',
                    text: 'Inicio de sesión exitoso',
                })
                router.push('/dashboard');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario o contraseña incorrectos',
            })
            
        }
    }

    const handlerLogout = () => {
        logout();
        localStorage.removeItem('token');
    }

    return { user, handlerLogin, handlerLogout }
}

export default useAuth;