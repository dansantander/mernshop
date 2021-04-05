import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch(action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
  
      // We find the cartItem id that is equal to the item id
      // beacause we need to consider when the item is already inside the cart
      // The find() method returns the array element value if any of the elements
      // in the array pass the test, otherwise it returns undefined
      const existItem = state.cartItems.find(x => x.product === item.product)

      if(existItem) {
        // If the item does exist already inside the cartItems, we wanna
        // return the list of items we already have and the item from our action
        // will be replacing the already existing item
        // All the other items will be returned as he same they are
        return {
          ...state,
          cartItems: state.cartItems.map(x => x.product === existItem.product ? item: x)
        }
      } else {
        // If the item doesn't exist, we just push it in the cartItems array
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }

    case CART_REMOVE_ITEM:
      return{
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload)
      }

    default:
      return state;
  }
};

