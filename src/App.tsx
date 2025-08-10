import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/general/Home";
import About from "./pages/About";
import { SignIn } from "./pages/general/SignIn";
import { SignUp } from "./pages/general/SignUp";
import { CreateNewOrder } from "./pages/CreateNewOrder";
import { AnimatePresence } from "framer-motion";
import { CustomerDetails } from "./pages/admin/CustomerDetails";
import { Payment } from "./pages/Payment";
import ActivityHistory from "./pages/ActivityHistory";
import {
  AdminDashboard,
  CustomerEdit,
  CustomerManagement,
  CustomerNew,
  EditOrder,
  OrderManagement,
} from "@/pages/admin";

function App() {
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/order/new" element={<CreateNewOrder />} />
          <Route path="/order/:id/edit" element={<EditOrder />} />
          <Route path="/customer/:id" element={<CustomerDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/activity-history" element={<ActivityHistory />} />
          <Route
            path="/admin/customer-management"
            element={<CustomerManagement />}
          />
          <Route path="/admin/order-management" element={<OrderManagement />} />
          <Route
            path="/admin/customer-management/new"
            element={<CustomerNew />}
          />
          <Route
            path="/admin/customer-management/edit/:id"
            element={<CustomerEdit />}
          />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
