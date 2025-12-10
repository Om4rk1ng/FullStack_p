import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginImage from "./images/Cover.png";
import { useSelector, useDispatch } from "react-redux";
import { LoginThunk } from "../features/slice";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const messageSelector = useSelector((state) => state.TaskStore.msg);
  const loginStatus = useSelector((state) => state.TaskStore.usersActive);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    const userLoginData = {
      _userLoginEmail: email,
      _userLoginPassword: password,
    };

    const resultAction = await dispatch(LoginThunk(userLoginData));

    if (LoginThunk.fulfilled.match(resultAction)) {
      const data = resultAction.payload;

      if (data?.status) {
        // ✅ SUPPORT BOTH BACKEND FORMATS
        const user = data.user || data;

        if (!user) {
          alert("Login succeeded but user data is missing.");
          return;
        }

        localStorage.setItem("userId", user._id || user.userId || "");
        localStorage.setItem("name", user.name || "");
        localStorage.setItem("email", user.email || "");
        localStorage.setItem("profileImage", user.profileImage || "");
        localStorage.setItem("gender", user.gender || "");
        localStorage.setItem("specialization", user.specialization || "");
      }
    }
  };



  useEffect(() => {
    if (loginStatus) {
      navigate("/home");
    }
  }, [loginStatus, navigate]);

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card shadow-lg rounded overflow-hidden row">
        {/* Left Image */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={LoginImage}
            alt="Login visual"
            className="img-fluid w-100 h-100"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </div>

        {/* Right Form */}
        <div className="col-md-6 p-5 bg-white d-flex flex-column justify-content-center">
          <div className="form-wrapper">
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  data-testid="login_emailBox"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>

              <Button color="primary" block className="mb-3">
                Login
              </Button>

              <span style={{ color: "red" }}>{messageSelector}</span>

              <div className="text-center mt-2">
                <span>Don't have an account? </span>
                <a href="/register" className="signup-link">
                  Sign up
                </a>
              </div>

              <div className="text-center mt-2">
                <a href="/reset-password" className="signup-link">
                  Forgot Password?
                </a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
