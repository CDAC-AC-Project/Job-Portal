import { Route, Navigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import UserManagement from "../pages/admin/UserManagement";
import JobMonitoring from "../pages/admin/JobMonitoring";
import Reports from "../pages/admin/Reports";

const AdminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route
      index
      element={<Navigate to="/admin/dashboard" />}
    />

    <Route
      path="dashboard"
      element={<Dashboard />}
    />


    <Route
      path="users"
      element={<UserManagement />}
    />

    <Route
      path="jobs"
      element={<JobMonitoring />}
    />

    <Route
      path="reports"
      element={<Reports />}
    />
  </Route>

);

export default AdminRoutes;