import React, { useEffect, useState } from "react";
import { Container, ListGroup, ListGroupItem, Button, Alert } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";

export default function ShoppingList() {
  const items = useSelector(state => state.item.items)
  const err = useSelector(state => state.error)
  const dispatch = useDispatch()
  // GET items from back-end on component mount
  useEffect(() => { 
    dispatch(getItems())
  }, [])

  return (
    <Container>
      {
        err && err.id === "ITEM_ERROR" &&
        <Alert color="danger">{err.msg}</Alert>
      }
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