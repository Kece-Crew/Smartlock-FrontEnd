const userData = (records = [] , action) => {
    switch(action.type) {
        case 'FETCHUSER' :
            return action.payload

        case 'UPDATEUSER':
            return records.map((record) => record._id === action.payload._id ? action.payload : record)

        case 'DELETEUSER' : 
            return action.payload

        case 'UPLOADUSER' : 
            return action.payload
        
        case 'ERRORUSER' :
            return []

        default : 
            return records
    }
}

export default userData