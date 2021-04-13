import { combineReducers } from 'redux'

import userData from './userData'
import auth from './auth'

export default combineReducers({ userData, auth })

