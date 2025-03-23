import React, { useEffect } from "react";
import { Form, Input, DatePicker, Button, message, Modal } from "antd";
import moment from "moment"; // Import moment for date handling
import { useCreateBatchMutation, useUpdateBatchMutation } from "../../services/batches/batchApi";

const CreateBatchForm = ({ initialValues, visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [createBatch] = useCreateBatchMutation();
  const [updateBatch] = useUpdateBatchMutation();

  // Set initial values when the form is rendered or when initialValues change
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        startDate: initialValues.startDate ? moment(initialValues.startDate) : null,
      });
    } else {
      form.resetFields(); // Reset the form if no initialValues are provided
    }
  }, [initialValues, form]);

  const handleSubmit = async (values) => {
    try {
      // Format the startDate before submitting
      const formattedValues = {
        ...values,
        startDate: values.startDate.format("YYYY-MM-DD"),
      };

      if (initialValues) {
        // If initialValues exist, it's an edit operation
        await updateBatch({ batchId: initialValues._id, updatedBatchData: formattedValues }).unwrap();
        message.success("Batch updated successfully!");
      } else {
        // If no initialValues, it's a create operation
        await createBatch(formattedValues).unwrap();
        message.success("Batch created successfully!");
      }

      onSuccess(); // Call parent function to refetch batches and close form
    } catch (error) {
      message.error("Failed to save batch!");
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit Batch" : "Create Batch"} // Dynamic title
      visible={visible} // Control visibility of the modal
      onCancel={onCancel} // Handle modal close
      footer={null} // Remove default footer buttons
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        {/* Batch Name Field with Character Limit */}
        <Form.Item
          name="name"
          label="Batch Name"
          rules={[
            { required: true, message: "Please enter a batch name!" },
            {
              max: 30, // Maximum 50 characters
              message: "Batch name must be less than 40 characters!",
            },
          ]}
        >
          <Input
            placeholder="Enter batch name"
            maxLength={50} // Enforces a hard limit in the input field
          />
        </Form.Item>

        <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
          <Input placeholder="Enter the batch subject (e.g., JavaScript, React, etc.)" />
        </Form.Item>

        <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>

        <Form.Item name="schedule" label="Schedule">
          <Input placeholder="Batch schedule (e.g., Weekdays 7-9 PM)" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          {initialValues ? "Update Batch" : "Create Batch"}
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateBatchForm;