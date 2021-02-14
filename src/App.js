import 'antd/dist/antd.css';
import GlobalStyle from './styles/global';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';

import { useEffect, useState } from 'react';
import EventDetails from './components/Events/EventDetails';
import ProductDetails from './components/Products/ProductDetails';
import Cart from './components/Cart';

function App() {
  const [update, setUpdate] = useState(false);
  
  useEffect(() => {

  },[update])

  return (
      <div>
        <GlobalStyle/>
        <Header/>
        <BrowserRouter>
          <Route exact path="/" render={() =>(<Home setUpdate={setUpdate} update={update}/>)}/>
          <Route path="/eventos/:id" component={EventDetails}/>
          <Route path="/produtos/:id?" component={ProductDetails}/>
          <Route path="/carrinho/:id?" component={Cart}/>
        </BrowserRouter>
      </div>
  );
}

export default App;
