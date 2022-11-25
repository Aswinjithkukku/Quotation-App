import {
    GET_AIRPORT_REQUEST,
    GET_AIRPORT_SUCCESS,
    GET_AIRPORT_FAIL,
  
    GET_HOTELS_REQUEST,
    GET_HOTELS_SUCCESS,
    GET_HOTELS_FAIL,
  
    CLEAR_ERRORS,
  } from "../constants/HotelConstants";
  
  export const airportReducer = ( state = { airport: [] }, action ) => {
      switch(action.type){
          case GET_AIRPORT_REQUEST:
              return {
                  loading: true
              }
  
          case GET_AIRPORT_SUCCESS:
              return{
                  loading: false,
                  airport: action.payload.airport,
              }
  
          case GET_AIRPORT_FAIL:
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
  
  export const hotelsReducer = ( state = { hotels: [] }, action ) => {
      switch(action.type){
          case GET_HOTELS_REQUEST:
              return {
                  ...state,
                  loading: true
              }
  
          case GET_HOTELS_SUCCESS:
              return{
                  ...state,
                  loading: false,
                  hotels: action.payload
              }
  
          case GET_HOTELS_FAIL:
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