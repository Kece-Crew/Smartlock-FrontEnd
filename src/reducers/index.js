import { combineReducers } from 'redux'

import recordData from './recordData'
import userData from './userData'
import auth from './auth'
import error from './error'

//Create global store for storing data
export default combineReducers({ 
    records : recordData, 
    users : userData, 
    auths : auth, 
    errors : error 
})