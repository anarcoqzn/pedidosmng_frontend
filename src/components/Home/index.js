import React, { useState } from 'react';
import Sidebar from  '../Sidebar/index';
import Dashboard from '../Dashboard';

import './styles.css'

export default function Home({update,setUpdate}) {
  const [pedidos, setPedidos]  = useState(true);
  const [emAberto, setEmAberto] = useState(false);
  const [encerrado, setEncerrado] = useState(false);
  const [events, setEvents] = useState(false);
  const [products, setProducts] = useState(false);
  

  return (
    <div className="app-container">
      <div className="sidebar-container">
      <Sidebar
        setUpdate={setUpdate}
        setEmAberto={setEmAberto}
        setEncerrado={setEncerrado}
        setEvents={setEvents}
        setProducts={setProducts}
        setPedidos={setPedidos}
      />
      </div>
      <div className="dashboard-container" >
      <Dashboard 
        setUpdate={setUpdate}
        update={update}
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
