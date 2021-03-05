import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
// import axios from 'axios';

// we destructure match from props to grab the url id
const ProductScreen = ({ history, match }) => {
  // const [product, setProduct] = useState({});

/*   useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    }
    fetchProduct();
  }, [match]) */
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;
  const { id } = match.params;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [id, dispatch])

  const addToCartHandler = () => {
    // We add a query string to redirect to the product
    // with the selected quantity
    history.push(`/cart/${id}?qty=${qty}`)
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      { loading ? (<Loader/>)
        : error ? (<Message variant="danger" >{error}</Message>)
        : (
      <Row>
        <Col md={6}>
          {/* "fluid" makes the image fit inside it's container */}
          <Image src={product.image} alt={product.name} fluid></Image>
        </Col>
        <Col md={3}>
           {/* variant="flush" takes away the borders */}
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={` ${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price:
                  </Col>
                  <Col>
                    <strong>{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Status:
                  </Col>
                  <Col>
                    <strong>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {
                product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e)=> setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map( x =>
                          <option key={x+1} value={x+1}> {x+1} </option>
                        )}
                      </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
              }
              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      )}
    </>
  )
}

export default ProductScreen;
