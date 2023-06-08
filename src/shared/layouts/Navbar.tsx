import { Box } from '@mui/system';


interface INavebar {
    children: React.ReactNode;
}

export const Navbar: React.FC<INavebar> = ({ children }) => {

    return (
        <>
            <Box>
                Teste
            </Box>

            {children}
        </>
    );
};