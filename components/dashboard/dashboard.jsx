import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import {
  deleteInvoice,
  getAllInvoice,
  selectAllInvoice,
  selectLoading,
} from '@/store/invoiceSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'antd';
import Link from 'next/link';
const Dashboard = () => {
  const dispatch = useDispatch();
  const Invoices = useSelector((state) => selectAllInvoice(state));
  useEffect(() => {
    dispatch(getAllInvoice());
  }, []);

  const loading = useSelector((state) => selectLoading(state));
  // const data = [
  //   {
  //     key: '1',
  //     invoiceNo: '001',
  //     client: 'Sami Cafe and Restaurant',
  //     service: 'Supplying goods for catering',
  //     status: 'Pending',
  //     amount: 1000,
  //   },
  //   {
  //     key: '2',
  //     invoiceNo: '002',
  //     client: 'Gobeze Consult',
  //     service: 'Delivering several services',
  //     status: 'Paid',
  //     amount: 4000,
  //   },
  //   {
  //     key: '3',
  //     invoiceNo: '003',
  //     client: 'POESA',
  //     service: 'Oil Supply for Desiel Engines',
  //     status: 'Due',
  //     amount: 7852,
  //   },
  // ];
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [deleteId, setDeleteId] = useState(null);
  const showModal = (id) => {
    setOpen(true);
    setDeleteId(id);
    console.log(id);
  };
  const handleOk = () => {
    setModalText('Are you sure you want to delete this invoice?');
    setConfirmLoading(true);
    dispatch(deleteInvoice(deleteId));
    // setTimeout(() => {
    //   setOpen(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };
  useEffect(() => {
    if (!loading) {
      setConfirmLoading(false);
      setOpen(false);
    }
  }, [loading]);
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  const columns = [
    {
      title: 'Invoice No.',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      // render: (text) => <a>{text}</a>,
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
      key: 'status',
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
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Link href={`/EditInvoice/${record.id}`}>
            <FaEdit />
          </Link>
          <Button onClick={() => showModal(record.id)}>
            <MdDelete />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className='h-screen w-full flex justify-center '>
      <Table className='md:w-full' columns={columns} dataSource={Invoices} />
      <Modal
        title='Title'
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Are you sure you wnat to delete this invoice?</p>
      </Modal>
    </div>
  );
};

export default Dashboard;
