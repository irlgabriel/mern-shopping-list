import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';


export default function ShoppingList() {
  const items = useSelector(state => state.items)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: "GET_ITEMS"})
  }, [])

  const newItem = () => {
    const name = prompt("Enter Item Name");
    dispatch({
      type: "ADD_ITEM",
      payload: {
        name: name, 
        id: uuidv4()}
    });
  };


  return (
    <Container>
      <Button onClick={newItem} color="dark" style={{ marginBottom: "2rem" }}>
        Add Item
      </Button>

      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(item => (
            <CSSTransition key={item.id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"  
                  size="sm"
                  onClick={() => dispatch({type: "DELETE_ITEM", payload: item.id}) }
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