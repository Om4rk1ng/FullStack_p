import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import RegsterImage from "./images/purple.jpg";
import { RegisterDataThunk } from "../features/slice.js";
import "./Login.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(""); // 👈 NEW

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill in all required fields");
      return;
    }

    const newUserRegisterData = {
      _username: name,
      _email: email,
      _password: password,
      // backend will ignore _profileImage for now, but we store it locally
      _profileImage: profileImage,
    };

    try {
      const resultAction = await dispatch(RegisterDataThunk(newUserRegisterData));

      if (RegisterDataThunk.fulfilled.match(resultAction)) {
        // save profile image locally for now
        if (profileImage) {
          localStorage.setItem("profileImage", profileImage); // 👈 NEW
        }
        alert("Registration Successful\nYou have successfully registered!");
        navigate("/");
      } else {
        console.error("Registration failed:", resultAction.payload || resultAction.error);
        alert("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Unexpected error during registration:", err);
      alert("Unexpected error. Please try again.");
    }
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
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>

              {/* 👇 NEW: Profile Image URL field */}
              <FormGroup>
                <Label htmlFor="profileImage">Profile Image URL (optional)</Label>
                <Input
                  type="text"
                  id="profileImage"
                  placeholder="https://example.com/my-photo.jpg"
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                />
              </FormGroup>

              <Button type="submit" color="primary" block className="mb-3">
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
