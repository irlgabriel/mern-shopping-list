
const initialState = {
  msg: null,
  status: null,
  id: null,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case "GET_ERRORS":
      return {
        msg: action.payload.msg.message,
        status: action.payload.status,
        id: action.payload.id,
      }
    case "CLEAR_ERRORS":
      return {
        msg: null,
        status: null,
        id: null,
      }
    default: 
      return {
        ...state
      }
  }
}