import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const itemFromAction = action.payload;

      // We find the cartItem id that is equal to the item id
      // beacause we need to consider when the item is already inside the cart
      // The find() method returns the array element value if any of the elements
      // in the array pass the test, otherwise it returns undefined
      const existItem = state.cartItems.find(
        (x) => x.product === itemFromAction.product
      );

      if (existItem) {
        // If the item does already exist inside the cartItems, we wanna
        // return the list of items we already have, and the item passed from our action
        // will be replacing the already existing item in the list.
        // All the other items will be returned the same they are
        return {
          ...state,
          cartItems: state.cartItems.map((mappedItem) =>
            mappedItem.product === existItem.product
              ? itemFromAction
              : mappedItem
          ),
        };
      } else {
        // If the item doesn't exist, we just push it in the cartItems array
        return {
          ...state,
          cartItems: [...state.cartItems, itemFromAction],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};
