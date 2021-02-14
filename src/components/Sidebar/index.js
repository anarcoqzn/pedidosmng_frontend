import React from 'react';
import {Container, Item} from './styles';

export default function Sidebar({setEncerrado,setEvents,setProducts,setPedidos,setEmAberto}) {
  
  function showAllOrders() {
    setAllFalse(1);
    setPedidos(true);
  }

  function showOpenOrders(){
    setAllFalse(2);
    setEmAberto(true);
  }

  function showClosedOrders(){
    setAllFalse(3);
    setEncerrado(true);
  }

  function showEvents(){
    setAllFalse(4);
    setEvents(true);
    }

  function showProducts() {
    setAllFalse(5);
    setProducts(true);
  }

  function setAllFalse(id) {
    setEncerrado(false);
    setEvents(false);
    setPedidos(false);
    setEmAberto(false);
    setProducts(false);

    for (let i = 1;i <= 5 ; i++){
      if(i === id) {
        document.getElementById(i).style.backgroundColor = "rgb(219, 112, 147)";
        document.getElementById(i).style.color = "#FFF";
      }else{
        document.getElementById(i).style.backgroundColor = "#FFF";
        document.getElementById(i).style.color = "black";
        document.getElementById(i).style={":hover":{ 
          "color": "white",
          "background": "rgb(219, 112, 147)",
          "transition":".3s"}}
      }
    }
  }
  
  return (
    <Container>
      <Item id={1} onClick={showAllOrders}>
        Todos
      </Item>

      <Item id={2} onClick={showOpenOrders}>
        Em Aberto
      </Item>

      <Item id={3} onClick={showClosedOrders}>
        Encerrados
      </Item>

      <Item id={4} onClick={showEvents}>
        Eventos
      </Item>
      
      <Item id={5} onClick={showProducts}>
        Produtos
      </Item>

      <Item >
        Buscar
      </Item>

    </Container>  
   )
}