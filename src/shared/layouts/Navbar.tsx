import { Box } from '@mui/system';
import { MdDensityMedium, MdSearch } from 'react-icons/md';
import { useAuthContext, useDrawerContext } from '../contexts';
import logo from './logo_sellhardware.png';
import { useNavigate } from 'react-router-dom';
import { useTheme, Button, Paper, InputBase, IconButton, Avatar, Menu, Typography } from '@mui/material';
import { useState } from 'react';
import { Enviroment } from '../envionment';
import { AnuncioService, IAnuncios } from '../services/api/anuncios/AnuncioService';
import { MdClear, MdSell } from "react-icons/md";
import { toast } from 'react-toastify';



type NavebarProps = {
    children?: React.ReactNode;
    textoBusca?: string;
    aoMudarTextoBusca?: (novoTexto: string) => void;
}

export const Navbar = ({
    children,
    textoBusca = '',
    aoMudarTextoBusca,
}: NavebarProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [textoBarraBusca, setTextoBarraBusca] = useState(textoBusca);
    const { IdUsuario, lougout, setBusca, busca } = useAuthContext();

    const handleClickSearch = () => {
        if (!textoBarraBusca) {
            return;
        }
        AnuncioService.filtroAnuncio(textoBarraBusca)
            .then((result) => {
                if (result instanceof Error) {
                    toast.error('Anuncio não entrontrado')
                    return
                } else {
                    if (result.length > 0) {
                        setBusca(result);
                    } else {
                        toast.error('Anuncio não entrontrado')
                    }
                }
            })
    }

    const handleClickCancelSearch = () => {
        setBusca([]);
        setTextoBarraBusca('')
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
                    {/*
                        <Box component={Button} display={'flex'}>
                            <MdDensityMedium color='#ffffff' size={'2.5rem'} onClick={toggleDrawerOpen} style={{ cursor: "pointer" }} />
                        </Box>*/
                        <Box width={'20px'}>

                        </Box>
                    }
                    <Box component={Button} onClick={() => navigate('/sellhardware')} display={'flex'}>
                        <img src={logo} width={"50px"} alt='Logo Sell Hardware' />
                    </Box>
                </Box>
                <Box
                    padding={1}
                    paddingY={2}
                    paddingLeft={2}
                    margin={1}
                    width={'25%'}
                    justifyContent={'end'}
                    display={'flex'}
                    alignItems={'center'}
                    style={{ backgroundColor: '#ffffff', borderRadius: '4px', justifyContent: 'center' }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1, width: '25vw' }}
                        placeholder={Enviroment.INPUT_DE_BUSCA}
                        value={textoBarraBusca}
                        fullWidth
                        onChange={(e) => setTextoBarraBusca?.(e.target.value)}
                        inputProps={{ 'aria-label': 'Pesquisar' }}
                    />
                    {busca.length > 0 ? (<IconButton type="button" sx={{ p: '10px' }} aria-label="Pesquisar" onClick={handleClickCancelSearch}>
                        <MdClear />
                    </IconButton>) : (<></>)}
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="Pesquisar" onClick={handleClickSearch}>
                        <MdSearch />
                    </IconButton>
                </Box>
                <Box
                    padding={1}
                    paddingY={2}
                    margin={1}
                    marginRight={2}
                    justifyContent={'end'}
                    display={'flex'}
                    alignItems={'center'}
                >
                    <Box padding={3}>
                        <Button color='primary' variant='contained' onClick={!!IdUsuario ? (() => navigate('/cadastro-produto')) : (() => navigate('/login'))} endIcon={<MdSell />}>
                            Anuncie Aqui
                        </Button>
                    </Box>
                    {!!IdUsuario ? (
                        <>
                            <Box padding={1} component={Button}>
                                <Avatar />
                            </Box>
                            <Box padding={1} component={Button} onClick={lougout}>
                                <Typography color={'#ffffff'}>Sair</Typography>
                            </Box>
                        </>

                    ) : (
                        <>
                            <Box padding={1} component={Button} onClick={() => navigate('/login')}>
                                <Typography color={'#ffffff'}>Login </Typography>
                            </Box>
                            <Box padding={1} component={Button} onClick={() => navigate('/cadastrar')}>
                                <Typography color={'#ffffff'}>Cadastre-se</Typography>
                            </Box>
                        </>
                    )}


                </Box >

            </Box >

            <Box>
                {children}
            </Box>
        </>
    );
};