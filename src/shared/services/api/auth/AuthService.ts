import { boolean } from "yup";
import { API } from "../axios";

export interface IAuth {
    response: boolean;

}


const loginUsuario = async (email: string, senha: string): Promise<any> => { 
    try{

        const{data} = await API.post(`/login`, { email: email, senha: senha });

        if(Boolean(data) !== false){
            console.log('data', data )
            return data;
        } 
        return false
    }catch(error: any){

        return false
    }
};






export const AuthService = {

loginUsuario,
    
}