import React from 'react'
import { Container, FileInfo } from './styles';
import { Image } from 'antd';

export default function FileList({ files, onDelete }) {
  const filesize = require('filesize');

  const handleDelete = (file) => {
    onDelete(file);
  }

  return (
    <Container>
     {files.map((file) => (
       (file.url) &&
       <li key={file._id}>
        <FileInfo>
          <Image style={{cursor:'pointer',height:'5vw', width:'5vw' }} src={file.url}/>
          <div className="info">
            <strong>{file.name}</strong>
            <div>
              <span>{file.readableSize || filesize(file.size)}</span>
              <button className="delete" onClick={()=>handleDelete(file)}>Excluir</button>
            </div>
          </div>
        </FileInfo>
      </li>
     ))}
    </Container>
  )
}
