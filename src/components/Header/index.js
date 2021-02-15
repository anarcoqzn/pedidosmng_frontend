import React from 'react';
import { HeaderContainer } from './styles.js';
import img from "../../assets/favico.png";

export default function Header() {
  
  return (
    <HeaderContainer > 
      <img src={img} alt=""/>
      <div>
      <a href="/">
      Gerenciador de Pedidos 
      D<div id="point">'</div>12<div id="cristo">CRISTO</div>
      </a>
      </div>
    </HeaderContainer>
  )
}
