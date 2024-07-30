import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Space, Modal, Input } from 'antd';
import { fetchStudentsData } from '../actions';

const Students = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.students.data);

  useEffect(() => {
    dispatch(fetchStudentsData());
  }, [dispatch]);

  // ...

  return (
    // ...
  );
};

export default Students;
