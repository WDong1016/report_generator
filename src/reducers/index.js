import { combineReducers} from 'redux'
import auth from './auth'
import upload from './upload'

const rootReducers = combineReducers({
    auth,
    upload
})

export default rootReducers