import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Home from "@/pages/Home";
import RoleSelect from "@/pages/RoleSelect";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import PricingSection from "./pages/PricingSection";
import ForgotPassword from "@/pages/ForgotPassword";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import Barbershops from "@/pages/admin/Barbershops";

import OwnerDashboard from "@/pages/owner/OwnerDashboard";
import BarberDashboard from "@/pages/barber/BarberDashboard";
import CustomerDashboard from "@/pages/customer/CustomerDashboard";
import Users from "./pages/admin/Users";
import Subscribers from "./pages/admin/Subscriptions";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===== LANDING PAGE (PUBLIC) ===== */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* ===== AUTH ROUTES (PUBLIC) ===== */}
        <Route path="/roleselect" element={<RoleSelect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<PricingSection />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ===== PROTECTED DASHBOARDS ===== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allow={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
>
        </Route>

        <Route
          path="/admin/barbershops"
          element={
            <ProtectedRoute allow={["admin"]}>
              <Barbershops />
            </ProtectedRoute>
         }
      />

      <Route
          path="/admin/users"
          element={
            <ProtectedRoute allow={["admin"]}>
              <Users />
            </ProtectedRoute>
         }
      />

      <Route
          path="/admin/suscribers"
          element={
            <ProtectedRoute allow={["admin"]}>
              <Subscribers />
            </ProtectedRoute>
         }
      />

        <Route
          path="/owner"
          element={
            <ProtectedRoute allow={["owner"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/barber"
          element={
            <ProtectedRoute allow={["barber"]}>
              <BarberDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer"
          element={
            <ProtectedRoute allow={["customer"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        {/* ===== 404 NOT FOUND ===== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}