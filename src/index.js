import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './services/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <Route path="/" component={App}/>
      </Provider>
    </BrowserRouter>,
  document.getElementById('root'));
