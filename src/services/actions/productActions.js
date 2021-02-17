import productConstants from '../constants/product';
import api from "../api";

const listProducts = () => async (dispatch) => {

  try{
    dispatch({type: productConstants.PRODUCT_LIST_REQUEST});
    const {data} = await api.get("/product");
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

const productSave = (data) => async (dispatch) => {
  try {
    dispatch({type: productConstants.PRODUCT_SAVE_REQUEST});
    const {response} = await api.post("/product", data);
    dispatch({type: productConstants.PRODUCT_SAVE_SUCCESS, payload: response.data})
  } catch (error) {
    dispatch({type: productConstants.PRODUCT_SAVE_FAIL, payload: error.message});
  }
}

const productEdit = (productID, data) => async (dispatch) => {
  try {
    dispatch({type: productConstants.PRODUCT_EDIT_REQUEST});
    const {response} = await api.put("/product/"+productID, data);
    dispatch({type: productConstants.PRODUCT_EDIT_SUCCESS, payload: response.data})
  } catch (error) {
    dispatch({type: productConstants.PRODUCT_EDIT_FAIL, payload: error.message});
  }
}

const productDelete = (productID) => async (dispatch) => {
  try {
    dispatch({type: productConstants.PRODUCT_DELETE_REQUEST});
    const {data} = await api.delete("/product/"+productID);
    dispatch({type: productConstants.PRODUCT_DELETE_SUCCESS, payload: data})
  } catch (error) {
    dispatch({type: productConstants.PRODUCT_DELETE_FAIL, payload: error.message});
  }
}

export { listProducts, productDetails, productSave, productEdit, productDelete }