const router = require("express").Router();
const { response } = require("express");
let Refund = require("../models/refund");

//View all refunds
router.route("/").get((req, res) => {
  Refund.find()
    .then((refunds) => {
      res.json(refunds);
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
  const refundId = req.params.id;

  Refund.findByIdAndUpdate(
    refundId,
    { $set: { status } },
    { new: true }
  )
    .then((updatedRefund) =>
      res.json({
        success: true,
        message: "Refund status updated",
        updatedRefund,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Unable to update Refund status",
        error: err,
      });
    });
});

// ...

module.exports = router;
