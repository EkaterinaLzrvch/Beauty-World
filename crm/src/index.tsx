import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css'; // ANTD
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthData, AuthForm } from './components/AuthForm';
import { EmployeesPage } from './pages/EmployeesPage/EmployeesPage';
import { OrdersPage } from './pages/OrdersPage/OrdersPage'
import { LoginPage } from './pages/LoginPage/LoginPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<OrdersPage />}/>
            <Route path="/employees" element={<EmployeesPage />} />
          </Route>
          <Route path='/login' element={<LoginPage/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
