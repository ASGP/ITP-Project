import React, { useState, useEffect } from "react";
import axios from "axios";

function CouponDashboard() {
  const [coupons, setCoupons] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch data
  useEffect(() => {
    function getEmployees() {
      axios
        .get("http://localhost:8070/Coupon/")
        .then((res) => {
          setCoupons(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getEmployees();
  }, []);

  useEffect(() => {
    function getEmployees() {
      axios
        .get("http://localhost:8070/order/")
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getEmployees();
  }, []);

  const totalAmount = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  /*
  const startDate = new Date("2023-01-01T00:00:00.000Z");
 const endDate = new Date("2023-12-31T23:59:59.999Z");


 db.orders.aggregate([
  {
    $match: {
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }
  },
  {
    $group: {
      _id: null,
      totalAmount: { $sum: "$amount" }
    }
  }
]);



  */

  
  const totalCoupons = coupons.length;
  const totalorders = orders.length;

  return (
    <body>
      <div>
        <section id='sidebar'>
          <br />
          <img
            className='brandLogo'
            src={require("./img/cpetcoLogo.png")}
            alt='logo'
          />
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
              <h1>Dashboard</h1>
              <ul className='breadcrumb'>
                <li>
                  <a href='#' className='active'>
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <ul className='box-info'>
            <li>
              <i className='bx bxs-coupon'></i>
              <span className='text'>
                <h3>{totalCoupons}</h3>
                <p>Total Coupons</p>
              </span>
            </li>
            <li>
              <i className='bx bxs-cart-add'></i>
              <span className='text'>
                <h3>{totalorders}</h3>
                <p>No of orders</p>
              </span>
            </li>
            <li>
              <i className='bx bxs-dollar-circle'></i>
              <span className='text'>
                <h3>{totalAmount} LKR</h3>
                <p>Total Sales</p>
              </span>
            </li>
            
          </ul>
        </main>
      </section>
    </body>
  );
}

export default CouponDashboard;
