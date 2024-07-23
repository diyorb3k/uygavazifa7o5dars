import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Admin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} rowKey="id" />
    </div>
  );
}

export default Admin;
