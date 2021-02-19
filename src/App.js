import 'antd/dist/antd.css';
import GlobalStyle from './styles/global';
import { Route } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/Header';
import Home from './components/Home';
import EventDetails from './components/Events/EventDetails';
import ProductDetails from './components/Products/ProductDetails';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import Store from './components/Store';
import Logout from './components/Logout';

function App(props) {
  const [update, setUpdate] = useState(false);
  
  return (
      <div>
        <GlobalStyle/>
        <Header />
        <Route exact path="/" render={() =>(<Home history={props.history} setUpdate={setUpdate} update={update}/>)}/>
        <Route path="/loja" component={Store}/>
        <Route path="/eventos/:id" component={EventDetails}/>
        <Route path="/produtos/:id?" component={ProductDetails}/>
        <Route path="/carrinho/:id?" component={Cart}/>
        <Route path="/login" component={Login}/>
        <Route path="/cadastro" component={Register}/>
        <Route path="/logout" component={Logout}/>
      </div>
  );
}

export default App;
