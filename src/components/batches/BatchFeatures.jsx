import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "antd";

const BatchFeatures = ({ features }) => {
  const navigate = useNavigate();
  const { batchId } = useParams(); // Get batch ID from URL

  const handleFeatureClick = (feature) => {
    navigate(`/batches/${batchId}/${feature.toLowerCase().replace(/\s+/g, "")}`);
  };

  return (
    <div className="d-flex flex-wrap gap-1 mt-3">
      {features.map((feature) => (
        <Card
          key={feature.id}
          className="text-center shadow-sm"
          style={{ backgroundColor: feature.color, cursor: "pointer", minWidth: "80px" }}
          onClick={() => handleFeatureClick(feature.name)}
        >
          {feature.icon}
          <p className="mb-0">{feature.name}</p>
        </Card>
      ))}
    </div>
  );
};

export default BatchFeatures;
