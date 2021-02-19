import productConstants from '../constants/product';
import api from "../api";

const listProducts = () => async (dispatch, getState) => {

  try{
    var response;
    
    dispatch({type: productConstants.PRODUCT_LIST_REQUEST});
    const { userLogin: {userInfo }} = getState();
    if (!userInfo.token) response = await api.get("/product");
    
    else response = await api.get('/user/product', {headers:{
      'Authorization': 'Bearer '+userInfo.token
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

const productCreate = (product) => async (dispatch ,getState) => {
  product.images = [];
  try {
    dispatch({type: productConstants.PRODUCT_SAVE_REQUEST});
    const { userLogin : { userInfo }} = getState();
    const {data} = await api.post("/user/product", product, {
      headers:{
        'Authorization': 'Bearer ' + userInfo.token
      } 
    });
    dispatch({type: productConstants.PRODUCT_SAVE_SUCCESS, payload: data});

  } catch (error) {
    dispatch({type: productConstants.PRODUCT_SAVE_FAIL, payload: error.message});
  }
}

const productEdit = (newProductData) => async (dispatch, getState) => {
  const {userLogin:{userInfo}} = getState();
  try {
    dispatch({type: productConstants.PRODUCT_EDIT_REQUEST, payload: newProductData});
    const response = await api.put("/user/product/"+newProductData._id, newProductData, {
      headers:{
      'Authorization': 'Bearer '+userInfo.token
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
      'Authorization': 'Bearer '+token
    }});

    dispatch({type: productConstants.PRODUCT_DELETE_SUCCESS, payload: data})
  } catch (error) {
    dispatch({type: productConstants.PRODUCT_DELETE_FAIL, payload: error.message});
  }
}

const deleteImages = (imagesIds) => async (dispatch, getState) => {
  const {userLogin:{userInfo}} = getState();
  try{
    dispatch({type: productConstants.DELETE_IMAGES_REQUEST, payload: imagesIds});
    const { data } = await api.delete("/user/image?images="+imagesIds,{
      headers:{
        'Authorization': 'Bearer '+userInfo.token
      }
    });
    dispatch({type: productConstants.DELETE_IMAGES_SUCCESS, payload: data});
  }catch(error){
    dispatch({type: productConstants.DELETE_IMAGES_FAIL, payload: error});
  }
}

const uploadImages = (images, productID) => async (dispatch, getState) =>{
    const { userLogin: {userInfo }} = getState();
    const { productSave } = getState();
    dispatch({type: productConstants.UPLOAD_IMAGES_REQUEST, payload:images});
    
    const formData = new FormData();
    if(!productID) formData.append('reference', productSave.product._id);
    else formData.append('reference', productID);
    
    for (let i = 0 ; i < images.length ; i++) {
      if( images[i].file ) formData.append("file", images[i].file);
    }   
    
    try{
      const { data } = await api.post("/user/image",formData,{
        headers:{
          'Authorization': 'Bearer '+userInfo.token,
          'Content-Type':'multipart/form-data'
        }
      });
      
      dispatch({type: productConstants.UPLOAD_IMAGES_SUCCESS, payload: data})
    }catch(error){
      dispatch({type: productConstants.UPLOAD_IMAGES_FAIL, payload: error.response});
    }
}

export { listProducts, productDetails, productCreate, productEdit, productDelete,deleteImages,uploadImages }