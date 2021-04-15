import { combineReducers } from 'redux'

import recordData from './recordData'
import userData from './userData'
import auth from './auth'

export default combineReducers({ recordData, auth, userData })

