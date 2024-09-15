import React, { useEffect } from 'react';
import Employees from '../components/Employees';
import { useDispatch } from 'react-redux';
import { showEmployeeList } from '../store/employeeSlice';
export default function EmployeeListRoute() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showEmployeeList());
  }, []);
  return (
    <div>
      <Employees />
    </div>
  );
}
