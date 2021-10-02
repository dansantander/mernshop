/*eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import { ORDER_USER_LIST_RESET } from '../constants/orderConstants';

const Header = () => {

  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    //dispatch(resetUserOders());
    dispatch(logout());
  } 
  
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
       <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MERNShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
              </LinkContainer>
              { userInfo ? (
                <NavDropdown title={ userInfo.name } id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) :
              <LinkContainer to="/login">
                <Nav.Link ><i className="fas fa-user"></i>Sign In</Nav.Link>
              </LinkContainer>
             }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;
