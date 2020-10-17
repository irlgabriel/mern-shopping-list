import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/authActions";

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
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setMsg(error.msg)
  }, [error.msg])

  const handleToggle = () => {
    setModal(!modal);
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

  }

  return(
    <Container >
      <NavLink onClick={handleToggle} href='#'>
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader>Register a new account</ModalHeader>
        <ModalBody>
          { error.msg.msg ? <Alert color="danger">{msg}</Alert> : null} 
          <Form onSubmit={submitHandler}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input onChange={onEmailChange} name="email" type="email" placeholder="Email..." />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Email</Label>
              <Input onChange={onNameChange} name="name" type="text" placeholder="Email..." />
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