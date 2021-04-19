import * as api from '../api'

export const signIn = (authData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(authData);
        dispatch({type: 'SIGNIN', payload: data})
        history.push('/')
    } catch(error) {
        let err = error.response.data.messages
        // console.log(err)
        if(typeof(err) === 'object'){
            err = err[0]
        }
        dispatch({type : 'ERRORSIGNIN', payload: err})
        
    }
}

export const signUp = (authData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(authData);
        dispatch({type: 'SIGNUP', payload: data})
        history.push('/')
    } catch(error) {
        let err = error.response.data.messages
        // console.log(err)
        if(typeof(err) === 'object'){
            err = err[0]
        }
        dispatch({type : 'ERRORSIGNUP', payload: err})
    }
}