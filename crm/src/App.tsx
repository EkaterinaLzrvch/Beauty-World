import React, { useEffect } from 'react';
import './App.css';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Breadcrumb, Button, Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

function App() {
  const { isAuth, logout, checkAuth } = useAuth();
  // Проверить токен. Если он существует, то обновим аксес получим и бесшовно войдем в приложение
  useEffect(() => {
    checkAuth();
  }, [])

  if (!isAuth) {
    return <Navigate to='/login' />
  }

  return (
    <div style={{ background: '#ececec' }}>
      {isAuth && (
        <>
          <Layout className="layout">

            <Header className='page-header'>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
              >
                <Menu.Item key="1">
                  <Link to='/'>Заявки</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to='/employees'>Мастера</Link>
                </Menu.Item>
              </Menu>
              <Button className='logout-button' onClick={logout} type="primary">Logout</Button>
            </Header>

            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
              </Breadcrumb>
              <div className="site-layout-content">
                <Outlet />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Beauty Saloon ©2022</Footer>
          </Layout>

        </>
      )}
    </div>
  )
};

export default App;
