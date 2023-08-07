import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsFlag } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Array from './List';
import './Dash.css';

const Dash = () => {
  const [selectedStatus, setSelectedStatus] = useState('Draft');

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    console.log(status);
  };

  const filteredArray = Array.filter((item) => {
    if (selectedStatus === 'Draft') {
      return item.status !== 'Completed';
    } else {
      return item.status === selectedStatus;
    }
  });

  return (
    <div className='maincontainer'>
      <div className='dbrd'>
        <h1>DASHBOARD</h1>
      </div>

      <div className='btn'>
        <Link to='/req'>
          <button className='btn1'>Create</button>
        </Link>
      </div>

      <div className="main">
        <div className="btns">
          <button className='btn2' onClick={() => handleStatusFilter('Draft')}>
            <AiOutlineCloseCircle /> Inprogress
          </button>
          <button className='btn3' onClick={() => handleStatusFilter('Completed')}>
            <BsFlag /> Completed
          </button>
        </div>
        <div className="inpt">
          <label htmlFor="search">Search:</label>
          <input className='txt' type="text" id="search" />
        </div>

        <div className="table">
          <table border={1}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Requested On</th>
                <th>Customer Name</th>
                <th>Branch Code</th>
                <th>Branch Name</th>
                <th>Customer Account Number</th>
                <th>Compensation</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredArray.map((obj) => (
                <tr key={obj.id}>
                  <td>{obj.id}</td>
                  <td>{obj.requestedOn}</td>
                  <td>{obj.customername}</td>
                  <td>{obj.branchcode}</td>
                  <td>{obj.branchname}</td>
                  <td>{obj.customeraccountnumber}</td>
                  <td>{obj.compensation}</td>
                  <td>{obj.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dash;
