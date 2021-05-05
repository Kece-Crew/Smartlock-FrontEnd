import * as api from '../api'

export const dataLoading = (isLoading) => async (dispatch) => {
    dispatch({type: 'LOADINGDATA', payload : isLoading})
}

export const dataSuccess = (isSuccess) => async (dispatch) => {
    dispatch({type: 'SUCCESSACTION', payload: isSuccess})
}

export const getUserdata = () => async(dispatch) => {
    dispatch(dataLoading(true))
    try {
        const { data } = await api.getUserData()

        dispatch({type: 'FETCHUSER', payload: data})
        dispatch(dataLoading(false))
    } catch (error){
        let err = error.response.data.messages
        // console.log(err)
        if(typeof(err) === 'object'){
            err = err[0]
        }
        dispatch({type : 'ERRORUSER', payload: err})
        dispatch(dataLoading(false))
    }
}

export const updateUser = (userId, userData) => async(dispatch) => {
    dispatch(dataLoading(true))
    try{
        const { data } = await api.updateUser(userId, userData)

        dispatch({type: 'UPDATEUSER', payload: data})
        dispatch(dataLoading(false))
        dispatch(dataSuccess(true))

    } catch (error) {
        let err = error.response
        // console.log(err)
        if(typeof(err) === 'object'){
            err = err[0]
        }
        dispatch({type : 'ERRORUPDATE', payload: err})
        dispatch(dataLoading(false))
    }
}

export const deleteUser = (userId) => async(dispatch) => {
    dispatch(dataSuccess(false))
    dispatch(dataLoading(true))
    try{
        const { data } = await api.deleteUser(userId)

        dispatch({type: 'DELETEUSER', payload: data})
        dispatch(dataLoading(false))
        dispatch(dataSuccess(true))

    } catch (error){
        let err = error.response.data.messages
        // console.log(err)
        if(typeof(err) === 'object'){
            err = err[0]
        }
        dispatch({type : 'ERRORDELETE', payload: err})
        dispatch(dataLoading(false))
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