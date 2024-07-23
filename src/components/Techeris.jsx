import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select } from 'antd';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const { Option } = Select;

const Teachers = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/teachers')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  const showEditModal = (record) => {
    setEditingTeacher(record);
    form.setFieldsValue(record);
    setIsEditModalVisible(true);
  };

  const handleEdit = () => {
    form.validateFields().then(values => {
      const updatedData = data.map(item => item.id === editingTeacher.id ? { ...item, ...values } : item);
      setData(updatedData);
      setFilteredData(updatedData); 
      setIsEditModalVisible(false);
      setEditingTeacher(null);

      axios.put(`http://localhost:3000/teachers/${editingTeacher.id}`, values)
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
    setFilteredData(updatedData); 

    axios.delete(`http://localhost:3000/teachers/${record.id}`)
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
      axios.post('http://localhost:3000/teachers', values)
        .then(response => {
          const newData = [...data, response.data];
          setData(newData);
          setFilteredData(newData); 
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
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Groups',
      dataIndex: 'groups',
      key: 'groups',
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
    <div className='Teachers'>
      <div style={{ maxWidth: '300px', margin: '10px 20px 30px 30px' }}>
        <Input placeholder='Search' value={searchTerm} onChange={handleSearch} />
      </div>
      <Table dataSource={filteredData} columns={columns} rowKey="id" />
      <Fab style={{ position: 'fixed', bottom: 20, right: 20 }} className="Add" color="primary" aria-label="add" onClick={handleAdd}>
        <AddIcon />
      </Fab>
      <Modal
        title="Edit Teacher"
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
            name="level"
            label="Level"
            rules={[{ required: true, message: 'Please input the level!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="groups"
            label="Groups"
            rules={[{ required: true, message: 'Please select the group!' }]}
          >
            <Select>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add New Teacher"
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
            name="level"
            label="Level"
            rules={[{ required: true, message: 'Please input the level!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="groups"
            label="Groups"
            rules={[{ required: true, message: 'Please select the group!' }]}
          >
            <Select>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Teachers;
