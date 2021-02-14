import React, { useEffect, useLayoutEffect, useState } from 'react'
import Products from '../Products'
import Events from '../Events'


import { Container } from './styles.js';

export default function Dashboard({setUpdate,update,pedidos,emAberto,encerrado,events,products}) {
  const [width, height] = useWindowSize();

  function resizeElementHeight() {
    var height = 0;
    const element = document.getElementById("container");
    var body = window.document.body;
    if (window.innerHeight) {
        height = window.innerHeight;
    } else if (body.parentElement.clientHeight) {
        height = body.parentElement.clientHeight;
    } else if (body && body.clientHeight) {
        height = body.clientHeight;
    }
    element.style.height = ((height - element.offsetTop) + "px");
  }

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  useEffect(()=>{
    resizeElementHeight();
  },[width,height]);

  return (
    <Container id="container">
    {pedidos?<h1>LISTAR PEDIDOS</h1> :
    emAberto?<h1>LIstar Pedidos em Aberto</h1> :
    encerrado?<h1>Listar Pedidos encerrados</h1> :
    events? <Events update={update} setUpdate={setUpdate}/>:
    products?<Products />:null}
    </Container>
  )
}
