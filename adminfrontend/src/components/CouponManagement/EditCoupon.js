import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./crud.css";

export default function EditCoupon() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [coupons, setCoupons] = useState({
    name: "",
    ccode: "",
    amount: "",
    type: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  //Fetch data
  useEffect(() => {
    function getCoupon() {
      axios
        .get("http://localhost:8070/coupon/get/" + id)
        .then((res) => {
          console.log(res);
          setCoupons(res.data.coupon);
        })
        .catch((err) => {
          // alert(err.message);
        });
    }
    getCoupon();
  }, [id]);

  const handleChange = (e) => {
    setCoupons({
      ...coupons,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(coupons); // or save the data to your backend
    axios
      .put("http://localhost:8070/coupon/update/" + id, coupons)
      .then((response) => {
        console.log(response.data);
        alert("Coupon Updated");
        navigate("/couponlist");
      })
      .catch((error) => {
        // console.log(error);
      });
  };

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
                  <a href='#'>Home</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right'></i>
                </li>
                <li>
                  <a href='#'>Coupon Management</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right'></i>
                </li>
                <li>
                  <a className='active' href='#'>
                    Edit Coupon
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='table-data'>
            <div className='order'>
              <div className='head'>
                <h3>Edit Coupon</h3>
              </div>

              <div class='viewform'>
                <form onSubmit={handleSubmit}>
                  <div class='row'>
                    <div class='col-25'>
                      <label for='name'>Coupon Name</label>
                    </div>
                    <div class='col-75'>
                      <input
                        type='name'
                        className='form-control'
                        name='name'
                        id='name'
                        value={coupons.name}
                        onChange={handleChange}
                        placeholder='Enter update name'
                      />
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-25'>
                      <label for='role'>Coupon Code</label>
                    </div>
                    <div class='col-75'>
                      <input
                        type='ccode'
                        className='form-control'
                        id='ccode'
                        name='ccode'
                        value={coupons.ccode}
                        onChange={handleChange}
                        placeholder='Enter update code'
                      />
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-25'>
                      <label for='role'>Amount</label>
                    </div>
                    <div class='col-75'>
                      <input
                        type='number'
                        className='form-control'
                        id='amount'
                        name='amount'
                        value={coupons.amount}
                        onChange={handleChange}
                        placeholder='Enter update email'
                      />
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-25'>
                      <label for='role'>Type</label>
                    </div>
                    <div class='col-75'>
                      <select
                        className='form-control'
                        id='type'
                        name='type'
                        value={coupons.type}
                        onChange={handleChange}>
                        <option value={coupons.type}>{coupons.type}</option>
                        <option value='Company'>Company</option>
                        <option value='Promo'>Seller</option>
                        <option value='cashback'>Cashback</option>
                      </select>
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-25'>
                      <label for='role'>Status</label>
                    </div>
                    <div class='col-75'>
                      <select
                        className='form-control'
                        id='status'
                        name='status'
                        value={coupons.status}
                        onChange={handleChange}>
                        <option value={coupons.status}>{coupons.status}</option>
                        <option value='Active'>Active</option>
                        <option value='Deactive'>Deactive</option>
                      </select>
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col-25'>
                      <label for='role'>Start Date</label>
                    </div>
                    <div class='col-75'>
                      <input
                        type='text'
                        className='form-control'
                        id='startDate'
                        name='startDate'
                        value={new Date(coupons.startDate)
                          .toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })
                          .toString()}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div class='row'>
                    <div class='col-25'>
                      <label for='role'>End Date</label>
                    </div>
                    <div class='col-75'>
                      <input
                        type='text'
                        className='form-control'
                        id='endDate'
                        name='endDate'
                        value={new Date(coupons.endDate)
                          .toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })
                          .toString()}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <br />
                  <div className='form-group row'>
                    <div className='col-sm-6 mb-3 mb-sm-0'>
                      <button type='submit' className='btn btn-primary btn-sm' style={{ backgroundColor: 'green' }}>
                        Save
                      </button>
                      <Link to={"/couponlist"}>
                        <button
                          type='reset'
                          className='btn btn-secondary btn-sm'>
                          Cancel
                        </button>
                      </Link>
                    </div>
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
