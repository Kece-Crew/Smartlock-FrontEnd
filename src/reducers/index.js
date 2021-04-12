import { combineReducers } from 'redux'

import userData from './userData'
import signIn from './auth'

export default combineReducers({ userData, signIn })

