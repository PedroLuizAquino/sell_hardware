import { Enviroment } from "../../../envionment";
import { API } from "../axios";


interface IListagemUser {
    id: number;
    titulo: string
    date: Date;
    quantidade: number;
    descricao: string;
    condicao: string;
    userid:number;
    mediaNotas: number;
    meidaVotos: number;
    produtoid: number;
    ativo: boolean;
}

interface IDetalheUser {
    id: number;
    titulo: string
    date: Date;
    quantidade: number;
    descricao: string;
    condicao: string;
    userid:number;
    mediaNotas: number;
    meidaVotos: number;
    produtoid: number;
    ativo: boolean;
}

type TUserComTotalCount = {
    data: IListagemUser[];
    totalCount: number;
}

const getUserAll = async (page = 1, filter=''): Promise<TUserComTotalCount | Error> => {
    try{
        const urlRelativa = `/anunciar?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&titulo_like=${filter}`;

        const {data, headers} = await API.get(urlRelativa);

        if(data) {
            return {
                data,
                totalCount: headers['x-total-count'] || Enviroment.LIMITE_DE_LINHAS,
            };
        }
        
        return new Error('Erro ao listar os anuncios.');

    }catch(error){
        console.error(error);
        return new Error((error as {message: string}).message || 'Erro ao listar os anuncios.');
    }
};

const getUserById = async (id: number): Promise<IDetalheUser | Error> => {
    try{

        const{data} = await API.get(`/anunciar/${id}`);

        if(data){
            return data;
        }

        return new Error('Erro ao visualizar o anuncio.');
    }catch(error){

        return new Error((error as {message: string}).message || 'Erro ao vizualizar o anuncio.');
    }

};

const createUser = async (dados: Omit<IDetalheUser, 'id'>): Promise<number | Error> => {

    try{

        const{data} = await API.post<IDetalheUser>('/anunciar', dados);

        if(data){
            return data.id;
        }

        return new Error('Erro ao criar o anuncio.');
    }catch(error){

        return new Error((error as {message: string}).message || 'Erro ao criar o anuncio.');
    }
};

const modifyUser = async (id: number, dados: IDetalheUser): Promise<void | Error> => {
    try{
        
        await API.put(`/anunciar/${id}`, dados);

    }catch(error){

        return new Error((error as {message: string}).message || 'Erro ao atualizar o anuncio.');
    }
};

const deleteUser = async (id: number): Promise<void | Error> => {
    try{
        
        await API.delete(`/anunciar/${id}`);

    }catch(error){

        return new Error((error as {message: string}).message || 'Erro ao apagar o anuncio.');
    }
};

export const ProdutosService = {

    getUserAll,
    getUserById,
    createUser,
    modifyUser,
    deleteUser,    
};