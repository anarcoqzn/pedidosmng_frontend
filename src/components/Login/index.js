import React, { useState } from 'react'
import { Container, Input } from './styles';
import { Button } from '../Button/styles';

export default function Login(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <span>LOGIN</span>
      
      <Input id="email" type="email" placeholder="Email ou nome de usuário" 
        value={login} onChange={(e) => setLogin(e.target.value)}/>
      
      <Input id="senha" type="password" placeholder="Senha" 
        value={password} onChange={(e) => setPassword(e.target.value)}/>
      
      <div className="buttons">
      <Button color='royalblue'>LOGIN</Button>
      <Button color='coral' onClick={()=>props.history.push("/cadastro")}>CADASTRAR</Button>
      </div>
    </Container>
  )
}
