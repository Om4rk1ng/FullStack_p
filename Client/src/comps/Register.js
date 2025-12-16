import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import RegsterImage from "./images/purple.jpg";
import { RegisterDataThunk } from "../features/slice.js";
import "./Login.css";
import * as Yup from "yup";

// yup validation
const registerSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string().trim().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  gender: Yup.string().required("Please select your gender"),
  specialization: Yup.string().required("Please select your specialization"),
});

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");

  const [serverMessage, setServerMessage] = useState("");

  // field errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    specialization: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage("");

    // clear old errors
    setErrors({
      name: "",
      email: "",
      password: "",
      gender: "",
      specialization: "",
    });

    // ✅ Validate all fields and collect all errors
    try {
      await registerSchema.validate(
        { name, email, password, gender, specialization },
        { abortEarly: false } // <-- important for per-field errors
      );
    } catch (err) {
      const fieldErrors = {
        name: "",
        email: "",
        password: "",
        gender: "",
        specialization: "",
      };

      err.inner?.forEach((e) => {
        if (e.path) fieldErrors[e.path] = e.message;
      });

      setErrors(fieldErrors);
      return;
    }

    const newUserRegisterData = {
      _username: name,
      _email: email,
      _password: password,
      _profileImage: profileImage, // still allowed, just not validated
      _gender: gender,
      _specialization: specialization,
    };

    try {
      const resultAction = await dispatch(RegisterDataThunk(newUserRegisterData));

      if (RegisterDataThunk.fulfilled.match(resultAction)) {
        const data = resultAction.payload;

        if (data?.status) {
          if (profileImage) localStorage.setItem("profileImage", profileImage);
          alert("Registration Successful\nYou have successfully registered!");
          navigate("/");
        } else {
          setServerMessage(data?.message || "Registration failed. Please try again.");
        }
      } else {
        setServerMessage("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Unexpected error during registration:", err);
      setServerMessage("Unexpected error. Please try again.");
    }
  };

  const errorStyle = { color: "red", fontSize: "0.85rem", marginTop: "5px" };

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

            {/* Backend message (e.g. User already exists) */}
            {serverMessage && (
              <p style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
                {serverMessage}
              </p>
            )}

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <div style={errorStyle}>{errors.name}</div>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div style={errorStyle}>{errors.email}</div>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div style={errorStyle}>{errors.password}</div>}
              </FormGroup>

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
                    <Label check htmlFor="genderMale">Male</Label>
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
                    <Label check htmlFor="genderFemale">Female</Label>
                  </FormGroup>
                </div>
                {errors.gender && <div style={errorStyle}>{errors.gender}</div>}
              </FormGroup>

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
                {errors.specialization && (
                  <div style={errorStyle}>{errors.specialization}</div>
                )}
              </FormGroup>

              <Button type="submit" color="primary" block className="mb-3 mt-3">
                Register
              </Button>

              <div className="text-center">
                <span>Already have an account? </span>
                <a href="/" className="signup-link">Login</a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
