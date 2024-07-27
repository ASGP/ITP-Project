const router = require("express").Router();
const { response } = require("express");
let Order = require("../models/order");

//View all orders
router.route("/").get((req, res) => {
  Order.find()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
