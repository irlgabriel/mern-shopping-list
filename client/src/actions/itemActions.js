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

export const addItem = (data) => dispatch => {
  dispatch(setLoadingItems());
  const config = {
    headers: {
      'x-auth-token': localStorage.getItem('token')
    }
  }
  axios
  .post("/api/items", data, config)
  .then(res =>
    dispatch({
      type: "ADD_ITEM",
      payload: res.data,
    })
  )
}

export const deleteItem = (id) => dispatch => {
  // Make delete call to Items API
  axios
  .delete(`/api/items/${id}`, {
    headers: {
      'x-auth-token': localStorage.getItem('token')
    }
  })
  .then(res => 
    // Then dispatch to redux to update items state
    dispatch({
      type: "DELETE_ITEM",
      payload: id,
    })  
  )
  .catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status))
  })
}