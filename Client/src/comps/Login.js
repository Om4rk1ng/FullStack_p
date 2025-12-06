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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // safe selector so it never crashes
  const {
    msg: messageSelector = "",
    usersActive: loginStatus = false,
    currentUser,
  } = useSelector((state) => state.TaskStore || {});



  const handleSubmit = (e) => {
    e.preventDefault();

    // simple client-side validation
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const userLoginData = {
      _userLoginEmail: email,
      _userLoginPassword: password,
    };

    dispatch(LoginThunk(userLoginData));
  };

  useEffect(() => {
  if (loginStatus && currentUser) {
    if (currentUser.name) {
      localStorage.setItem("name", currentUser.name);
    }
    if (currentUser.profileImage) {
      localStorage.setItem("profileImage", currentUser.profileImage);
    }
    navigate("/home");
  }
}, [loginStatus, currentUser, navigate]);



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

              <div className="text-right mb-3">
                <a
                  href="/forgotpass"
                  style={{
                    fontSize: "0.9rem",
                    color: "#667eea",
                    textDecoration: "none",
                    cursor: "pointer"
                  }}
                >
                  Forgot Password?
                </a>
              </div>

              <Button color="primary" block className="mb-3">
                Login
              </Button>

              {/* Backend validation message */}
              <span style={{ color: "red" }}>{messageSelector}</span>

              <div className="text-center">
                <span>Don't have an account? </span>
                <a href="/register" className="signup-link">
                  Sign up
                </a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
