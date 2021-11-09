import userReducer from './userReducer'
import tempUserReducer from './tempUserReducer'
import commentReducer from './commentReducer'
import {combineReducers} from 'redux'
import therapistReducer from './therapistReducers'
import clientReducer from './clientReducer'

const rootReducer = combineReducers({
    tempUserReducer,
    therapistReducer,
    clientReducer,
    userReducer,
    commentReducer
})

export default rootReducer