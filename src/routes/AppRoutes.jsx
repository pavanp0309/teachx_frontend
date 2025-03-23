import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./rbac/ProtectedRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import Batches from "../pages/batches/Batches";
import BatchDetails from "../pages/batches/BatchDetails";
import BatchRoutes from "./batchroutes/BatchRoutes";
import Login from "../components/common/login/Login";
import Profile from "../components/common/login/Profile";
import JoinBatch from "../pages/batches/JoinBatch";
// import Courses from "../pages/courses/Courses";
// import Users from "../pages/users/Users";
// import Announcements from "../pages/announcements/Announcements";

const AppRoutes = ({ token }) => {
  return (
    <Routes>
      {/* Redirect logged-in users away from login */}
      <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />

      {/* Role-Based Routes */}
      <Route element={<ProtectedRoute allowedRoles={["superadmin", "admin"]} />}>
        <Route path="/batches" element={<Batches />} />
        <Route path="/batches/:batchId" element={<BatchDetails />} />
        <Route path="/batches/:batchId/*" element={<BatchRoutes />} />
        {/* <Route path="/users" element={<Users />} /> */}
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["superadmin", "admin", "trainer"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/courses" element={<Courses />} /> */}
        {/* <Route path="/announcements" element={<Announcements />} /> */}
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["superadmin", "admin", "trainer", "student"]} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/join-batch" element={<JoinBatch />} />
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
