import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthData } from "../components/AuthForm";
import PubSub from "../services/PubSub";
import { AppApi } from "../api";
import TokenService from "../services/TokenService";

interface AuthContextValue {
    // account: any;
    isAuth: boolean;
    login: (authData: AuthData) => void;
    logout: () => void;
    checkAuth: () => void;
}

const AuthContext = createContext<AuthContextValue>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuth, setIsAuth] = useState<boolean>(TokenService.isTokenValid());
    const navigate = useNavigate();

    const login = async (authData: AuthData) => {
        try {
            const response = await AppApi.login(authData);
            TokenService.setToken(response.access_token);
            setIsAuth(true);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const checkAuth = async () => {
        try {
            const response = await AppApi.refreshToken();
            TokenService.setToken(response.access_token);
            setIsAuth(true);
            navigate('/');
        } catch (error) {
            console.error(error);
        }

    };

    const logout = async () => {
        try {
            await AppApi.logout();
            TokenService.removeToken();
            setIsAuth(false);
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    PubSub.on('logout', logout);
    const context = { isAuth, login, logout, checkAuth };

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);