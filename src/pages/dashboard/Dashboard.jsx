import React from "react";
import { useSelector } from "react-redux";
import SuperAdminDashboard from "./SuperAdmin";
import AdminDashboard from "./AdminDashboard";
import TrainerDashboard from "./TrainerDashboard";
import StudentDashboard from "./StudentDashboard";

const Dashboard = () => {
  const role = useSelector((state) => state.auth.role); // Get role from Redux

  console.log("User Role:", role); // ✅ Debugging Redux role

  if (!role) return <h1>Loading...</h1>; // Handle cases where role is not set yet

  if (role === "superadmin") return <SuperAdminDashboard />;
  if (role === "admin") return <AdminDashboard />;
  if (role === "trainer") return <TrainerDashboard />;
  return <StudentDashboard />; // Default to Student Dashboard
};

export default Dashboard;
