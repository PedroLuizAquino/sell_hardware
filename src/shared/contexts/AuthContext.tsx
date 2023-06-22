import { createContext, useContext, useEffect, useCallback, useMemo, useState } from 'react';
import { AuthService, IAuth } from '../services/api/auth/AuthService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface IAuthContextData {
    isAuthenticated: boolean;
    lougout: () => void;
    idProduto: string;
    setIdProduto: (id: string) => void;
    IdUsuario: string;
    setIdUsuario: (id: string) => void;
    loginUser: (email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext({} as IAuthContextData);

type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [accessToken, setAccessToken] = useState<boolean>(false);
    const [idProduto, setIdProduto] = useState<string>('');
    const [IdUsuario, setIdUsuario] = useState<string>('');

    const loginUser = useCallback(async (email: string, password: string): Promise<boolean> => {

        const { response } = await AuthService.loginUsuario(email, password);
        if (response === false) {
            toast.error('Erro ao Entrar')
            return false
        } else {
            toast.success('Usuario Logado com sucesso')
            setIdUsuario(response)
            setAccessToken(true);
            return true
        }

    }, []);

    const handleLogout = useCallback(() => {
        setAccessToken(false);
        window.location.reload()
    }, []);

    const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);


    return (
        <AuthContext.Provider value={{ isAuthenticated, idProduto, setIdProduto, IdUsuario, setIdUsuario, loginUser: loginUser, lougout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);