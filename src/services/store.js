import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer, productSaveReducer } from './reducers/productReducer';
import { eventDetailsReducer, eventListReducer } from './reducers/eventReducer';
import { cartReducer } from './reducers/cartReducers';

const initialState = {};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productSave: productSaveReducer,
  eventList: eventListReducer,
  eventDetails: eventDetailsReducer,
  cart: cartReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;