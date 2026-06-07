import { Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/admin/Dashboard";

const AdminRoutes = (
  <>
    <Route path="/admin">
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
        element={<h1>User Management</h1>}
      />

      <Route
        path="jobs"
        element={<h1>Job Monitoring</h1>}
      />

      <Route
        path="reports"
        element={<h1>Reports</h1>}
      />
    </Route>
  </>
);

export default AdminRoutes;