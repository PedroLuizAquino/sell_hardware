import { createContext, useContext, useEffect, useCallback, useMemo, useState } from 'react';
import { AuthService, IAuth } from '../services/api/auth/AuthService';

interface IAuthContextData {
    isAuthenticated: boolean;
    lougout: () => void;
    loginUser: (email: string, password: string) => Promise<string | void>;
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
            console.log('deu errado', result)
        } else {

            console.log('deu certo', result)
            setAccessToken(result);
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