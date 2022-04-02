import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { inDev } from './utils/helpers';
import '@progress/kendo-theme-default/dist/all.css';
import axios from 'axios';
import { UserProvider } from './ContextProvider/userContext';

axios.defaults.baseURL = 'http://localhost:3000/';

// Application to Render
const app = (
  <UserProvider>
    <App />
  </UserProvider>
);

// Render application in DOM
ReactDOM.render(app, document.getElementById('app'));

// Hot module replacement
// if (inDev() && module.hot) module.hot.accept();
