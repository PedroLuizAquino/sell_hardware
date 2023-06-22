import { useEffect, useState } from "react"
import { Box } from "@mui/system";
import { Card, CardActionArea, CardContent, CardMedia, Rating, Tooltip, Typography, useTheme } from "@mui/material";
import { useAuthContext, useCardContext } from "../../shared/contexts";
import { AnuncioService, IAnuncios } from "../../shared/services/api/anuncios/AnuncioService";




export const Home = () => {
    const theme = useTheme();
    const [cardAnuncio, setCardAnuncio] = useState<IAnuncios[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { busca } = useAuthContext();


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await AnuncioService.getAnuncioAll()
            setCardAnuncio(result)
            if (busca.length > 0) {
                setCardAnuncio(busca);
            }
        }
        fetchData();


    }, [busca]);

    return (

        <Box
            padding={theme.spacing(50)}
            paddingTop={theme.spacing(4)}
            borderRadius={4}
            display={'flex'}
            justifyContent={'center'}
            flexDirection={'inherit'}
            alignItems={'center'}
            flexWrap={'wrap'}
            boxSizing={'border-box'}
        >
            {cardAnuncio.length > 0 ? (
                cardAnuncio.map((anuncio) => (
                    <Card sx={{ maxWidth: 250, flexBasis: "28%", margin: '15px', minWidth: 200 }} key={anuncio.identify} >
                        <CardActionArea>
                            <CardMedia
                                component={'img'}
                                height={'200'}
                                alt="texto"
                                src="https://cdn.discordapp.com/attachments/722058173095084064/1107496773930467358/FB_IMG_1674790029277.jpg"
                            />
                            <CardContent>
                                <Tooltip title={anuncio.titulo} placement="top" >
                                    <Typography component={'div'} variant="h6" whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'} > {anuncio.titulo}</Typography>
                                </Tooltip>
                                <Box display={'flex'} gap={1} flexDirection={'row'}>
                                    <Rating precision={0.5} value={anuncio.mediaNotas || 2} readOnly />
                                    <Typography color={'#465EFF'} >  ( {anuncio.mediaVotos || 12} )  </Typography>
                                </Box>
                                <Box>
                                    <Typography component={'div'} variant="h6" sx={{ wordBreak: 'keep-all' }} > R${anuncio.preco}</Typography>
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