import React, { useState } from "react";
import { useCreateBatchMutation } from "../../services/batches/batchApi";
import { Form, Input, Button, DatePicker, message, InputNumber } from "antd";


const CreateBatchForm = () => {
  const [createBatch, { isLoading }] = useCreateBatchMutation();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const { name, code, startDate, endDate, schedule } = values;

    // Formatting dates before sending to the backend
    const formattedStartDate = startDate ? startDate.format("YYYY-MM-DD") : "";
    const formattedEndDate = endDate ? endDate.format("YYYY-MM-DD") : "";

    try {
      await createBatch({
        name,
        code,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        schedule,
      }).unwrap();
      message.success("Batch created successfully!");
      form.resetFields();
    } catch (error) {
      message.error("Failed to create batch!");
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item name="name" label="Batch Name" rules={[{ required: true, message: "Enter batch name!" }]}>
        <Input placeholder="Enter batch name" />
      </Form.Item>

      <Form.Item name="code" label="Batch Code" rules={[{ required: true, message: "Enter batch code!" }]}>
        <Input placeholder="Enter unique batch code" />
      </Form.Item>



      <Form.Item name="startDate" label="Start Date" rules={[{ required: true, message: "Enter start date!" }]}>
        <DatePicker format="YYYY-MM-DD" placeholder="Select start date" />
      </Form.Item>

      <Form.Item name="endDate" label="End Date" rules={[{ required: true, message: "Enter end date!" }]}>
        <DatePicker format="YYYY-MM-DD" placeholder="Select end date" />
      </Form.Item>

      <Form.Item name="schedule" label="Schedule" rules={[{ required: true, message: "Enter schedule!" }]}>
        <Input placeholder="Enter batch schedule (e.g., Mon, Wed, Fri)" />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={isLoading}>
        Create Batch
      </Button>
    </Form>
  );
};

export default CreateBatchForm;