import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/authActions";
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
  const [err, setErr] = useState(error)
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setErr(error)
  }, [error])

  const handleToggle = () => {
    setModal(!modal);
    dispatch(clearErrors())
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => [
    setPassword(e.target.value)
  ]

  const submitHandler = (e) => {
    e.preventDefault();
    const user = {
      email,
      password
    }
    dispatch(login(user));
    if(!err.id) handleToggle();
  }

  return(
    <Container >
      <NavLink onClick={handleToggle} href='#'>
        Login
      </NavLink>
      <Modal isOpen={modal}>
        <ModalHeader>Log in</ModalHeader>
        <ModalBody>
          {
            err.id === "LOGIN_FAIL" 
              ? <Alert color="danger">{err.msg}</Alert>
            : null
          }
          <Form onSubmit={submitHandler}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input autoComplete="off" onChange={onEmailChange} name="email" type="text" placeholder="Email..." />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input onChange={onPasswordChange} name="password" type="password" placeholder="*********" />
            </FormGroup>
            <Button
              color="dark"
            >Login</Button>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  )
}