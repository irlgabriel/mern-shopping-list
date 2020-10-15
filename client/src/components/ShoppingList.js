import React, { useState } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";

export default function ShoppingList() {
  const [items, setItems] = useState([
    { id: uuidv4(), name: "Eggs" },
    { id: uuidv4(), name: "Milk" },
    { id: uuidv4(), name: "Steak" },
    { id: uuidv4(), name: "Water" },
  ]);

  const newItem = () => {
    const name = prompt("Enter Item Name");
    if (name) {
      setItems([...items, { id: uuidv4(), name }]);
    }
  };

  return (
    <Container>
      <Button onClick={newItem} color="dark" style={{ marginBottom: "2rem" }}>
        Add Item
      </Button>

      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map((item) => (
            <CSSTransition key={item.id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => setItems(items.filter(el => item.id !== el.id))}
                >
                  Delete Item
                </Button>
                <p>{item.name + " " + item.id}</p>
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}
