import React, { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../store/employeeSlice';

export default function AddEmployees() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    date_of_birth: '',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
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
          setFormData({ ...formData, image: fileFromBlob });
        },
        'blob'
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('first_name', formData.first_name);
    form.append('last_name', formData.last_name);
    form.append('email', formData.email);
    form.append('mobile', formData.mobile);
    form.append('date_of_birth', formData.date_of_birth);
    form.append('image', formData.image);
    dispatch(addEmployee(form));
    navigate('/employees');
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form
        onSubmit={handleSubmit}
        className='shadow-md rounded-lg p-8 w-full max-w-lg'
      >
        <h2 className='text-2xl font-bold mb-6 text-center'>Employee Form</h2>

        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2'>Image</label>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            className='border rounded w-full py-2 px-3 text-gray-700'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2'>First Name</label>
          <input
            type='text'
            name='first_name'
            value={formData.first_name}
            onChange={handleChange}
            className='border rounded w-full py-2 px-3 text-gray-700'
            placeholder='Enter First Name'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2'>Last Name</label>
          <input
            type='text'
            name='last_name'
            value={formData.last_name}
            onChange={handleChange}
            className='border rounded w-full py-2 px-3 text-gray-700'
            placeholder='Enter Last Name'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2'>Email</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='border rounded w-full py-2 px-3 text-gray-700'
            placeholder='Enter Email'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2'>Mobile</label>
          <input
            type='text'
            name='mobile'
            value={formData.mobile}
            onChange={handleChange}
            className='border rounded w-full py-2 px-3 text-gray-700'
            placeholder='Enter Mobile Number'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2'>Date of Birth</label>
          <DatePicker
            selected={formData.date_of_birth}
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
