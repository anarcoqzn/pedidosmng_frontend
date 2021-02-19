import userConstants from '../constants/user';
import Cookie from 'js-cookie';

import api from "../api";

const submitLogin = (login, password) => async (dispatch) => {
  
  try {
    dispatch({type: userConstants.USER_LOGIN_REQUEST, payload:{login, password}});
    const { data } = await api.post("/authenticate",{login, password});
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: data});
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({type: userConstants.USER_LOGIN_FAIL, payload: error.response});
  }   
}

const submitRegister = (data) => async (dispatch) => {
  try{
    dispatch({type: userConstants.USER_REGISTER_REQUEST, payload: data});
    const response = await api.post("/register",data);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response.data});
    Cookie.set('userInfo', JSON.stringify(response.data));
  }catch(error){
    dispatch({type: userConstants.USER_REGISTER_FAIL, payload: error.response});
  }
}

const editUser = (data, userID) => async (dispatch) => {
  try {
    dispatch({type: userConstants.USER_EDIT_REQUEST, payload: {userID,data}});
    const response = await api.put("/user/"+userID,data);
    dispatch({ type: userConstants.USER_EDIT_SUCCESS, payload: response.data});
    Cookie.set('userInfo', JSON.stringify(response.data));
  }catch(error){
    dispatch({type: userConstants.USER_EDIT_FAIL, payload: error.response});
  }
}

const deleteUser = (userID) => async (dispatch) => {
  try {
    dispatch({type: userConstants.USER_DELETE_REQUEST, payload: userID});
    const response = await api.delete("/user/"+userID);
    dispatch({ type: userConstants.USER_DELETE_SUCCESS, payload: response.data});
    Cookie.set('userInfo', JSON.stringify(response.data));
  }catch(error){
    dispatch({type: userConstants.USER_DELETE_FAIL, payload: error.response});
  }
}

const detailsUser = (userID) => async (dispatch) =>{
  try {
    dispatch({type: userConstants.USER_DETAILS_REQUEST, payload: userID});
    const response = await api.get("/user/"+userID);
    dispatch({ type: userConstants.USER_DETAILS_SUCCESS, payload: response.data});
    Cookie.set('userInfo', JSON.stringify(response.data));
  }catch(error){
    dispatch({type: userConstants.USER_DETAILS_FAIL, payload: error.response});
  }
}

const userLogout = () => async (dispatch) => {
 
  await dispatch({type: userConstants.USER_LOGOUT_REQUEST, payload: null});
  await Cookie.set('userInfo', JSON.stringify(null));
  await dispatch({type: userConstants.USER_LOGOUT_SUCCESS, payload: null});
}

export {submitLogin, submitRegister, editUser, deleteUser, detailsUser, userLogout}