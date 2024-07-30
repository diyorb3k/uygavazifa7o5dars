import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Space, Modal, Form, Input, Select } from 'antd';
import { fetchTeachersData } from '../actions';

const Teachers = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.teachers.data);

  useEffect(() => {
    dispatch(fetchTeachersData());
  }, [dispatch]);

  // ...

  return (
    // ...
  );
};

export default Teachers;
