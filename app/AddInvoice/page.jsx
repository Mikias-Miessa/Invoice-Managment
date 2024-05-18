'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
const AddInvoice = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [client, setClient] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [quote, setQuote] = useState('');
  const [tag, setTag] = useState('');
  const [author, setAuthor] = useState('');

  const id = useRef(null);
  const handleClientChange = (e) => {
    setClient(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleQuoteChange = (e) => {
    setQuote(e.target.value);
  };
  const handleTagChange = (e) => {
    setTag(e.target.value);
  };
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //   const cardData = {
    //     image,
    //     content,
    //     title,
    //     quote,
    //     tag,
    //     author,
    //   };

    //   dispatch(addBlog(cardData));
    // console.log(cardData);
    // router.push('/blog/view');
  };
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
      <div className='max-w-md  px-4 py-8 bg-white '>
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
              htmlFor='quote'
              className='block text-green-500 font-bold mb-2'
            >
              Quote
            </label>
            <input
              id='quote'
              className=' appearance-none border rounded w-full md:w-[500px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter quote'
              value={quote}
              onChange={handleQuoteChange}
              rows={8}
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='tag'
              className='block text-green-500 font-bold mb-2'
            >
              Tag
            </label>
            <input
              id='tag'
              className=' appearance-none border rounded w-full md:w-[500px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter tag'
              value={tag}
              onChange={handleTagChange}
              rows={8}
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='author'
              className='block text-green-500 font-bold mb-2'
            >
              Author
            </label>
            <input
              id='author'
              className=' appearance-none border rounded w-full md:w-[500px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter Author'
              value={author}
              onChange={handleAuthorChange}
              rows={8}
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='content'
              className='block text-green-500 font-bold mb-2'
            >
              Content
            </label>
            <textarea
              id='content'
              className=' appearance-none border rounded w-full md:w-[500px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter content'
              value={content}
              onChange={handleContentChange}
              rows={8}
              required
            />
          </div>

          <div>
            <img src={image} alt='' className='w-full p-2 rounded-md' />
          </div>
          <div className=''>
            <button
              type='submit'
              className='mt-6 bg-black hover:bg-orange-500 hover:text-black text-green-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-36 tracking-wider'
              //   disabled={newBlogAdded === 'pending'}
            >
              {/* {newBlogAdded === 'pending' ? 'Posting...' : 'POST'} */}
              Add
            </button>
          </div>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default AddInvoice;
