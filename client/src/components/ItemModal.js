import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { 
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { addItem } from "../actions/itemActions";

export default () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');

  const handleToggle = () => setModal(!modal);
  const handleChangeName = (e) => setName(e.target.value)
  const handleOnSumbit = (e) => {
    e.preventDefault();

    const newItem = {
      name
    }
    if (name) {
      dispatch(addItem(newItem));
    }
    handleToggle();
  }
  return(
  <Container>
    {
      isAuthenticated 
      ? <Button
          color="dark"
          className="mb-5"
          onClick={handleToggle}
        >
          Add Item
        </Button>
      : <h4>Please log in to manage items</h4>
    }
    <Modal isOpen={modal} toggle={handleToggle}>
      <ModalHeader toggle={handleToggle}>Add to Shopping List</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleOnSumbit}>
        <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={handleChangeName}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  </Container>
  )
}