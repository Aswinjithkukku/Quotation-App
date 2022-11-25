import axios from 'axios'
import {
    GET_AIRPORT_REQUEST,
    GET_AIRPORT_SUCCESS,
    GET_AIRPORT_FAIL,
  
    GET_HOTELS_REQUEST,
    GET_HOTELS_SUCCESS,
    GET_HOTELS_FAIL,
  
    CLEAR_ERRORS,
  } from "../constants/HotelConstants";

// load place of transfer
export const loadAirport = () => async (dispatch) => {
  try {
    dispatch({ type: GET_AIRPORT_REQUEST });

    const { data } = await axios.get("/api/location/airports");

    dispatch({
      type: GET_AIRPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_AIRPORT_FAIL,
      payload: error.response.data.message,
    });
  }
};
// fetch hotels 
export const fetchHotels = (airportIata) => async (dispatch) => {
  try {
    dispatch({ type: GET_HOTELS_REQUEST });
    console.log({airportIata});

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/hotels/enquiry",{airportIata}, config);
    console.log(data);

    dispatch({
      type: GET_HOTELS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_HOTELS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
