import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, message } from "antd";
import { useJoinBatchByCodeMutation } from "../../services/batches/batchApi";
import { useSelector } from "react-redux";

const JoinBatch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const batchCode = queryParams.get("code"); // Get batch code from URL
  const [joinBatch, { isLoading }] = useJoinBatchByCodeMutation(); // Use the hook
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // If user is not authenticated, redirect to login with the batch code
    if (!token) {
      navigate(`/login?redirect=/join-batch?code=${batchCode}`);
    }
  }, [token, batchCode, navigate]);

  const handleJoinBatch = async () => {
    if (!batchCode) {
      message.error("Invalid batch code");
      return;
    }

    try {
      // Send the batchCode as a string, not as an object
      await joinBatch(batchCode).unwrap(); // Fix: Pass batchCode directly
      message.success("Enrollment request sent successfully!");
      navigate("/batches"); // Redirect to batches page after joining
    } catch (error) {
      message.error(error?.data?.message || "Failed to join batch");
    }
  };

  // If user is not a student, show an error
  if (user?.role !== "student") {
    return (
      <Card title="Join Batch" style={{ maxWidth: 500, margin: "50px auto" }}>
        <p>Only students can join batches.</p>
      </Card>
    );
  }

  return (
    <Card title="Join Batch" style={{ maxWidth: 500, margin: "50px auto" }}>
      <p>You are joining batch with code: <strong>{batchCode}</strong></p>
      <Button type="primary" onClick={handleJoinBatch} loading={isLoading}>
        Join Batch
      </Button>
    </Card>
  );
};

export default JoinBatch;