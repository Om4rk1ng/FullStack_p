import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // Get user from Redux if available
  const { currentUser } = useSelector((state) => state.TaskStore || {});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Prefer Redux if logged in this session
    if (currentUser) {
      if (currentUser.name) setName(currentUser.name);
      if (currentUser.email) setEmail(currentUser.email);
      if (currentUser.profileImage) setProfileImage(currentUser.profileImage);
    }

    // Fallback to localStorage for hard refresh
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
  }, [currentUser, name, email, profileImage]);

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #ffffffff 0%, #fafafaff 100%)" }}>
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
              View your account information and personal details.
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
              <CardBody className="text-center p-4">
                {/* Profile Image */}
                <div style={{ marginBottom: "20px" }}>
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

                {/* Name */}
                <h3
                  style={{
                    fontWeight: "bold",
                    marginBottom: "5px",
                    color: "#000",
                  }}
                >
                  {name || "Guest User"}
                </h3>

                {/* Email */}
                <p
                  style={{
                    marginBottom: "20px",
                    color: "#6c757d",
                    fontSize: "0.95rem",
                  }}
                >
                  {email || "Email not available"}
                </p>

                <hr />

                {/* Info section - extend later if needed */}
                <div
                  style={{
                    textAlign: "left",
                    fontSize: "0.95rem",
                    color: "#555",
                    marginTop: "15px",
                  }}
                >
                  <p>
                    <strong>Display Name:</strong> {name || "Guest User"}
                  </p>
                  <p>
                    <strong>Status:</strong> Active
                  </p>
                </div>

                <div className="mt-4 d-flex justify-content-center gap-2">
                  <Button
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      padding: "8px 24px",
                      borderRadius: "25px",
                      fontWeight: "bold",
                    }}
                    onClick={() => navigate("/home")}
                  >
                    Back to Tasks
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
