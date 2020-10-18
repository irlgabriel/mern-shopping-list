import axios from "axios"
import { returnErrors } from "./errorActions";

export const getItems = () => dispatch => {
  dispatch(setLoadingItems());
  axios.get("/api/items")
  .then(res => dispatch({
    type: "GET_ITEMS",
    payload: res.data
    })
  )
}

export const setLoadingItems = () => {
  return {
    type: "ITEMS_LOADING"
  }
}

export const addItem = (data) => (dispatch, getState) => {

  // Set headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }
  const { auth } = getState()
  const token = auth.token
  if(token) config.headers['x-auth-token'] = token;
  axios
  .post("/api/items", data, config)
  .then(res =>
    dispatch({
      type: "ADD_ITEM",
      payload: res.data,
    })
  )
}

export const deleteItem = (id) => (dispatch, getState) => {
  
  // Set headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }
  const { auth } = getState()
  const token = auth.token
  if(token) config.headers['x-auth-token'] = token;
  // Make delete call to Items API
  axios
  .delete(`/api/items/${id}`, config)
  .then(res => 
    // Then dispatch to redux to update items state
    dispatch({
      type: "DELETE_ITEM",
      payload: id,
    })  
  )
  .catch(err => {
    console.log(err.response)
    dispatch(returnErrors(err.response.data, err.response.status, "ITEM_ERROR"))
  })
}