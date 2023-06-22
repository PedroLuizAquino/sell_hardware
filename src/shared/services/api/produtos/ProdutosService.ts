import { Enviroment } from "../../../envionment";
import { API } from "../axios";


export interface IProdutos {
    identify: number;
    componente: string
    fabricante: string;
    categoria: string;
    tipo: string;
    capacidade: string;
}

const getProdutoAll = async (page = 1, filter=''): Promise<IProdutos[] | Error> => {
    try{
        const urlRelativa = `/buscaProduto`;

        const {data, headers} = await API.get(urlRelativa);

        if(data) {
            return data
        }
        
        return new Error('Erro ao listar os anuncios.');

    }catch(error){
        console.error(error);
        return new Error((error as {message: string}).message || 'Erro ao listar os anuncios.');
    }
};

const getProdutoById = async (id: number): Promise<IProdutos | Error> => {
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
const getProdutoByNome = async (nome: string): Promise<IProdutos | Error> => {
    try{

        const{data} = await API.get(`/buscaProduto/${nome}`);

        if(data){
            return data;
        }

        return new Error('Erro ao visualizar o anuncio.');
    }catch(error){

        return new Error((error as {message: string}).message || 'Erro ao vizualizar o anuncio.');
    }

};

const getProdutoByCategoria = async (id: number): Promise<IProdutos | Error> => {
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

const createProduto = async (dados: {componente: string, fabricante: string, tipo: string, capacidade: string, categoria: string}) => {

    try{
        const{data} = await API.post<any>('/cadastroProduto', dados);
        if(data){
            console.log('data dentro', data)
            return data.data.identify.toString();
        }

        return 0
    }catch(error){

        return 0
    }
};

const updateProduto = async (id: number, dados: IProdutos): Promise<void | Error> => {
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