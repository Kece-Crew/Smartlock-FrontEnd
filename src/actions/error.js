export const returnError = (message, status) => async (dispatch) => {
    dispatch({type: 'GET_ERROR', payload : {message, status}})
}

export const clearError = () => async (dispatch) => {
    dispatch({type: 'CLEAR_ERROR'})
}