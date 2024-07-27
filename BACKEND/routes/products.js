const router = require("express").Router();
const { response } = require("express");
let Product = require("../models/product");

//View all products
router.route("/").get((req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
