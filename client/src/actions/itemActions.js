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

export const addItem = (data) => dispatch => {
  dispatch(setLoadingItems());
  axios.post("/api/items", data)
  .then(console.log(`item ${data} added to backend`))
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