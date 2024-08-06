import "./App.css";
import "./components/CouponManagement/css/dashboard.css";
import "./components/CouponManagement/css/sidebar.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddCoupon from "./components/CouponManagement/AddCoupon";
import CouponList from "./components/CouponManagement/CouponList";
import EditCoupon from "./components/CouponManagement/EditCoupon";
import CouponDashboard from "./components/CouponManagement/CouponDashboard";
import OrderList from "./components/OrderManagment/OrdersList";
import RefundList from "./components/RefundsManagment/RefundsList";
import ProductLIst from "./components/ProductsMangment/ProductsList";
import EditRefund from "./components/RefundsManagment/EditRefund"; // Import the new component
import TransactionList from "./components/CouponManagement/TransactionsManagement/transactionList";
import EditTransaction from "./components/CouponManagement/TransactionsManagement/EditTransaction";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<CouponDashboard />} />
          <Route path='/addCoupon' element={<AddCoupon />} />
          <Route path='/couponlist' element={<CouponList />} />
          <Route path='/EditCoupon/:id' element={<EditCoupon />} />
          <Route path='/orderlist' element={<OrderList />} />
          <Route path='/refundlist' element={<RefundList />} />
          <Route path="/editRefund/:id" element={<EditRefund />} />
          <Route path='/productlist' element={<ProductLIst />} />
          <Route path='/transactionlist' element={<TransactionList />} />
          <Route path='/EditTransaction' element={<EditTransaction />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
