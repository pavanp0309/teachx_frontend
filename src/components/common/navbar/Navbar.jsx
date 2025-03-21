import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/authSlice"; // Import logout action
import SearchBar from "../searchbar/Searchbar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  console.log(user)

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload(); // Ensure a fresh state after logout
  };

  // ✅ Navigate to Profile page
  const handleProfileClick = () => {
    navigate("/profile");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />} onClick={handleProfileClick}>
        My Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  // Function to determine avatar
  const getAvatarContent = () => {
    if (user?.name) return user.name.substring(0, 2).toUpperCase();
    if (user?.email) return user.email.substring(0, user.email.indexOf("@")).toUpperCase();
    return "U";
  };

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-3 border border-dark">
      <div className="container-fluid">
        <SearchBar
          placeholder="Search..."
          filters={[
            { label: "Courses", value: "courses" },
            { label: "Batches", value: "batches" },
            { label: "Users", value: "users" },
            { label: "Announcements", value: "announcements" },
          ]}
          onSearch={(filter, value) => console.log(`Searching for "${value}" in "${filter}"`)}
        />

       <Dropdown overlay={menu} trigger={["click"]}>
        <div className="d-flex align-items-center" style={{ cursor: "pointer" }}>
          <Avatar style={{ backgroundColor: "#f56a00" }}>{getAvatarContent()}</Avatar>
          <span className="ms-2 fw-semibold">{user?.name || user?.email || "User"}</span>
        </div>
      </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
