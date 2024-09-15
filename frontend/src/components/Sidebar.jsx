import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { showEmployeeList } from '../store/employeeSlice';

export default function Sidebar() {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className='lg:w-[18%] lg:fixed top-0 left-0 h-screen  text-white hidden lg:block'>
        <div className='h-full w-full bg-slate-800 px-4 py-12 '>
          <Link
            to='/'
            id='side-item'
            className='flex items-center justify-start my-4 py-2 px-2 w-full'
          >
            <i className='ri-home-office-fill text-xl pe-3'></i>
            <h1 className=''>Home</h1>
          </Link>
          <Link
            to='/employees'
            id='side-item'
            className='flex items-center justify-start my-4 py-2 px-2 w-full'
            onClick={() => {
              dispatch(showEmployeeList('http://127.0.0.1:8000/employees/'));
            }}
          >
            <i className='ri-team-line text-xl pe-3'></i>
            <h1 className=''>Employees</h1>
          </Link>
          <Link
            to='/add-employee'
            id='side-item'
            className='flex items-center justify-start my-4 py-2 px-2 w-full'
          >
            <i className='ri-user-add-fill text-xl pe-3'></i>
            <h1 className=' whitespace-nowrap'>Add Employee</h1>
          </Link>
        </div>
      </div>

      <div className='lg:hidden opacity-70 '>
        {!toggle && (
          <i
            onClick={() => {
              setToggle(!toggle);
            }}
            className='ri-bar-chart-horizontal-line top-2 right-4 fixed text-2xl text-gray-950'
          ></i>
        )}

        <div
          className={`h-screen w-[80%] fixed top-0 left-0 bg-slate-800 px-4 py-12 text-white ${
            !toggle && 'animate-sidebar'
          }`}
        >
          {toggle && (
            <i
              onClick={() => {
                setToggle(!toggle);
              }}
              className='ri-close-large-line text-xl absolute top-4 right-4'
            ></i>
          )}

          <Link
            to='/'
            onClick={() => {
              setToggle(false);
            }}
            id='side-item'
            className='flex items-center justify-start my-4 py-2 px-2 w-full'
          >
            <i className='ri-home-office-fill text-xl pe-3'></i>
            <h1 className=''>Home</h1>
          </Link>
          <Link
            to='/employees'
            onClick={() => {
              setToggle(false);
            }}
            id='side-item'
            className='flex items-center justify-start my-4 py-2 px-2 w-full'
          >
            <i className='ri-team-line text-xl pe-3'></i>
            <h1 className=''>Employees</h1>
          </Link>
          <Link
            to='/add-employee'
            onClick={() => {
              setToggle(false);
            }}
            id='side-item'
            className='flex items-center justify-start my-4 py-2 px-2 w-full'
          >
            <i className='ri-user-add-fill text-xl pe-3'></i>
            <h1 className=' whitespace-nowrap'>Add Employee</h1>
          </Link>
        </div>
      </div>
    </>
  );
}
