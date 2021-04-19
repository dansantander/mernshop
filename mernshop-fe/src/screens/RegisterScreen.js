import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const RegisterScreen = ({ history, location }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const redirect = location.search ? location.search.split('=')[1] :'/'

  useEffect(() => {
    if(userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect])
  
  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      setMessage('Passwords do not match');
    }
    dispatch(register(name, email, password));
  }

  return (
    <FormContainer>
      <h1>Sing Up</h1>
      { message && <Message variant="danger">{ message }</Message> }
      { error && <Message variant="danger">{ error }</Message> }
      { loading && <Loader></Loader> }
      <Form onSubmit={ submitHandler }>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={ name }
            onChange={ e => setName(e.target.value) }
          >
          </Form.Control>
        </Form.Group>
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
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={ confirmPassword }
            onChange={ e => setConfirmPassword(e.target.value) }
          >
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">Sign Up</Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already have an account?{' '}
          <Link to={ redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen;
