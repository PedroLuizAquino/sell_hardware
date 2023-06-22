import { useState } from 'react';
import { Card, CardContent, Autocomplete, CardActions, Button, CircularProgress, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import * as yup from 'yup';
import { UsersService } from '../../../shared/services/api/users/UsersService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { condicaoProdutoOptions, observacoesAnuncioOptions } from '../../../shared/hooks/OptionsProduto';
import { AnuncioService } from '../../../shared/services/api/anuncios/AnuncioService';
import { useAuthContext } from '../../../shared/contexts';


export const AnuncioProduto = () => {
    const [condicao, setCondicao] = useState('');
    const [observacao, setObservacao] = useState('');
    const [titulo, setTitulo] = useState('');
    const [preco, setPreco] = useState('')
    const [quantidade, setQuantidade] = useState(0);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const { idProduto, IdUsuario } = useAuthContext();


    const handleCreateUser = () => {
        console.log('id produto', idProduto)
        setIsLoading(true)
        const fetchData = async () => {
            const result = await AnuncioService.createAnuncio({
                preco: preco,
                condicao: condicao,
                quantidade: quantidade,
                titulo: titulo,
                id_produto: parseInt(idProduto),
                id_usuario: parseInt(IdUsuario),
            })
            setIsLoading(false)
            if (result instanceof Error) {
                console.log('deu errado', result)
                toast.error('Erro ao Anunciar')
            } else {
                toast.success('Anuncio Criado com sucesso')
                navigate('/sell_hardware')
            }
        }
        fetchData();

    }
    return (
        <Box
            margin={10}
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
                            Anuncie Seu Produto
                        </Typography>

                        <TextField
                            label="Titulo do anuncio"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                        />


                        <TextField
                            label="Preço"
                            value={preco}
                            onChange={e => setPreco(e.target.value)}
                        />

                        <Autocomplete
                            options={condicaoProdutoOptions}
                            value={condicao}
                            onInputChange={(_, newValue) => setCondicao(newValue)}
                            renderInput={(params) =>
                                <TextField {...params} label='Condição' />
                            }
                        />
                        <TextField
                            label="Quantidade"
                            type="number"
                            value={quantidade}
                            onChange={e => setQuantidade(Number(e.target.value))}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Autocomplete
                            options={observacoesAnuncioOptions}
                            value={observacao}
                            onInputChange={(_, newValue) => setObservacao(newValue)}
                            renderInput={(params) =>
                                <TextField {...params} label='Tag' />
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
                                onClick={handleCreateUser}
                                endIcon={
                                    isLoading ?
                                        <CircularProgress
                                            variant='indeterminate'
                                            color='inherit'
                                            size={20}
                                        />
                                        : undefined
                                }>Anunciar</Button>
                        </Box>
                    </Box>
                </CardActions>
            </Card>

        </Box>
    )
}
