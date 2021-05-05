const userData = (state = {isLoading : false, users : [], isSuccess : false}, action) => {
    switch(action.type) {
        case 'FETCHUSER' :
            return {...state, users : action.payload}

        case 'LOADINGDATA':
            return {...state, isLoading : action.payload}

        case 'UPDATEUSER':
            return {...state, users : state.users.map((record) => record._id === action.payload._id ? action.payload : record)}

        case 'DELETEUSER' : 
            return {...state, users : action.payload}

        case 'UPLOADUSER' : 
            return {...state, users : action.payload}

        case 'SUCCESSACTION' : 
            return {...state, isSuccess : action.payload}
        
        case 'ERRORUSER' :
            return {...state, users : []}

        default : 
            return state
    }
}

export default userData