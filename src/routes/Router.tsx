import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import PublicPage from "../pages/public/PublicPage";
import NotFoundPage from "../pages/common/NotFoundPage";
import ParcelDetailsPage from "../pages/common/ParcelDetailsPage";
import CustomerDashboard from "../layouts/CustomerDashboard";
import MyParcelsPage from "../pages/customer/MyParcelsPage";
import BookParcelPage from "../pages/customer/BookParcelPage";
import TrackParcelPage from "../pages/customer/TrackParcelPage";
import AdminDashboard from "../layouts/AdminDashboard";
import AllParcel from "../pages/admin/AllParcel";
import AgentDashboard from "../layouts/AgentDashboard";
import MyDeliveriesPage from "../pages/agent/MyDeliveriesPage";
import CustomerProfilePage from "../pages/customer/CustomerProfilePage";
import ManageAgentsPage from "../pages/admin/ManageAgentsPage";
import ReportsPage from "../pages/admin/ReportsPage";
import AgentProfilePage from "../pages/agent/AgentProfilePage";
import Agent from "../pages/agent/Agent";
import Admin from "../pages/admin/Admin";
import Customer from "../pages/customer/Customer";
import AgentMap from "../pages/agent/AgentMap";
import ManageCustomer from "../pages/admin/ManageCustomer";
import AssignParcelForm from "../components/admin-sidebar/AssignParcelForm";
import ProtectedRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <PublicPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "parcel/:id", element: <ParcelDetailsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },

  // Protect all dashboard routes by wrapping with ProtectedRoute
  {
    path: "/customer",
    element: (
      <ProtectedRoute>
        <CustomerDashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Customer /> },
      { path: "my-parcels", element: <MyParcelsPage /> },
      { path: "book-parcel", element: <BookParcelPage /> },
      { path: "profile", element: <CustomerProfilePage /> },
      { path: "track-parcel", element: <TrackParcelPage /> },
    ],
  },
  {
    path: "/agent",
    element: (
      <ProtectedRoute>
        <AgentDashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Agent /> },
      { path: "my-deliveries", element: <MyDeliveriesPage /> },
      { path: "live-tracking", element: <AgentMap /> },
      { path: "profile", element: <AgentProfilePage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Admin /> },
      { path: "all-parcels", element: <AllParcel /> },
      { path: "agents", element: <ManageAgentsPage /> },
      { path: "customers", element: <ManageCustomer /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "assign-parcel", element: <AssignParcelForm /> },
    ],
  },
]);

export default router;
