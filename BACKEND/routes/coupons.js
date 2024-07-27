const router = require("express").Router();
const { response } = require("express");
let Coupon = require("../models/coupon");

//Add coupon
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const ccode = req.body.ccode;
  const amount = req.body.amount;
  const type = req.body.type;
  const status = req.body.status;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  const newCoupon = new Coupon({
    name,
    ccode,
    amount,
    type,
    status,
    startDate,
    endDate,
  });

  newCoupon
    .save()
    .then(() => {
      res.json("New Coupon Created");
    })
    .catch((err) => {
      console.log(err);
    });
});

//View all coupons
router.route("/").get((req, res) => {
  Coupon.find()
    .then((coupons) => {
      res.json(coupons);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Update coupon by id
router.route("/update/:id").put((req, res) => {
  const { name, ccode, amount, type, status, startDate, endDate } = req.body;
  const coupnId = req.params.id;

  Coupon.findByIdAndUpdate(
    coupnId,
    {
      $set: {
        name,
        ccode,
        amount,
        type,
        status,
        startDate,
        endDate,
      },
    },
    { new: true }
  )
    .then((updatedCoupon) =>
      res.json({
        success: true,
        message: "Coupon updated",
        updatedCoupon: updatedCoupon, // change variable name to updatedCoupon
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Unable to update Coupon",
        error: err,
      });
    });
});

//Delete User by ID
router.route("/delete/:id").delete(async (req, res) => {
  let coupnId = req.params.id;

  await Coupon.findByIdAndDelete(coupnId)
    .then(() => {
      res.status(200).send({ status: "Coupon deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete Coupon", error: err.message });
    });
});

//View user by ID
router.route("/get/:id").get(async (req, res) => {
  let coupnId = req.params.id;
  const user = await Coupon.findById(coupnId)
    .then((coupon) => {
      res.status(200).send({ status: "coupon fetched", coupon });
    })
    .catch(() => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get coupon", error: err.message });
    });
});

router.get("/search/:searchInput", async (req, res) => {
  try {
    const { searchInput } = req.params;

    const isNumber = !isNaN(searchInput);
    const isDate = !isNaN(Date.parse(searchInput));

    const searchConditions = [
      { name: { $regex: searchInput, $options: "i" } },
      { ccode: { $regex: searchInput, $options: "i" } },
    ];

    if (isNumber) {
      searchConditions.push({ amount: parseFloat(searchInput) });
    }

    if (isDate) {
      const searchDate = new Date(searchInput);
      searchConditions.push({ startDate: { $lte: searchDate } });
      searchConditions.push({ endDate: { $gte: searchDate } });
    }

    const coupons = await Coupon.find({
      $or: searchConditions,
    });

    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
