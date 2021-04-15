import * as api from '../api'

export const getData = () => async (dispatch) => {
    try {
        const { data } = await api.getRecord()

        dispatch({type: 'FETCHRECORD', payload: data})
    }catch (error){
        console.log(error.message)
    }
}

export const updateData = (recordId, recordData) => async(dispatch) => {
    try{
        const { data } = await api.updateRecord(recordId, recordData)

        dispatch({type: 'UPDATERECORD', payload: data})

    } catch (error) {
        console.log(error.message)
    }
}

export const deleteData = (recordId) => async(dispatch) => {
    try{
        const { data } = await api.deleteRecord(recordId)

        dispatch({type: 'DELETERECORD', payload: data})
    } catch (error){
        console.log(error.message)
    }
}

export const getUserdata = () => async(dispatch) => {
    try {
        const { data } = await api.getUserData()

        dispatch({type: 'FETCHRECORD', payload: data})
    } catch (error){
        console.log(error.message)
    }
}

export const updateUser = (userId, userData) => async(dispatch) => {
    try{
        const { data } = await api.updateUser(userId, userData)

        dispatch({type: 'UPDATERECORD', payload: data})

    } catch (error) {
        console.log(error.message)
    }
}

export const deleteUser = (userId) => async(dispatch) => {
    try{
        const { data } = await api.deleteRecord(userId)

        dispatch({type: 'DELETERECORD', payload: data})
    } catch (error){
        console.log(error.message)
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
