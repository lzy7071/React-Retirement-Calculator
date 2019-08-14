import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom'
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store/';

import App from './elements/App';
import CalculatorContainer from './containers/calculator-container';
import NotFound from './elements/NotFound';

import './index.css';

render(
  <Provider store={ store }>
    <BrowserRouter>
      <div>
	        <Route exact path="/" component={ App }/>
	        <Route exact path="/calculator" component={ CalculatorContainer } />
	        <Route exact path='/*' component={ NotFound } />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
