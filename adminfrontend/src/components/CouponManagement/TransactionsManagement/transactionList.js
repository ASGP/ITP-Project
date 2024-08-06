import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null); // Define the editingRefund state
  const [newStatus, setNewStatus] = useState(""); // Define 
  const [sortCriteria, setSortCriteria] = useState("status"); // Track sorting criteria4
  const [filterCriteria, setFilterCriteria] = useState("All");
  const [processingCount, setProcessingCount] = useState(0);
  const [verifiedCount, setVerifiedCount] = useState(0);


  // Fetch data
  function getCoupons() {
    axios
      .get("http://localhost:8070/transaction/")
      .then((res) => {
        const sortedTransactions = res.data.sort((a, b) => {
          if (sortCriteria === "status") {
            const statusOrder = { Processing: 1, Verified: 2, Declined: 3 };
            return statusOrder[a.status] - statusOrder[b.status];
          } else {
            // Add more sorting criteria here
          }
        });

        const filteredTransactions =
          filterCriteria === "All"
            ? sortedTransactions
            : sortedTransactions.filter(
                (transaction) => transaction.status === filterCriteria
              );

        setTransactions(filteredTransactions);
         // Calculate processing and verified counts
         const processing = filteredTransactions.filter(
            (transaction) => transaction.status === "Processing"
          );
          const verified = filteredTransactions.filter(
            (transaction) => transaction.status === "Verified"
          );
          setProcessingCount(processing.length);
          setVerifiedCount(verified.length);
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
    const handleEditStatus = (transaction) => {
      setEditingTransaction(transaction);
    };
  
    const handleStatusChange = (e) => {
      setNewStatus(e.target.value);
    };
  
    const handleSaveStatus = () => {
      if (editingTransaction && newStatus) {
        axios
          .put(`http://localhost:8070/transaction/update/${editingTransaction._id}`, {
            status: newStatus,
          })
          .then((response) => {
            // Update the local state to reflect the change
            setTransactions((transactions) =>
              transactions.map((transaction) =>
                transaction._id === editingTransaction._id
                  ? { ...transaction, status: newStatus }
                  : transaction
              )
            );
            setEditingTransaction(null); // Clear the editing state
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
          <h2>Transactions List</h2>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="sorting-controls" style={{ display: "flex" }}>
                    <label>Sort By:</label>
                    <select
                    value={sortCriteria}
                    onChange={(e) => setSortCriteria(e.target.value)}
                    >
                    <option value="status">Transaction Status</option>
                    {/* Add more sorting criteria here */}
                    </select>
                    <label>Filter By:</label>
                    <select value={filterCriteria} onChange={handleFilterChange}>
                    <option value="All">All</option>
                    <option value="Processing">Processing</option>
                    <option value="Verified">Verified</option>
                    <option value="Declined">Declined</option>
                    {/* Add more filtering criteria here */}
                    </select>
                </div>
                <div className="counts" style={{ textAlign: "right" }}>
                 <div>
                <strong style={{ fontSize: "20px" }}>Processing:</strong> <span style={{ fontSize: "20px", color: "gold" }}>{processingCount}</span>
                </div>
                <div>
                <strong style={{ fontSize: "20px" }}>Verified:</strong> <span style={{ fontSize: "20px", color: "green" }}>{verifiedCount}</span>
                </div>
                </div>
                </div>

          <div className='table-data'>
            <div className='order'>
              <div className='head'></div>

              <div className='table-responsive'>
                <table className='table table-striped'>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Product ID</th>
                      <th>Customer ID</th>
                      <th>Amount LKR</th>
                      <th>Paid By</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className='tb'>
                    {transactions.map((transaction) => (
                      <tr key={transaction._id}>
                         <td style={{ fontSize: "10px" }}>{transaction.orderID}</td>
                          <td style={{ fontSize: "10px" }}>{transaction.productID}</td>
                          <td style={{ fontSize: "10px" }}>{transaction.customerID}</td>
                          <td>{transaction.amount}</td>
                          <td>{transaction.paidBy}</td>
                          <td>{transaction.date}</td>
                          <td>
                                      {editingTransaction && editingTransaction._id === transaction._id ? (
                                        <div>
                                          <select value={newStatus} onChange={handleStatusChange}>
                                            <option value="Processing">Processing</option>
                                            <option value="Verified">Verified</option>
                                            <option value="Declined">Declined</option>
                                          </select>
                                          <button onClick={handleSaveStatus}>Save</button>
                                        </div>
                                      ) : (
                                        <span style={{
                                          color:
                                            transaction.status === "Verified"
                                              ? "green"
                                              : transaction.status === "Processing"
                                              ? "gold"
                                              : transaction.status === "Declined"
                                              ? "red"
                                              : "inherit", // Default font color if none of the conditions match
                                        }}>{transaction.status}</span>
                                      )}
                                    </td>
                                    <td>
                                      <button onClick={() => handleEditStatus(transaction)}style={{
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
