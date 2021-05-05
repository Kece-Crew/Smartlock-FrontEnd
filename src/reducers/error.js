const initialState = {
    status : null,
    message : {}
}

const error = (state = initialState , action) => {
    switch(action.type){
        case 'GET_ERROR':
            return {status : action.payload.status, message : action.payload.message }
        
        case 'CLEAR_ERROR':
            return {status : null, message : {}}

        default : return state
        
    }

}

export default error