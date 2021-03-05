/* eslint-disable */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart } from '../actions/cartActions'

// We use location to read the quantity that is sent as a query string
// in the url when we add an item to cart
const CartScreen = ({ match, location, history}) => {
  const productId = match.params.id;

  // location.search returns sth like ?qty=1
  // so we wanna get just the number
  // By splitting at the '=' sign we get back an array
  // that will look like: [?qty, 1]
  // so we grab it by using [1] and we turn it to a Number
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if(productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return (
    <Row>
      <Col md={8}>
        <h1> Shopping Cart </h1>
        { cartItems.length === 0 ? <Message> Your Cart is empty <Link to='/'> Go Back </Link></Message> : (
          <ListGroup variant="flush">

          </ListGroup>
        )}
      </Col>
      <Col md={2}>
      </Col>
      <Col md={2}>
      </Col>
    </Row>
  )
}

export default CartScreen;
