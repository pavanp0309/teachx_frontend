import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "antd";
import { CopyOutlined, BellOutlined } from "@ant-design/icons";
import BatchFeatures from "../../components/batches/BatchFeatures"; // Import BatchFeatures component

const BatchDetails = () => {
  const { batchId } = useParams(); // Get batch ID from URL
  const navigate = useNavigate(); // To change routes

  const features = [
    { id: 1, name: "Lectures", icon: "📖", path: "lectures" },
    { id: 2, name: "Attendance", icon: "📅", path: "attendance" },
    { id: 3, name: "Timetable", icon: "🕒", path: "timetable" },
    { id: 4, name: "Notice Board", icon: "📢", path: "notice-board" },
    { id: 5, name: "Assessment", icon: "📝", path: "assessment" },
    { id: 6, name: "Study Material", icon: "📚", path: "study-material" },
  ];

  return (
    <div className="batch-details-container p-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3 border border-primary p-3">
        <div>
          <h5 className="fw-bold">{'FSD - March 2025 PavanReddy Sir'}</h5>
          <p className="text-muted m-0"> {"02 Mar 2025"}</p>
        </div>
        <Button type="primary" icon={<BellOutlined />}>Go Live</Button>
      </div>

      {/* Overview Section */}
      <Card className="shadow-sm p-2 border border-danger">
        <div className="d-flex align-items-center justify-content-between">
          <div className="p-2 border-end border-primary">
            <p className="text-muted mb-1">
              Classroom ID <CopyOutlined className="ms-2" style={{ cursor: "pointer" }} />
            </p>
            <h5 className="fw-bold">{'batch335d'}</h5>
          </div>
          <div className="text-center p-2 border-end border-primary">
            <p className="text-muted mb-1">No. of People</p>
            <h5 className="fw-bold">{"50+"} Students</h5>
          </div>
          <BatchFeatures
        features={features}
        onFeatureSelect={(path) => navigate(`/batches/${batchId}/${path}`)}
      />
        </div>
      </Card>

      {/* Feature Navigation */}
      
    </div>
  );
};

export default BatchDetails;
