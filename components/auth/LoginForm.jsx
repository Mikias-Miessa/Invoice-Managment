'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store/authSlice';
export default function LoginForm() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errormsg, setError] = useState('');
  const { status, error } = useSelector((state) => state.auth);
  //   const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const credientials = {
      email: username,
      password: password,
    };
    dispatch(login(credientials));
  };
  useEffect(() => {
    if (status === 'error') {
      setError(error);
    }
  }, [status]);
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold text-center mb-4'>Login</h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <input
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              type='text'
              placeholder='Email'
              className='w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:border-green-400'
            />
          </div>
          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password'
              className='w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:border-green-400'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300'
          >
            Login
          </button>
          {errormsg && (
            <div className='bg-red-500 text-white py-2 px-4 rounded-lg'>
              {errormsg}
            </div>
          )}
        </form>

        {/* <p className="text-sm mt-4 text-center">
          Don't have an account?{' '}
          <a href="/register" className="text-green-600 hover:underline">
            Register
          </a>
        </p> */}
      </div>
    </div>
  );
}
