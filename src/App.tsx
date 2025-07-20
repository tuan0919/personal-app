import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

// Import components
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import About from "./pages/About";
import { CustomerDetails } from "./pages/CustomerDetails";
import ActivityHistory from "./pages/ActivityHistory";
import { CreateNewOrder } from "./pages/CreateNewOrder";
import { EditOrder } from "./pages/EditOrder";
import { Payment } from "./pages/Payment";

// Import PWABadge from new location
import PWABadge from "./components/pwa/PWABadge";
import { NotificationToast } from "./components/shared/NotificationToast";

function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <PWABadge />
      <NotificationToast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/customer/:id" element={<CustomerDetails />} />
        <Route path="/activity-history" element={<ActivityHistory />} />
        <Route path="/create-new-order" element={<CreateNewOrder />} />
        <Route path="/edit-order/:id" element={<EditOrder />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
