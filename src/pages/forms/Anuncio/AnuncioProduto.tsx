import { useState } from 'react';
import { Card, CardContent, Autocomplete, CardActions, Button, CircularProgress, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import * as yup from 'yup';
import { UsersService } from '../../../shared/services/api/users/UsersService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { condicaoProdutoOptions, observacoesAnuncioOptions } from '../../../shared/hooks/OptionsProduto';

const CreateUserSchema = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
});

export const AnuncioProduto = () => {
    const [condicao, setCondicao] = useState('');
    const [observacao, setObservacao] = useState('');
    const [quantidade, setQuantidade] = useState(0);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)


    const handleCreateUser = () => {
        setIsLoading(true)

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
                            label="Preço"
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
                                <TextField {...params} label='Condição' />
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