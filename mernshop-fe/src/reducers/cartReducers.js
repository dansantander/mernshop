import { CART_ADD_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch(action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
  
      // We find the cartItem id that is equal to the item id
      // beacause we need to consider when the item is already inside the cart
      const existItem = state.cartItems.find(x => x.product === item.product)

      if(existItem) {
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
    
    default:
      return state;
  }
};

