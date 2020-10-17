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

export const register = ({ name, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application-json"
    }
  }

  // Request Data
  const body = JSON.stringify({ name, email, password} )
  axios.post("api/users/register", body, config)
    .then(res => {
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
      dispatch({
        type: "REGISTER_FAIL",
        
      })
    })

}