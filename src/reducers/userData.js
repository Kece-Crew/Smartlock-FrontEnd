const userData = (records = [] , action) => {
    switch(action.type) {
        case 'FETCHALL' :
            return action.payload;

        case 'UPDATE':
            return action.payload;

        case 'DELETE' : 
            return action.payload;

        default : 
            return [];
    }
}

export default userData