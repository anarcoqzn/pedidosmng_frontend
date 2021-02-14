import React, { useEffect, useState } from 'react'
import { Form, Input, InputNumber, message, Modal } from 'antd';
import Upload from '../../Upload';
import { uniqueId } from 'lodash';
import  {Button} from '../../Button/styles.js';
import api from '../../../services/api';
import { ExclamationCircleOutlined } from '@ant-design/icons';


import ProductCard from '../ProductCard';
import FileList from '../FileList';
import {Container} from './styles.js';
const { confirm } = Modal;

export default function NewProduct({setLoadProducts, product}) {
  const [ name, setName ] = useState("");
  const [ value, setValue ] = useState(0);
  const [ description, setDescription ] = useState("");
  const [ size, setSize ] = useState([]);
  const [ quantity, setQuantity ] = useState(0);
  const [ images, setImages ] = useState([]);
  const filesize = require('filesize');

  function handleName(input) {setName(input.target.value)};
  function handleValue(input){setValue(input)};
  function handleDescription(input){setDescription(input.target.value);}
  function handleQuantity(input){setQuantity(input);}

  function handleSize(input) {
    const element = document.getElementById(input);
    if (size.includes(input)){
      setSize(size.filter(s => s !== input));
      element.style.backgroundColor = "transparent";
      element.style.color = "black";
      element.style = {":hover":{
        "backgroundColor": "#1890ff",
        "color":"#FFF"
      }}
    }else{
      setSize(size.concat(input));
      element.style.background = "#1890ff";
      element.style.color = "#FFF";
    }
  ;}

  function onUpload(files) {
    const uploadedFiles = files.map(file => {
      return {
        file,
        _id: uniqueId(),
        name:file.name,
        readableSize: filesize(file.size),
        url: URL.createObjectURL(file)
      }
    });
    setImages(img => img.concat(uploadedFiles));
  }

  function onDelete(image) {
    setImages(images.filter(img => img._id !== image._id));
  };

  function isEmpty(str) {
    str = `${str}`.trim();
    return (!str && str.length===0 && /^\s*$/.test(str) );
  }

  async function confirmProduct() {
    if (!isEmpty(name) && value > 0 && images.length > 0){
      var data = {}
      if(!product){
        data = {
          name:name,
          value:value,
          description:description,
          size:size,
          quantity:quantity,
          images:[]
        };

        const temp = await api.post('/product', data);
        const ids = await processImages(temp.data._id);
        data = {images:ids}

        await api.put(`/product/${temp.data._id}`,data);
        message.success("Novo produto criado com sucesso!");
      }
      else{
        const ids = await processImages(product._id);
        
        for( let i = 0; i < product.images.length; i++) {
          const img = product.images[i]._id;
          if( !ids.includes(img)) await api.delete(`image/${img}`);
        }

        data = {
          name:name,
          value:value,
          description:description,
          size:size,
          quantity:quantity,
          images:ids
        };

        await api.put(`/product/${product._id}`,data);
        message.success("Produto alterado com sucesso!");
      }
      clearAll();
    
    }else {
      message.warning("O nome, valor e imagem do produto são obrigatórios!")
    }
  }

  async function checkProductDelete() {
    const t_events = await api.get(`event?productId=${product._id}`);
    showDeleteConfirm(t_events.data);
  }

  async function deleteProduct(){
    await api.delete(`product/${product._id}`);
    message.success("Produto apagado com sucesso!")
    clearAll();
  }

  function showDeleteConfirm(events) {
    
    var title = "";
    var content = "";
    
    if (events.length > 0) {
      title = `O produto ${product.name} pertence aos eventos:`;
      content = content.concat(events.map(e => {return e.title})).concat(";");
    }else{
      title = `Tem certeza que deseja excluir ${product.name}?`
      content = `${product.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}; `+
      `${product.description}`
    }

    confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      content: content,
      okText: 'Deletar',
      okType: 'danger',
      cancelText: 'Cancelar',
      async onOk() {
        deleteProduct();
      },
      onCancel() {},
    });
  }

  async function processImages(productID){
    var ids = [];
    for (let i = 0; i < images.length; i++){
      if( images[i].file ){
        const file = images[i];
        const data = new FormData();
        
        data.append('file', file.file);
        data.append('name', file.name);
        data.append('product',productID);
        
        const response = await api.post('image', data);
        ids.push(response.data._id);      
      }else{
        ids.push(images[i]._id);
      }
    }
    return ids;
  }

  function clearAll() {
    setName("");
    setValue(0);
    setDescription("");
    setSize([]);
    setQuantity(0);
    setImages([]);
    setLoadProducts(prev => !prev);
  }

  useEffect(() => {
    setName("");
    setValue(0);
    setDescription("");
    setSize([]);
    setQuantity(0);
    setImages([]);

    if(product){
      setName(product.name);
      setValue(product.value);
      setSize(product.size);
      setQuantity(product.quantity);
      setDescription(product.description);
      setImages(product.images);
    
      for (let i = 0; i < product.size.length; i++) {
        document.getElementById(product.size[i]).style.backgroundColor = "#1890ff";
        document.getElementById(product.size[i]).style.color = "white";
      }
    }
  },[product]);

  return (
    <Container>
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      >
      <p >Crie um novo produto:</p>
      <Form.Item label="Nome" required>
        <Input value={name} maxLength={34} onChange={handleName} placeholder="Nome do Produto"/>
      </Form.Item>

      <Form.Item label="Valor" required>
        <InputNumber value={value} style={{width:"100%"}} min={0} onChange={handleValue}/>
      </Form.Item>

      <Form.Item label="Detalhes">
        <Input value={description} onChange={handleDescription} maxLength={53} placeholder="Fale sobre o Produto"/>
      </Form.Item>

      <Form.Item label="Tamanhos">
        <Button id="PP" color="#1890ff" onClick={()=>handleSize("PP")}>PP</Button>
        <Button id="P" color="#1890ff" onClick={()=>handleSize("P")}>P</Button>
        <Button id="M" color="#1890ff" onClick={()=>handleSize("M")}>M</Button>
        <Button id="G" color="#1890ff" onClick={()=>handleSize("G")}>G</Button>
        <Button id="GG" color="#1890ff" onClick={()=>handleSize("GG")}>GG</Button>
      </Form.Item>

      <Form.Item label="Estoque">
        <InputNumber value={quantity} min={1} onChange={handleQuantity}/>
      </Form.Item>

      <div className="upload-box">
        <Upload onUpload={onUpload}/>
      </div>
    </Form>

    <div className="preview">
      <div className='card'>
        <ProductCard product={{name:name,value:value,description:description,images:images}}/>
      </div>
      <FileList files={images} onDelete={onDelete}/>
    </div>

    <div className="create-cancel-btns">
      <Button color="#32CD32" onClick={confirmProduct}>Confirmar</Button>
      <Button color="#FFD700" onClick={clearAll}>Cancelar</Button>
      {product ? <Button color="#DB7093" onClick={checkProductDelete} >Deletar</Button>:null}
    </div>
    </Container>
  )
}
