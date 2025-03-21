import React from "react";

const ReusableCard = ({ title, icon }) => {
  return (
    <div className="reusable-card">
      <span className="icon">{icon}</span>
      <p>{title}</p>
    </div>
  );
};

export default ReusableCard;
