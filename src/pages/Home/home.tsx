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

        <Box padding={theme.spacing(4)} paddingTop={theme.spacing(10)} borderRadius={4} display={'flex'} gap={1}>
            {cardAnuncio.length > 0 ? (
                cardAnuncio.map((anuncio) => (
                    <Card sx={{ maxWidth: 300 }} key={anuncio.identify} >
                        <CardActionArea onClick={() => console.log("funciona")}>
                            <CardMedia
                                component={'img'}
                                height={'200'}
                                alt="texto"
                                src="imagem"
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