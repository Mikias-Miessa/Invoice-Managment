'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { addInvoice, selectNewInvoiceAdded, reset } from '@/store/invoiceSlice';

const AddInvoice = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [client, setClient] = useState('');
  const [service, setService] = useState('');
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState('');
  const newInvoiceAdded = useSelector((state) => selectNewInvoiceAdded(state));
  const id = useRef(null);
  const handleClientChange = (e) => {
    setClient(e.target.value);
  };
  const handleServiceChange = (e) => {
    setService(e.target.value);
  };
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value === '' ? '' : Number(value)); // Convert to number
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  function generateInvoiceNumber() {
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit random number
    return `INV${randomNumber}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const invoiceNumber = generateInvoiceNumber();
    const Data = {
      client,
      service,
      amount,
      status,
      invoiceNumber,
    };

    dispatch(addInvoice(Data));
    // console.log(Data);
    // router.push('/');
  };
  useEffect(() => {
    if (newInvoiceAdded === 'pending') {
      id.current = toast.loading('Adding Invoice...'); // Display loading toast
    } else {
      // Dismiss loading toast if it's already shown
      if (id.current !== null) {
        toast.dismiss(id.current);
      }
    }
    if (newInvoiceAdded === 'success') {
      toast.update(id.current, {
        render: 'Invoice added successfully',
        type: 'success',
        isLoading: false,
        autoClose: 4000,
      });
      setAmount('');
      setClient('');
      setService('');
      setStatus('');
      dispatch(reset());
      router.push('/');
    }
    if (newInvoiceAdded === 'failed') {
      toast.update(id.current, {
        render: 'Failed to add invoice',
        type: 'error',
        isLoading: false,
        autoClose: 4000,
      });
      dispatch(reset());
    }
  }, [newInvoiceAdded]);
  // useEffect(() => {
  //   if (newBlogAdded === 'pending') {
  //     id.current = toast.loading('Adding blog...'); // Display loading toast
  //   } else {
  //     // Dismiss loading toast if it's already shown
  //     if (id.current !== null) {
  //       toast.dismiss(id.current);
  //     }
  //   }

  //   if (newBlogAdded === 'success') {
  //     toast.update(id.current, {
  //       render: 'Blog added successfully',
  //       type: 'success',
  //       isLoading: false,
  //       autoClose: 4000,
  //     });
  //     dispatch(reset());
  //     setTitle('');
  //     setContent('');
  //     setImage('');
  //     setQuote('');
  //     setTag('');
  //     setAuthor('');
  //   }
  //   if (newBlogAdded === 'failed') {
  //     toast.update(id.current, {
  //       render: 'Failed to add blog',
  //       type: 'error',
  //       isLoading: false,
  //       autoClose: 4000,
  //     });
  //     dispatch(reset());
  //   }
  // }, [newBlogAdded]);
  return (
    <div className='flex justify-start pl-10 items-center bg-white py-5'>
      <div className='max-w-md  px-4 py-4 bg-white '>
        <h1 className='text-black font-bold text-2xl mb-4'>Add Invoice</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='title'
              className='block text-green-500 font-bold mb-2'
            >
              Client
            </label>
            <input
              type='text'
              id='client'
              className=' appearance-none border rounded w-full md:w-[500px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter client'
              value={client}
              onChange={handleClientChange}
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='service'
              className='block text-green-500 font-bold mb-2'
            >
              Service
            </label>
            <input
              id='service'
              className=' appearance-none border rounded w-full md:w-[500px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter service'
              value={service}
              onChange={handleServiceChange}
              rows={8}
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='amount'
              className='block text-green-500 font-bold mb-2'
            >
              Amount
            </label>
            <input
              id='amount'
              className=' appearance-none border rounded w-full md:w-[500px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter amount'
              type='number'
              value={amount}
              onChange={handleAmountChange}
              rows={8}
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='status'
              className='block text-green-500 font-bold mb-2'
            >
              Status
            </label>
            <select
              id='status'
              className='appearance-none border rounded w-full md:w-[500px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              value={status}
              onChange={handleStatusChange}
              required
            >
              <option value=''>Select status</option>
              <option value='Due'>Due</option>
              <option value='Pending'>Pending</option>
              <option value='Paid'>Paid</option>
            </select>
          </div>
          <div className=''>
            <button
              type='submit'
              className='mt-6 bg-black hover:bg-orange-500 hover:text-black text-green-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-36 tracking-wider'
              disabled={newInvoiceAdded === 'pending'}
            >
              {newInvoiceAdded === 'pending' ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddInvoice;
