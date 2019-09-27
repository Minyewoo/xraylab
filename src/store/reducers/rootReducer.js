import authReducer from './authReducer'
import snapshotReducer from './snapshotReducer'
import {combineReducers} from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    snapshot: snapshotReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer