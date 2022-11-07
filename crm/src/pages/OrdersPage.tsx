import { Result } from 'antd';
import React, { useState } from 'react';
import { servicesVersion } from 'typescript';
import { employees } from './EmployeesCard';

// Дизайн карточек 
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';

export interface OrdersCardsProps {
    order: {
        id: number,
        firstName: string,
        phone: string,
        masterId: number,
        serviceId: number,
        visitDate: string
    },   
}

export const services = [
    {
        id: 1,
        serviceName: 'Маникюр',
        price: '1200'
    },
    {
        id: 2,
        serviceName: 'Стрижка',
        price: '2000'
    },
    {
        id: 3,
        serviceName: 'Окрашивание',
        price: '3000'
    }
]

export const orders = [
    {
        id: 1,
        firstName: 'Екатерина',
        phone: '+7 (999)-99-99-999',
        masterId: 1,
        serviceId: 1,
        visitDate: '2022-11-25'
    },
    {
        id: 2,
        firstName: 'Светлана',
        phone: '+7 (900)-92-18-259',
        masterId: 10,
        serviceId: 2,
        visitDate: '2022-11-25'
    },
    {
        id: 3,
        firstName: 'Ольга',
        phone: '+7 (900)-92-18-259',
        masterId: 6,
        serviceId: 3,
        visitDate: '2022-11-25'
    },
    {
        id: 4,
        firstName: 'Ксения',
        phone: '+7 (900)-92-18-259',
        masterId: 6,
        serviceId: 3,
        visitDate: '2022-11-25'
    },
    {
        id: 5,
        firstName: 'Ольга',
        phone: '+7 (900)-92-18-259',
        masterId: 6,
        serviceId: 3,
        visitDate: '2022-11-25'
    },
]

export function OrdersCards(props: OrdersCardsProps,) {
    const { id, firstName, phone, masterId, serviceId, visitDate } = props.order;
    return (
        <div className="site-card-wrapper">
            <Card title={
                <div className="order-card__number">
                    #{id}
                </div>
            } bordered={true} actions={[
                <CheckOutlined key="check" />,
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" onClick={() => alert ('Работает')}/>,
            ]}>

                <h2 className="order-card__service">
                    Услуга:{serviceId}
                </h2>
                <p className="order-card__name">
                    Имя клиента: {firstName}
                </p>
                <p className="order-card__phone">
                    Телефон: {phone}
                </p>
                <p className="order-card__master">
                    Мастер: {masterId}
                </p>
                <p className="order-card__date">
                    Дата визита: {visitDate}
                </p>
            </Card>
        </div>
        
    )

}


















// Разметка страницы
// <Layout className="layout">
// <Header>
//     <div className="logo" />
//     <Menu
//         theme="dark"
//         mode="horizontal"
//         defaultSelectedKeys={['1']}
//         items={new Array(5).fill(null).map((_, index) => {
//             const key = index + 1;
//             return {
//                 key,
//                 label: `nav ${key}`,
//             };
//         })}
//     />
// </Header>
// <Content style={{ padding: '0 50px' }}>
//     <Breadcrumb style={{ margin: '16px 0' }}>
//         <Breadcrumb.Item>Home</Breadcrumb.Item>
//         <Breadcrumb.Item>List</Breadcrumb.Item>
//         <Breadcrumb.Item>App</Breadcrumb.Item>
//     </Breadcrumb>
//     <div className="site-layout-content">Content</div>
// </Content>
// <Footer style={{ textAlign: 'center' }}>Beauty Saloon ©2022</Footer>
// </Layout>

// import { Breadcrumb, Layout, Menu } from 'antd';

// export const { Header, Content, Footer } = Layout;