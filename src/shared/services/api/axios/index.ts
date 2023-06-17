import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptor";
import { error } from "console";
import { Enviroment } from "../../../envionment";

const api = axios.create({
    baseURL: Enviroment.URL_BASE,
});

api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);

export {api};