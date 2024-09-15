import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import Resizer from 'react-image-file-resizer';
import { useDispatch, useSelector } from 'react-redux';
import { editEmployee } from '../store/employeeSlice';

export default function EditEmployee({ empId, setEditModal }) {
  const { employees } = useSelector((state) => state.employeeSlice);
  const disptach = useDispatch();
  const [editData, setEditData] = useState({
    image: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    date_of_birth: '',
  });

  useEffect(() => {
    const singleEmployee = employees.filter((ele) => ele.id === empId);
    setEditData(singleEmployee[0]);
  }, [empId]);

  const handleDateChange = (date) => {
    setEditData({
      ...editData,
      date_of_birth: date.toISOString().split('T')[0],
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'JPEG',
        80,
        0,
        (uri) => {
          const fileFromBlob = new File([uri], file.name, {
            type: 'image/jpeg',
          });
          setEditData({ ...editData, image: fileFromBlob });
        },
        'blob'
      );
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setEditModal(false);
    disptach(editEmployee(editData));
  };

  return (
    <div className='flex justify-center items-center min-h-4xl'>
      <form
        className='shadow-md rounded-lg p-8 w-full max-w-lg'
        onSubmit={handleSubmit}
      >
        <h2 className='text-xl font-bold mb-6 text-center'>
          Employee Edit Form
        </h2>

        <div className='mb-2'>
          <label className='block text-sm font-bold mb-2'>Image</label>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            className='border rounded w-full py-2 px-3 text-gray-700'
            required
          />
        </div>

        <div className='mb-2'>
          <label className='block text-sm font-bold mb-2'>First Name</label>
          <input
            type='text'
            name='first_name'
            value={editData ? editData.first_name : ''}
            onChange={handleChange}
            className='border rounded w-full py-2 px-3 text-gray-700'
            placeholder='Enter First Name'
            required
          />
        </div>

        <div className='mb-2'>
          <label className='block text-sm font-bold mb-2'>Last Name</label>
          <input
            type='text'
            name='last_name'
            value={editData ? editData.last_name : ''}
            onChange={handleChange}
            className='border rounded w-full py-2 px-3 text-gray-700'
            placeholder='Enter Last Name'
            required
          />
        </div>

        <div className='mb-2'>
          <label className='block text-sm font-bold mb-2'>Email</label>
          <input
            type='email'
            name='email'
            value={editData ? editData.email : ''}
            onChange={handleChange}
            className='border rounded w-full py-2 px-3 text-gray-700'
            placeholder='Enter Email'
            required
          />
        </div>

        <div className='mb-2'>
          <label className='block text-sm font-bold mb-2'>Mobile</label>
          <input
            type='text'
            name='mobile'
            value={editData ? editData.mobile : ''}
            onChange={handleChange}
            className='border rounded w-full py-2 px-3 text-gray-700'
            placeholder='Enter Mobile Number'
            required
          />
        </div>

        <div className='mb-2'>
          <label className='block text-sm font-bold mb-2'>Date of Birth</label>
          <DatePicker
            selected={
              editData.date_of_birth ? new Date(editData.date_of_birth) : null
            }
            onChange={handleDateChange}
            className='border rounded w-full py-2 px-3 text-gray-700'
            dateFormat='yyyy/MM/dd'
            placeholderText='yyyy/MM/dd'
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            showMonthDropdown
            required
          />
        </div>

        <div className='text-center'>
          <button
            type='submit'
            className='bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
