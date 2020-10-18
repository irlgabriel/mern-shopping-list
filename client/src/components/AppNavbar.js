import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import "bootstrap/dist/css/bootstrap-grid.min.css";
import { logout } from "../actions/authActions";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";

export default function AppNavbar() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [isOpen, setOpen] = useState(false);

  const logoutHandler = () => {
    dispatch(logout())
  }

  const toggle = () => {
    setOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">ShoppingList</NavbarBrand>
          <NavbarToggler onClick={toggle}></NavbarToggler>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto">
              {
                !auth.isAuthenticated && 
                <NavItem>
                  <RegisterModal />                
                </NavItem>
              }
              {
                !auth.isAuthenticated &&
                <NavItem>
                  <LoginModal />
                </NavItem>
              }
              {
                auth.isAuthenticated && 
                <NavItem>
                  <NavLink 
                    onClick={logoutHandler}
                    style={{cursor: "pointer  "}}
                  >Log Out</NavLink>
                </NavItem>
              }
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
