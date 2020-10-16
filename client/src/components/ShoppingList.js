import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { getItems, setLoadingItems, addItem, deleteItem } from "../actions/itemActions";

export default function ShoppingList() {
  const items = useSelector(state => state.items)
  const dispatch = useDispatch()
  
  useEffect(() => { 
    dispatch(getItems())
  }, [])

  const newItem = () => {
    const name = prompt("Enter Item Name");
    if (name != "") {
      const newItem = {
        name,
      }
      dispatch(addItem(newItem))
    }

  };


  return (
    <Container>
      <Button onClick={newItem} color="dark" style={{ marginBottom: "2rem" }}>
        Add Item
      </Button>

      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(item => (
            <CSSTransition key={item._id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"  
                  size="sm"
                  onClick={() => dispatch({type: "DELETE_ITEM", payload: item._id}) }
                >
                  &times;
                </Button>
                <span>{item.name}</span>
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}