import React, { useEffect, useState } from 'react';
import { Input, Nav, NavItem, NavLink, Card, CardBody, Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../features/taskSlice";
import Sidebar from './Sidebar';
import './History.css';

const History = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.items || []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Load tasks (in case user opens History directly)
    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    // Filter tasks based on active tab and search query
    const filteredTasks = tasks.filter((task) => {
        const status = task.status || "pending"; // default pending
        const matchesTab = status === activeTab;

        const title = (task.tasktitle || "").toLowerCase();
        const desc = (task.description || "").toLowerCase();
        const q = searchQuery.toLowerCase();
        const matchesSearch = title.includes(q) || desc.includes(q);

        return matchesTab && matchesSearch;
    });

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

            <div className="history-container" style={{
                flex: 1,
                transition: 'margin-left 0.3s ease'
            }}>
                {/* Header with History title and Search bar */}
                <div className="history-header">
                    <div className="history-title">
                        <svg width="28" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                            <path d="M12 7v5l4 2" />
                        </svg>
                        <h2>History</h2>
                    </div>
                    <div className="search-bar">
                        <Input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                    </div>
                </div>

                {/* Tab Navigation */}
                <Nav tabs className="history-tabs">
                    <NavItem>
                        <NavLink
                            className={activeTab === 'pending' ? 'active' : ''}
                            onClick={() => setActiveTab('pending')}
                        >
                            Pending
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={activeTab === 'completed' ? 'active' : ''}
                            onClick={() => setActiveTab('completed')}
                        >
                            Completed
                        </NavLink>
                    </NavItem>
                </Nav>

                {/* Content Area */}
                <div className="history-content">
                    <Row>
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map(task => (
                                <Col md={6} lg={4} key={task._id} className="mb-4">
                                    <Card className={`task-card ${task.status || 'pending'}`}>
                                        <CardBody>
                                            <div className="task-card-content">
                                                {/* Placeholder image since tasks don't have image field */}
                                                <img
                                                    src="/api/placeholder/100/100"
                                                    alt={task.tasktitle}
                                                    className="task-image"
                                                />
                                                <div className="task-details">
                                                    <h5 className="task-title">{task.tasktitle}</h5>
                                                    <p className="task-description">{task.description}</p>

                                                    {/* 👇 NEW: Due date line (same data as Home.js) */}
                                                    {task.duedate && (
                                                        <p className="task-date">
                                                            <strong>Due:</strong>{" "}
                                                            {new Date(task.duedate).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 👇 NEW: Map preview (same logic as Home.js), but kept below content to preserve layout */}
                                            {task.lat && task.lon && (
                                                <div style={{ marginTop: "10px" }}>
                                                    <iframe
                                                        title={`map-${task._id}`}
                                                        width="100%"
                                                        height="150"
                                                        loading="lazy"
                                                        style={{ borderRadius: "10px", border: 0 }}
                                                        src={`https://www.google.com/maps?q=${task.lat},${task.lon}&z=14&output=embed`}
                                                    ></iframe>
                                                </div>
                                            )}
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col className="text-center mt-5">
                                <p className="no-results">No {activeTab} tasks found</p>
                            </Col>
                        )}
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default History;
