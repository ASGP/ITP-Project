import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function RefundList() {
  const [refunds, setRefunds] = useState([]);
  const [editingRefund, setEditingRefund] = useState(null); // Define the editingRefund state
  const [newStatus, setNewStatus] = useState(""); // Define 
  const [sortCriteria, setSortCriteria] = useState("status"); // Track sorting criteria4
  const [filterCriteria, setFilterCriteria] = useState("All");


  // Fetch data
  function getCoupons() {
    axios
      .get("http://localhost:8070/refund/")
      .then((res) => {
        const sortedRefunds = res.data.sort((a, b) => {
          if (sortCriteria === "status") {
            const statusOrder = { Processing: 1, Completed: 2, Canceled: 3 };
            return statusOrder[a.status] - statusOrder[b.status];
          } else {
            // Add more sorting criteria here
          }
        });

        const filteredRefunds =
          filterCriteria === "All"
            ? sortedRefunds
            : sortedRefunds.filter(
                (refund) => refund.status === filterCriteria
              );

        setRefunds(filteredRefunds);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => {
    getCoupons();
  }, [sortCriteria, filterCriteria]);

  const handleFilterChange = (e) => {
    setFilterCriteria(e.target.value);
  };

    // Function to handle updating status
    const handleEditStatus = (refund) => {
      setEditingRefund(refund);
    };
  
    const handleStatusChange = (e) => {
      setNewStatus(e.target.value);
    };
  
    const handleSaveStatus = () => {
      if (editingRefund && newStatus) {
        axios
          .put(`http://localhost:8070/refund/update/${editingRefund._id}`, {
            status: newStatus,
          })
          .then((response) => {
            // Update the local state to reflect the change
            setRefunds((refunds) =>
              refunds.map((refund) =>
                refund._id === editingRefund._id
                  ? { ...refund, status: newStatus }
                  : refund
              )
            );
            setEditingRefund(null); // Clear the editing state
          })
          
          .catch((error) => {
            alert("Failed to update status.");
          });
      }
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
          <h2>Refund List</h2>
          <div className="sorting-controls">
            <label>Sort By:</label>
            <select
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
            >
              <option value="status">Refund Status</option>
              {/* Add more sorting criteria here */}
            </select>
          </div>
          <div className="filter-controls">
            <label>Filter By:</label>
            <select
              value={filterCriteria}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
              {/* Add more filtering criteria here */}
            </select>
          </div>
          <div className='table-data'>
            <div className='order'>
              <div className='head'></div>

              <div className='table-responsive'>
                <table className='table table-striped'>
                  <thead>
                    <tr>
                      <th>Customer ID</th>
                      <th>Seller ID</th>
                      <th>Order ID</th>
                      <th>Transaction ID</th>
                      <th>Amount LKR</th>
                      <th>Reason</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className='tb'>
                    {refunds.map((refund) => (
                      <tr key={refund._id}>
                         <td style={{ fontSize: "11px" }}>{refund.customerID}</td>
                          <td style={{ fontSize: "11px" }}>{refund.sellerID}</td>
                          <td style={{ fontSize: "11px" }}>{refund.orderID}</td>
                          <td style={{ fontSize: "11px" }}>{refund.transactionID}</td>
                          <td>{refund.amount}</td>
                          <td>{refund.reason}</td>
                          <td>
                                      {editingRefund && editingRefund._id === refund._id ? (
                                        <div>
                                          <select value={newStatus} onChange={handleStatusChange}>
                                            <option value="Processing">Processing</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Canceled">Canceled</option>
                                          </select>
                                          <button onClick={handleSaveStatus}>Save</button>
                                        </div>
                                      ) : (
                                        <span style={{
                                          color:
                                            refund.status === "Completed"
                                              ? "green"
                                              : refund.status === "Processing"
                                              ? "gold"
                                              : refund.status === "Canceled"
                                              ? "red"
                                              : "inherit", // Default font color if none of the conditions match
                                        }}>{refund.status}</span>
                                      )}
                                    </td>
                                    <td>
                                      <button onClick={() => handleEditStatus(refund)}style={{
                                        backgroundColor: "transparent", // Transparent background
                                        border: "1px solid green", // Green border
                                        color: "green", // Green font color
                                        padding: "5px 10px",
                                        cursor: "pointer",
                                      }}>Edit</button>
                                    </td>
                                  </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </section>
    </body>
  );
}
