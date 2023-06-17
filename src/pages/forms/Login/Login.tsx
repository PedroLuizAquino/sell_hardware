import { Input, InputLabel, Paper, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"


export const Login = () => {

    return (
        <Box
            margin={10}
            //marginX={10}
            padding={1}
            width={'80%'}
            height={'80%'}
            flex={1}
            component={Paper}
            elevation={5}
            display={'flex'}
            gap={1}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Typography fontFamily={'roboto'}     >Login</Typography>

            <TextField label='Email' />
            <TextField label='Senha' />

        </Box>
    )
}