import { useState } from 'react';
import { Card, CardContent, CardActions, Button, CircularProgress, TextField, Typography, Paper } from "@mui/material"
import { Box } from "@mui/system"
import * as yup from 'yup';
import { UsersService } from '../../../shared/services/api/users/UsersService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateUserSchema = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
});

export const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)


    const handleCreateUser = () => {
        setIsLoading(true)
        CreateUserSchema
            .validate({ email, password, nome }, { abortEarly: false })
            .then(dadosValidados => {
                const fetchData = async () => {
                    setIsLoading(true);
                    const result = await UsersService.cadastroUsuario({
                        nome: nome,
                        senha: password,
                        email: email,
                    })
                    setIsLoading(false);
                    if (result instanceof Error) {
                        toast.error('Erro ao cadastrar')
                    } else {
                        toast.success('Usuario Criado com sucesso')
                        navigate('/login')
                    }
                }
                fetchData();
            })
            .catch((errors: yup.ValidationError) => {
                setIsLoading(false)
                errors.inner.forEach(error => {
                    if (error.path === 'email') {
                        setEmailError('Email Invalido');
                    } else if (error.path === 'password') {
                        setPasswordError('Senha Invalido')
                    }

                    if (password !== confirmPassword) {
                        setPasswordError('As senhas não se conhecidem')
                        setConfirmPasswordError('As senhas não se conhecidem')
                    }
                })
            })
    }


    return (
        <Box
            margin={2}
            marginTop={10}
            marginX={2}
            padding={2}
            marginLeft={45}
            maxWidth={800}
            height={450}
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
                        Cadastre-se
                    </Typography>

                    <TextField
                        label='Nome'
                        fullWidth
                        disabled={isLoading}
                        sx={{ width: "25vw" }}
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />

                    <TextField
                        label='Email'
                        fullWidth
                        type="email"
                        disabled={isLoading}
                        error={!!emailError}
                        sx={{ width: "25vw" }}
                        helperText={emailError}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyDown={() => setEmailError('')}
                    />
                    <TextField
                        label='Senha'
                        fullWidth
                        type="password"
                        value={password}
                        error={!!passwordError}
                        sx={{ width: "25vw" }}
                        helperText={passwordError}
                        disabled={isLoading}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={() => setPasswordError('')}
                    />

                    <TextField
                        label='Confirmar Senha'
                        fullWidth
                        type="password"
                        value={confirmPassword}
                        error={!!confirmPasswordError}
                        sx={{ width: "25vw" }}
                        helperText={confirmPasswordError}
                        disabled={isLoading}
                        onKeyDown={() => setConfirmPasswordError('')}
                        onChange={e => setConfirmPassword(e.target.value)}
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
                            size='large'
                            onClick={handleCreateUser}
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