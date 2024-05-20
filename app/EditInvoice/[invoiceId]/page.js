'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import {
  getInvoiceById,
  selectInvoiceById,
  selectInvoiceEdited,
  selectLoading,
  updateInvoice,
  reset,
} from '@/store/invoiceSlice';
import { Bars } from 'react-loader-spinner';

const editBlog = ({ params }) => {
  const { invoiceId } = params;
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(invoiceId);
  const invoice = useSelector(selectInvoiceById);
  console.log(invoice);
  const loading = useSelector(selectLoading);
  const InvoiceEdited = useSelector(selectInvoiceEdited);
  useEffect(() => {
    dispatch(getInvoiceById(invoiceId));
  }, [dispatch, invoiceId]);

  const [client, setClient] = useState('');
  const [service, setService] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (invoice) {
      setClient(invoice.client || '');
      setService(invoice.service || '');
      setAmount(invoice.amount || '');
      setStatus(invoice.status || '');
    }
  }, [invoice]);

  const handleClientChange = (e) => {
    setClient(e.target.value);
  };
  const handleServiceChange = (e) => {
    setService(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedInvoiceData = {
      invoiceId: invoiceId,
      invoiceData: {
        client: client,
        service: service,
        status: status,
        amount: amount,
      },
    };

    dispatch(updateInvoice(updatedInvoiceData));
    setService('');
    setClient('');
    setAmount('');
    setStatus('');
  };

  if (loading) {
    return (
      <div className=' h-screen bg-white flex justify-center items-center'>
        <Bars
          height='40'
          width='40'
          color='#FF7F00'
          ariaLabel='bars-loading'
          wrapperStyle={{}}
          wrapperClass=''
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className=' flex justify-start pl-10 items-center bg-white py-5'>
      <div className='max-w-md  px-4 py-8 bg-white '>
        <h1 className='text-black font-bold text-2xl mb-4'>Edit Blog</h1>
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
              className='mt-6 bg-black hover:bg-orange-500 hover:text-black text-orange-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-36 tracking-wider'
              //   disabled={blogEdited === 'pending'}
            >
              {/* {blogEdited === 'pending' ? 'Editing...' : 'Done'} */}
              Done
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default editBlog;
