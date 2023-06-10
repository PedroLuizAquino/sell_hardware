import { Box } from '@mui/system';
import { MdDensityMedium } from 'react-icons/md';
import { useDrawerContext } from '../contexts';
import logo from './logo_sellhardware.png';
import { useNavigate } from 'react-router-dom';


interface INavebar {
    children?: React.ReactNode;
}

export const Navbar: React.FC<INavebar> = ({ children }) => {
    const { toggleDrawerOpen } = useDrawerContext();
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Box bgcolor={"#465EFF"} width={"100%"} height={"60px"} sx={{ zIndex: 1 }} position={'fixed'} display={'flex'} flexDirection={'row'}>
                <Box padding={'10px'}>
                    <MdDensityMedium color='#ffffff' size={'2.5rem'} onClick={toggleDrawerOpen} style={{ cursor: "pointer" }} />
                </Box>
                <Box padding={'10px'} sx={{ cursor: "pointer" }}>
                    <img src={logo} width={"50px"} alt='Logo Sell Hardware' />
                </Box>
            </Box>
            <Box>
                {children}
            </Box>
        </Box>
    );
};