import * as api from '../api'
import { returnError, clearError } from './error'

import Cookies from 'js-cookie'

export const signIn = (authData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(authData)

        // localStorage.setItem('profile', JSON.stringify({...data}))
        Cookies.set('db_id', data.db_id, { path: '/', secure: true, sameSite: 'none' })
        Cookies.set('jwtToken', data.jwtToken, { path: '/', secure: true, sameSite: 'none' })

        dispatch({type: 'LOGIN_SUCCESS', payload: data})
        dispatch(clearError())
        history.push('/')

    } catch(error) {
        // console.log(error)

        dispatch(returnError(error.response.data, error.response.status ))
        dispatch({type : 'LOGIN_ERROR'})
        
    }
}

export const signUp = (authData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(authData)

        // localStorage.setItem('profile', JSON.stringify({...action.payload}))
        Cookies.set('db_id', data.db_id, { path: '/', secure: true, sameSite: 'none' })
        Cookies.set('jwtToken', data.jwtToken, { path: '/', secure: true, sameSite: 'none' })

        dispatch({type: 'REGISTER_SUCCESS', payload: data})
        dispatch(clearError())
        history.push('/')
    } catch(error) {
        // console.log(error)

        dispatch(returnError(error.response.data, error.response.status ))
        dispatch({type : 'REGISTER_ERROR'})
    }
}

export const logout = () => async (dispatch) => {
    
    try {
        // localStorage.clear()
        Cookies.remove('db_id', {path: '/', secure: true, sameSite: 'none'})
        Cookies.remove('jwtToken', {path: '/', secure: true, sameSite: 'none'})

        dispatch(clearError())
        dispatch({type: 'LOGOUT'})

    }catch(error){
        console.log(error)
    }
}