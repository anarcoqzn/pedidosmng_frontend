import React from 'react';
import { HeaderContainer } from './styles.js';
import img from "../../assets/favico.png";
import { Link } from 'react-router-dom';

export default function Header({userInfo}) {

  return (
    <HeaderContainer > 
      <img src={img} alt=""/>
      <div className="brand-container">
        <a href="/">
          Gerenciador de Pedidos 
          D<div id="point">'</div>12<div id="cristo">CRISTO</div>
        </a>
      </div>

      <div className="userName"> 
        {userInfo ? <Link to="/profile">{userInfo.user.userName}</Link>: <Link to="/cadastro">Cadastro</Link>}
      </div>
    </HeaderContainer>
  )
}
