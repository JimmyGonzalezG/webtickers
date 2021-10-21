import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.css' ;


ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="webtickers.us.auth0.com"
      clientId="NjJLArRTo0DF5eztJnKfBtwSkavRJwnG"
      redirectUri={window.location.origin}>
      <App />,
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root'),

);