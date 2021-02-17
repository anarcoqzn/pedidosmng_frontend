import React, { useEffect, useState } from 'react'
import { Button } from '../Button/styles'
import { Input } from '../Login/styles'
import Upload from '../Upload';
import { Container, FormRegister, ProfilePicture } from './styles';
import {uniqueId} from 'lodash';
import { FiTrash2 } from 'react-icons/fi';

export default function Register(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [image, setImage] = useState({});
  const [userName, setUserName] = useState("");
  const filesize = require('filesize');

  function onUpload(files) {
    const uploadedFile = {
        file:files[0],
        _id: uniqueId(),
        name:files[0].name,
        readableSize: filesize(files[0].size),
        url: URL.createObjectURL(files[0])
      };
    setImage(uploadedFile);
  }

  useEffect(()=>{
    setUserName((firstName.toLowerCase()+lastName.slice(0,1).toUpperCase()+lastName.slice(1).toLowerCase()).trim());
  },[firstName, lastName])

  return (
    <Container>
      <div className="profilePicture">
        <ProfilePicture src={image.url} >
          <FiTrash2  onClick={()=>setImage({})}/>
        </ProfilePicture>
        {userName.length > 0 ? <Input value={userName} onChange={(e) => setUserName(e.target.value)}/>:<span></span>}
        <div  className="upload-box">
          <Upload onUpload={onUpload}/>
        </div>
      </div>
      
      <FormRegister>
      <span>CADASTRO</span>
      <label className="column-1 item1">Primero nome: </label>
      <label className="column-1 item2">Último nome:</label>
      <label className="column-1 item3">Rua:</label>
      <label className="column-1 item4">Número:</label>
      <label className="column-1 item5">Complemento:</label>
        
      <Input className="column-2 item1" value={firstName} required
        onChange={(e) => setFirstName(e.target.value)} placeholder="Primeiro Nome"/>
      
      <Input className="column-2 item2" value={lastName} 
          onChange={(e) => setLastName(e.target.value)} placeholder="Último nome"/>
      
      <Input className="column-2 item3" value={street} 
        onChange={(e) => setStreet(e.target.value)} placeholder="Rua"/>
      
      <Input className="column-2 item4" value={number}
        onChange={(e) => setNumber(e.target.value)} placeholder="Número"/>
      <Input className="column-2 item5" value={complement} 
        onChange={(e) => setComplement(e.target.value)} placeholder="Complemento"/>
      <Input className="column-2 item6" type="email" id="email" placeholder="Email" 
        value={login} onChange={(e) => setLogin(e.target.value)}/>
      <Input className="column-2 item7" type="password" placeholder="Senha" 
        value={password} onChange={(e) => setPassword(e.target.value)}/>

      <Input className="column-2 item8" type="password" placeholder="Confirme a senha" 
        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
      
      <div className="buttons">
        <Button color='royalblue'>CADASTRAR</Button>
        <Button color='coral' onClick={()=>props.history.goBack()}>CANCELAR</Button>
      </div>
      </FormRegister>
    </Container>
  )
}
