import { Box } from '@mui/system';
import { MdDensityMedium, MdSearch } from 'react-icons/md';
import { useDrawerContext } from '../contexts';
import logo from './logo_sellhardware.png';
import { useNavigate } from 'react-router-dom';
import { useTheme, TextField, Button, Paper, InputAdornment, Icon, InputBase, IconButton } from '@mui/material';
import { useState } from 'react';


interface INavebar {
    children?: React.ReactNode;
}

export const Navbar: React.FC<INavebar> = ({ children }) => {
    const { toggleDrawerOpen } = useDrawerContext();
    const theme = useTheme();
    const navigate = useNavigate();
    const handleClickSearch = () => {
    }
    return (
        <>
            <Box
                bgcolor={"#465EFF"}
                width={"100%"}
                height={theme.spacing(8)}
                sx={{ zIndex: 1 }}
                position={'fixed'}
                display={'flex'}
                flexDirection={'row'}
                gap={1}
                borderRadius={0}
                padding={1}
                paddingX={1}
                component={Paper}
                elevation={2}
            >
                <Box component={Button} >
                    <MdDensityMedium color='#ffffff' size={'2.5rem'} onClick={toggleDrawerOpen} style={{ cursor: "pointer" }} />
                </Box>
                <Box component={Button} onClick={handleClickSearch}>
                    <img src={logo} width={"50px"} alt='Logo Sell Hardware' />
                </Box>
                <Box
                    padding={1}
                    paddingY={2}
                    margin={1}
                    justifyContent={'end'}
                    display={'flex'}
                    alignItems={'center'}
                    style={{ backgroundColor: '#ffffff', borderRadius: '4px' }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Pesquisar"
                        inputProps={{ 'aria-label': 'Pesquisar' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="Pesquisar">
                        <MdSearch />
                    </IconButton>
                </Box>
            </Box>
            <Box>
                {children}
            </Box>
        </>
    );
};