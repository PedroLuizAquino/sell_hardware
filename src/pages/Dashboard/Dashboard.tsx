import { useMemo } from 'react';
import { Box } from "@mui/system";
import { MenuLateral } from "../../shared/components";
import { Navbar } from "../../shared/layouts/Navbar"
import { useSearchParams } from "react-router-dom";
import { AnuncioService } from '../../shared/services/api/anuncios/AnuncioService';



type DashboardProps = {
    children: React.ReactNode;
}

export const Dashboard = ({ children }: DashboardProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);
    return (
        <Navbar
            textoBusca={busca}
            aoMudarTextoBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
        >
            <MenuLateral>
                <Box height={"100%"} width={"100%"}>
                    {children}
                </Box>
            </MenuLateral>
        </Navbar>
    );
};