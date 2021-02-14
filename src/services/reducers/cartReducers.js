import { CART_ADD_ITEM } from "../constants";

function cartReducer(state={cartItems: []}, action){
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const t_product = state.cartItems.find(i => i.product === item.product);
      if(t_product){
        return {
          cartItems: 
            state.cartItems.map(x => (x.product === t_product.product) ? item : x)
        }
      }
      return {
        cartItems: [...state.cartItems, item]
      }
  
    default:
      return state;
  }
}

export { cartReducer }