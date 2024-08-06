import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  // Fetch data
  function getCoupons() {
    axios
      .get("http://localhost:8070/product/")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => {
    getCoupons();
  }, []);

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
          <h2>Product List</h2>

          <div className='table-data'>
            <div className='order'>
              <div className='head'></div>

              <table className='table-striped'>
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Category</th>
                    <th>Seller ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody className='tb'>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.productID}</td>
                      <td>{product.category}</td>
                      <td>{product.artisanID}</td>
                      <td>{product.name} </td>
                      <td>{product.quantity}</td>
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
