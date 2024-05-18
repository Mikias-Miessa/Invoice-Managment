'use client';
import { useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { RiDashboardFill } from 'react-icons/ri';
import { MdOutlineEditCalendar } from 'react-icons/md';
import { SiRotaryinternational } from 'react-icons/si';
import { MdPostAdd } from 'react-icons/md';
import Link from 'next/link';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const Menus = [
    { title: 'Dashboard', path: '/' },
    {
      title: 'Add Invoice',
      icon: <MdPostAdd />,
      path: '/AddInvoice',
    },
  ];

  return (
    <div>
      <div
        className={`bg-slate-200 h-screen p-5 pt-8 ${
          open ? ' w-56' : 'w-20'
        } duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-black text-4xl rounded-full absolute -right-3 top-20 border border-dark-purple cursor-pointer ${
            !open && 'rotate-180'
          }`}
          onClick={() => setOpen(!open)}
        />

        <div className='inline-flex items-center mb-8'>
          <SiRotaryinternational
            className={`text-green-500 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
              open && 'rotate-[360deg]'
            }`}
          />
          <h1
            className={`text-teal-900 origin-left font-medium text-2x1 duration-300 ${
              !open && 'scale-0'
            }`}
          >
            Invoice Manager
          </h1>
        </div>

        <ul className='pt-2'>
          {Menus.map((menu, index) => (
            <Link
              key={index}
              className={`text-sm flex items-center gap-x-4 cursor-pointer p-1 rounded-md ${
                activeIndex === index
                  ? 'bg-slate-300'
                  : 'hover:bg-light-white hover:bg-slate-300'
              }`}
              onClick={() => setActiveIndex(index)}
              href={menu.path}
            >
              <span
                className={`text-2xl block float-left ${
                  activeIndex === index ? 'text-green-500' : ''
                }`}
              >
                {menu.icon ? menu.icon : <RiDashboardFill />}
              </span>
              <span
                className={`text-sm  font-medium flex-1 duration-200 ${
                  !open ? 'hidden' : ''
                }
                 ${activeIndex === index ? 'text-green-500' : 'text-teal-900'}`}
              >
                {menu.title}
              </span>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
