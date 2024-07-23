import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select } from 'antd';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const { Option } = Select;

const Students = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/students')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  const showEditModal = (record) => {
    setEditingStudent(record);
    form.setFieldsValue(record);
    setIsEditModalVisible(true);
  };

  const handleEdit = () => {
    form.validateFields().then(values => {
      const updatedData = data.map(item => item.id === editingStudent.id ? { ...item, ...values } : item);
      setData(updatedData);
      setFilteredData(updatedData); // Filtered data should also be updated
      setIsEditModalVisible(false);
      setEditingStudent(null);

      axios.put(`http://localhost:3000/students/${editingStudent.id}`, values)
        .then(response => {
          console.log('Data updated successfully', response);
        })
        .catch(error => {
          console.log('Error updating data', error);
        });
    });
  };

  const handleDelete = (record) => {
    const updatedData = data.filter(item => item.id !== record.id);
    setData(updatedData);
    setFilteredData(updatedData); // Filtered data should also be updated

    axios.delete(`http://localhost:3000/students/${record.id}`)
      .then(response => {
        console.log('Data deleted successfully', response);
      })
      .catch(error => {
        console.log('Error deleting data', error);
      });
  };

  const handleAdd = () => {
    form.resetFields();
    setIsAddModalVisible(true);
  };

  const handleAddSubmit = () => {
    form.validateFields().then(values => {
      axios.post('http://localhost:3000/students', values)
        .then(response => {
          const newData = [...data, response.data];
          setData(newData);
          setFilteredData(newData); // Filtered data should also be updated
          setIsAddModalVisible(false);
        })
        .catch(error => {
          console.log('Error adding data', error);
        });
    });
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (term) {
      const filtered = data.filter(item =>
        item.firstName.toLowerCase().includes(term) ||
        item.lastName.toLowerCase().includes(term)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Edit / Delete',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showEditModal(record)}><FaUserEdit style={{ width: '30px', height: '30px' }} /></Button>
          <Button style={{ backgroundColor: 'red', color: 'white' }} type="primary" onClick={() => handleDelete(record)}><MdDelete style={{ width: '30px', height: '30px' }} /></Button>
        </Space>
      ),
    },
  ];

  return (
    <div className='Students'>
      <div style={{ maxWidth: '300px', margin: '10px 20px 30px 30px' }}>
        <Input placeholder='Search' value={searchTerm} onChange={handleSearch} />
      </div>
      <Table dataSource={filteredData} columns={columns} rowKey="id" />
      <Fab style={{ position: 'fixed', bottom: 20, right: 20 }} className="Add" color="primary" aria-label="add" onClick={handleAdd}>
        <AddIcon />
      </Fab>
      <Modal
        title="Edit Student"
        visible={isEditModalVisible}
        onOk={handleEdit}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please input the first name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please input the last name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="group"
            label="Group"
            rules={[{ required: true, message: 'Please input the group!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input the username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input the password!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add New Student"
        visible={isAddModalVisible}
        onOk={handleAddSubmit}
        onCancel={() => setIsAddModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please input the first name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please input the last name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="group"
            label="Group"
            rules={[{ required: true, message: 'Please input the group!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input the username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input the password!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Students;
