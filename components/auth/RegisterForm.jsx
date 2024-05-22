'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Register } from '../../store/authSlice';
import { ToastContainer, toast } from 'react-toastify';
export default function RegisterForm() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errormsg, setError] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const creadentials = {
      email: username,
      password: password,
    };
    dispatch(Register(creadentials));
  };
  const { registrationStatus, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (registrationStatus === 'success') {
      router.push('/login');
      toast.success('Registration successful');
    }
    if (registrationStatus === 'error') {
      setError('Failed to Register, Try again');
    }
  }, [registrationStatus, router]);

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg'>
        <h1 className='text-lg font-bold text-center mb-4 text-green-500'>
          Welcome to Invoice Management System
        </h1>
        <h1 className='text-2xl font-bold text-center mb-4 text-green-500'>
          Register
        </h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <input
              required
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              type='text'
              placeholder='Email'
              className='text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-400'
            />
          </div>
          <div>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password'
              className='text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-400'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300'
          >
            Register
          </button>
          {errormsg && (
            <div className='bg-red-500 text-white py-2 px-4 rounded-lg'>
              {errormsg}
            </div>
          )}
        </form>

        <p className='text-sm mt-4 text-center text-gray-400'>
          Have an account?{' '}
          <a href='/login' className='text-green-600 hover:underline'>
            Login
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
