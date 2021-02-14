import React, { useEffect, useState } from 'react'

import ProductCard from './ProductCard';
import { SubContainer,Container, CardContainer } from './styles';
import { Button } from '../Button/styles';
import NewProduct from './NewProduct';
import { message } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../services/actions/productActions';


export default function Products(props) {
  const [newProduct, setNewProduct] = useState(false);
  const [loadProducts, setLoadProducts] = useState(false);
  const [edit, setEdit] = useState(null);
  
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  
  // para editar e criar eventos:
  const [selectedProducts, setSelectedProducts] = useState(null);
  
  function handleCancel(){
    setSelectedProducts([]);
    props.setSelectProducts(false)
  }

  function handleAdd(){
    if( selectedProducts.length === 0 ) message.warning("Selecione pelo menos um produto.")

    else {
      props.setProducts(selectedProducts);
      props.setSelectProducts(false);
    }
  }

  function handleClickProduct(product){
    if(props.selectProducts) {
      if ( selectedProducts.find(p=>p._id===product._id) ){
        const temp = selectedProducts.filter(p => p._id !== product._id);
        setSelectedProducts(temp);
      }
      else {
        const temp = selectedProducts.concat(product);
        setSelectedProducts(temp);
      }
    }else{
      setEdit(product);
      setNewProduct(true);
    }
  }

//  ------------------------
  
  useEffect(() => {
    setEdit(null);
    setNewProduct(false);
    
    dispatch(listProducts());
    setSelectedProducts(props.products);
    
  },[loadProducts, dispatch, props.products]);

  return (
    loading ? < div>LOADING ...</div> :
    error ? <div>{error}</div>:
    newProduct ? 
    <NewProduct setNewProduct={setNewProduct} setLoadProducts={setLoadProducts} product={edit}/> :
    <Container>
      {props.selectProducts ? <p>Selecione os produtos desejados</p>: null}

      <Button color="#32CD32" onClick={()=>setNewProduct(true)}>Novo</Button>

      {props.selectProducts ? <Button color="#6495ED" onClick={handleAdd}>Confirmar</Button>: null}
      {props.selectProducts ? <Button color="#FFD700" onClick={handleCancel}>Cancelar</Button>: null}

      <SubContainer>
        {products.map((product) => {
          return <CardContainer 
                    id={product._id} 
                    key={product._id} 
                    onClick={()=>handleClickProduct(product)}
                    products={selectedProducts}
                    >
                    <ProductCard product={product} />
                  </CardContainer>
        })}
      </SubContainer>
    </Container>
  )
}