import React, { useEffect, useState } from 'react';
import Sidebar from  '../Sidebar/index';
import Dashboard from '../Dashboard';

import './styles.css'
import { useSelector } from 'react-redux';

export default function Home(props) {
  const [pedidos, setPedidos]  = useState(true);
  const [emAberto, setEmAberto] = useState(false);
  const [encerrado, setEncerrado] = useState(false);
  const [events, setEvents] = useState(false);
  const [products, setProducts] = useState(false);
  const {userInfo} = useSelector(state => state.userLogin);
  
  useEffect(()=>{
    if( !userInfo ) props.history.push("/loja")
  },[userInfo]);

  return (
    <div className="app-container">
      <div className="sidebar-container">
      <Sidebar
        setUpdate={props.setUpdate}
        setEmAberto={setEmAberto}
        setEncerrado={setEncerrado}
        setEvents={setEvents}
        setProducts={setProducts}
        setPedidos={setPedidos}
      />
      </div>
      <div className="dashboard-container" >
      <Dashboard 
        setUpdate={props.setUpdate}
        update={props.update}
        emAberto={emAberto}
        encerrado={encerrado}
        events={events}
        products={products}
        pedidos={pedidos}
      />
      </div>
    </div>
  )
}
