import { useState } from 'react';
import { Card, CardContent, CardActions, Button, CircularProgress, TextField, Typography, Autocomplete } from "@mui/material"
import { Box } from "@mui/system"
import { capacidadeProdutoOptions, categoriaProdutoOptions, componenteProdutoOptions, fabricanteProdutoOptions, marcaProdutoOptions, tipoProdutoOptions } from '../../../shared/hooks/OptionsProduto';
import { ProdutosService } from '../../../shared/services/api/produtos/ProdutosService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export const CadastroProduto = () => {
    const [componente, setComponente] = useState('');
    const [fabricante, setFabricante] = useState('');
    const [marca, setMarca] = useState('');
    const [tipo, setTipo] = useState('');
    const [capacidade, setCapacidade] = useState('');
    const [categoria, setCategoria] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const handleCreateProduto = () => {
        setIsLoading(true)
        const fetchData = async () => {
            setIsLoading(true);
            const result = await ProdutosService.createProduto({
                componente: componente,
                marca: marca,
                tipo: tipo,
                capacidade: '',
                categoria: categoria,
            })
            setIsLoading(false)
            if (result instanceof Error) {
                setIsLoading(false)
                console.log('deu errado', result)
                toast.error('Erro ao cadastrar')
            } else {
                //setIsLoading(false)
                toast.success('Usuario Criado com sucesso')
                navigate('/anuncio-produto')
            }
        }
        fetchData();
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
                                onClick={handleCreateProduto}
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