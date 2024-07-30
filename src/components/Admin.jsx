import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'antd';
import { fetchAdminData } from '../actions';

const Admin = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.admin.data);

  useEffect(() => {
    dispatch(fetchAdminData());
  }, [dispatch]);

  const columns = [
    // ...
  ];

  return <Table dataSource={data} columns={columns} rowKey="id" />;
};

export default Admin;
