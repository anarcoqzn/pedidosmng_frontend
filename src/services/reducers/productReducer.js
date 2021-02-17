import productConstants from "../constants/product";

function productListReducer(state = {products:[]}, action){

  switch (action.type) {
    case productConstants.PRODUCT_LIST_REQUEST:
      return {loading: true};
    case productConstants.PRODUCT_LIST_SUCCESS:
      return {loading: false, products: action.payload};
    case productConstants.PRODUCT_LIST_FAIL:
      return {loading: false, error: action.payload};
    default :
    return state;
  }
}

function productDetailsReducer(state = {product:{}}, action){

  switch (action.type) {
    case productConstants.PRODUCT_DETAILS_REQUEST:
      return {loading: true};
    case productConstants.PRODUCT_DETAILS_SUCCESS:
      return {loading: false, product: action.payload};
    case productConstants.PRODUCT_DETAILS_FAIL:
      return {loading: false, error: action.payload};
    default :
    return state;
  }
}

function productSaveReducer(state = {product:{}}, action){

  switch (action.type) {
    case productConstants.PRODUCT_SAVE_REQUEST:
      return {loading: true};
    case productConstants.PRODUCT_SAVE_SUCCESS:
      return {loading: false, product: action.payload};
    case productConstants.PRODUCT_SAVE_FAIL:
      return {loading: false, error: action.payload};
    default :
    return state;
  }
}

export {productListReducer, productDetailsReducer, productSaveReducer}
