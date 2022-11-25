import axios from "axios";
import {
  TRANSFER_PLACE_REQUEST,
  TRANSFER_PLACE_SUCCESS,
  TRANSFER_PLACE_FAIL,

  TRANSFER_RESULT_REQUEST,
  TRANSFER_RESULT_SUCCESS,
  TRANSFER_RESULT_FAIL,

  CLEAR_ERRORS,
} from "../constants/TransferConstants";

// load place of transfer
export const loadTransferPlace = () => async (dispatch) => {
  try {
    dispatch({ type: TRANSFER_PLACE_REQUEST });

    const { data } = await axios.get("/api/transfer");

    dispatch({
      type: TRANSFER_PLACE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSFER_PLACE_FAIL,
      payload: error.response.data.message,
    });
  }
};
// fetch transfer
export const fetchTransfer = (transferData) => async (dispatch) => {
  try {
    dispatch({ type: TRANSFER_RESULT_REQUEST });
    console.log(transferData);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/api/transfer/enquiry",transferData, config);
    console.log(data);

    dispatch({
      type: TRANSFER_RESULT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: TRANSFER_RESULT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
