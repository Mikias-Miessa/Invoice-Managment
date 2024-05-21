import React, { useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { getAllInvoice, selectAllInvoice } from '@/store/invoiceSlice';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
const Dashboard = () => {
  const dispatch = useDispatch();
  const Invoices = useSelector((state) => selectAllInvoice(state));
  useEffect(() => {
    dispatch(getAllInvoice());
  }, []);
  console.log(Invoices);
  const data = [
    {
      key: '1',
      invoiceNo: '001',
      client: 'Sami Cafe and Restaurant',
      service: 'Supplying goods for catering',
      status: 'Pending',
      amount: 1000,
    },
    {
      key: '2',
      invoiceNo: '002',
      client: 'Gobeze Consult',
      service: 'Delivering several services',
      status: 'Paid',
      amount: 4000,
    },
    {
      key: '3',
      invoiceNo: '003',
      client: 'POESA',
      service: 'Oil Supply for Desiel Engines',
      status: 'Due',
      amount: 7852,
    },
  ];
  const columns = [
    {
      title: 'Invoice No.',
      dataIndex: 'invoiceNumber',
      key: 'id',
      //   render: (text) => <a>{text}</a>,
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'id',
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'id',
      render: (service) => {
        return <p className='text-xs'>{service}</p>;
      },
    },
    {
      title: 'Amount',
      key: 'id',
      dataIndex: 'amount',
    },
    {
      title: 'Status',
      key: 'id',
      dataIndex: 'status',
      render: (status) => {
        let color;
        switch (status) {
          case 'Paid':
            color = 'green';
            break;
          case 'Due':
            color = 'volcano';
            break;
          default:
            color = 'blue';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },

    {
      title: 'Action',
      key: 'id',
      render: (text, record) => (
        <Space size='middle'>
          <Link href={`/EditInvoice/${record.id}`}>
            <FaEdit />
          </Link>
          <Link href={`/DeleteInvoice/${record.id}`}>
            <MdDelete />
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <div className='h-screen w-full flex justify-center '>
      <Table className='md:w-full' columns={columns} dataSource={Invoices} />
    </div>
  );
};

export default Dashboard;
