import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useSendOtpMutation, useVerifyOtpMutation } from "../../../services/authApi";
import { Input, Button, Card, message, Row, Col, Typography } from "antd";
import { loginSuccess } from "../../../services/authSlice";

const { Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get("redirect"); // Get redirect URL from query params
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill("")); // OTP input array
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState("");

  const [sendOtp, { isLoading: sendingOtp }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: verifyingOtp }] = useVerifyOtpMutation();

  // Redirect after login
  useEffect(() => {
    if (token && user) {
      if (redirect) {
        navigate(redirect); // Redirect to the intended URL (e.g., /join-batch?code=RED-4947)
      } else {
        // Redirect to the respective dashboard based on role
        switch (user.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "trainer":
            navigate("/trainer/dashboard");
            break;
          case "student":
            navigate("/student/dashboard");
            break;
          default:
            navigate("/");
        }
      }
    }
  }, [token, user, navigate, redirect]);

  // OTP countdown timer
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // Send OTP
  const handleSendOtp = async () => {
    try {
      await sendOtp({ email: email }).unwrap();
      message.success("OTP sent to your email!");
      setOtpSent(true);
      setTimer(30); // Reset countdown
    } catch (err) {
      message.error(err?.data?.message || "Failed to send OTP");
    }
  };

  // Verify OTP and login
  const handleVerifyOtp = async () => {
    try {
      const otpString = otp.join(""); // Convert OTP array to string
      const response = await verifyOtp({ email: email, otp: otpString }).unwrap();

      // Dispatch user details & token to Redux store
      dispatch(loginSuccess({ user: response.user, token: response.token }));

      message.success("Login successful!");

      // Redirect immediately after login
      if (redirect) {
        navigate(redirect); // Redirect to the intended URL (e.g., /join-batch?code=RED-4947)
      } else {
        // Default redirection based on role
        switch (response.user.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "trainer":
            navigate("/trainer/dashboard");
            break;
          case "student":
            navigate("/student/dashboard");
            break;
          default:
            navigate("/");
        }
      }
    } catch (err) {
      setError(err?.data?.message || "Invalid OTP");
      message.error(err?.data?.message || "Invalid OTP");
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) document.getElementById(`otp-${index + 1}`).focus();
  };

  return (
    <Card title="Login / Signup" style={{ width: 400, margin: "50px auto", textAlign: "center" }}>
      <Input
        type="email"
        size="large"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={otpSent}
        style={{ marginBottom: 10 }}
      />
      {!otpSent ? (
        <Button type="primary" block onClick={handleSendOtp} loading={sendingOtp}>
          Send OTP
        </Button>
      ) : (
        <>
          <Row justify="center" gutter={8}>
            {otp.map((digit, index) => (
              <Col key={index}>
                <Input
                  id={`otp-${index}`}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  style={{
                    fontSize: "20px",
                    width: "40px",
                    height: "50px",
                    textAlign: "center",
                  }}
                  status={error ? "error" : ""}
                />
              </Col>
            ))}
          </Row>
          {error && <Text type="danger">{error}</Text>}
          {timer > 0 ? (
            <Text type="secondary">OTP expires in {timer}s</Text>
          ) : (
            <Button type="link" onClick={handleSendOtp} style={{ marginTop: 10 }}>
              Resend OTP
            </Button>
          )}
          <Button type="primary" block onClick={handleVerifyOtp} loading={verifyingOtp} style={{ marginTop: 10 }}>
            Verify OTP & Login
          </Button>
        </>
      )}
    </Card>
  );
};

export default Login;