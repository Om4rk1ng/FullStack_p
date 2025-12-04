import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginImage from "./images/Cover.png";
import RegsterImage from "./images/purple.jpg"
import "./Login.css";

export default function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Phone:", phone);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    // Save to localStorage
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);

    // Navigate to home
    navigate("/home");
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card shadow-lg rounded overflow-hidden row">

        {/* Left Image */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={RegsterImage}
            alt="Registration visual"
            className="img-fluid w-100 h-100"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </div>

        {/* Right Form */}
        <div className="col-md-6 p-5 bg-white d-flex flex-column justify-content-center">
          <div className="form-wrapper">
            <h2 className="text-center mb-4">Registration</h2>

            <Form onSubmit={handleSubmit}>

              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder=""
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  placeholder=""
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="phone">Phone Number</Label>
                <Input
                  type="text"
                  id="phone"
                  placeholder=""
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder=""
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormGroup>

              <Button color="primary" block className="mb-3">
                Register
              </Button>

              <div className="text-center">
                <span>Already have an account? </span>
                <a href="/" className="signup-link">
                  Login
                </a>
              </div>
            </Form>

          </div>
        </div>

      </div>
    </div>
  );
}
