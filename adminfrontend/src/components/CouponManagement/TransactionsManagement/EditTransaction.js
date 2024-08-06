import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function EditTransaction() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [transaction, setTransaction] = useState({
    orderID: "",
    productID: "",
    customerID: "",
    amount: "",
    paidBy: "",
    date: "",
    status: "",
  });

  // Fetch refund data
  useEffect(() => {
    function getTransaction() {
      axios
        .get(`http://localhost:8070/transaction/get/${id}`)
        .then((res) => {
          setTransaction(res.data.transaction);
        })
        .catch((err) => {
          // Handle error
        });
    }
    getTransaction();
  }, [id]);

  const handleChange = (e) => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8070/transaction/update/${id}`, transaction)
      .then((response) => {
        alert("Transaction Updated");
        navigate("/transactionlist");
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <div className="viewform">
      <h1>Edit Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="orderID">Order ID</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="orderID"
              name="orderID"
              value={transaction.orderID}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="productID">Product ID</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="productID"
              name="productID"
              value={transaction.productID}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="customerID">Customer ID</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="customerID"
              name="customerID"
              value={transaction.customerID}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="amount">Amount LKR</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="amount"
              name="amount"
              value={transaction.amount}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="paidBy">Paid By</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="paidBy"
              name="paidBy"
              value={transaction.paidBy}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="date">Date</label>
          </div>
          <div className="col-75">
          <input
                        type='text'
                        className='form-control'
                        id='date'
                        name='date'
                        value={new Date(transaction.date)
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
        <div className="row">
          <div className="col-25">
            <label htmlFor="status">Status</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="status"
              name="status"
              value={transaction.status}
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        <div className="form-group row">
          <div className="col-sm-6 mb-3 mb-sm-0">
            <button type="submit" className="btn btn-primary btn-sm" style={{ backgroundColor: 'green' }}>
              Save
            </button>
            <Link to="/refundlist">
              <button type="button" className="btn btn-secondary btn-sm">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
