import React from 'react'
import { Container, FileInfo } from './styles';
import { Image } from 'antd';

export default function FileList({ files, onDelete, values, setValues, isFromCart, setCart }) {
  const filesize = require('filesize');

  const handleDelete = (file) => {
    if ( isFromCart ){
      setCart(files.filter( order => order.id !== file.id));
    }else {
      onDelete(file);
    }
  }

  return (
    <Container>
     {files.map((file,i) => (
       (file.url) &&
       <li key={file._id}>
        <FileInfo>
          <Image style={{cursor:'pointer',height:'5vw', width:'5vw' }} src={file.url}/>
          <div className="info">
            <strong>{file.name}</strong>
            <div>
              {isFromCart ?  <span style={{fontWeight:"bolder"}}>TAM: {file.size}</span>
              :
              <span>{file.readableSize || filesize(file.size)}</span>
              }
              <button className="delete" onClick={()=>handleDelete(file)}>Excluir</button>
            </div>
          </div>
        </FileInfo>
          {
            isFromCart ? 
            <div className="value-cart">
              
              <p>{values[i].toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</p>

              <span> Quantidade: {file.quantity}</span>
              
            </div>
            : 
            null
          }
      </li>
     ))}
    </Container>
  )
}
