import React, { useState } from "react";
import { Card, Badge, Tooltip, Dropdown, Menu } from "antd";
import { UserAddOutlined, BellOutlined, MoreOutlined, DeleteOutlined, ShareAltOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDeleteBatchMutation } from "../../services/batches/batchApi";
import ShareModal from "../common/modal/ShareModal"; // Import the ShareModal component

const BatchCard = ({ batch, onBatchDelete, onEdit }) => {
  const navigate = useNavigate();
  const [deleteBatch] = useDeleteBatchMutation(); // Hook for delete mutation
  const [isShareModalVisible, setIsShareModalVisible] = useState(false); // State for share modal

  // Handle More Options (Delete, Edit, and Share)
  const handleMenuClick = async (key, e) => {
    e.stopPropagation(); // Prevent parent card click event

    if (key === "delete") {
      try {
        console.log("Deleting batch with ID:", batch._id); // Log the batch ID
        await deleteBatch(batch._id).unwrap(); // Call delete API and handle response
        message.success("Batch deleted successfully");
        onBatchDelete(batch._id); // Remove deleted batch from UI
      } catch (error) {
        if (error.status === 404) {
          message.error("Batch not found. It may have already been deleted.");
        } else {
          message.error("Failed to delete batch");
        }
        console.error("Error deleting batch:", error);
      }
    } else if (key === "share") {
      setIsShareModalVisible(true); // Open share modal
    } else if (key === "edit") {
      onEdit(); // Call the onEdit function passed from the parent
    }
  };

  const handleCardClick = (e) => {
    if (!e.target.closest(".more-options")) {
      navigate(`/batches/${batch._id}`); // Navigate to batch details
    }
  };

  const menu = (
    <Menu
      onClick={({ key, domEvent }) => handleMenuClick(key, domEvent)} // Pass the event and stop propagation
      items={[
        { key: "edit", label: "Edit", icon: <EditOutlined style={{ color: "#1890ff" }} /> },
        { key: "delete", label: "Delete", icon: <DeleteOutlined style={{ color: "red" }} /> },
        { key: "share", label: "Share", icon: <ShareAltOutlined style={{ color: "#1890ff" }} /> },
      ]}
    />
  );

  return (
    <>
      <Card 
        className="p-3 shadow border" 
        style={{ borderRadius: "12px", cursor: "pointer" }} 
        onClick={handleCardClick}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="fw-bold fs-3 text-capitalize">{batch.name}</h6>
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <MoreOutlined className="more-options" style={{ fontSize: "18px", cursor: "pointer" }} onClick={(e) => e.stopPropagation()} />
          </Dropdown>
        </div>

        <p className="text-muted fs-5 text-capitalize">{batch.subject || "No subject specified"}</p>
        <p className="text-muted">{batch.category}</p>

        <div className="d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center text-muted">
            <UserAddOutlined className="me-1" style={{ color: "#1890ff" }} />
            {batch.students} Students
          </span>

          {batch.joinRequests > 0 && (
            <Tooltip title="New Join Request" placement="left" color="red">
              <Badge count={batch.joinRequests} style={{ backgroundColor: "#52c41a" }}>
                <BellOutlined style={{ fontSize: "18px", color: "#52c41a", cursor: "pointer" }} />
              </Badge>
            </Tooltip>
          )}
        </div>
      </Card>

      {/* Share Modal */}
      <ShareModal
        visible={isShareModalVisible}
        onCancel={() => setIsShareModalVisible(false)}
        batchCode={batch.code}
      />
    </>
  );
};

export default BatchCard;