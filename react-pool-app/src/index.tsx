

import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserfrontProvider } from '@userfront/react'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const tenantId = process.env.REACT_APP_USERFRONT_TENANT_ID || ''
root.render(
  <React.StrictMode>
    <UserfrontProvider tenantId = {tenantId}>
      <App />
    </UserfrontProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();