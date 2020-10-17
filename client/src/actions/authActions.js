import axios from "axios";
import { returnErrors } from "./errorActions"

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: "USER_LOADING" });

  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  if(token) {
    config.headers["x-auth-token"] = token;
  }

  axios.get("/api/users/profile", config)
    .then(res => dispatch({
      type: "USER_LOADED",
      payload: res.data,
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
      type: "AUTH_ERROR"
      })
    })
}