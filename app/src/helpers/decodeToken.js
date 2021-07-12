import jwt_decode from "jwt-decode";
export default function decodeToken(){
    const token = localStorage.getItem('token')   
    if(token) return jwt_decode(token)
}