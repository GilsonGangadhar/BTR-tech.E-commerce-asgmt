import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {cartReducer} from '../reducers/cartReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
    cart : cartReducer,
    }), applyMiddleware(thunk))
    return store
}

export default configureStore;