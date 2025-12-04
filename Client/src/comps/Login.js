import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginImage from "./images/Cover.png";
import { useSelector } from "react-redux";
import { LoginThunk } from "../features/slice";
import { useDispatch } from "react-redux";

import "./Login.css"; // We'll add some custom CSS here

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // validation state
  const [errors, setErrors] = useState({});

  const messageSelector = useSelector((state) => state.TaskStore.msg);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // validation function
  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // run validation before dispatch
    if (!validate()) {
      return;
    }

    // Add login logic here
    const userLoginData = {
      _userLoginEmail: email,
      _userLoginPassword: password,
    };

    console.log(messageSelector);
    dispatch(LoginThunk(userLoginData));

    if (messageSelector == "Login successful") {
      navigate("/home");
    }
  };

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
                  invalid={!!errors.email}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
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
                  invalid={!!errors.password}
                />
                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </FormGroup>

              <Button color="primary" block className="mb-3">
                Login
              </Button>

              <span>{messageSelector}</span>

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
