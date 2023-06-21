import { API } from "../axios";

export interface IAuth {
    response: boolean;

}


const loginUsuario = async (email: string, senha: string): Promise<IAuth | Error> => { 
    try{

        const{data} = await API.post(`/login`, { email: email, senha: senha });

        if(data){
            return data;
        }

        return new Error('Erro no login.');
    }catch(error: any){

        return new Error((error as {message: string}).message || error.message);
    }
};






export const AuthService = {

loginUsuario,
    
}