import { useState } from 'react';
import { Card, CardContent, CardActions, Button, CircularProgress, TextField, Typography, Autocomplete } from "@mui/material"
import { Box } from "@mui/system"


export const CadastroProduto = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false)


    const handleCreateAnuncio = () => {

    }

    return (
        <Box
            margin={8}
            padding={1}
            width={'80%'}
            height={'80%'}
            flex={1}
            display={'flex'}
            gap={1}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Card>
                <CardContent>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        gap={2}
                        width={250}
                    >
                        <Typography fontFamily={'roboto'}
                            variant="h6"
                            align="center"
                        >
                            Cadastre seu Produto
                        </Typography>

                        <Autocomplete
                            id='componente'
                            options={[]}
                            renderInput={(params) =>
                                <TextField {...params} label='Componente' />
                            }
                        />

                        <Autocomplete
                            id='fabricante'
                            options={[]}
                            renderInput={(params) =>
                                <TextField {...params} label='Fabricante' />
                            }
                        />
                        <Autocomplete
                            id='marca'
                            options={[]}
                            renderInput={(params) =>
                                <TextField {...params} label='Marca' />
                            }
                        />
                        <Autocomplete
                            id='categoria'
                            options={[]}
                            renderInput={(params) =>
                                <TextField {...params} label='Categoria' />
                            }
                        />
                        <Autocomplete
                            id='tipo'
                            options={[]}
                            renderInput={(params) =>
                                <TextField {...params} label='Tipo' />
                            }
                        />
                        <Autocomplete
                            id='capacidade'
                            options={[]}
                            renderInput={(params) =>
                                <TextField {...params} label='Capacidade' />
                            }
                        />
                    </Box>

                </CardContent>
                <CardActions>
                    <Box width={'100%'} display={'flex'} justifyContent={'center'}>
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isLoading}
                                onClick={handleCreateAnuncio}
                                endIcon={
                                    isLoading ?
                                        <CircularProgress
                                            variant='indeterminate'
                                            color='inherit'
                                            size={20}
                                        />
                                        : undefined
                                }>Cadastrar</Button>
                        </Box>
                    </Box>
                </CardActions>
            </Card>

        </Box>
    )
}