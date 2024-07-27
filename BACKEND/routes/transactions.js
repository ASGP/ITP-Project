const router = require("express").Router();
const { response } = require("express");
let Transaction = require("../models/transactions");

//View all refunds
router.route("/").get((req, res) => {
  Transaction.find()
    .then((transactions) => {
      res.json(transactions);
    })
    .catch((err) => {
      console.log(err);
    });
});
// routes/refund.js

// ...

// Update refund status by ID
router.route("/update/:id").put((req, res) => {
  const { status } = req.body;
  const transactionsId = req.params.id;

  Transaction.findByIdAndUpdate(
    transactionsId,
    { $set: { status } },
    { new: true }
  )
    .then((updatedTransaction) =>
      res.json({
        success: true,
        message: "Transaction status updated",
        updatedTransaction,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Unable to update Transactions status",
        error: err,
      });
    });
});

// ...

module.exports = router;
