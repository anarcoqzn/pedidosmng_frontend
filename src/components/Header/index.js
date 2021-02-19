import React, { useEffect } from 'react';
import { HeaderContainer } from './styles.js';
import img from "../../assets/favico.png";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <HeaderContainer > 
      <img src={img} alt=""/>
      <div className="brand-container">
        <a href="/">
          Gerenciador de Pedidos 
          D<div id="point">'</div>12<div id="cristo">CRISTO</div>
        </a>
      </div>

      {userInfo && userInfo.token? 
      <div className="userName"> 
        <Link to="/profile">{userInfo.user.userName}</Link>
        <a href="/logout">Sair</a>
      </div>
      : 
      <div className="userName"> 
        <Link to="/login">Login</Link>
        <Link to="/cadastro">Cadastro</Link>
      </div>}
    
    </HeaderContainer>
  )
}
