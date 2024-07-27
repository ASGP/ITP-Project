const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose
  .connect(URL, {
    //type warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo DB connected successfully");
  })
  .catch((err) => console.log("DB connection failed", err));

const employeeRouter = require("./routes/employees.js");
app.use("/employee", employeeRouter);

const couponRouter = require("./routes/coupons.js");
app.use("/coupon", couponRouter);

const OrderRouter = require("./routes/orders.js");
app.use("/order", OrderRouter);

const productRouter = require("./routes/products.js");
app.use("/product", productRouter);

const refundRouter = require("./routes/refunds.js");
app.use("/refund", refundRouter);

const transactionRouter = require("./routes/transactions.js");
app.use("/transaction", transactionRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number : ${PORT}`);
});
