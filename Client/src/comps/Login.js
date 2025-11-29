import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginImage from "./images/Cover.png";
import "./Login.css"; // We'll add some custom CSS here

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Add login logic here
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
