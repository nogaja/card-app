import { combineReducers } from 'redux'
// import { userReducer } from './userReducer'
import { cardReducer } from './cardReducer'


export const rootReducer = combineReducers({
    cardModule: cardReducer,
    // userModule: userReducer
})
