import axios from 'axios'
import * as auth from './UserAuth'
export const apiBaseUrl = "http://localhost:51235/api"
export const production = false
export function getCommonHeaders(h) {
    var headers = {
        "Access-Control-Allow-Origin": "*",
        // "Content-Type": "application/x-www-form-urlencoded"
        "Content-Type": "application/json"
    };
    var token = auth.getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    if (h) headers = { ...h, ...headers };
    return headers;
}
export function apiPost(endpoint, body, onSuccess, onFailure, headers) {
    axios
    .post(endpoint, body, {
        headers: getCommonHeaders(headers)
    })
    .then(response => {        
        if (onSuccess)  onSuccess(response.data);
    })
    .catch(error => {
        if (onFailure) onFailure(error);
    })
     
}

export async function apiGet(endpoint, onSuccess, onFailure, headers) {
    await axios
    .get(endpoint, {
        headers: getCommonHeaders(headers)
    })
    .then(response => {
        if (onSuccess) onSuccess(response.data);
    })
    .catch(error => {         
        if (onFailure) onFailure(error);
    });
}

export async function getClientIP(onSuccess, onFailure){
    await axios
    .get('https://api.ipify.org/?format=json')
    .then(response => {
        if (onSuccess) onSuccess(response.data);
    })
    .catch(error => {         
        if (onFailure) onFailure(error);
    });

}