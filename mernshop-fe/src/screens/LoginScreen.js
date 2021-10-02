import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const LoginScreen = ({ history, location }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  // We grab userLogin object from the Redux store
  const userLogin = useSelector(state => state.userLogin);
  // And we destructure these things from it:
  const { loading, error, userInfo } = userLogin;

  // The value of redirect is grabbed from the location object
  // Remember: Locations represent where the app is now, where you want it to go,
  // or even where it was.
  const redirect = location.search ? location.search.split('=')[1] :'/'
  console.log('location in LoginScreen',location)
  console.log('location.search',location.search)
  console.log('redirect',redirect)

  useEffect(() => {
    // So if the user is logged in, the value of redirect is whatever
    // that is after the '=' in the query parameter
    // For example, from CartScreen we passed is as shipping
    // So if userInfo is not there ( user is not logged in )
    // we are first presented with LoginScreen
    // but after login, user is redirected to ShippingScreen
    // If the value of location doesnt' exist, we set redirect to '/'
    // So we are redirected to the HomeScreen
    if(userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect])
  
  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch login
    dispatch(login(email, password));
  }

  return (
    <FormContainer>
      <h1>Sing In</h1>
      { error && <Message variant="danger">{ error }</Message> }
      { loading && <Loader></Loader> }
      <Form onSubmit={ submitHandler }>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={ email }
            onChange={ e => setEmail(e.target.value) }
          >
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={ password }
            onChange={ e => setPassword(e.target.value) }
          >
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">Sign in</Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{' '}
          {/* In url "?" is used as a separator for passing query parameters*/}
          {/* so we're passing in the url whatever the value of redirect is*/}
          <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen;
