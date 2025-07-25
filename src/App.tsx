import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import About from "./pages/About";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { CreateNewOrder } from "./pages/CreateNewOrder";
import { AnimatePresence } from "framer-motion";
import { CustomerDetails } from "./pages/CustomerDetails";
import { Payment } from "./pages/Payment";
import { EditOrder } from "./pages/EditOrder";
import ActivityHistory from "./pages/ActivityHistory";

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
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
