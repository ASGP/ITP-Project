import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function CouponList() {
  const [coupons, setCoupons] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortCriteria, setSortCriteria] = useState("all");

  // Fetch data
  function getCoupons() {
    axios
      .get("http://localhost:8070/coupon/")
      .then((res) => {
        setCoupons(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => {
    getCoupons();
  }, []);

  function handlePdfGeneration() {
    const doc = new jsPDF();

    // Set table header
    const header = [
      ["name", "ccode", "amount", "type", "status", "startDate", "endDate"],
    ];

    // Add data rows
    const data = coupons.map((coupon) => [
      coupon.name,
      coupon.ccode,
      coupon.amount,
      coupon.type,
      coupon.status,
      coupon.startDate,
      coupon.endDate,
    ]);

    // Add table to document
    doc.autoTable({ head: header, body: data });

    // Download the PDF document
    doc.save("offers.pdf");
  }

  // Delete data
  const handleRemoveCoupon = async (coupon) => {
    if (window.confirm('Do you want to delete "' + coupon.name + '" ?')) {
      await axios
        .delete(`http://localhost:8070/coupon/delete/${coupon._id}`)
        .then(() => {
          setCoupons((prevCoupons) =>
            prevCoupons.filter((cpn) => cpn._id !== coupon._id)
          );
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  // Search data
  function searchCoupon() {
    if (searchInput !== "") {
      axios
        .get(`http://localhost:8070/coupon/search/${searchInput}`)
        .then((res) => {
          setCoupons(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      getCoupons();
    }
  }

  // Sorting function
  const sortCoupons = (criteria) => {
    if (criteria === "Active") {
      const activeCoupons = coupons.filter((coupon) => coupon.status === "Active");
      setCoupons(activeCoupons);
    } else if (criteria === "Deactive") {
      const inactiveCoupons = coupons.filter((coupon) => coupon.status === "Deactive");
      setCoupons(inactiveCoupons);
    } else {
      // Reset to all coupons
      getCoupons();
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchCoupon();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);
  
  useEffect(() => {
    sortCoupons(sortCriteria); // Initial sorting based on the selected value
  }, [sortCriteria]);

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
                <i className='bx bx-user'></i>
                <span className='text'>Coupons Management</span>
              </a>
            </li>
            <li>
              <a href='/addCoupon'>
                <i className='bx bx-plus'></i>
                <span className='text'>Add Coupons</span>
              </a>
            </li>
            <li>
              <a href='/orderlist'>
                <i className='bx bx-shopping-bag'></i>
                <span className='text'>Sales</span>
              </a>
            </li>
            <li>
              <a href='/productlist'>
                <i className='bx bx-box'></i>
                <span className='text'>Products</span>
              </a>
            </li>
            <li>
              <a href='/refundlist'>
                <i className='bx bx-receipt'></i>
                <span className='text'>Refunds</span>
              </a>
            </li>
            <li>
              <a href='/transactionlist'>
                <i className='bx bx-dollar'></i>
                <span className='text'>Transactions</span>
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
                  <a className='active' href='#'>
                    Coupon Management
                  </a>
                </li>
              </ul>
            </div>
            <Link to={"/addCoupon"} className='btn-download'style={{ backgroundColor: 'green', color: 'white' }}>
              <i className='bx bx-user-plus'></i>
              <span className='text'>Add Coupon</span>
            </Link>
          </div>

          <div className='table-data'>
            <div className='order'>
              <div className='head'>
                <h3>All Coupons</h3>
                <div className='col-auto'>
        <div className='input-group mb-2'>
          <select
            className='form-select'
            onChange={(e) => setSortCriteria(e.target.value)}
          >
            <option value='all'>All Coupons</option>
            <option value='Active'>Active Coupons</option>
            <option value='Deactive'>Deactive Coupons</option>
          </select>
        </div>
      </div>
                <div class='col-auto'>
                  <div class='input-group mb-2'>
                    <input
                      type='text'
                      class='form-control'
                      id='inlineFormInputGroup'
                      placeholder='Search'
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <div class='input-group-prepend'>
                      <div
                        class='input-group-text'
                        onClick={() => setSearchInput("")}>
                        <i class='bx bx-x' ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <table className='table-striped'>
                <thead>
                  <tr>
                    <th>Coupon Name</th>
                    <th>Coupon Code</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Edit </th>
                    <th>Remove </th>
                  </tr>
                </thead>
                <tbody className='tb'>
                  {coupons.map((coupon) => (
                    <tr key={coupon._id}>
                      <td>{coupon.name}</td>
                      <td>{coupon.ccode}</td>
                      <td>{coupon.amount} </td>
                      <td>{coupon.type}</td>
                      <td>
                     <span
                      style={{
                      color:
                      coupon.status === "Active"
                          ? "green"
                          : coupon.status === "Deactive"
                          ? "red"
                          : "black",
                    }}
                  >
                    {coupon.status}
                  </span>
                    </td>
                      <td>
                        {new Date(coupon.startDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td>
                        {new Date(coupon.endDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>

                      <td>
                        <Link to={`/EditCoupon/${coupon._id}`}>
                          <button
                            type='button'
                            className='btn btn-outline-success btn-sm'>
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          type='button'
                          className='btn btn-secondary btn-sm'
                          onClick={() => handleRemoveCoupon(coupon)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className='btn btn-primary' style={{ backgroundColor: 'green', color: 'white' }} onClick={handlePdfGeneration}>
                Generate Report
              </button>
            </div>
          </div>
        </main>
      </section>
    </body>
  );
}
