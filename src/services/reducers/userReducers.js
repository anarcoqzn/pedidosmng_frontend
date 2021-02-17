import userConstants from "../constants/user";

function userLoginReducer( state={}, action){
  switch( action.type){
    case userConstants.USER_LOGIN_REQUEST:
      return {loading:true};
    case userConstants.USER_LOGIN_SUCCESS:
      return {loading: false, userInfo: action.payload};
    case userConstants.USER_LOGIN_FAIL:
      return {loading: false, error: action.payload};
    default: 
      return state;
  }
}

function userRegisterReducer( state={}, action){
  switch( action.type){
    case userConstants.USER_REGISTER_REQUEST:
      return {loading:true};
    case userConstants.USER_REGISTER_SUCCESS:
      return {loading: false, userInfo: action.payload};
    case userConstants.USER_REGISTER_FAIL:
      return {loading: false, error: action.payload};
    default: 
      return state;
  }
}

function userEditReducer( state={}, action){
  switch( action.type){
    case userConstants.USER_EDIT_REQUEST:
      return {loading:true};
    case userConstants.USER_EDIT_SUCCESS:
      return {loading: false, userInfo: action.payload};
    case userConstants.USER_EDIT_FAIL:
      return {loading: false, error: action.payload};
    default: 
      return state;
  }
}

function userDeleteReducer( state={}, action){
  switch( action.type){
    case userConstants.USER_DELETE_REQUEST:
      return {loading:true};
    case userConstants.USER_DELETE_SUCCESS:
      return {loading: false, userInfo: action.payload};
    case userConstants.USER_DELETE_FAIL:
      return {loading: false, error: action.payload};
    default: 
      return state;
  }
}

function userDetailsReducer( state={}, action){
  switch( action.type){
    case userConstants.USER_DETAILS_REQUEST:
      return {loading:true};
    case userConstants.USER_DETAILS_SUCCESS:
      return {loading: false, userInfo: action.payload};
    case userConstants.USER_DETAILS_FAIL:
      return {loading: false, error: action.payload};
    default: 
      return state;
  }
}

export { userLoginReducer, userDeleteReducer, userRegisterReducer, userEditReducer, userDetailsReducer }