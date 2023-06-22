import { useState } from 'react';
import { Card, CardContent, CardActions, Button, Paper, TextField, Typography, CircularProgress } from "@mui/material"
import { Box } from "@mui/system"
import * as yup from 'yup';
import { useAuthContext } from '../../../shared/contexts';
import { useNavigate } from 'react-router-dom';


const LoginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
});

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { loginUser, IdUsuario } = useAuthContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)


    const handleSubmitLogin = () => {
        setIsLoading(true);
        LoginSchema
            .validate({ email, password }, { abortEarly: false })
            .then(async dadosValidados => {
                if (await loginUser(dadosValidados.email, dadosValidados.password)) {
                    console.log('idUsuario', IdUsuario)
                    navigate('/sellhardware');
                    console.log('idUsuario', IdUsuario)
                }
                setIsLoading(false);
            })
            .catch((errors: yup.ValidationError) => {
                setIsLoading(false);
                errors.inner.forEach(error => {
                    if (error.path === 'email') {
                        setEmailError('Email Invalido');
                    } else if (error.path === 'password') {
                        setPasswordError('Senha Invalido')
                    }
                });
            });
    };

    return (
        <Box
            margin={2}
            marginTop={10}
            marginX={2}
            padding={2}
            marginLeft={45}
            maxWidth={800}
            height={400}
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
                    <Typography
                        variant="h4"
                        align="center"
                    >
                        Login
                    </Typography>

                    <TextField
                        label='Email'
                        fullWidth
                        type="email"
                        value={email}
                        disabled={isLoading}
                        error={!!emailError}
                        sx={{ width: "25vw" }}
                        helperText={emailError}
                        onChange={e => setEmail(e.target.value)}
                        onKeyDown={() => setEmailError('')}
                    />

                    <TextField
                        label='Senha'
                        fullWidth
                        type="password"
                        value={password}
                        sx={{ width: "25vw" }}
                        disabled={isLoading}
                        error={!!passwordError}
                        helperText={passwordError}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={() => setPasswordError('')}
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
                            onClick={handleSubmitLogin}
                            endIcon={
                                isLoading ?
                                    <CircularProgress
                                        variant='indeterminate'
                                        color='inherit'
                                        size={20}
                                    />
                                    : undefined
                            }>Entrar</Button>
                    </Box>
                </Box>
            </CardActions>


        </Box>
    )
}