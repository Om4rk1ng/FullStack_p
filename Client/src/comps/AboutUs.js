import React, { useState } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Sidebar from './Sidebar';
import './AboutUs.css';

const AboutUs = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const features = [
        {
            icon: (
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
            ),
            title: 'Add Task'
        },
        {
            icon: (
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
            ),
            title: 'Edit Task'
        },
        {
            icon: (
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
            ),
            title: 'Remove Task'
        },
        {
            icon: (
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                </svg>
            ),
            title: 'Scheduling'
        }
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

            <div className="aboutus-container" style={{
                flex: 1,
                transition: 'margin-left 0.3s ease'
            }}>
                {/* Header */}
                <div className="aboutus-header">
                    <svg width="28" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <h2>About us</h2>
                </div>

                {/* Main Content Card */}
                <Card className="aboutus-card">
                    <CardBody>
                        <div className="task-tracker-section">
                            <div className="section-title">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="16" x2="12" y2="12" stroke="white" strokeWidth="2" />
                                    <line x1="12" y1="8" x2="12.01" y2="8" stroke="white" strokeWidth="2" />
                                </svg>
                                <h3>Task Tracker?</h3>
                            </div>

                            <p className="description">
                                Task Tracker is a productivity app that helps users stay organized by managing their daily
                                tasks. Users can add new tasks to their dashboard, view all their ongoing and completed tasks,
                                and easily edit or delete them when needed. The system provides a simple and efficient way to
                                keep track of progress and stay on top of deadlines.
                            </p>

                            {/* Features Grid */}
                            <Row className="features-grid">
                                {features.map((feature, index) => (
                                    <Col md={6} key={index} className="mb-4">
                                        <div className="feature-item">
                                            <div className="feature-icon">
                                                {feature.icon}
                                            </div>
                                            <h4 className="feature-title">{feature.title}</h4>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AboutUs;
