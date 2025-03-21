import React from "react";
import { Card, Badge, Tooltip, Dropdown, Menu } from "antd";
import { 
  UserAddOutlined, 
  BellOutlined, 
  MoreOutlined, 
  DeleteOutlined, 
  ShareAltOutlined 
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const BatchCard = ({ batch }) => {
  const navigate = useNavigate();

  // Handle More Options (Delete & Share)
  const handleMenuClick = (key) => {
    if (key === "delete") {
      console.log(`Deleting batch: ${batch.name}`);
    } else if (key === "share") {
      console.log(`Sharing batch: ${batch.name}`);
    }
  };

  // Navigate to Batch Details Page when clicking anywhere except the MoreOutlined icon
  const handleCardClick = (e) => {
    // Prevent navigating when clicking on the MoreOutlined dropdown
    if (!e.target.closest(".more-options")) {
      navigate(`/batches/${batch.id}`);
    }
  };

  const menu = (
    <Menu
      onClick={({ key }) => handleMenuClick(key)}
      items={[
        { key: "delete", label: "Delete", icon: <DeleteOutlined style={{ color: "red" }} /> },
        { key: "share", label: "Share", icon: <ShareAltOutlined style={{ color: "#1890ff" }} /> },
      ]}
    />
  );

  return (
    <Card 
      className=" p-3 shadow border" 
      style={{ borderRadius: "12px", cursor: "pointer" }} 
      onClick={handleCardClick} // Navigate to batch details
    >
      {/* Title & More Options */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="fw-bold">{batch.name}</h6>
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <MoreOutlined className="more-options" style={{ fontSize: "18px", cursor: "pointer" }} onClick={(e) => e.stopPropagation()} />
        </Dropdown>
      </div>

      <p className="text-muted">{batch.category}</p>

      {/* Students Count & Join Requests */}
      <div className="d-flex justify-content-between align-items-center">
        <span className="d-flex align-items-center text-muted">
          <UserAddOutlined className="me-1" style={{ color: "#1890ff" }} />
          {batch.students} Students
        </span>

        {/* Show Join Request Badge Only If Requests > 0 */}
        {batch.joinRequests > 0 && (
          <Tooltip title="New Join Request" placement="left" color="red">
            <Badge count={batch.joinRequests} style={{ backgroundColor: "#52c41a" }}>
              <BellOutlined style={{ fontSize: "18px", color: "#52c41a", cursor: "pointer" }} />
            </Badge>
          </Tooltip>
        )}
      </div>
    </Card>
  );
};

export default BatchCard;
