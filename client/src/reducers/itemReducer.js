import { v4 as uuidv4 } from 'uuid';

const initialState = {
  items: [
    { id: uuidv4(), name: "Eggs" },
    { id: uuidv4(), name: "Milk" },
    { id: uuidv4(), name: "Steak" },
  ]
}

export default function(state = initialState, action) {
  switch(action.type) {
    case "GET_ITEMS":
      return {
        ...state
      } 
    default: 
      return state;
  }
}