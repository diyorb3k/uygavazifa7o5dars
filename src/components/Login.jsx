import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = () => {
    form.validateFields().then(values => {
      if (values.username === 'admin' && values.password === 'password') {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/');
      } else {
        notification.error({
          message: 'Login Failed',
          description: 'Incorrect username or password. Please try again.',
        });
      }
    });
  };

  return (
    <div style={{ maxWidth: '300px', margin: '100px auto' }}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="Diyorbek"
          label=" 20880"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleLogin}>Login</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
