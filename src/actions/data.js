import * as api from '../api'
import { returnError } from './error'

export const dataLoading = (isLoading) => async (dispatch) => {
    dispatch({type: 'ACTION_LOADING', payload : isLoading})
}

export const dataSuccess = (isSuccess) => async (dispatch) => {
    dispatch({type: 'ACTION_SUCCESS', payload: isSuccess})
}

export const getData = () => async (dispatch) => {
    dispatch(dataLoading(true))
    try {
        const { data } = await api.getRecord()
        dispatch({type: 'FETCHRECORD', payload: data})
        
        dispatch(dataLoading(false))
    }catch (error){
        // console.log(error)

        dispatch(returnError(error.response.data, error.response.status))
        dispatch(dataLoading(false))
    }
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

export const updateData = (recordId, recordData) => async(dispatch) => {
    
    dispatch(dataLoading(true))
    try{
        const { data } = await api.updateRecord(recordId, recordData)
        dispatch({type: 'UPDATERECORD', payload: data})
        dispatch(dataLoading(false))
        dispatch(dataSuccess(true))

    } catch (error) {
        // console.log(error)

        dispatch(returnError(error.response.data, error.response.status ))
        dispatch(dataLoading(false))
    }
}

export const deleteData = (recordId) => async(dispatch) => {
    dispatch(dataLoading(true))
    try{
        const { data } = await api.deleteRecord(recordId)

        dispatch({type: 'DELETERECORD', payload: data})
        dispatch(dataLoading(false))
        dispatch(dataSuccess(true))
        
    } catch (error){
        // console.log(error)

        dispatch(returnError(error.response.data, error.response.status ))
        dispatch(dataLoading(false))
    }
}