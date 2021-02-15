import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_EDIT_FAIL, PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } from "../constants"
import api from "../api";

const listProducts = () => async (dispatch) => {

  try{
    dispatch({type: PRODUCT_LIST_REQUEST});
    const {data} = await api.get("/product");
    dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
  }catch(err){
    dispatch({type: PRODUCT_LIST_FAIL, payload: err.message});
  }
}

const productDetails = (productID) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productID});
    const { data } = await api.get("/product/"+productID);
    dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.message});
  }
}

const productSave = (data) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_SAVE_REQUEST});
    const {response} = await api.post("/product", data);
    dispatch({type: PRODUCT_SAVE_SUCCESS, payload: response.data})
  } catch (error) {
    dispatch({type: PRODUCT_SAVE_FAIL, payload: error.message});
  }
}

const productEdit = (productID, data) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_EDIT_REQUEST});
    const {response} = await api.put("/product/"+productID, data);
    dispatch({type: PRODUCT_EDIT_SUCCESS, payload: response.data})
  } catch (error) {
    dispatch({type: PRODUCT_EDIT_FAIL, payload: error.message});
  }
}

const productDelete = (productID) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_DELETE_REQUEST});
    const {data} = await api.delete("/product/"+productID);
    dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data})
  } catch (error) {
    dispatch({type: PRODUCT_DELETE_FAIL, payload: error.message});
  }
}

export { listProducts, productDetails, productSave, productEdit, productDelete }