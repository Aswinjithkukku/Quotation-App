import axios from 'axios'
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
    CLEAR_ERRORS
} from '../constants/AuthConstants'

//Login
export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      console.log(data);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  //Register
  export const register = (userData )=> async (dispatch) => {
      
      try {
        dispatch({ type: USER_REGISTER_REQUEST });
  
        const config = {
          headers: {
            "Content-Type": "application/json"
          },
        };
        const { data } = await axios.post("/api/user/register",userData , config);
  
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data.user,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: error.response.data.message,
        });
      }
    };
  
  // Load User
  export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
  
      const { data } = await axios.get("/api/user/me");
  
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: LOAD_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Logout User
export const logout = () => async (dispatch) => {
    try {
      await axios.get("/api/user/logout");
  
      dispatch({
        type: USER_LOGOUT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: USER_LOGOUT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};