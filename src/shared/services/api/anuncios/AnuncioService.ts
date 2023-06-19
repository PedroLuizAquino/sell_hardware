import { API } from "../axios";

export interface IAnuncios {
    identify: number;
    titulo: string;
    quantidade: number;
    descricao: string;
    preco: number;
    status_anuncio: boolean;
    condicao_produto: string;
    mediaNotas: number | null;
    mediaVotos: number | null;
    observacoes: string;
    id_produto: number;
    id_usuario: number;
}


const getAnuncioAll = async (): Promise<IAnuncios[] | Error> => {
    try{

        const {data} = await API.get(`/listarAnuncio`);

        if(data) {
            return data;
        }
        
        console.log(data)

        return new Error('Erro ao listar os anuncios.');

    }catch(error: any){
        console.error(error);
        return new Error((error as {message: string}).message || error.message);
    }
};

const getAnuncioById = async (id: number): Promise<IAnuncios | Error> => {
    try{

        const{data} = await API.get(`/listarAnuncio/${id}`);

        if(data){
            return data.id;
        }

        return new Error('Erro ao visualizar o anuncio.');
    }catch(error: any){

        return new Error((error as {message: string}).message || error.message);
    }
};

const filtroAnuncio = async (filter : string) : Promise<IAnuncios[] | Error> => {
    try{

        const{data} = await API.get(`/filtrarAnuncio/?titulo=${filter}`);

        if(data){
            return data;
        }

        return new Error('Erro ao filtrar o anuncio.');
    }catch(error: any){

        return new Error((error as {message: string}).message || error.message);
    }
}


const createAnuncio = async (dados: Omit<IAnuncios, 'id'>): Promise<number | Error> => {

    try{

        const{data} = await API.post<IAnuncios>('/criarAnuncio', dados);

        if(data){
            return data.identify;
        }

        return new Error('Erro ao criar o anuncio.');
    }catch(error){

        return new Error((error as {message: string}).message || 'Erro ao criar o anuncio.');
    }
};

const updateAnuncio = async (id: number, dados: IAnuncios): Promise<void | Error> => {
    try{
        
        await API.put(`/alterarAnuncio/${id}`, dados);

    }catch(error){

        return new Error((error as {message: string}).message || 'Erro ao atualizar o anuncio.');
    }
};

const deleteAnuncio = async (id: number): Promise<void | Error> => {
    try{
        
        await API.delete(`/deleteAnuncio/${id}`);

    }catch(error){

        return new Error((error as {message: string}).message || 'Erro ao apagar o anuncio.');
    }
};

export const AnuncioService = {

    getAnuncioAll,
    getAnuncioById,
    filtroAnuncio,
    createAnuncio,
    updateAnuncio,
    deleteAnuncio,    
};