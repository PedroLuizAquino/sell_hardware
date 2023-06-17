import { Box } from '@mui/system';
import { MdDensityMedium, MdSearch } from 'react-icons/md';
import { useDrawerContext } from '../contexts';
import logo from './logo_sellhardware.png';
import { useNavigate } from 'react-router-dom';
import { useTheme, TextField, Button, Paper, InputAdornment, Icon, InputBase, IconButton, useMediaQuery, Avatar } from '@mui/material';
import { useState } from 'react';
import { Enviroment } from '../envionment';


interface INavebar {
    children?: React.ReactNode;
    textoBusca?: string;
    aoMudarTextoBusca?: (novoTexto: string) => void;
}

export const Navbar: React.FC<INavebar> = ({
    children,
    textoBusca = '',
    aoMudarTextoBusca,
}) => {
    const { toggleDrawerOpen } = useDrawerContext();
    const theme = useTheme();
    const navigate = useNavigate();
    const handleClickSearch = () => {
    }
    return (
        <>

            <Box
                bgcolor={"#465EFF"}
                width={"100vw"}
                height={theme.spacing(8)}
                sx={{ zIndex: 1 }}
                position={'fixed'}
                display={'flex'}
                flexDirection={'row'}
                gap={1}
                borderRadius={0}
                padding={1}
                paddingX={1}
                justifyContent={'space-between'}
                component={Paper}
                elevation={5}
            >
                <Box display={'flex'}>
                    <Box component={Button} display={'flex'}>
                        <MdDensityMedium color='#ffffff' size={'2.5rem'} onClick={toggleDrawerOpen} style={{ cursor: "pointer" }} />
                    </Box>
                    <Box component={Button} onClick={() => navigate('/')} display={'flex'}>
                        <img src={logo} width={"50px"} alt='Logo Sell Hardware' />
                    </Box>
                </Box>
                <Box
                    padding={1}
                    paddingY={2}
                    margin={1}
                    width={'20%'}
                    justifyContent={'end'}
                    display={'flex'}
                    alignItems={'center'}
                    style={{ backgroundColor: '#ffffff', borderRadius: '4px', justifyContent: 'center' }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder={Enviroment.INPUT_DE_BUSCA}
                        value={textoBusca}
                        onChange={(e) => aoMudarTextoBusca?.(e.target.value)}
                        inputProps={{ 'aria-label': 'Pesquisar' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="Pesquisar">
                        <MdSearch />
                    </IconButton>
                </Box>
                <Box
                    padding={1}
                    paddingY={2}
                    margin={1}
                    justifyContent={'end'}
                    display={'flex'}
                    alignItems={'center'}
                >
                    <Avatar>
                    </Avatar>
                </Box>
            </Box>
            <Box>
                {children}
            </Box>
        </>
    );
};