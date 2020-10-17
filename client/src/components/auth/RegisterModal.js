import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions"

import { 
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  NavLink,
  Input,
  Alert,
} from "reactstrap";

export default () => {
  const error = useSelector(state => state.error)
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleToggle = () => {
    setModal(!modal);
    dispatch(clearErrors())
  }

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => [
    setPassword(e.target.value)
  ]

  const submitHandler = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password
    }
    dispatch(register(newUser));
    if(error.id !== "REGISTER_FAIL") handleToggle();
  }

  return(
    <Container >
      <NavLink onClick={handleToggle} href='#'>
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader>Register a new account</ModalHeader>
        <ModalBody>
          {
            error.id === "REGISTER_FAIL" 
              ? <Alert color="danger">{error.msg}</Alert>
            : null
          }
          <Form onSubmit={submitHandler}>
            <FormGroup>
              <Label htmlFor="email">Username</Label>
              <Input autoComplete="off" onChange={onEmailChange} name="name" type="name" placeholder="Username..." />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input autoComplete="off" onChange={onNameChange} name="email" type="text" placeholder="Email..." />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input onChange={onPasswordChange} name="password" type="password" placeholder="*********" />
            </FormGroup>
            <Button
              color="dark"
            >Register</Button>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  )
}