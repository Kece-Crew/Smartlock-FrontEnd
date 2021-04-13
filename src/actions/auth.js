import * as api from '../api'

export const signIn = (authData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(authData);
        dispatch({type: 'SIGNIN', payload: data})
        history.push('/')
    } catch(error) {
        console.log(error.message)
    }
}

export const signUp = (authData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(authData);
        dispatch({type: 'SIGNUP', payload: data})
        history.push('/')
    } catch(error) {
        console.log(error.message)
    }
}