import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from './reducers'

import  routes  from './routes'
import { BrowserRouter as Router} from 'react-router-dom'

import NavigationBar from './components/NavigationBar'

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(logger,thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>      
      <Router routes = {routes}>
        <NavigationBar />
        { routes }
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);