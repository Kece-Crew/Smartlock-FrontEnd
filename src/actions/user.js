import * as api from '../api'

export const getUserdata = () => async(dispatch) => {
    try {
        const { data } = await api.getUserData()

        dispatch({type: 'FETCHUSER', payload: data})
    } catch (error){
        console.log(error.message)
    }
}

export const updateUser = (userId, userData) => async(dispatch) => {
    try{
        const { data } = await api.updateUser(userId, userData)

        dispatch({type: 'UPDATEUSER', payload: data})

    } catch (error) {
        console.log(error.message)
    }
}

export const deleteUser = (userId) => async(dispatch) => {
    try{
        const { data } = await api.deleteRecord(userId)

        dispatch({type: 'DELETEUSER', payload: data})
    } catch (error){
        console.log(error.message)
    }
}