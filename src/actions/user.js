import * as api from '../api'

export const getUserdata = () => async(dispatch) => {
    try {
        const { data } = await api.getUserData()

        dispatch({type: 'FETCHUSER', payload: data})
    } catch (error){
        let err = error.response.data.messages
        // console.log(err)
        if(typeof(err) === 'object'){
            err = err[0]
        }
        dispatch({type : 'ERRORUSER', payload: err})
    }
}

export const updateUser = (userId, userData) => async(dispatch) => {
    try{
        const { data } = await api.updateUser(userId, userData)

        dispatch({type: 'UPDATEUSER', payload: data})

    } catch (error) {
        let err = error.response.data.messages
        // console.log(err)
        if(typeof(err) === 'object'){
            err = err[0]
        }
        dispatch({type : 'ERRORUPDATE', payload: err})
    }
}

export const deleteUser = (userId) => async(dispatch) => {
    try{
        const { data } = await api.deleteUser(userId)

        dispatch({type: 'DELETEUSER', payload: data})
    } catch (error){
        let err = error.response.data.messages
        // console.log(err)
        if(typeof(err) === 'object'){
            err = err[0]
        }
        dispatch({type : 'ERRORDELETE', payload: err})
    }
}

export const uploadUser = (userData) => async(dispatch) => {
    try {
        const { data } = await api.addUser(userData)

        dispatch({type : 'UPLOADUSER', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}