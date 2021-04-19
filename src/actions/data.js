import * as api from '../api'

export const getData = () => async (dispatch) => {
    try {
        const { data } = await api.getRecord()

        dispatch({type: 'FETCHRECORD', payload: data})
    }catch (error){
        let err = error.response.data.messages
        // console.log(err)
        if(typeof(err) === 'object'){
            err = err[0]
        }
        dispatch({type : 'ERRORRECORD', payload: err})
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