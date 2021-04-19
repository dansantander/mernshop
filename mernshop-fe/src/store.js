import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// console.log(cartItemsFromStorage)

// We originally had user info set to {} (empty object)
// but it was causing not being able to access loginScreen
// so we need to make sure is null instead, cause an empty
// object is truthy
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleWare = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;