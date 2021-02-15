import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { productDetails } from '../../../services/actions/productActions';
import { Actions, Container, Image, ImageContainer, ImagesSelect, Info, SubContainer } from './styles';
import { Button } from '../../Button/styles';
import { message } from 'antd';

export default function ProductDetails(props) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [imgURL, setIMGURL] = useState("");
  const [images, setImages ] = useState([]);

  const productId = props.match.params.id;
  const {product, loading, error}  = useSelector(state => state.productDetails);
  const dispatch = useDispatch();

  function handleAddToCart(){
    if( product.size.length > 0 && size.length === 0) message.warning("Escolha um tamanho.")
    else props.history.push("/carrinho/"+productId+"?qty="+quantity+"?size="+size);
  }

  function goBack() {
    props.history.goBack()
  }

  useEffect(() => {
    dispatch(productDetails(productId));
  },[dispatch, productId])
  
  useEffect(() => {
    if (product && product.value && product.images && product.images.length > 0) {
      setIMGURL(product.images[0].url);
      setImages(product.images);
    }
  }, [product])

  return (
    loading ? <div>CARREGANDO ...</div> :
    error ? <div>{error}</div> :
    <Container>
      <div className="back" onClick={goBack}>
        BACK
      </div>

      <SubContainer>
      <ImageContainer >
        <div>
        <Image src={imgURL} alt="product"/>
        </div>
        <div className="previews">
          {images.map(img => {return <ImagesSelect key={img._id} src={img.url} alt="product"
            onClick={() => setIMGURL(img.url)}/>})}
        </div>
      </ImageContainer>

      <Info>
        <ul>
          <li>
            <h1>{product.name}</h1>
          </li>
          <li>
            <b>{product.value && product.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</b>
          </li>
          <span className="category">{product.category}</span>
          <li className="description"><p >{product.description}</p></li>
          <li className="rating">Avaliação: {product.rating}</li>

        </ul>
      </Info>

      <Actions>
        <ul>
          <li>
            Preço: {product.value && (product.value * quantity).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}
          </li>
          {product.size && product.size.length > 0 ? 
              <li>
                <span>Tamanhos: </span>  
                {product.size.map(p =>{
                return (<Button key={p} chosen={size} id={p} color="#1890ff" onClick={()=>setSize(p)}>{p}</Button>)
                })}
              </li>
          :null}
          <li>
            Quantidade:
            <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
          </li>
          <li>
            <Button id="add-to-cart" onClick={handleAddToCart}>Adicionar ao carrinho</Button>
          </li>
        </ul>
      </Actions>
      </SubContainer>
    </Container>
  )
}
