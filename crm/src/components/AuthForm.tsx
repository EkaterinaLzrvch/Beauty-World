import { Button, Checkbox, Form, Input } from 'antd';
import React, { FormEventHandler, useEffect, useRef } from 'react';
import { useState } from 'react'; 
import { VoidExpression } from 'typescript';

export interface AuthData {
    userName: string;
    password: string;
}

export interface AuthFormProprs {
    onLogin: (authData: AuthData) => void;
}

export function AuthForm(props:AuthFormProprs) {

    // вызов ф-ии внутри компонента. Иметь состояние поля ввода, записывать, использовать в ф-ии 
    // чтобы привязать состояние к компоненту - UseState 
    // 1 - state, 2 - update state, returns array of 2 elements
    // value={password} onChange={event => setPassword(event.target.value)}/> - так забираем управление на себя
    // password и userName - сюда из формы будут записываться значения

    const form = useRef<any>();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: FormEventHandler<HTMLFormElement> | any): void => {
        event.preventDefault();
        props.onLogin({userName, password});

        reset();
    };

    const reset = () => {
        setUserName('');
        setPassword('');
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        < >
            <Form  onSubmitCapture={handleSubmit}

            ref={form}
                style={{ marginTop: 30 }}
                name="basic"
                labelCol={{
                    span: 9,
                }}
                wrapperCol={{
                    span: 5,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item 
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input value={userName} onChange={event => setUserName(event.target.value)}/> 
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"

                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password value={password} onChange={event => setPassword(event.target.value)}/>

                </Form.Item>

                <Form.Item wrapperCol={{ offset: 9, span: 5 }}>
                    <Button type="primary" htmlType="submit" onSubmit={handleSubmit}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}




// Если у нас есть форма - а нам надо отредактировать карточку сотрудника. В системе есть значения уже какие-то
// UseRef - чтобы забиндиться на дом элементы и ими воспользоваться 