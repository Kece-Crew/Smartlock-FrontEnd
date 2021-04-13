import axios from 'axios'
import Cookies from 'js-cookie'

const API = axios.create({baseURL : 'http://localhost:7070/api'})

API.interceptors.request.use((req) => {
    if(Cookies.get().jwtToken){
        req.headers.Authorization = `Bearer ${Cookies.get().jwtToken}`
    }

    return req;
})

export const getRecord = async () => API.get('/user/records', {withCredentials: true})
export const updateRecord = async (recordId, userId, recordData, userData) => {
    API.patch(`/user/record/${recordId}`, recordData).then(API.patch(`/user/UserData/${userId}`, userData)).then(getRecord)
}

export const deleteRecord = async (recordId) => API.delete(`/user/record/${recordId}`, {withCredentials: true}).then(getRecord)
export const signIn = async (authData) => API.post('/auth/login', authData)
export const signUp = async (authData) => API.post('/auth/register', authData)