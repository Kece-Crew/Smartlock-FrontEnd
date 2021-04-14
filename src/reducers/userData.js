const userData = (records = [] , action) => {
    switch(action.type) {
        case 'FETCHALL' :
            return action.payload

        case 'UPDATE':
            return records.map((record) => record._id === action.payload._id ? action.payload : record)

        case 'DELETE' : 
            return action.payload

        case 'ERROR' : 
            return action.payload

        default : 
            return []
    }
}

export default userData