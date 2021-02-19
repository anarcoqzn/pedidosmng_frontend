import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../services/actions/userActions';
import { Loading } from '../Loading';

export default function Logout(props) {
  const dispatch = useDispatch();
  const { userInfo, loading } = useSelector(state => state.userLogin);
  
  async function logout(){
    await dispatch(userLogout())
  }
    
  useEffect(() => {
    logout();
    props.history.push("/");

  },[userInfo, loading,dispatch])


  return (
    <Loading /> 
  )
}
