import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function EditRefund() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [refund, setRefund] = useState({
    customerID: "",
    sellerID: "",
    orderID: "",
    transactionID: "",
    amount: "",
    reason: "",
    status: "",
  });

  // Fetch refund data
  useEffect(() => {
    function getRefund() {
      axios
        .get(`http://localhost:8070/refund/get/${id}`)
        .then((res) => {
          setRefund(res.data.refund);
        })
        .catch((err) => {
          // Handle error
        });
    }
    getRefund();
  }, [id]);

  const handleChange = (e) => {
    setRefund({
      ...refund,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8070/refund/update/${id}`, refund)
      .then((response) => {
        alert("Refund Updated");
        navigate("/refundlist");
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <div className="viewform">
      <h1>Edit Refund</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="customerID">Customer ID</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="customerID"
              name="customerID"
              value={refund.customerID}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="sellerID">Seller ID</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="sellerID"
              name="sellerID"
              value={refund.sellerID}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="orderID">Order ID</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="orderID"
              name="orderID"
              value={refund.orderID}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="transactionID">Transaction ID</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="transactionID"
              name="transactionID"
              value={refund.transactionID}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="amount">Amount</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="amount"
              name="amount"
              value={refund.amount}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="reason">Reason</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="reason"
              name="reason"
              value={refund.reason}
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
              value={refund.status}
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
