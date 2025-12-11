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
  const [profileImage, setProfileImage] = useState("");

  const [gender, setGender] = useState("");              
  const [specialization, setSpecialization] = useState(""); 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill in all required fields");
      return;
    }

    if (!gender) {
      alert("Please select your gender");
      return;
    }

    if (!specialization) {
      alert("Please select your specialization");
      return;
    }

    const newUserRegisterData = {
      _username: name,
      _email: email,
      _password: password,
      _profileImage: profileImage,
      _gender: gender,                     
      _specialization: specialization,     
    };

    try {
      const resultAction = await dispatch(RegisterDataThunk(newUserRegisterData));

      if (RegisterDataThunk.fulfilled.match(resultAction)) {
        if (profileImage) {
          localStorage.setItem("profileImage", profileImage);
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
              {/* Name */}
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

              {/* Email */}
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

              {/* Password */}
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

              {/* Profile Image URL */}
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

              {/* Gender (Radio) */}
              <FormGroup tag="fieldset" className="mt-3">
                <Label>Gender</Label>
                <div className="d-flex gap-3 mt-1">
                  <FormGroup check>
                    <Input
                      type="radio"
                      name="gender"
                      id="genderMale"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <Label check htmlFor="genderMale">
                      Male
                    </Label>
                  </FormGroup>

                  <FormGroup check>
                    <Input
                      type="radio"
                      name="gender"
                      id="genderFemale"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <Label check htmlFor="genderFemale">
                      Female
                    </Label>
                  </FormGroup>
                </div>
              </FormGroup>

              {/* Specialization (Dropdown) */}
              <FormGroup className="mt-3">
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  type="select"
                  id="specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                >
                  <option value="">Select specialization</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="Networking">Networking</option>
                  <option value="Data Science and AI">Data Science and AI</option>
                </Input>
              </FormGroup>

              <Button type="submit" color="primary" block className="mb-3 mt-3">
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
