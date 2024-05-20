import React from 'react';
import { Space, Table, Tag } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
const Dashboard = () => {
  const columns = [
    {
      title: 'Invoice No.',
      dataIndex: 'invoiceNo',
      key: 'invoiceNo',
      //   render: (text) => <a>{text}</a>,
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      render: (service) => {
        return <p className='text-xs'>{service}</p>;
      },
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
    },
    {
      title: 'Status',
      key: 'tags',
      dataIndex: 'tags',
      render: (tag) => {
        let color;
        switch (tag) {
          case 'Paid':
            color = 'green';
            break;
          case 'Due':
            color = 'volcano';
            break;
          default:
            color = 'blue';
        }
        return <Tag color={color}>{tag.toUpperCase()}</Tag>;
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size='middle'>
          <a>
            <FaEdit />{' '}
          </a>
          <a>
            <MdDelete />
          </a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      invoiceNo: '001',
      client: 'Sami Cafe and Restaurant',
      service: 'Supplying goods for catering',
      tags: 'Pending',
      amount: 1000,
    },
    {
      key: '2',
      invoiceNo: '002',
      client: 'Gobeze Consult',
      service: 'Delivering several services',
      tags: 'Paid',
      amount: 4000,
    },
    {
      key: '3',
      invoiceNo: '003',
      client: 'POESA',
      service: 'Oil Supply for Desiel Engines',
      tags: 'Due',
      amount: 7852,
    },
  ];
  return (
    <div className='h-screen w-full flex justify-center '>
      <Table className='md:w-full' columns={columns} dataSource={data} />
    </div>
  );
};

export default Dashboard;
