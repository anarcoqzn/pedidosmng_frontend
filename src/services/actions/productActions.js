import productConstants from '../constants/product';
import api from "../api";

const listProducts = (token) => async (dispatch) => {

  try{
    var response;
    
    dispatch({type: productConstants.PRODUCT_LIST_REQUEST});
    
    if (!token) response = await api.get("/product");
    
    else response = await api.get('/user/product', {headers:{
      Authorization: 'Bearer '+token
    }});
    
    const {data} = response;
    dispatch({type: productConstants.PRODUCT_LIST_SUCCESS, payload: data});
  }catch(err){
    dispatch({type: productConstants.PRODUCT_LIST_FAIL, payload: err.message});
  }
}

const productDetails = (productID) => async (dispatch) => {
  try {
    
    dispatch({type: productConstants.PRODUCT_DETAILS_REQUEST, payload: productID});
    const { data } = await api.get("/product/"+productID);

    dispatch({type: productConstants.PRODUCT_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: productConstants.PRODUCT_DETAILS_FAIL, payload: error.message});
  }
}

const productCreate = (data, token) => async (dispatch) => {
  try {
    dispatch({type: productConstants.PRODUCT_SAVE_REQUEST});
    const response = await api.post("/user/product", data, {headers:{
      Authorization: 'Bearer ' + token
    }});
    dispatch({type: productConstants.PRODUCT_SAVE_SUCCESS, payload: response.data})
  } catch (error) {
    dispatch({type: productConstants.PRODUCT_SAVE_FAIL, payload: error.message});
  }
}

const productEdit = (productID, data, token) => async (dispatch) => {
  try {
    dispatch({type: productConstants.PRODUCT_EDIT_REQUEST});
    const response = await api.put("/user/product/"+productID, data, {headers:{
      Authorization: 'Bearer '+token
    }});
    dispatch({type: productConstants.PRODUCT_EDIT_SUCCESS, payload: response.data})
  } catch (error) {
    dispatch({type: productConstants.PRODUCT_EDIT_FAIL, payload: error.message});
  }
}

const productDelete = (productID, token) => async (dispatch) => {
  try {
    dispatch({type: productConstants.PRODUCT_DELETE_REQUEST});
    const {data} = await api.delete("/user/product/"+productID, {headers:{
      Authorization: 'Bearer '+token
    }});
    dispatch({type: productConstants.PRODUCT_DELETE_SUCCESS, payload: data})
  } catch (error) {
    dispatch({type: productConstants.PRODUCT_DELETE_FAIL, payload: error.message});
  }
}

export { listProducts, productDetails, productCreate, productEdit, productDelete }