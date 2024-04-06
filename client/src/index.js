import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <GoogleOAuthProvider clientId="777977857647-66js1bur4eb1oi0iqji25emo73dn9il1.apps.googleusercontent.com">
    <App />
   </GoogleOAuthProvider>;
  </React.StrictMode>
);


