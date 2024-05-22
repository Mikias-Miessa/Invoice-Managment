import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { TfiPrinter } from 'react-icons/tfi';
import {
  deleteInvoice,
  getAllInvoice,
  selectAllInvoice,
  selectLoading,
} from '@/store/invoiceSlice';
import Link from 'next/link';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const Dashboard = () => {
  const dispatch = useDispatch();
  const Invoices = useSelector((state) => selectAllInvoice(state));
  useEffect(() => {
    dispatch(getAllInvoice());
  }, []);

  const loading = useSelector((state) => selectLoading(state));

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

  const handlePrintPDF = (record) => {
    const doc = new jsPDF();
    let yPos = 10;
    doc.setFontSize(10);
    const wrapText = (text, maxWidth) => {
      let lines = doc.splitTextToSize(text, maxWidth);
      return lines;
    };
    doc.text(`Invoice No:`, 10, yPos);
    doc.text(wrapText(record.invoiceNumber, 170), 40, yPos);
    yPos += 10;
    doc.text(`Client:`, 10, yPos);
    doc.text(wrapText(record.client, 170), 40, yPos);
    yPos += 10;
    doc.text(`Service:`, 10, yPos);
    doc.text(wrapText(record.service, 170), 40, yPos);
    yPos += 10;
    doc.text(`Amount:`, 10, yPos);
    doc.text(wrapText(record.amount, 170), 40, yPos);
    yPos += 10;
    doc.text(`Status:`, 10, yPos);
    doc.text(wrapText(record.status, 170), 40, yPos);
    yPos += 10;
    doc.save('invoice.pdf');
  };

  const exportToExcel = () => {
    const fileName = 'invoices.xlsx';
    const data = Invoices.map(
      ({ invoiceNumber, client, service, amount, status }) => ({
        'Invoice No.': invoiceNumber,
        Client: client,
        Service: service,
        Amount: amount,
        Status: status,
      })
    );
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    saveAsExcel(excelBuffer, fileName);
  };

  const saveAsExcel = (buffer, fileName) => {
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const href = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    }, 100);
  };

  const columns = [
    {
      title: 'Invoice No.',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
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
          <Button onClick={() => handlePrintPDF(record)}>
            <TfiPrinter />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className='h-screen w-full flex flex-col items-center '>
      <div className='mb-2 self-end pr-10'>
        <Button className='bg-green-500 text-white' onClick={exportToExcel}>
          Export to Excel
        </Button>
      </div>
      <Table className='md:w-full' columns={columns} dataSource={Invoices} />
      <Modal
        title='Delete?'
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this invoice?</p>
      </Modal>
    </div>
  );
};

export default Dashboard;
