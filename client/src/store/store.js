import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { authReducer } from './reducers/AuthReducers'
import { transferPlaceReducer, transferReducer } from './reducers/TransferReducers'
import { airportReducer, hotelsReducer } from './reducers/HotelReducers'


const reducer = combineReducers({
    auth: authReducer,
    transferPlace: transferPlaceReducer,
    transfer: transferReducer,
    airport: airportReducer,
    hotels: hotelsReducer,
})


let initialState = {
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store