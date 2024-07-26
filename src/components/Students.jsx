import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const Students = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/students")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please input the first name!"),
    lastName: Yup.string().required("Please input the last name!"),
    group: Yup.string().required("Please input the group!"),
    username: Yup.string().required("Please input the username!"),
    password: Yup.string().required("Please input the password!"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      group: "",
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
    },
  });

  const showEditModal = (record) => {
    setEditingStudent(record);
    Object.keys(record).forEach((key) => formik.setFieldValue(key, record[key]));
    setIsEditModalVisible(true);
  };

  const handleEdit = (values) => {
    const updatedData = data.map((item) =>
      item.id === editingStudent.id ? { ...item, ...values } : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
    setIsEditModalVisible(false);
    setEditingStudent(null);

    axios
      .put(`http://localhost:3000/students/${editingStudent.id}`, values)
      .then((response) => {
        console.log("Data updated successfully", response);
      })
      .catch((error) => {
        console.log("Error updating data", error);
      });
  };

  const handleDelete = (record) => {
    const updatedData = data.filter((item) => item.id !== record.id);
    setData(updatedData);
    setFilteredData(updatedData);

    axios
      .delete(`http://localhost:3000/students/${record.id}`)
      .then((response) => {
        console.log("Data deleted successfully", response);
      })
      .catch((error) => {
        console.log("Error deleting data", error);
      });
  };

  const handleAdd = () => {
    formik.resetForm();
    setIsAddModalVisible(true);
  };

  const handleAddSubmit = (values) => {
    axios
      .post("http://localhost:3000/students", values)
      .then((response) => {
        const newData = [...data, response.data];
        setData(newData);
        setFilteredData(newData);
        setIsAddModalVisible(false);
      })
      .catch((error) => {
        console.log("Error adding data", error);
      });
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (term) {
      const filtered = data.filter(
        (item) =>
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
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Edit / Delete",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showEditModal(record)}>
            <FaUserEdit style={{ width: "30px", height: "30px" }} />
          </Button>
          <Button
            style={{ backgroundColor: "red", color: "white" }}
            type="primary"
            onClick={() => handleDelete(record)}
          >
            <MdDelete style={{ width: "30px", height: "30px" }} />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="Students">
      <div style={{ maxWidth: "300px", margin: "10px 20px 30px 30px" }}>
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Table dataSource={filteredData} columns={columns} rowKey="id" />
      <Fab
        style={{ position: "fixed", bottom: 20, right: 20 }}
        className="Add"
        color="primary"
        aria-label="add"
        onClick={handleAdd}
      >
        <AddIcon />
      </Fab>
      <Modal
        title="Edit Student"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={formik.handleSubmit}
      >
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Input
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div style={{ color: "red" }}>{formik.errors.firstName}</div>
            )}
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <Input
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div style={{ color: "red" }}>{formik.errors.lastName}</div>
            )}
          </div>
          <div>
            <label htmlFor="group">Group</label>
            <Input
              id="group"
              name="group"
              value={formik.values.group}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.group && formik.errors.group && (
              <div style={{ color: "red" }}>{formik.errors.group}</div>
            )}
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <Input
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <div style={{ color: "red" }}>{formik.errors.username}</div>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input.Password
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            )}
          </div>
        </form>
      </Modal>
      <Modal
        title="Add New Student"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onOk={formik.handleSubmit}
      >
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>First Name</label>
            <Input
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div style={{ color: "red" }}>{formik.errors.firstName}</div>
            )}
          </div>
          <div>
            <label>Last Name</label>
            <Input
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div style={{ color: "red" }}>{formik.errors.lastName}</div>
            )}
          </div>
          <div>
            <label>Group</label>
            <Input
              name="group"
              value={formik.values.group}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.group && formik.errors.group && (
              <div style={{ color: "red" }}>{formik.errors.group}</div>
            )}
          </div>
          <div>
            <label>Username</label>
            <Input
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <div style={{ color: "red" }}>{formik.errors.username}</div>
            )}
          </div>
          <div>
            <label>Password</label>
            <Input.Password
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Students;
