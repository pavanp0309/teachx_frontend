import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  DashboardOutlined,
  BookOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {
  const role = useSelector((state) => state.auth.role); // Get user role

  // Define menu items based on roles
  const menuItems = [
    { key: "1", icon: <DashboardOutlined />, label: "Dashboard", path: "/", roles: ["superadmin", "admin", "trainer", "student"] },
    { key: "2", icon: <VideoCameraOutlined />, label: "Batches", path: "/batches", roles: ["superadmin", "admin"] },
    { key: "3", icon: <BookOutlined />, label: "Courses", path: "/courses", roles: ["superadmin", "admin", "trainer"] },
    { key: "4", icon: <TeamOutlined />, label: "Users", path: "/users", roles: ["superadmin", "admin"] },
    { key: "5", icon: <NotificationOutlined />, label: "Announcements", path: "/announcements", roles: ["superadmin", "admin", "trainer"] },
  ];

  // Filter menu based on user role
  const filteredMenu = menuItems.filter((item) => item.roles.includes(role));

  return (
    <Sider collapsible theme="light" style={{ minHeight: "100vh", border: "1px solid black" }}>
      <div className="text-center py-3" style={{ fontWeight: "bold", fontSize: "18px" }}>
        <a className="navbar-brand fw-bold text-primary" href="#">🎀🎀 TeachX 🎀🎀</a>
      </div>
      <Menu theme="light" mode="inline">
        {filteredMenu.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
