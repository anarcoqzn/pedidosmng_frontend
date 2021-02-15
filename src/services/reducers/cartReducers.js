import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants";

function cartReducer(state={cartItems: []}, action){
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const t_product = state.cartItems.find(i => (i._id === item._id));
      if(t_product){
        return {
          cartItems: 
            state.cartItems.map(x => (x._id === t_product._id) ? item : x)
        }
      }
      return {
        cartItems: [...state.cartItems, item]
      }
    
    case CART_REMOVE_ITEM:
      return { 
        cartItems: state.cartItems.filter(p => p._id !== action.payload)
      }
    default:
      return state;
  }
}

export { cartReducer };