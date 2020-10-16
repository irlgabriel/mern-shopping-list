import axios from "axios"

export const getItems = () => dispatch => {
  dispatch(setLoadingItems());
  axios.get("/api/items")
  .then(res => dispatch({
    type: "GET_ITEMS",
    payload: res.data
  }))
}

export const setLoadingItems = () => {
  return {
    type: "ITEMS_LOADING"
  }
}

export const addItem = (data) => {
  dispattch(setLoadingItems());
  axios.post("/api/items")
  .then(console.log("item added to backend"))
  return {
    type: "ADD_ITEM",
    payload: data
  }
}

export const deleteItem = (id) => {
  return {
    type: "DELETE_ITEM",
    payload: id
  }
}