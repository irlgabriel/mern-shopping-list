

const initialState = {
  items: [],
  loading: false,
}

// itemReducer
export default function(state = initialState, action) {
  switch(action.type) {
    case "GET_ITEMS":
      return {
        ...state,
        loading: false, 
        items: action.payload
      }
    case "ADD_ITEM":
      return {
        ...state, 
        items: [action.payload, ...state.items],
        loading: false,
      }
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        loading: false
      }
    case "ITEMS_LOADING":
      return {
        ...state,
        loading: true,
      }
    default: 
      return state;
  }
}
