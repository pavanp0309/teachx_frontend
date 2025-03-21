import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../../services/authApi";
import { loginSuccess } from "../../../services/authSlice";
import { Card, Input, Button, message, Spin, Typography, Form } from "antd";

const { Title } = Typography;

const Profile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  // ✅ Fetch profile data
  const { data, isLoading, error, refetch } = useGetProfileQuery(undefined, {
    skip: !token, // Skip API call if no token
  });

  // ✅ Extract user from API response
  const user = data?.user; 

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [form, setForm] = useState({
    email: "",
    role: "",
    name: "",
    phone: "",
  });

  // ✅ Load data into state when user data is available
  useEffect(() => {
    if (user) {
      setForm({
        email: user.email || "",
        role: user.role || "User",
        name: user.name || "",
        phone: user.phone || "",
      });
      dispatch(loginSuccess({ user, token })); // ✅ Update Redux store
    }
  }, [user, dispatch, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedProfile = await updateProfile(form).unwrap();
      dispatch(loginSuccess({ user: updatedProfile.user, token }));
      message.success("Profile updated successfully!");
      refetch(); // ✅ Refresh profile data
    } catch (err) {
      message.error(err?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) return <Spin tip="Loading profile..." />;

  if (error) return <p style={{ color: "red", textAlign: "center" }}>Error loading profile</p>;

  return (
    <Card title="Profile" style={{ maxWidth: 500, margin: "50px auto" }}>
      <Title level={4} style={{ textAlign: "center" }}>User Information</Title>

      <Form layout="vertical">
        <Form.Item label="Email">
          <Input name="email" value={form.email} disabled />
        </Form.Item>

        <Form.Item label="Role">
          <Input name="role" value={form.role} disabled />
        </Form.Item>

        <Form.Item label="Name">
          <Input 
            placeholder="Enter your name" 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
          />
        </Form.Item>

        <Form.Item label="Phone">
          <Input 
            placeholder="Enter your phone number" 
            name="phone" 
            value={form.phone} 
            onChange={handleChange} 
          />
        </Form.Item>

        <Button type="primary" block loading={isUpdating} onClick={handleUpdateProfile}>
          {isUpdating ? "Updating..." : "Update Profile"}
        </Button>
      </Form>
    </Card>
  );
};

export default Profile;
