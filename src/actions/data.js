import * as api from '../api'

export const getData = () => async (dispatch) => {
    try {
        const { data } = await api.getRecord();

        dispatch({type: 'FETCHALL', payload: data})
    }catch (error){
        console.log(error.message)
    }
}

export const updateData = (recordId, recordData, userId, userData) => async(dispatch) => {
    try{
        const { data } = await api.updateRecord(recordId, recordData, userId, userData)

        dispatch({type: 'UPDATE', payload: data})

    } catch (error) {
        console.log(error.message)
    }
}

export const deleteData = (recordId) => async(dispatch) => {
    try{
        const { data } = await api.deleteRecord(recordId)

        dispatch({type: 'DELETE', payload: data})
    } catch (error){
        console.log(error.message)
    }
}