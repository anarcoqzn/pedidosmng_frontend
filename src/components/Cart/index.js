import React, { useEffect } from 'react'
import { CartAction, CartList, Container, Item } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../services/actions/cartAction';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

export default function Cart(props) {
  
  const productID = props.match.params.id;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const totalItens = cartItems.reduce((a, c) => a + c.quantity,0);
  
  function handleRemoveFromCart(productID){
    dispatch(removeFromCart(productID));
  }

  function checkoutHandler(){
    props.history.push("/signin?redirect=shipping");
  }



  const dispatch = useDispatch();
  
  useEffect(() => {
    const params = props.location.search ? props.location.search.split(/([?,=])/g ) : []
    if( params.length > 0){
      const qty = params[4] | 1;
      const sze = params[8];
      dispatch(addToCart(productID, qty, sze));
    }
    
  }, [props.location.search, productID, dispatch]);
  
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
            return <Item key ={item._id}>
              <img src={item.image.url} alt="product" />
            
              <div className="item-name">
                <Link to={"/produtos/"+item.product} ><h2>{item.name}</h2></Link>
                
                <span>Quantidade:</span> <input type="number" value={item.quantity} onChange={(e) => dispatch(addToCart(item.product, e.target.value, item.size))} min={1}/>
                
                {item.size.length > 0 ?<div><span>Tamanho: <span className="size">{item.size}</span></span></div>:null}
              </div>
              
              <div className="item-price">
                <span>Preço</span>
                
                <b>{item.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</b>
                
                <button type="button" onClick={()=>handleRemoveFromCart(item._id)}><FiTrash2 size="2vw"/></button>
              </div>
            </Item>
          })}
          </div>
        }
       </ul>
     </CartList>

     <CartAction>
        <span>
          Subtotal ({totalItens > 1 ? <span>{totalItens} Ítens</span>:<span>{totalItens} Ítem</span>})
        </span>
        <span id="subtotal">
          {cartItems.reduce((acumulator, element) => acumulator + element.value * element.quantity,0).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}
        </span>
      <button disabled={cartItems.length === 0} onClick={checkoutHandler}>Continuar para o pagamento</button>
     </CartAction>

   </Container>
  )
}
