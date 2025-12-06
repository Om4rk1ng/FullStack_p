import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Spinner,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginImage from "./images/Cover.png";
import "./Login.css";
import axios from "axios";

export default function ForgotPass() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email.trim()) {
      setErrorMsg("Please enter your email.");
      return;
    }

    if (!newPassword.trim() || !confirmPassword.trim()) {
      setErrorMsg("Please enter a new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:7500/reset-password", {
        email,
        newPassword,
      });

      if (res.data?.status) {
        setSuccessMsg("Password has been reset successfully!");

        setTimeout(() => navigate("/"), 1500);
      } else {
        setErrorMsg(res.data?.message || "Unable to reset password.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Server error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card shadow-lg rounded overflow-hidden row">

        {/* Left Image */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={LoginImage}
            alt="Forgot password"
            className="img-fluid w-100 h-100"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </div>

        {/* Right Side Form */}
        <div className="col-md-6 p-5 bg-white d-flex flex-column justify-content-center">
          <div className="form-wrapper">
            <h2 className="text-center mb-4">Reset Password</h2>

            {errorMsg && (
              <Alert color="danger" className="mb-3">
                {errorMsg}
              </Alert>
            )}

            {successMsg && (
              <Alert color="success" className="mb-3">
                {successMsg}
              </Alert>
            )}

            <Form onSubmit={handleReset}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="newPassword">New Password</Label>
                <Input
                  type="password"
                  id="newPassword"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="confirmPassword">Confirm New Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormGroup>

              <Button color="primary" block disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size="sm" /> Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>

              <div className="text-center mt-3">
                <a href="/" className="signup-link">Back to Login</a>
              </div>
            </Form>
          </div>
        </div>

      </div>
    </div>
  );
}
