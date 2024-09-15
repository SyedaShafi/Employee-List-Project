import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteEmployee,
  searchEmployeeData,
  showEmployeeList,
  sortEmployeeByType,
} from '../store/employeeSlice';
import EditEmployee from './EditEmployee';

export default function Employees() {
  const { employees, next, previous, direction, searchData } = useSelector(
    (state) => state.employeeSlice
  );
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [empId, setEmpId] = useState(null);
  const [colType, setColType] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const handleDeleteButton = (id) => {
    setModal(true);
    setEmpId(id);
  };
  const handleEditButton = (id) => {
    setEditModal(true);
    setEmpId(id);
  };
  const handleDeleteEmployee = (id) => {
    setModal(false);
    dispatch(deleteEmployee(id));
  };

  const handlePrevious = () => {
    if (previous) {
      dispatch(showEmployeeList(previous));
    }
  };
  const handleNext = () => {
    if (next) {
      dispatch(showEmployeeList(next));
    }
  };

  const sortType = (type) => {
    dispatch(sortEmployeeByType(type));
    setColType(type);
    // console.log(type, direction);
  };

  useEffect(() => {
    dispatch(searchEmployeeData(searchInput));
  }, [searchInput]);

  return (
    <div>
      {modal && (
        <div className='modal-box '>
          <div className='w-96 h-52 bg-gray-300 fixed top-[25%] left-[45%] rounded-lg flex flex-col justify-center items-center z-10'>
            <i
              className='ri-close-line text-xl absolute right-2 top-1 cursor-pointer'
              onClick={() => {
                setModal(false);
              }}
            ></i>
            <h4 className='mb-4'>Are you sure, you want to delete this?</h4>
            <div className='text-gray-300'>
              <button
                className='mx-2 bg-green-950 px-4 py-2 rounded-lg'
                onClick={() => handleDeleteEmployee(empId)}
              >
                Yes
              </button>
              <button
                className='mx-2 bg-red-950 px-4 py-2 rounded-lg'
                onClick={() => setModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {editModal && (
        <div className='modal-box '>
          <div className=' bg-gray-100 fixed top-[2%] left-[44%] rounded-lg flex flex-col justify-center items-center z-10 '>
            <i
              className='ri-close-line text-3xl absolute right-2 top-1 cursor-pointer'
              onClick={() => {
                setEditModal(false);
              }}
            ></i>
            <div className='max-h-[90vh] overflow-y-auto'>
              <EditEmployee
                empId={empId}
                setEditModal={setEditModal}
              ></EditEmployee>
            </div>
          </div>
        </div>
      )}

      <div className={modal || editModal ? 'blur-background' : ''}>
        <div className='mt-2  flex flex-col justify-center items-center'>
          <input
            type='search'
            className='border-2 border-gray-500 my-3 rounded-lg w-full mx-3 max-w-5xl 
          h-12 px-12'
            placeholder='Search...........'
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <div className='flex justify-center text-sm'>
            <button
              className='bg-slate-200 px-3 py-1 rounded-lg mx-2'
              onClick={() => sortType('default')}
            >
              Default
            </button>
            <button
              className='bg-slate-200 px-3 py-1 rounded-lg mx-2  '
              onClick={() => sortType('first_name')}
            >
              Name
              <span className='text-gray-300 text-xl'>
                <i
                  className={`ri-arrow-up-line font-extrabold px-1  ${
                    colType === 'first_name' &&
                    direction === 'asc' &&
                    'text-green-400'
                  }`}
                ></i>
                <i
                  className={`ri-arrow-down-line font-extrabold  ${
                    colType === 'first_name' &&
                    direction === 'des' &&
                    'text-red-400'
                  } `}
                ></i>
              </span>
            </button>
            <button
              className='bg-slate-200 px-3 py-1 rounded-lg mx-2'
              onClick={() => sortType('date_of_birth')}
            >
              Date of Birth
              <span className='text-gray-300 text-xl'>
                <i
                  className={`ri-arrow-up-line font-extrabold px-1  ${
                    colType === 'date_of_birth' &&
                    direction === 'asc' &&
                    'text-green-400'
                  }`}
                ></i>
                <i
                  className={`ri-arrow-down-line font-extrabold  ${
                    colType === 'date_of_birth' &&
                    direction === 'des' &&
                    'text-red-400'
                  } `}
                ></i>
              </span>
            </button>
            <button
              className='bg-slate-200 px-3 py-1 rounded-lg mx-2'
              onClick={() => sortType('email')}
            >
              Email
              <span className='text-gray-300 text-xl'>
                <i
                  className={`ri-arrow-up-line font-extrabold px-1  ${
                    colType === 'email' &&
                    direction === 'asc' &&
                    'text-green-400'
                  }`}
                ></i>
                <i
                  className={`ri-arrow-down-line font-extrabold  ${
                    colType === 'email' && direction === 'des' && 'text-red-400'
                  } `}
                ></i>
              </span>
            </button>
            <button
              className='bg-slate-200 px-3 py-1 rounded-lg mx-2'
              onClick={() => sortType('mobile')}
            >
              Mobile
              <span className='text-gray-300 text-xl'>
                <i
                  className={`ri-arrow-up-line font-extrabold px-1  ${
                    colType === 'mobile' &&
                    direction === 'asc' &&
                    'text-green-400'
                  }`}
                ></i>
                <i
                  className={`ri-arrow-down-line font-extrabold  ${
                    colType === 'mobile' &&
                    direction === 'des' &&
                    'text-red-400'
                  } `}
                ></i>
              </span>
            </button>
          </div>
        </div>
        <div className='flex justify-center  min-h-screen  p-5'>
          <div className='overflow-x-auto w-full max-w-5xl'>
            <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
              <thead>
                <tr className='bg-gray-200 text-gray-800 uppercase text-sm leading-normal'>
                  <th className='py-3 px-6 text-left'>Photo</th>
                  <th className='py-3 px-6 text-left'>Full Name</th>
                  <th className='py-3 px-6 text-left'>Email</th>
                  <th className='py-3 px-6 text-left'>Mobile</th>
                  <th className='py-3 px-6 text-left'>Date of Birth</th>
                  <th className='py-3 px-6 text-center'>Actions</th>
                </tr>
              </thead>
              <tbody className='text-gray-700 text-sm font-light'>
                {employees
                  .filter((ele) => {
                    if (searchData.lenghth === 0) {
                      return ele;
                    } else {
                      const fullName = `${ele.first_name.toLowerCase()} ${ele.last_name.toLowerCase()}`;
                      return (
                        fullName.includes(searchData.toLowerCase()) ||
                        ele.first_name
                          .toLowerCase()
                          .includes(searchData.toLowerCase()) ||
                        ele.last_name
                          .toLowerCase()
                          .includes(searchData.toLowerCase()) ||
                        ele.email
                          .toLowerCase()
                          .includes(searchData.toLowerCase())
                      );
                    }
                  })
                  .map((ele) => (
                    <tr
                      key={ele.id}
                      className='border-b border-gray-300 hover:bg-gray-100'
                    >
                      <td className='py-3 px-6 text-left'>
                        <img
                          src={ele.image}
                          alt={ele.first_name}
                          className='w-24 h-24 rounded-full'
                        />
                      </td>
                      <td className='py-3 px-6 text-left whitespace-nowrap'>
                        {ele.first_name} {ele.last_name}
                      </td>
                      <td className='py-3 px-6 text-left'>{ele.email}</td>
                      <td className='py-3 px-6 text-left'>{ele.mobile}</td>
                      <td className='py-3 px-6 text-left'>
                        {ele.date_of_birth}
                      </td>
                      <td className='py-3 px-6 text-center'>
                        <button
                          className='text-blue-400 mr-2 text-2xl'
                          onClick={() => handleEditButton(ele.id)}
                        >
                          <i className='ri-edit-2-fill'></i>
                        </button>
                        <button
                          className='text-red-300 text-2xl'
                          onClick={() => handleDeleteButton(ele.id)}
                        >
                          <i className='ri-delete-bin-7-line'></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className='flex justify-center gap-5 my-8 font-semibold'>
              <button
                className={`text-xl bg-slate-400 rounded-lg px-8 py-3 ${
                  !previous && 'text-gray-500'
                }`}
                disabled={!previous}
                onClick={handlePrevious}
              >
                <i className='ri-skip-left-line'></i>Previous
              </button>
              <button
                className={`text-xl bg-slate-400 rounded-lg px-8 py-3 ${
                  !next && 'text-gray-500'
                }`}
                disabled={!next}
                onClick={handleNext}
              >
                Next <i className='ri-skip-right-line'></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
