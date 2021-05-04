import Cookies from 'js-cookie'

const auth = (state = {authData : null}, action) => {
    switch(action.type){
        case 'SIGNIN' : 
            // localStorage.setItem('profile', JSON.stringify({...action.payload}))
            Cookies.set('db_id', action.payload.db_id, { path: '/', secure: true, sameSite: 'none' })
            Cookies.set('jwtToken', action.payload.jwtToken, { path: '/', secure: true, sameSite: 'none' })
            return {...state, authData: action.payload};

        case 'SIGNUP' : 
            // localStorage.setItem('profile', JSON.stringify({...action.payload}))
            Cookies.set('db_id', action.payload.db_id, { path: '/', secure: true, sameSite: 'none' })
            Cookies.set('jwtToken', action.payload.jwtToken, { path: '/', secure: true, sameSite: 'none' })
            return {...state, authData: action.payload};

        case 'LOGOUT' : 
            // localStorage.clear()
            Cookies.remove('db_id', {path: '/', secure: true, sameSite: 'none'})
            Cookies.remove('jwtToken', {path: '/', secure: true, sameSite: 'none'})
            return {...state, authData: null};
            
        default : return state;
    }
}

export default auth