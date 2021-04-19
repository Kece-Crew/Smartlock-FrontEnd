const error = (state = {type: '', msg : ''},action) => {
    switch(action.type){
        case 'ERRORSIGNIN' : 
            if(action.payload.includes('Password')) return {...state, type: 'signin', msg: 'Password'}
            if(action.payload.includes('Document')) return {...state, type: 'signin', msg: 'Username'}
            break
        case 'ERRORSIGNUP' : 
            if(action.payload.includes('Password')) return {...state, type: 'signup', msg: 'Password'}
            if(action.payload.includes('Username')) return {...state, type: 'signup', msg: 'Username'}
            break
        case 'ERRORUPDATE' :
            if(action.payload.includes('id')) return {...state, type: 'update', msg: 'id'}
            break
        case 'ERRORDELETE' :
            if(action.payload.includes('id')) return {...state, type: 'delete', msg: 'id'}
            break
        default : return null
    }

}

export default error