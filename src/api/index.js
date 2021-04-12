import axios from 'axios';

const API = axios.create({baseURL : 'http://localhost:7070/api'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).jwtToken}`
    }

    return req;
})

export const fetchUserData = () => API.get('/user/records', {withCredentials: true})
export const signIn = async (authData) => API.post('/auth/login', authData)
export const signUp = async (authData) => API.post('/auth/register', authData)