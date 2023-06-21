import { useEffect, useState } from "react"
import { Box } from "@mui/system";
import { Card, CardActionArea, CardContent, CardMedia, Rating, Typography, useTheme } from "@mui/material";
import { useCardContext } from "../../shared/contexts";
import { AnuncioService, IAnuncios } from "../../shared/services/api/anuncios/AnuncioService";




export const Home = () => {
    const theme = useTheme();
    const [cardAnuncio, setCardAnuncio] = useState<IAnuncios[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await AnuncioService.getAnuncioAll()
            setCardAnuncio(result)
        }
        fetchData();
    }, []);

    return (

        <Box
            padding={theme.spacing(4)}
            paddingTop={theme.spacing(10)}
            borderRadius={4}
            display={'flex'}
            gap={3}
            justifyContent={'center'}
            flexDirection={'inherit'}
            alignItems={'center'}
        >
            {cardAnuncio.length > 0 ? (
                cardAnuncio.map((anuncio) => (
                    <Card sx={{ maxWidth: 400 }} key={anuncio.identify} >
                        <CardActionArea onClick={() => console.log("funciona")}>
                            <CardMedia
                                component={'img'}
                                height={'200'}
                                alt="texto"
                                src="https://cdn.discordapp.com/attachments/722058173095084064/1107496773930467358/FB_IMG_1674790029277.jpg"
                            />
                            <CardContent>
                                <Typography component={'div'} variant="h6" > {anuncio.titulo}</Typography>
                                <Box display={'flex'} gap={1} flexDirection={'row'}>
                                    <Rating precision={0.5} value={anuncio.mediaNotas || 2} readOnly />
                                    <Typography color={'#465EFF'} >  ( {anuncio.mediaVotos || 12} )  </Typography>
                                </Box>
                                <Box>
                                    <Typography component={'div'} variant="h6" > R${anuncio.preco}</Typography>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )))
                : (
                    <Typography>Sem Anuncio </Typography>
                )
            }

        </Box>
    )
}  