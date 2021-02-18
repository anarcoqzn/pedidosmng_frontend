import 'antd/dist/antd.css';
import GlobalStyle from './styles/global';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';

import { useEffect, useState } from 'react';
import EventDetails from './components/Events/EventDetails';
import ProductDetails from './components/Products/ProductDetails';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import { useSelector } from 'react-redux';
import Store from './components/Store';

function App(props) {
  const [update, setUpdate] = useState(false);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    
  },[update])

  return (
      <div>
        <GlobalStyle/>
        <BrowserRouter>
          <Header userInfo={userInfo}/>
          <Route exact path="/" render={() =>(<Home setUpdate={setUpdate} update={update}/>)}/>
          <Route path="/loja" component={Store}/>
          <Route path="/eventos/:id" component={EventDetails}/>
          <Route path="/produtos/:id?" component={ProductDetails}/>
          <Route path="/carrinho/:id?" component={Cart}/>
          <Route path="/login" component={Login}/>
          <Route path="/cadastro" component={Register}/>
        </BrowserRouter>
      </div>
  );
}

export default App;
