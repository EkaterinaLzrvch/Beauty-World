import React, { FormEventHandler, useState } from 'react';
import './App.css';
import { OrdersCards } from './pages/OrdersPage';
import { orders } from './pages/OrdersPage'
import { EmployeeCard } from './pages/EmployeesCard';
import { employees } from './pages/EmployeesCard';
import { services } from './pages/OrdersPage'
import { wrap } from 'module';
import { AuthData, AuthForm } from './pages/AuthForm';

function App() {

  // запускам запрос на бэк для авторизации 
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const login = (authData: AuthData) => {
    console.log(authData);
    setIsAuth(true);
  };

  return (
    <>
      {/* <div style={{ display: 'flex', gap: 25 }}>
        {employees.map(employee => <EmployeeCard key={employee.id} employee={employee} />)}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', background: '#ececec' }}>
        {orders.map(order => <OrdersCards key={order.id} order={order} />)}
      </div> */}

      <AuthForm onLogin={login} />

      {isAuth && (
        
        <div style={{ display: 'flex', flexWrap: 'wrap', background: '#ececec' }}>
        {orders.map(order => <OrdersCards key={order.id} order={order} />)}
      </div> 
  
      )}
    </>
  );
};

export default App;