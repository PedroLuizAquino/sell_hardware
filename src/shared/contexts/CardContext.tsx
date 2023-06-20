import { useState, useContext, createContext, useCallback } from 'react';
import { IAnuncios } from "../services/api/anuncios/AnuncioService"


type CardContextProps = {
    cardAnuncio: IAnuncios[];
    setCardOption: (newCardOpitons: IAnuncios[]) => void;

}

const CardContext = createContext({} as CardContextProps)

export const useCardContext = () => {
    return useContext(CardContext);
}


export const CardProvider = () => {
    const [cardAnuncio, setCardAnuncio] = useState<IAnuncios[]>([]);

    const filterCardAnuncio = useCallback((newCardOpitons: IAnuncios[]) => {
        setCardAnuncio(newCardOpitons)
    }, []);

    return (
        <CardContext.Provider
            value={
                {
                    cardAnuncio,
                    setCardOption: filterCardAnuncio,
                }
            }
        >
        </CardContext.Provider>
    )
}
