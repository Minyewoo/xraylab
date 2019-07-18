import authReducer from './authReducer'
import snapshotReducer from './snapshotReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    snapshot: snapshotReducer
})

export default rootReducer