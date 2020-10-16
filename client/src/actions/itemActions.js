import axios from "axios"

export const getItems = () => dispatch => {
  dispatch(setItemsLoading())
  axios.get('/api/items')
    .then(res => dispatch({
      type: "GET_ITEMS",
      payload: res.data,
    }))
  return {
    type: "GET_ITEMS",
  }
}

export const setItemsLoading = () => {
  return {
    type: "ITEM_LOADING",
  }
}