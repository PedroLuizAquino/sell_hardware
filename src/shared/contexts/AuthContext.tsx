import { createContext, useContext, useEffect, useCallback, useMemo, useState } from 'react';
import { AuthService, IAuth } from '../services/api/auth/AuthService';
import { toast } from 'react-toastify';
import { IAnuncios } from '../services/api/anuncios/AnuncioService';

interface IAuthContextData {
    //isAuthenticated: string;
    lougout: () => void;
    idProduto: string;
    setIdProduto: (id: string) => void;
    IdUsuario: string;
    setIdUsuario: (id: string) => void;
    busca: IAnuncios[];
    setBusca: (id: IAnuncios[]) => void;
    loginUser: (email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext({} as IAuthContextData);

type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [accessToken, setAccessToken] = useState<string>('');
    const [idProduto, setIdProduto] = useState<string>('');
    const [IdUsuario, setIdUsuario] = useState<string>('');
    const [busca, setBusca] = useState<IAnuncios[]>([])

    const loginUser = useCallback(async (email: string, password: string): Promise<boolean> => {

        const { response } = await AuthService.loginUsuario(email, password);
        if (response === false) {
            toast.error('Erro ao Entrar')
            return false
        } else {
            toast.success('Usuario Logado com sucesso')
            setIdUsuario(response)
            localStorage.setItem('id_usuario', response)
            // setAccessToken(localStorage.setItem(response));
            return true
        }

    }, []);

    const handleLogout = useCallback(() => {
        //setAccessToken('');
        localStorage.removeItem('id_usuario')
        window.location.reload()
    }, []);

    //const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);


    return (
        <AuthContext.Provider value={{ idProduto, setIdProduto, IdUsuario, setIdUsuario, busca, setBusca, loginUser: loginUser, lougout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);