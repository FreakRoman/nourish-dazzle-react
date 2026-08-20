import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from "./App.jsx";

import Login from "./pages/Login.jsx";

import OwnerDashboard
  from "./pages/OwnerDashboard.jsx";

import CoachDashboard
  from "./pages/CoachDashboard.jsx";

import CustomerDashboard
  from "./pages/CustomerDashboard.jsx";

import ProtectedRoute
  from "./components/ProtectedRoute.jsx";

import {
  AuthProvider,
} from "./context/AuthContext.jsx";


ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <BrowserRouter
      basename="/nourish-dazzle-react"
    >

      <AuthProvider>

        <Routes>

          {/* =================================
              PUBLIC WELCOME PAGE
          ================================= */}

          <Route
            path="/"
            element={<App />}
          />


          {/* =================================
              LOGIN
          ================================= */}

          <Route
            path="/login"
            element={<Login />}
          />


          {/* =================================
              OWNER
          ================================= */}

          <Route
            element={
              <ProtectedRoute
                allowedRole="owner"
              />
            }
          >

            <Route
              path="/owner"
              element={
                <OwnerDashboard />
              }
            />

          </Route>


          {/* =================================
              COACH
          ================================= */}

          <Route
            element={
              <ProtectedRoute
                allowedRole="coach"
              />
            }
          >

            <Route
              path="/coach"
              element={
                <CoachDashboard />
              }
            />

          </Route>


          {/* =================================
              CUSTOMER
          ================================= */}

          <Route
            element={
              <ProtectedRoute
                allowedRole="customer"
              />
            }
          >

            <Route
              path="/customer"
              element={
                <CustomerDashboard />
              }
            />

          </Route>

        </Routes>

      </AuthProvider>

    </BrowserRouter>
  </React.StrictMode>
);