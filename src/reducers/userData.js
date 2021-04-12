const userData = (userData = [] , action) => {
    switch(action.type) {
        case 'FETCH_ALL' : 
            return action.payload; 
        case 'UPDATE':
            return userData;
        case 'DELETE' : 
            return userData;
        default : 
            return [];
    }
}

export default userData