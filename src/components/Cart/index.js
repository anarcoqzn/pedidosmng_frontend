import React, { useEffect, useState } from 'react'
import { CartAction, CartList, Container, Item } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../services/actions/cartAction';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

export default function Cart(props) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  const productID = props.match.params.id;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  function handleRemoveFromCart(productID){
    dispatch(removeFromCart(productID));
  }

  function checkoutHandler(){
    props.history.push("/signin?redirect=shipping");
  }

  const dispatch = useDispatch();
  
  useEffect(() => {
    const params = props.location.search ? props.location.search.split("?") : []

    if( params.length > 0){
      params.forEach(p => {
        const param = p.split('=');
        if( param[0] === 'qty') setQuantity(Number(param[1])) ;
        else if ( param[0] === 'size' && param[1] !== "") setSize(param[1]);
      })
    }
    
  }, [props.location.search])
  
  useEffect(() => {
    if( productID){
      dispatch(addToCart(productID, quantity, size));
    }
    
  }, [quantity, size, productID, dispatch])

  return (
   <Container>
      <h3>Carrinho de Compras</h3>
      <Divider />
     <CartList>
       <ul>
        {
          cartItems.length === 0 ?
          <li>
            <h3>Carrinho vazio.</h3>
          </li> :
          <div className="cart-list-container">
          {cartItems.map( item => {
            return <Item key ={item.product}>
              <img src={item.images[0].url} alt="product" />
            
              <div className="item-name">
                <Link to={"/produtos/"+item.product} ><h2>{item.name}</h2></Link>
                <span>Quantidade:</span> <input type="number" value={item.quantity} onChange={(e) => setQuantity(e.target.value)} min={1}/>
                {size.length > 0 ?<div><span>Tamanho: {size}</span></div>:null}
              </div>
              
              <div className="item-price">
                <span>Preço</span>
                <b>{item.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</b>
                <button type="button" onClick={()=>handleRemoveFromCart(item.product)}><FiTrash2 size="2vw"/></button>
              </div>
            </Item>
          })}
          </div>
        }
       </ul>
     </CartList>

     <CartAction>
        <span>
          Subtotal ({cartItems.reduce((acumulator, element) => acumulator + element.quantity,0)} Itens)
        </span>
        <span id="subtotal">
          {cartItems.reduce((acumulator, element) => acumulator + element.value * element.quantity,0).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}
        </span>
      <button disabled={cartItems.length === 0} onClick={checkoutHandler}>Continuar para o pagamento</button>
     </CartAction>

   </Container>
  )
}
