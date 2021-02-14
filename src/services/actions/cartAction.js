import api from '../api';
import { CART_ADD_ITEM } from '../constants';

const addToCart = (productId, quantity, sizes) => async (dispatch) => {
  try {
    const { data } = await api.get("/product/"+productId);
    dispatch({type: CART_ADD_ITEM, payload: {
      product: data._id,
      name: data.name,
      images: data.images,
      value: data.value,
      sizes,
      quantity
    }});
  } catch (error) {
  }
}

export { addToCart }