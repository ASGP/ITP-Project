import React, { useState } from "react";
import axios from "axios";
import "./crud.css";
export default function AddCoupon() {
  const [name, setName] = useState("");
  const [ccode, setCCode] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function sendData(e) {
    e.preventDefault();

    const newCoupon = {
      name,
      ccode,
      amount,
      type,
      status,
      startDate,
      endDate,
    };
    console.log(newCoupon);
    try {
      const response = await axios.post(
        "http://localhost:8070/coupon/add",
        newCoupon
      );

      window.location.href = "/couponlist";
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

  return (
    <body>
      <div>
        <section id='sidebar'>
          <br />
          
          <br />
          <br />
          <span className='brand'>Artifacts</span>
          <ul className='side-menu top'>
            <li>
              <a href={"/"}>
                <i className='bx bxs-dashboard'></i>
                <span className='text'>Dashboard</span>
              </a>
            </li>
            <li>
              <a href='/couponlist'>
                <i className='bx bx-tag'></i>
                <span className='text'>Coupon Management</span>
              </a>
            </li>
            <li>
              <a href='/addCoupon'>
                <i className='bx bx-plus'></i>
                <span className='text'>Add Coupon</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
      <section id='content'>
        <main>
          <div className='head-title'>
            <div className='left'>
              <h1>Coupon Management</h1>
              <ul className='breadcrumb'>
                <li>
                  <a className='active' href='/Dashboard'>
                    Home
                  </a>
                </li>
                <li>
                  <i className='bx bx-chevron-right'></i>
                </li>
                <li>
                  <a className='active' href='/CouponList'>
                    Coupon Management
                  </a>
                </li>
                <li>
                  <i className='bx bx-chevron-right'></i>
                </li>
                <li>
                  <a className='active' href='#'>
                    Add Coupon
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='table-data'>
            <div className='order'>
              <div className='head'>
                <h3>Add Coupon</h3>
              </div>

              <div class='viewform'>
                <form onSubmit={sendData}>
                  <div class='row'>
                    <div class='col-25'>
                      <label for='name'>Coupon Name</label>
                    </div>
                    <div class='col-75'>
                      <input
                        type='Name'
                        className='form-control'
                        id='name'
                        placeholder='Enter coupon name'
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div class='row'>
                    <div class='col-25'>
                      <label for='ccode'>Coupon Code</label>
                    </div>
                    <div class='col-75'>
                      <input
                        type='text'
                        className='form-control'
                        id='ccode'
                        placeholder='Enter coupon code'
                        onChange={(e) => {
                          setCCode(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div class='row'>
                    <div class='col-25'>
                      <label for='amount'>Amount</label>
                    </div>
                    <div class='col-75'>
                      <input
                        type='number'
                        className='form-control'
                        id='amount'
                        placeholder='Enter amount'
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-25'>
                      <label for='type'>Type</label>
                    </div>
                    <div class='col-75'>
                      <select
                        id='type'
                        name='type'
                        onChange={(e) => {
                          setType(e.target.value);
                        }}>
                        <option value=''>Select type</option>
                        <option value='Company'>Company</option>
                        <option value='Seller'>Seller</option>
                      </select>
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-25'>
                      <label for='status'>Status</label>
                    </div>
                    <div class='col-75'>
                      <select
                        id='status'
                        name='status'
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}>
                        <option value=''>Select status</option>
                        <option value='Active'>Active</option>
                        <option value='Deactive'>Deactive</option>
                      </select>
                    </div>
                  </div>

                  <div class='row'>
                    <div class='col-25'>
                      <label for='startDate'>Start Date</label>
                    </div>
                    <div class='col-75'>
                      <input
                        type='date'
                        className='form-control'
                        id='startDate'
                        placeholder='Select a start date'
                        onChange={(e) => {
                          setStartDate(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div class='row'>
                    <div class='col-25'>
                      <label for='endDate'>End Date</label>
                    </div>
                    <div class='col-75'>
                      <input
                        type='date'
                        className='form-control'
                        id='endDate'
                        placeholder='Select an end date'
                        onChange={(e) => {
                          setEndDate(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className='submit'>
                    <button type='submit' className='btn btn-primary'style={{ backgroundColor: 'green', color: 'white' }}>
                      Add Coupon
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </body>
  );
}
