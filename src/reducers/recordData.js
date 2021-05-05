const initialState = {
    records : [],
    isLoading : false,
    isSuccess : false
}

const recordData = (state = initialState , action) => {
    switch(action.type) {
        case 'FETCHRECORD' :
            return {...state, records : action.payload}

        case 'ACTION_LOADING':
            return {...state, isLoading : action.payload}

        case 'ACTION_SUCCESS' : 
            return {...state, isSuccess : action.payload}
        
        case 'UPDATERECORD':
            return {...state, records : state.records.map((record) => record._id === action.payload._id ? action.payload : record)}

        case 'DELETERECORD' : 
            return {...state, records : action.payload}
        
        case 'ERRORRECORD' :
            return {...state, records : []}

        default : 
            return state
    }
}

export default recordData