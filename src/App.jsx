import React from "react";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import Sidebar from "./components/common/sidebar/Sidebar";
import Navbar from "./components/common/navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";

const { Content } = Layout;

const App = () => {
  const token = useSelector((state) => state.auth.token); // Check if user is logged in

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Show Sidebar only if the user is logged in */}
      {token && <Sidebar />}

      <Layout>
        {/* Show Navbar only if the user is logged in */}
        {token && <Navbar />}

        <Content style={{ padding: "20px" }}>
          <AppRoutes token={token} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
