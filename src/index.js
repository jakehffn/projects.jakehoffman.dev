import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { 
  BrowserRouter,
  Routes, 
  Route,
  Navigate
} from "react-router-dom"

import AuthProvider from './components/auth/AuthProvider.js';

import './index.css';
import App from './views/App.js';
import Words from './views/Words.js';
import Login from "./views/auth/Login.js"
import Register from "./views/auth/Register.js"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/words" element={<Words />} />
          {/* <Route path="/words/auth/*" element={<Auth />} /> */}
          <Route path="/words/auth/login" element={ <Login /> } />
          <Route path="/words/auth/register" element={ <Register /> } />
          <Route path="/words/auth" element={ <Navigate replace to="/words/auth/login" /> } />
          <Route path="*" element={<App />} />
        </Routes>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
