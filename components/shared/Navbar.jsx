'use client';
import { useDispatch } from 'react-redux';
import { Dropdown, Menu, message, Space } from 'antd';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import { logout } from '@/store/authSlice';
const Navbar = () => {
  const router = typeof window !== 'undefined' ? useRouter() : null;
  const dispatch = useDispatch();
  const onClick = ({ key }) => {
    if (key === '3') {
      // Check if the Sign Out menu item was clicked
      // localStorage.removeItem('token'); // Remove the token from local storage
      dispatch(logout());
      if (router) {
        router.push('/Login'); // Redirect the user to the login page
      }
      message.info('You have been signed out.');
    } else {
      message.info(`Click on item ${key}`);
    }
  };

  const items = [
    // {
    //   label: 'Profile',
    //   key: '1',
    // },
    // {
    //   label: 'Setting',
    //   key: '2',
    // },
    {
      label: 'Sign Out',
      key: '3',
    },
  ];

  const menu = (
    <Menu onClick={onClick}>
      {items.map((item) => (
        <Menu.Item key={item.key} className='text-center border-b mx-5'>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <nav className='bg-neutral-100 p-4 border-b-2'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <div className='flex items-center'>
          <a href='#' className='text-lg font-bold text-green-900'>
            Invoice Management
          </a>
        </div>
        <div className='flex items-center gap-0 mr-10'>
          <Dropdown overlay={menu}>
            <div className='flex items-center gap-1 cursor-pointer'>
              <div className='text-end'>
                <div className='text-black text-sm'>User</div>
                <div className='text-xs text-gray-500'>User Information</div>
              </div>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <img
                    id='avatarButton'
                    type='button'
                    className='w-10 h-10 rounded-full'
                    src='/chicken.png'
                    alt='User'
                  />
                </Space>
              </a>
            </div>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
