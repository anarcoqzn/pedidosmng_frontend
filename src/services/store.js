import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer, productDetailsReducer, productCreateReducer, productEditReducer } from './reducers/productReducer';
import { eventDetailsReducer, eventListReducer } from './reducers/eventReducer';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer } from './reducers/userReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = { cart: {cartItems}, userLogin:{userInfo}};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productSave: productCreateReducer,
  productEdit:productEditReducer,
  eventList: eventListReducer,
  eventDetails: eventDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;