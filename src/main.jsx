import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import OwnerDashboard from "./pages/OwnerDashboard.jsx";
import CoachDashboard from "./pages/CoachDashboard.jsx";
import CustomerDashboard from "./pages/CustomerDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AppDataProvider } from "./context/AppDataContext.jsx";
import "./styles.css";
import "./portal.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/nourish-dazzle-react">
      <AuthProvider>
        <AppDataProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute allowedRole="owner" />}>
              <Route path="/owner" element={<OwnerDashboard />} />
              <Route path="/owner/coaches" element={<OwnerDashboard />} />
              <Route path="/owner/customers" element={<OwnerDashboard />} />
              <Route path="/owner/plans" element={<OwnerDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRole="coach" />}>
              <Route path="/coach" element={<CoachDashboard />} />
              <Route path="/coach/customers" element={<CoachDashboard />} />
              <Route path="/coach/customers/:customerId" element={<CoachDashboard />} />
              <Route path="/coach/plans" element={<CoachDashboard />} />
              <Route path="/coach/messages" element={<CoachDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRole="customer" />}>
              <Route path="/customer" element={<CustomerDashboard />} />
              <Route path="/customer/plan" element={<CustomerDashboard />} />
              <Route path="/customer/activity" element={<CustomerDashboard />} />
              <Route path="/customer/progress" element={<CustomerDashboard />} />
              <Route path="/customer/coach" element={<CustomerDashboard />} />
            </Route>

            <Route path="*" element={<App />} />
          </Routes>
        </AppDataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
