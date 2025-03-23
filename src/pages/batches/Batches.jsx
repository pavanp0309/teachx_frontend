import React, { useState } from "react";
import { Button, Spin, Alert } from "antd";
import { useGetBatchesQuery } from "../../services/batches/batchApi";
import BatchCard from "../../components/batches/BatchCard"; // Reusable batch component
import CreateBatchForm from "../../components/batches/CreateBatchForm"; // Popup form

const Batches = () => {
  const { data = {}, error, isLoading, refetch } = useGetBatchesQuery();
  const { batches: fetchedBatches = [] } = data || {}; // Ensure no TypeError when data is undefined
  const [showForm, setShowForm] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null); // Track the batch being edited

  // Handle batch deletion
  const handleBatchDelete = (deletedBatchId) => {
    // Update the local state to remove the deleted batch
    refetch(); // Refresh the list of batches after deletion
  };

  const handleFormSuccess = () => {
    setShowForm(false); // Close the form
    setSelectedBatch(null); // Reset selected batch
    refetch(); // Refresh the list of batches
  };

  const handleCreateBatch = () => {
    setSelectedBatch(null); // Ensure no initialValues are passed (create mode)
    setShowForm(true); // Open the form
  };

  const handleEditBatch = (batch) => {
    setSelectedBatch(batch); // Set the batch to edit
    setShowForm(true); // Open the form
  };

  if (isLoading) return <Spin size="large" />;
  if (error) return <Alert message="Error fetching batches" type="error" />;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Your Batches</h3>
        <Button type="primary" onClick={handleCreateBatch}>
          Create New Batch
        </Button>
      </div>

      {/* Popup Form */}
      <CreateBatchForm
        initialValues={selectedBatch} // Pass the batch to edit (or null for create)
        visible={showForm}
        onCancel={() => setShowForm(false)} // Close the form
        onSuccess={handleFormSuccess} // Handle success (refresh list and close form)
      />

      <div className="row">
        {fetchedBatches && fetchedBatches.length > 0 ? (
          fetchedBatches.map((batch) => (
            <div key={batch._id} className="col-md-4 mb-3">
              <BatchCard
                batch={batch}
                onBatchDelete={handleBatchDelete} // Pass the delete handler
                onEdit={() => handleEditBatch(batch)} // Open the form in edit mode
              />
            </div>
          ))
        ) : (
          <p>No batches available. Create one to get started!</p>
        )}
      </div>
    </div>
  );
};

export default Batches;