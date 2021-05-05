const initialState = {
    authData : null
}

const auth = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS' : 
            return {...state, authData: action.payload};

        case 'REGISTER_SUCCESS' : 
            return {...state, authData: action.payload};

        case 'LOGOUT' : 
            return {...state, authData: null}
            
        case 'LOGIN_ERROR' :
            return {...state, authData: null}

        case 'REGISTER_ERROR':
            return {...state, authData: null}

        default : return state;
    }
}

export default auth