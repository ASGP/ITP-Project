import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../OrderManagment/side.css";


export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("newest");
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState(""); // State for end date

  // Fetch data
  function getCoupons() {
    axios
      .get("http://localhost:8070/order/")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => {
    getCoupons();
  }, []);

  // Sorting function
  const sortOrders = (criteria) => {
    const sortedOrders = [...orders];
    if (criteria === "newest") {
      sortedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (criteria === "oldest") {
      sortedOrders.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    setOrders(sortedOrders);
  };
   // Filtering function based on date range
   const filterOrdersByDateRange = () => {
    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.date);
      if (startDate && endDate) {
        return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
      }
      return true;
    });
    setOrders(filteredOrders);
  };

  useEffect(() => {
    sortOrders(sortCriteria); // Initial sorting based on the selected value
  }, [sortCriteria]);

  useEffect(() => {
    filterOrdersByDateRange(); // Apply date range filter
  }, [startDate, endDate]);

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
              <a href={"/"} className='menu-item'>
                <i className='bx bxs-dashboard'></i>
                <span className='text'>Dashboard</span>
              </a>
            </li>
            <li>
              <a href='/couponlist'className='menu-item'>
                <i className='bx bx-tag'></i>
                <span className='text'>Coupon Management</span>
              </a>
            </li>
            <li>
              <a href='/addCoupon'className='menu-item'>
                <i className='bx bx-plus'></i>
                <span className='text'>Add Coupons</span>
              </a>
            </li>
            <li>
              <a href='/orderlist'className='menu-item'>
                <i className='bx bx-shopping-bag'></i>
                <span className='text'>Sales</span>
              </a>
            </li>
            <li>
              <a href='/productlist' className='menu-item'>
                <i className='bx bx-box'></i>
                <span className='text'>Products</span>
              </a>
            </li>
            <li>
              <a href='/refundlist' className='menu-item'>
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
          <h2>Sales List</h2>
          

          <div className='table-data'>
            <div className='order'>
              <div className='head'>
              {/* Sorting dropdown */}
              <div className="sorting-dropdown">
                  <label htmlFor="sortCriteria">Sort By: </label>
                  <select
                    id="sortCriteria"
                    value={sortCriteria}
                    onChange={(e) => setSortCriteria(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
                {/* Date range input fields */}
                <div className="date-range">
                  <label htmlFor="startDate">Start Date: </label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <label htmlFor="endDate">End Date: </label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <button onClick={filterOrdersByDateRange}>Apply</button>
                </div>
              </div>

              <table className='table-striped'>
                <thead>
                  <tr>
                  <th>Order ID</th>
                    <th>Order Date</th>
                    <th>ProductID</th>
                    <th>Product Name</th>
                    <th>Amount</th>
                    <th>Transaction ID</th>
                  </tr>
                </thead>
                <tbody className='tb'>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>
                        {new Date(order.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td>{order.productID}</td>
                      <td>{order.productName}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.transactionID}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>
    </body>
  );
}
