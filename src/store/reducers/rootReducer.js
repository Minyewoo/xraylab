import authReducer from './authReducer'
import snapshotReducer from './snapshotReducer'
import {combineReducers} from 'redux'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    auth: authReducer,
    snapshot: snapshotReducer,
    firestore: firestoreReducer
})

export default rootReducer