import React,{useState} from "react";
import { Button,Spin, Alert, } from "antd";
import { useGetBatchesQuery } from "../../services/batches/batchApi";
import BatchCard from "../../components/batches/BatchCard" // Importing the reusable component
import CreateBatchForm from "../../components/batches/CreateBatchForm";

const batchData = [
  { id: 1, name: "FSD - March 2025", category: "Full Stack", students: 8, joinRequests: 3 },
  { id: 2, name: "AI - Feb 2025", category: "Data Science", students: 54, joinRequests: 0 },
  { id: 3, name: "React JS - Pavan Sir", category: "ReactJS", students: 19, joinRequests: 2 },
  { id: 4, name: "Java Jan 2025", category: "Java", students: 12, joinRequests: 5 },
];

const Batches = () => {
  const { data: batches, error, isLoading } = useGetBatchesQuery();
  const [showForm, setShowForm] = useState(false);

  if (isLoading) return <Spin size="large" />;
  if (error) return <Alert message="Error fetching batches" type="error" />;
  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Your Batches</h3>
        {/* Create Batch Button */}
      <Button type="primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Create New Batch"}
      </Button>
      </div>
      {showForm && <CreateBatchForm />}
      {/* Batches Grid */}
      <div className="row">
      {batches && batches.length > 0 ? (batches.map((batch) => (
          <div key={batch.id} className="col-md-4 mb-3">
            <BatchCard batch={batch} /> {/* Using the reusable component */}
          </div>
        ))):(
          <p>No batches available. Create one to get started!</p>
        )}
      </div>
    </div>
  );
};

export default Batches;
