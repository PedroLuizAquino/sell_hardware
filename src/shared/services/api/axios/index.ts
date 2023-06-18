import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptor";
import { Enviroment } from "../../../envionment";

const API = axios.create({
    baseURL: Enviroment.URL_BASE,
});

API.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);

export {API};