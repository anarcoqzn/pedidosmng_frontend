import React, { useEffect, useState } from 'react'
import { Form, Input, InputNumber, message, Modal } from 'antd';
import Upload from '../../Upload';
import { uniqueId } from 'lodash';
import  {Button} from '../../Button/styles.js';
import api from '../../../services/api';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import ProductCard from '../ProductCard';
import FileList from '../FileList';
import {Container} from './styles.js';
const { confirm } = Modal;

export default function NewProduct({setLoadProducts, editProduct}) {
  const [ name, setName ] = useState("");
  const [ value, setValue ] = useState(0);
  const [ description, setDescription ] = useState("");
  const [ size, setSize ] = useState([]);
  const [ quantity, setQuantity ] = useState(0);
  const [ images, setImages ] = useState([]);
  const [ category, setCategory ] = useState("");
  const filesize = require('filesize');

  function handleName(input) {setName(input.target.value)};
  function handleValue(input){setValue(input)};
  function handleDescription(input){setDescription(input.target.value);}
  function handleQuantity(input){setQuantity(input);}
  function handleCategory(input){setCategory(input.target.value.toUpperCase())};

  const {userInfo} = useSelector(state => state.userLogin);

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
      if(!editProduct){
        data = {
          name:name,
          value:value,
          description:description,
          size:size,
          quantity:quantity,
          category,
          images:[],
          createdBy: userInfo.user._id
        };
        
        const temp = await api.post('/user/product', data, {
          headers:{
            Authorization: 'Bearer '+userInfo.token
          }
        });
        const ids = await processImages(temp.data._id);
        data = {images:ids}

        await api.put(`/user/product/${temp.data._id}`,data, {
          headers:{
            Authorization: 'Bearer '+userInfo.token
          }
        });
        message.success("Novo produto criado com sucesso!");
      }
      else{
        const ids = await processImages(editProduct._id);
        
        for( let i = 0; i < editProduct.images.length; i++) {
          const img = editProduct.images[i]._id;
          if( !ids.includes(img)) await api.delete(`/user/image/${img}`,{
            headers:{
              Authorization: 'Bearer '+userInfo.token
            }
          });
        }

        data = {
          name:name,
          value:value,
          description:description,
          size:size,
          quantity:quantity,
          category,
          images:ids
        };

        await api.put(`/user/product/${editProduct._id}`,data,{
          headers:{
            Authorization: 'Bearer '+userInfo.token
          }
        });
        message.success("Produto alterado com sucesso!");
      }
      clearAll();
    
    }else {
      message.warning("O nome, valor e imagem do produto são obrigatórios!")
    }
  }

  async function checkProductDelete() {
    const t_events = await api.get(`event?productId=${editProduct._id}`);
    showDeleteConfirm(t_events.data);
  }

  async function deleteProduct(){
    await api.delete(`/user/product/${editProduct._id}`, {
      headers: {
        Authorization: 'Bearer '+userInfo.token
      }
    });
    message.success("Produto apagado com sucesso!")
    clearAll();
  }

  function showDeleteConfirm(events) {
    
    var title = "";
    var content = "";
    
    if (events.length > 0) {
      title = `O produto ${editProduct.name} pertence aos eventos:`;
      content = content.concat(events.map(e => {return e.title})).concat(";");
    }else{
      title = `Tem certeza que deseja excluir ${editProduct.name}?`
      content = `${editProduct.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}; `+
      `${editProduct.description}`
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
        data.append('reference',productID);
        
        const response = await api.post('/user/image', data, {
          headers:{
            Authorization: 'Bearer '+userInfo.token
          }
        });
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
    setCategory("");
    setLoadProducts(prev => !prev);
  }

  useEffect(() => {
    setName("");
    setValue(0);
    setDescription("");
    setSize([]);
    setQuantity(0);
    setImages([]);
    setCategory("");

    if(editProduct){
      setName(editProduct.name);
      setValue(editProduct.value);
      setSize(editProduct.size);
      setQuantity(editProduct.quantity);
      setDescription(editProduct.description);
      setImages(editProduct.images);
      setCategory(editProduct.category);
    
      for (let i = 0; i < editProduct.size.length; i++) {
        document.getElementById(editProduct.size[i]).style.backgroundColor = "#1890ff";
        document.getElementById(editProduct.size[i]).style.color = "white";
      }
    }
  },[editProduct]);

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
        <Input value={description} onChange={handleDescription} placeholder="Fale sobre o Produto"/>
      </Form.Item>

      <Form.Item label="Categoria">
        <Input value={category} onChange={handleCategory} placeholder="Ex.: Calça, Blusa, Caneca"/>
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
      {editProduct ? <Button color="#DB7093" onClick={checkProductDelete} >Deletar</Button>:null}
    </div>
    </Container>
  )
}
