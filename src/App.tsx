import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { SignIn } from "./pages/SignIn";
import { Attend } from "./pages/Attend";
import { AnimatePresence } from "framer-motion";
import { CustomerDetails } from "./pages/CustomerDetails";
import { Payment } from "./pages/Payment";

function App() {
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/attend" element={<Attend />} />
          <Route path="/customer/:id" element={<CustomerDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
