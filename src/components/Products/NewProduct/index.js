import React, { useEffect, useState } from 'react'
import { Form, Input, InputNumber, message, Modal } from 'antd';
import Upload from '../../Upload';
import { uniqueId } from 'lodash';
import  {Button} from '../../Button/styles.js';
import api from '../../../services/api';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import ProductCard from '../ProductCard';
import FileList from '../FileList';
import {Container} from './styles.js';
import { deleteImages, productCreate, productDelete, productEdit, uploadImages } from '../../../services/actions/productActions';
import { Loading } from '../../Loading';
import Error from '../../Error';
const { confirm } = Modal;

export default function NewProduct({setLoadProducts, editProduct, setNewProduct}) {
  const [ name, setName ] = useState("");
  const [ value, setValue ] = useState(0);
  const [ description, setDescription ] = useState("");
  const [ size, setSize ] = useState([]);
  const [ quantity, setQuantity ] = useState(0);
  const [ category, setCategory ] = useState("");
  const [ images, setImages ] = useState([]);
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState([]);
  const filesize = require('filesize');
  
  function handleName(input) {setName(input.target.value)};
  function handleValue(input){setValue(input)};
  function handleDescription(input){setDescription(input.target.value);}
  function handleQuantity(input){setQuantity(input);}
  function handleCategory(input){setCategory(input.target.value.toUpperCase())};
  
  const {userInfo} = useSelector(state => state.userLogin);
  const productSave = useSelector(state => state.productSave);
  const editProductState = useSelector(state => state.productEdit);
  
  const dispatch = useDispatch();
  const {loading: loadingSave, error:errorSave} = productSave;
  const {loading: loadingEdit, error: errorEdit} = editProductState;
  const [ loading, setLoading ] = useState(loadingEdit || loadingSave);
  const [ error, setError ] = useState(errorSave || errorEdit);

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
    setImagesToUpload(img => img.concat(uploadedFiles));
  }

  function onDelete(image) {
    if(image.file) setImagesToUpload(imagesToUpload.filter(img => img._id !== image._id));
    else {
      setImages(images.filter(img => img._id !== image._id));
      setImagesToRemove(img => img.concat(image._id));
    }
  };

  function isEmpty(str) {
    str = `${str}`.trim();
    return (!str && str.length===0 && /^\s*$/.test(str) );
  }

  async function confirmProduct() {
    if (!isEmpty(name) && value > 0 && (imagesToUpload.length > 0 || images.length > 0)){
      var data = {}
      if(!editProduct){
        data = {
          name:name,
          value:value,
          description:description,
          size:size,
          quantity:quantity,
          category,
          createdBy: userInfo.user._id
        };
        await dispatch(productCreate(data));
        await dispatch(uploadImages(imagesToUpload));
      }
      else{
        
        if (imagesToUpload.length > 0) await dispatch(uploadImages(imagesToUpload,editProduct._id));
        if (imagesToRemove.length > 0) await dispatch(deleteImages(imagesToRemove));

        data = {
          _id:editProduct._id,
          name:name,
          value:value,
          description:description,
          size:size,
          quantity:quantity,
          category: category
        };
        await dispatch(productEdit(data));
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
    dispatch(productDelete(editProduct._id));
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

  function clearAll() {
    setName("");
    setValue(0);
    setDescription("");
    setSize([]);
    setQuantity(0);
    setImages([]);
    setImagesToUpload([]);
    setImagesToRemove([]);
    setCategory("");
    setLoadProducts(prev => !prev);
    setNewProduct(false);
  }

  useEffect(() => {
    setName("");
    setValue(0);
    setDescription("");
    setSize([]);
    setQuantity(0);
    setImages([]);
    setImagesToUpload([]);
    setImagesToRemove([]);
    setCategory("");
    setError(null);
    setLoading(false);

    if(editProduct){
      setName(editProduct.name);
      setValue(editProduct.value);
      setQuantity(editProduct.quantity);
      setDescription(editProduct.description);
      setCategory(editProduct.category);
      setImages(editProduct.images);
      setSize(editProduct.size);
    }
  },[editProduct]);

  return (
    loading ? <Loading /> :
    <Container>
      <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      >
      <p >Crie um novo produto:</p>
      { (error) ? <Error msg={error}/> : 
      <div>
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
          <Button id="PP" chosen={size} color="#1890ff" onClick={()=>handleSize("PP")}>PP</Button>
          <Button id="P" chosen={size} color="#1890ff" onClick={()=>handleSize("P")}>P</Button>
          <Button id="M" chosen={size} color="#1890ff" onClick={()=>handleSize("M")}>M</Button>
          <Button id="G" chosen={size} color="#1890ff" onClick={()=>handleSize("G")}>G</Button>
          <Button id="GG" chosen={size} color="#1890ff" onClick={()=>handleSize("GG")}>GG</Button>
        </Form.Item>

        <Form.Item label="Estoque">
          <InputNumber value={quantity} min={1} onChange={handleQuantity}/>
        </Form.Item>

        <div className="upload-box">
          <Upload onUpload={onUpload}/>
        </div>

      <div className="preview">
        <div className='card'>
          <ProductCard 
            product={{
              name:name,
              value:value,
              description:description,
              images: images.concat(imagesToUpload)
            }}
          />
        </div>
        <FileList 
          files={images.concat(imagesToUpload)} 
          onDelete={onDelete}
        />
      </div>
    </div>}
    </Form>
    <div className="create-cancel-btns">
      {error?null:<Button color="#32CD32" onClick={confirmProduct}>Confirmar</Button>}
      <Button color="#FFD700" onClick={clearAll}>Cancelar</Button>
      {editProduct ? <Button color="#DB7093" onClick={checkProductDelete} >Deletar</Button>:null}
    </div>
    </Container>
  )
}
