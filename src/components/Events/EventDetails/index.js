import React, { useEffect, useState } from 'react'
import { List, Typography, Divider } from 'antd';
import { CgArrowRight } from 'react-icons/cg';
import { Container, Content,  ProductsContainer } from './styles';
import { Button } from '../../Button/styles';
import ProductCard from '../../Products/ProductCard'
import StartEndDate from '../../StartEndDate';
import { useDispatch, useSelector } from 'react-redux';
import { eventDetails } from '../../../services/actions/eventActions';

export default function EventDetails(props) {
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState([]);
  const details = useSelector(state => state.eventDetails);
  const {event, loading, error} = details;
  const dispatch = useDispatch();

  useEffect(()=>{
    const eventID = props.match.params.id;
    dispatch(eventDetails(eventID));
    
  },[dispatch, props.match.params.id])

  useEffect(() => {
    if (event && event.title){
      setDate(StartEndDate(event.startDate, event.endDate));
      setProducts(event.products);
    }
  },[event])

  return (
    loading ? <div> CARREGANDO ...</div>:
    error ? <div>{error}</div> :
    event.title ?
    <Container>
    <Content>
      <Divider orientation="left">{event.title}</Divider>
      <List>
        <List.Item>
          <div className="item">
            <Typography.Text strong>Descrição:</Typography.Text>
            <span>{event.description}</span>
          </div>
        </List.Item>

        <List.Item>
          <div className="item">
            <Typography.Text strong>Local:</Typography.Text>
            <span>{event.local}</span>
          </div>
        </List.Item>

        <List.Item>
          <div className="item">
            <Typography.Text strong>Data:</Typography.Text>
            <span>{date[0]}</span><CgArrowRight size={"1.5em"}/><span>{date[1]}</span>
          </div> 
        </List.Item>

        <List.Item className="manager-item">
          <div >
            <span>Organizador: {event.manager.name}</span>
          </div>
          <div style={{marginLeft:"auto", marginRight:"auto"}}>
            <span>Telefone: {event.manager.phone}</span>
          </div>        
        </List.Item>
        
        <ProductsContainer >
          <div id='text'>
            <span>PRODUTOS:</span>
          </div>
          <div id="product-container">
            {products.map(p=>{
            return <a key={p._id} id="product" href={`/produtos/${p._id}`}>
              <ProductCard product={p}/>
              </a>
              })}
          </div>
        </ProductsContainer>
          
      </List>
      <Button color="#32CD32">Confirmar</Button>
    </Content>
    </Container>: <List/>
  )
}
