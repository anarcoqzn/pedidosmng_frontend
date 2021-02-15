import api from '../api';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants';
import Cookie from 'js-cookie';

const addToCart = (productId, quantity, size) => async (dispatch, getState) => {
  try {
    const { data } = await api.get("/product/"+productId);
    await dispatch({type: CART_ADD_ITEM, payload: {
      _id: data._id+size,
      product: data._id,
      name: data.name,
      image: data.images[0],
      value: data.value,
      size:size,
      quantity: Number(quantity)
    }});

    const {cart: {cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.log(error)
  }
}

const removeFromCart = (itemID) => (dispatch, getState) => {
  dispatch({type: CART_REMOVE_ITEM, payload: itemID});
  
  const {cart: {cartItems}} = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
}

export { addToCart, removeFromCart }