import {
  TRANSFER_PLACE_REQUEST,
  TRANSFER_PLACE_SUCCESS,
  TRANSFER_PLACE_FAIL,

  TRANSFER_RESULT_REQUEST,
  TRANSFER_RESULT_SUCCESS,
  TRANSFER_RESULT_FAIL,

  CLEAR_ERRORS,
} from "../constants/TransferConstants";

export const transferPlaceReducer = ( state = { place: [], airport: [] }, action ) => {
    switch(action.type){
        case TRANSFER_PLACE_REQUEST:
            return {
                loading: true
            }

        case TRANSFER_PLACE_SUCCESS:
            return{
                loading: false,
                place: action.payload.place,
                airport: action.payload.airport,
            }

        case TRANSFER_PLACE_FAIL:
            return {
                ...state,
                error: action.payload
            }
         case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const transferReducer = ( state = {}, action ) => {
    switch(action.type){
        case TRANSFER_RESULT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TRANSFER_RESULT_SUCCESS:
            return{
                ...state,
                loading: false,
                transfer: action.payload
            }

        case TRANSFER_RESULT_FAIL:
            return {
                ...state,
                error: action.payload
            }
         case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}