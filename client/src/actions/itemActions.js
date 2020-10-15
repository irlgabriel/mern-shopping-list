import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "./types"

export const getItems = () => {
  console.log("getting items");
  return { 
    type: GET_ITEMS
  };
};