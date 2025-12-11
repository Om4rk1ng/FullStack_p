import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
// at top
const API_URL = "https://fullstack-server-4doi.onrender.com";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.TaskStore || {});

  // Local state for editable fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // read-only
  const [profileImage, setProfileImage] = useState("");

  // NEW: gender + specialization (display only)
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");

  const [loading, setLoading] = useState(false);
  const [msgSuccess, setMsgSuccess] = useState("");
  const [msgError, setMsgError] = useState("");

  // We need userId for update/delete
  const [userId, setUserId] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Prefer Redux user if present
    if (currentUser) {
      if (currentUser.name) setName(currentUser.name);
      if (currentUser.email) setEmail(currentUser.email);
      if (currentUser.profileImage) setProfileImage(currentUser.profileImage);
      if (currentUser.userId) setUserId(currentUser.userId);
      if (currentUser.gender) setGender(currentUser.gender);
      if (currentUser.specialization) setSpecialization(currentUser.specialization);
    }

    // Fallback to localStorage for refresh
    if (!name) {
      const storedName = localStorage.getItem("name");
      if (storedName) setName(storedName);
    }

    if (!email) {
      const storedEmail = localStorage.getItem("email");
      if (storedEmail) setEmail(storedEmail);
    }

    if (!profileImage) {
      const storedProfileImage = localStorage.getItem("profileImage");
      if (storedProfileImage) setProfileImage(storedProfileImage);
    }

    if (!userId) {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) setUserId(storedUserId);
    }

    // NEW: gender + specialization from localStorage as fallback
    if (!gender) {
      const storedGender = localStorage.getItem("gender");
      if (storedGender) setGender(storedGender);
    }

    if (!specialization) {
      const storedSpec = localStorage.getItem("specialization");
      if (storedSpec) setSpecialization(storedSpec);
    }
  }, [currentUser, name, email, profileImage, userId, gender, specialization]);

  const clearMessages = () => {
    setMsgError("");
    setMsgSuccess("");
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!userId) {
      setMsgError("User ID not found. Please log in again.");
      return;
    }

    if (!name.trim()) {
      setMsgError("Name cannot be empty.");
      return;
    }

    try {
      setLoading(true);

      // 🔧 Match this with your backend route
      // UPDATE PROFILE
      const res = await axios.put(`${API_URL}/update-profile`, {
        userId,
        name,
        profileImage,
      });


      if (res.data?.status) {
        setMsgSuccess(res.data.message || "Profile updated successfully.");

        // Keep localStorage in sync
        localStorage.setItem("name", name);
        if (email) localStorage.setItem("email", email);
        if (profileImage) {
          localStorage.setItem("profileImage", profileImage);
        } else {
          localStorage.removeItem("profileImage");
        }
      } else {
        setMsgError(res.data?.message || "Could not update profile.");
      }
    } catch (err) {
      console.error(err);
      setMsgError("Server error while updating profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    clearMessages();

    if (!userId) {
      setMsgError("User ID not found. Please log in again.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      // 🔧 Match this with your backend route
      const res = await axios.delete(`${API_URL}/delete-account/${userId}`);

      if (res.data?.status) {
        // Clear client-side data
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("profileImage");
        localStorage.removeItem("userId");
        localStorage.removeItem("gender");
        localStorage.removeItem("specialization");

        // Redirect to login
        navigate("/");
      } else {
        setMsgError(res.data?.message || "Could not delete account.");
      }
    } catch (err) {
      console.error(err);
      setMsgError("Server error while deleting account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ffffffff 0%, #fafafaff 100%)",
      }}
    >
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

      <Container
        fluid
        className="p-5"
        style={{
          transition: "margin-left 0.3s ease",
          overflowY: "auto",
        }}
      >
        <Row className="mb-4">
          <Col>
            <h2
              style={{
                margin: 0,
                marginBottom: "10px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              Profile
            </h2>
            <p style={{ margin: 0, color: "#6c757d" }}>
              View and update your account information.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card
              style={{
                borderRadius: "20px",
                border: "none",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardBody className="p-4">
                {msgError && (
                  <Alert color="danger" className="mb-3">
                    {msgError}
                  </Alert>
                )}

                {msgSuccess && (
                  <Alert color="success" className="mb-3">
                    {msgSuccess}
                  </Alert>
                )}

                <div className="text-center mb-3">
                  <img
                    src={
                      profileImage ||
                      "https://via.placeholder.com/120x120.png?text=User"
                    }
                    alt={name || "Profile"}
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "3px solid #667eea",
                    }}
                  />
                </div>

                <Form onSubmit={handleUpdateProfile}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      disabled
                      style={{ backgroundColor: "#f5f5f5" }}
                    />
                    <small style={{ color: "#6c757d" }}>
                      Email cannot be changed.
                    </small>
                  </FormGroup>

                  <FormGroup>
                    <Label for="profileImage">Profile Image URL</Label>
                    <Input
                      type="text"
                      id="profileImage"
                      value={profileImage}
                      onChange={(e) => setProfileImage(e.target.value)}
                      placeholder="https://example.com/my-photo.jpg"
                    />
                    <small style={{ color: "#6c757d" }}>
                      Paste an image URL to change your avatar.
                    </small>
                  </FormGroup>

                  {/* NEW: Display gender */}
                  <FormGroup>
                    <Label>Gender</Label>
                    <Input
                      type="text"
                      value={gender || "Not specified"}
                      disabled
                      style={{ backgroundColor: "#f5f5f5" }}
                    />
                  </FormGroup>

                  {/* NEW: Display specialization */}
                  <FormGroup>
                    <Label>Specialization</Label>
                    <Input
                      type="text"
                      value={specialization || "Not specified"}
                      disabled
                      style={{ backgroundColor: "#f5f5f5" }}
                    />
                  </FormGroup>

                  <div className="d-flex justify-content-between mt-4">
                    <Button
                      type="submit"
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        padding: "8px 20px",
                        borderRadius: "25px",
                        fontWeight: "bold",
                        minWidth: "130px",
                      }}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Update Profile"}
                    </Button>

                    <Button
                      type="button"
                      color="danger"
                      style={{
                        borderRadius: "25px",
                        padding: "8px 20px",
                        minWidth: "130px",
                      }}
                      onClick={handleDeleteAccount}
                      disabled={loading}
                    >
                      Delete Account
                    </Button>
                  </div>

                  <div className="text-center mt-3">
                    <Button
                      type="button"
                      color="link"
                      onClick={() => navigate("/home")}
                      style={{ textDecoration: "none" }}
                    >
                      ← Back to Tasks
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
