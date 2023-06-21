import { useState } from 'react';
import { Card, CardContent, CardActions, Button, CircularProgress, TextField, Typography, Autocomplete } from "@mui/material"
import { Box } from "@mui/system"
import { capacidadeProdutoOptions, categoriaProdutoOptions, componenteProdutoOptions, fabricanteProdutoOptions, marcaProdutoOptions, tipoProdutoOptions } from '../../../shared/hooks/OptionsProduto';


export const CadastroProduto = () => {
    const [componente, setComponente] = useState('');
    const [fabricante, setFabricante] = useState('');
    const [marca, setMarca] = useState('');
    const [tipo, setTipo] = useState('');
    const [capacidade, setCapacidade] = useState('');
    const [categoria, setCategoria] = useState('');
    const [isLoading, setIsLoading] = useState(false)


    const handleCreateAnuncio = () => {
        console.log('componente', componente)
        console.log('fabricante', fabricante)
        console.log('marca', marca)
        console.log('tipo', tipo)
        console.log('capacidade', capacidade)
        console.log('categoria', categoria)
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
                            options={componenteProdutoOptions}
                            value={componente}
                            onInputChange={(_, newValue) => setComponente(newValue)}
                            renderInput={(params) =>
                                <TextField {...params} label='Componente'
                                />
                            }
                        />

                        <Autocomplete
                            id='fabricante'
                            options={fabricanteProdutoOptions}
                            value={fabricante}
                            onInputChange={(_, newValue) => setFabricante(newValue)}
                            renderInput={(params) =>
                                <TextField {...params} label='Fabricante'
                                    value={fabricante}
                                    onChange={e => setFabricante(e.target.value)}
                                />
                            }
                        />
                        <Autocomplete
                            id='marca'
                            options={marcaProdutoOptions}
                            value={marca}
                            onInputChange={(_, newValue) => setMarca(newValue)}
                            renderInput={(params) =>
                                <TextField {...params} label='Marca'
                                    value={marca}
                                    onChange={e => setMarca(e.target.value)}
                                />
                            }
                        />
                        <Autocomplete
                            id='categoria'
                            options={categoriaProdutoOptions}
                            value={categoria}
                            onInputChange={(_, newValue) => setCategoria(newValue)}
                            renderInput={(params) =>
                                <TextField {...params} label='Categoria'
                                    value={categoria}
                                    onChange={e => setCategoria(e.target.value)}
                                />
                            }
                        />
                        <Autocomplete
                            id='tipo'
                            options={tipoProdutoOptions}
                            value={tipo}
                            onInputChange={(_, newValue) => setTipo(newValue)}
                            renderInput={(params) =>
                                <TextField {...params} label='Tipo'
                                    value={tipo}
                                    onChange={e => setTipo(e.target.value)}
                                />
                            }
                        />
                        <Autocomplete
                            id='capacidade'
                            options={capacidadeProdutoOptions}
                            value={capacidade}
                            onInputChange={(_, newValue) => setCapacidade(newValue)}
                            renderInput={(params) =>
                                <TextField {...params} label='Capacidade'
                                    value={capacidade}
                                    onChange={e => setCapacidade(e.target.value)}
                                />
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
                                }>Avançar</Button>
                        </Box>
                    </Box>
                </CardActions>
            </Card>

        </Box>
    )
}