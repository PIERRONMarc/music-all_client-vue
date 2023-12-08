import type {AxiosResponse} from "axios";
import axios from "axios";

const axiosInstance = axios.create({
    timeout: 30000
});

class HttpClient {

    private static headers: {[key: string]: string} = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    private static async request (
        method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH',
        route: string,
        body?: {[key: string]: any},
        queryParams?: {[key: string]: any},
        headers?: {[p: string]: string},
    ): Promise<AxiosResponse>  {
        const data = body ? body : {};
        const url = import.meta.env.VITE_API_BASE_URL + route + HttpClient.mapQueryParams(queryParams);
        const requestObj = {
            url,
            headers: {
                ...HttpClient.headers,
                ...headers,
            },
            method,
            data,
        };

        try {
            return await axiosInstance.request(requestObj);
        }
        catch (error: any) {
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                throw error.response.data;
            } else if (axios.isAxiosError(error) && error.response) {
                throw error.response;
            } else {
                throw error;
            }
        }
    };

    private static mapQueryParams(queryParams?: {[key: string]: any}) {
        return queryParams
            ? '?' + Object.keys(queryParams).map(function (key) {
                return key + '=' + queryParams[key]
            }).join('&')
            : "";
    }

    public static async get(
        route: string,
        queryParams?: {[key: string]: any},
        headers?: {[key: string]: string},
    ) {
        return await HttpClient.request('GET', route, undefined, queryParams, headers);
    }

    public static async put(
        route: string,
        body?: {[key: string]: any},
        queryParams?: {[key: string]: any},
        headers?: {[key: string]: string},
    ) {
        return await HttpClient.request('PUT', route, body, queryParams, headers);
    }

    public static async post(
        route: string,
        body?: {[key: string]: any},
        queryParams?: {[key: string]: any},
        headers?: {[key: string]: string},
    ) {
        return await HttpClient.request('POST', route, body, queryParams, headers);
    }

    public static async delete(
        route: string,
        queryParams?: {[key: string]: any},
        headers?: {[key: string]: string},
    ) {
        return await HttpClient.request('DELETE', route, undefined, queryParams, headers);
    }

    public static async patch(
        route: string,
        body?: {[key: string]: any},
        queryParams?: {[key: string]: any},
        headers?: {[key: string]: string},
    ) {
        return await HttpClient.request('PATCH', route, body, queryParams, headers);
    }
}

export default HttpClient