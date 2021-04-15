const recordData = (records = [] , action) => {
    switch(action.type) {
        case 'FETCHRECORD' :
            return action.payload

        case 'UPDATERECORD':
            return records.map((record) => record._id === action.payload._id ? action.payload : record)

        case 'DELETERECORD' : 
            return action.payload

        case 'UPLOAD' :
            return action.payload

        default : 
            return []
    }
}

export default recordData