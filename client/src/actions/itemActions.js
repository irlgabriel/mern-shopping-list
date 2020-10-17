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
  axios
  .post("/api/items", data)
  .then(res =>
    dispatch({
      type: "ADD_ITEM",
      payload: res.data,
    })
  )
}

export const deleteItem = (id) => dispatch => {
  dispatch(setLoadingItems());
  axios
  .delete(`api/items/${id}`)
  .then(res => 
    dispatch({
      type: "DELETE_ITEM",
      payload: id,
    })  
  )
  .catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status))
  })
}