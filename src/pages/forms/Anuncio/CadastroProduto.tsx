import { useState } from 'react';
import { Card, CardContent, CardActions, Button, CircularProgress, TextField, Typography, Autocomplete, Paper } from "@mui/material"
import { Box } from "@mui/system"
import { capacidadeProdutoOptions, categoriaProdutoOptions, componenteProdutoOptions, fabricanteProdutoOptions, tipoProdutoOptions } from '../../../shared/hooks/OptionsProduto';
import { ProdutosService } from '../../../shared/services/api/produtos/ProdutosService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../shared/contexts';


export const CadastroProduto = () => {
    const [componente, setComponente] = useState('');
    const [fabricante, setFabricante] = useState('');
    const [tipo, setTipo] = useState('');
    const [capacidade, setCapacidade] = useState('');
    const [categoria, setCategoria] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const { setIdProduto } = useAuthContext();

    const handleCreateProduto = () => {
        setIsLoading(true)
        const fetchData = async () => {
            const result = await ProdutosService.createProduto({
                componente: componente,
                fabricante: fabricante,
                tipo: tipo,
                capacidade: capacidade,
                categoria: categoria,
            })
            setIdProduto(result.toString())
            setIsLoading(false)
            if (result === 0) {
                toast.error('Erro ao cadastrar um produto')
            } else {
                toast.success('Produto Cadastrado com sucesso')
                navigate('/anuncio-produto')
            }
        }
        fetchData();
    }

    return (
        <Box
            margin={2}
            marginTop={5}
            marginX={2}
            padding={2}
            marginLeft={45}
            maxWidth={800}
            height={550}
            maxHeight={900}
            display={'flex'}
            gap={1}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRadius={'15px'}
            component={Paper}
        >
            <CardContent>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    gap={2}
                    width={400}
                >
                    <Typography fontFamily={'roboto'}
                        variant="h4"
                        align="center"
                    >
                        Cadastre Seu Produto
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
                            size='large'
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
        </Box>
    )
}   