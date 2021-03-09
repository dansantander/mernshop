import axios from 'axios';
import { CART_ADD_ITEM } from '../constants/cartConstants';

// getState() allows us to grab our entire state tree
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  })

  // Remember: we can only save strings in localStorage, so we need to
  // stringify them everytime we wanna save them
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}