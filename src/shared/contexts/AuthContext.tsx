import { createContext, useContext, useEffect, useCallback, useMemo, useState } from 'react';
import { AuthService, IAuth } from '../services/api/auth/AuthService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface IAuthContextData {
    isAuthenticated: boolean;
    lougout: () => void;
    loginUser: (email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext({} as IAuthContextData);

type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [accessToken, setAccessToken] = useState<IAuth>();

    const handleLogin = useCallback(async (email: string, password: string) => {

        const result = await AuthService.loginUsuario(email, password);
        console.log('resultado ', result)
        if (result instanceof Error) {
            toast.error('Erro ao Entrar')
            return false
        } else {
            if (result.response === true) {
                toast.success('Usuario Logado com sucesso')
                setAccessToken(result);
                return true
            } else {
                toast.error('Erro ao Entrar')
                return false
            }
        }
    }, []);

    const handleLogout = useCallback(() => {
        setAccessToken(undefined);
        window.location.reload()
    }, []);

    const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);


    return (
        <AuthContext.Provider value={{ isAuthenticated, loginUser: handleLogin, lougout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);