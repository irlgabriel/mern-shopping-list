import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { getItems, addItem, deleteItem } from "../actions/itemActions";

export default function ShoppingList() {
  const items = useSelector(state => state.item.items)
  const dispatch = useDispatch()
  
  // GET items from back-end on component mount
  useEffect(() => { 
    dispatch(getItems())
  }, [])

  const newItem = () => {
    const name = prompt("Enter Item Name");
    if (name !== "") {
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
                  onClick={() => dispatch(deleteItem(item._id))}
                >
                  &times;
                </Button>
                <span>&nbsp;{item.name}</span>
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}