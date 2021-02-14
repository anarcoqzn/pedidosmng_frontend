import React, {useState, useEffect} from 'react'
import {message, Form, Input, DatePicker, Space, Modal} from 'antd';
import api from '../../../services/api';
import { Container } from './styles'
import { Button } from '../../Button/styles';
import ProductCard from '../../Products/ProductCard';
import Product from '../../Products';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export default function NewEvent(props) {
  const dateFormat = 'DD/MM/YYYY';
  const { RangePicker } = DatePicker;
  var moment = require('moment');

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [local, setLocal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [limitDate, setLimitDate] = useState("");
  const [mngName, setMngName] = useState("");
  const [mngPhone, setMngPhone] = useState("");
  const [products, setProducts] = useState([]);
  const [selectProducts, setSelectProducts] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleLocalChange = (e) =>{
    setLocal(e.target.value);
  }

  const handleEventDate = (e) => {
    setStartDate(e[0].utc().format());
    setEndDate(e[1].utc().format());
  }

  const handleLimitDate = (e) => {
    setLimitDate(e.utc().format());
  }

  const handleMngName = (e) => {
    setMngName(e.target.value);
  }

  const handleMngPhone = (e) => {
    setMngPhone(e.target.value);
  }

  const onOk = async () => {
    if(!isEmpty(title) && !isEmpty(description) && !isEmpty(local) &&
       !isEmpty(startDate) && !isEmpty(endDate) && !isEmpty(limitDate) &&
       !isEmpty(mngName) && !isEmpty(mngPhone) && products.length > 0 )
    {
      var products_id = [];
      for(let i = 0; i < products.length; i++) products_id.push(products[i]._id);

      var data = {
        title:title,
        description:description,
        local:local,
        startDate:startDate,
        endDate:endDate,
        ordering_limit_date:limitDate,
        manager:{
          name:mngName,
          phone:mngPhone,
        },
        products:products_id
      }
      if( !props.event ){
        await api.post('event', data);
        message.success("Novo evento criado com sucesso!");
      }else{  
        
        await api.put(`event/${props.event._id}`, data);
        message.success("Evento alterado com sucesso!");
      }
      clearAll();
    }else{
      message.warning("Nenhum campo pode estar vazio!")
    }
  }

  function clearAll(){
    setTitle("");
    setDescription("");
    setLocal("");
    setStartDate("");
    setEndDate("");
    setLimitDate("");
    setMngName("");
    setMngPhone("");
    setProducts([]);
    props.setLoadEvents(prev => !prev);
    props.setNewEvent(false);
  }

  async function deleteEvent(){
    await api.delete(`event/${props.event._id}`)
    message.success(`Evento ${title} deletado com sucesso`);
    
    clearAll();
  }

  function showDeleteConfirm() {
    
    confirm({
      title: `Tem certeza que deseja excluir o evento ${props.event.title}?`,
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: 'Deletar',
      okType: 'danger',
      cancelText: 'Cancelar',
      async onOk() {
        deleteEvent();
      },
      onCancel() {},
    });
  }

  const isEmpty = (str) => {
    str = `${str}`.trim();
    return (!str && str.length===0 && /^\s*$/.test(str) );
  }

  const disabledDate = current =>{
    const tooLate = startDate && current.diff(startDate, 'days') > 0;
    return tooLate;
  }

  useEffect(() => {
    if( props.event ){
      setTitle(props.event.title)
      setDescription(props.event.description);
      setLocal(props.event.local);
      setStartDate(props.event.startDate);
      setEndDate(props.event.endDate);
      setLimitDate(props.event.ordering_limit_date);
      setMngName(props.event.manager.name);
      setMngPhone(props.event.manager.phone);
      setProducts([]);
            
      const thisProducts = props.event.products;
      
      for(let i = 0; i < thisProducts.length; i++ ){
        api.get(`product/${thisProducts[i]}`).then((res)=>{
          setProducts(p => p.concat(res.data));
        })
        .catch((err) => {
          message.error(err.message)
        });
      }
    };
  }, [props.update,props.event]);

  return (
    selectProducts?
      <Product 
        products={products} 
        setProducts={setProducts}
        selectProducts={selectProducts} 
        setSelectProducts={setSelectProducts}
        />:
    <Container>
      <Form 
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal">
        <p>Crie um novo evento:</p>
        <Form.Item 
          label="Nome" required>
          <Input value={title} onChange={handleTitleChange} placeholder='Nome do evento'/>
        </Form.Item>

        <Form.Item label="Descrição" required>
          <Input value={description} onChange={handleDescriptionChange} placeholder='Descrição' />
        </Form.Item>

        <Form.Item label="Local" required>
          <Input value={local} onChange={handleLocalChange} placeholder='Local' />
        </Form.Item>
        
        <Form.Item label="Data" required>
          <Space direction="vertical" size={12}>
            <RangePicker
              value={[startDate === "" ? null:moment(startDate),endDate === "" ? null:moment(endDate)]}
              onChange={handleEventDate}
              placeholder={["Início","Fim"]}
              format={dateFormat}
              allowClear={false}
            />
          </Space>
        </Form.Item>

        <Form.Item label="Pedidos" required>
          <DatePicker 
            value={limitDate===""?null:moment(limitDate)} 
            format={dateFormat} 
            onChange={handleLimitDate} 
            size={12} 
            placeholder="Limite"
            disabledDate={disabledDate}
          />
        </Form.Item>

        <Form.Item label="Organizador" required>
          <Input value={mngName} onChange={handleMngName} placeholder="Nome"/>
          <Input value={mngPhone} onChange={handleMngPhone} placeholder="Telefone"/>
        </Form.Item>
        </Form>
      <div className="products">
      {
        products.map(p=>{
          return <ProductCard key={p._id} product={p}/>
        })
      }
      </div>

      <div className="create-cancel-btns">
      <Button className="btn-space" color="#6495ED"onClick={()=>setSelectProducts(true)}>+ Produto</Button>
      <Button className="btn-space" color="#32CD32" onClick={onOk}>Confirmar</Button>
      <Button className="btn-space" color="#FFD700" onClick={clearAll}>Cancelar</Button>
      {props.event && <Button className="btn-space" color="#F08080" onClick={showDeleteConfirm}> Deletar </Button>}
      </div>
    </Container>
  )
}
