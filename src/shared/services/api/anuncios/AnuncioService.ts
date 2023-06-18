import { Enviroment } from "../../../envionment";
import { API } from "../axios";

interface IAnuncio {
    id: number;
    titulo: string
    date: Date;
    quantidade: number;
    descricao: string;
    preco: number;
    condicao: string;
    userid:number;
    mediaNotas: number;
    mediaVotos: number;
    produtoId: number;
    ativo: boolean;
}


const getAnuncioAll = async (): Promise<IAnuncio[] | Error> => {
    try{

        const {data} = await API.get(`/buscaAnuncio`);

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

const getAnuncioById = async (id: number): Promise<IAnuncio | Error> => {
    try{

        const{data} = await API.get(`/buscaAnuncio/${id}`);

        if(data){
            return data.id;
        }

        return new Error('Erro ao visualizar o anuncio.');
    }catch(error: any){

        return new Error((error as {message: string}).message || error.message);
    }

};

const createAnuncio = async (dados: Omit<IAnuncio, 'id'>): Promise<number | Error> => {

    try{

        const{data} = await API.post<IAnuncio>('/criarAnuncio', dados);

        if(data){
            return data.id;
        }

        return new Error('Erro ao criar o anuncio.');
    }catch(error){

        return new Error((error as {message: string}).message || 'Erro ao criar o anuncio.');
    }
};

const updateAnuncio = async (id: number, dados: IAnuncio): Promise<void | Error> => {
    try{
        
        await API.put(`/anunciar/${id}`, dados);

    }catch(error){

        return new Error((error as {message: string}).message || 'Erro ao atualizar o anuncio.');
    }
};

const deleteAnuncio = async (id: number): Promise<void | Error> => {
    try{
        
        await API.delete(`/anunciar/${id}`);

    }catch(error){

        return new Error((error as {message: string}).message || 'Erro ao apagar o anuncio.');
    }
};

export const ProdutosService = {

    getAnuncioAll,
    getAnuncioById,
    createAnuncio,
    updateAnuncio,
    deleteAnuncio,    
};