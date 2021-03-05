import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart } from '../actions/cartActions'

// We use location to read the quantity that is sent as a query string
// in the url when we add an item to cart
const cartScreen = ({ match, location, history}) => {
  const productId = match.params.id;

  return (
    <div>
      Cart
    </div>
  )
}

export default cartScreen;
