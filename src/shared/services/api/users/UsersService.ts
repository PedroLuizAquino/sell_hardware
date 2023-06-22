import { Enviroment } from "../../../envionment";
import { API } from "../axios";


export interface IUsuarios {
    identify: number;
    nome: string;
    senha:string;
    email: string;
    celular: number;
    password: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
}

const getUserAll = async (filter: string): Promise<IUsuarios[] | Error> => {
    try{
        const {data} = await API.get(`/listarUsuario/`);

        if(data) {
            return data
        };
        
        return new Error('Erro ao listar os usuarios.');

    }catch(error){
        console.error(error);
        return new Error((error as {message: string}).message || 'Erro ao listar os usuarios.');
    }
};

const getUsuarioById = async (id: number): Promise<IUsuarios | Error> => {
    try{

        const{data} = await API.get(`/listarUsuario${id}`);

        if(data){
            return data;
        }

        return new Error('Erro ao visualizar o usuario.');
    }catch(error){

        return new Error((error as {message: string}).message || 'Erro ao vizualizar o usuario.');
    }

};

const cadastroUsuario = async (dados: {nome: string,  senha: string, email: string}) => {

    try{

        const{data} = await API.post<any>('/cadastroUsuario', dados);

        if(data){
            return data.data.identify.toString();
        }

        return 0
    }catch(error){

        return 0
    }
};

const modifyUser = async (id: number, dados: IUsuarios): Promise<void | Error> => {
    try{
        
        await API.put(`/alterarUsuario/${id}`, dados);

    }catch(error){

        return new Error((error as {message: string}).message || 'Erro ao atualizar o usuario.');
    }
};

const deleteUser = async (id: number): Promise<void | Error> => {
    try{
        
        await API.delete(`/deleteUsuario/${id}`);

    }catch(error){

        return new Error((error as {message: string}).message || 'Erro ao apagar o usuario.');
    }
};

export const UsersService = {

    getUserAll,
    getUsuarioById,
    cadastroUsuario,  
    modifyUser,
    deleteUser,    
};