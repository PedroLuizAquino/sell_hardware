import { Enviroment } from "../../../envionment";
import { API } from "../axios";


interface IListagemProduto {
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

interface IDetalheProduto {
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

type TProdutoComTotalCount = {
    data: IListagemProduto[];
    totalCount: number;
}

const getProdutoAll = async (page = 1, filter=''): Promise<TProdutoComTotalCount | Error> => {
    try{
        const urlRelativa = `/buscaProduto?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&titulo_like=${filter}`;

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

const getProdutoById = async (id: number): Promise<IDetalheProduto | Error> => {
    try{

        const{data} = await API.get(`/buscaProduto/${id}`);

        if(data){
            return data;
        }

        return new Error('Erro ao visualizar o anuncio.');
    }catch(error){

        return new Error((error as {message: string}).message || 'Erro ao vizualizar o anuncio.');
    }

};

const createProduto = async (dados: Omit<IDetalheProduto, 'id'>): Promise<number | Error> => {

    try{

        const{data} = await API.post<IDetalheProduto>('/anunciar', dados);

        if(data){
            return data.id;
        }

        return new Error('Erro ao criar o anuncio.');
    }catch(error){

        return new Error((error as {message: string}).message || 'Erro ao criar o anuncio.');
    }
};

const updateProduto = async (id: number, dados: IDetalheProduto): Promise<void | Error> => {
    try{
        
        await API.put(`/anunciar/${id}`, dados);

    }catch(error){

        return new Error((error as {message: string}).message || 'Erro ao atualizar o anuncio.');
    }
};

const deleteProduto = async (id: number): Promise<void | Error> => {
    try{
        
        await API.delete(`/anunciar/${id}`);

    }catch(error){

        return new Error((error as {message: string}).message || 'Erro ao apagar o anuncio.');
    }
};

export const ProdutosService = {

    getProdutoAll,
    getProdutoById,
    createProduto,
    updateProduto,
    deleteProduto,    
};