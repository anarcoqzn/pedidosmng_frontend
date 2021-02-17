import React, { useEffect, useState } from 'react'
import { Container, Input } from './styles';
import { Button } from '../Button/styles';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from '../../services/actions/userActions';
import {Loading} from '../Loading';

export default function Login(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const userLogin = useSelector(state => state.userLogin);
  const {loading, userInfo, error} = userLogin;
  const dispatch = useDispatch();

  function handleLogin(input){
    setLoginError(false);
    setLogin(input.target.value);
  }

  function handlePassword(input){
    setPasswordError(false);
    setPassword(input.target.value);
  }
  
  function handleLoginButton(){
    if(login.trim().length === 0) setLoginError(true);
    else if(password.trim().length === 0) setPasswordError(true);
    else dispatch(submitLogin(login,password));
  }

  useEffect(() => {
    if( userInfo ) props.history.push('/');
  },[userInfo, props.history]);

  useEffect(()=>{
    if ( error ){
      if( error.data === "Usuário não encontrado." ) setLoginError(true);
      else setLoginError(false);

      if( error.data === "Senha inválida.") setPasswordError(true);
      else setPasswordError(false);
    }
  },[loginError, passwordError, error])

  return (
    <Container>
      <span>LOGIN</span>
      <span id="error">{error ? error.data: null}</span>
      <Input id="email" name="email" type="email" placeholder="Email ou nome de usuário" wrong={loginError} 
        value={login} onChange={handleLogin}/>
      
      <Input id="password" name="password" type="password" placeholder="Senha" wrong={passwordError}
        value={password} onChange={handlePassword}/>
      
      <div className="buttons">
      {loading ? <Button><Loading/></Button>:<Button color='royalblue' onClick={handleLoginButton}>LOGIN</Button>}
      <Button color='coral' onClick={()=>props.history.push("/cadastro")}>CADASTRAR</Button>
      </div>
    </Container>
  )
}
