import React, { useState } from 'react';
import { Input, Nav, NavItem, NavLink, Card, CardBody, Row, Col } from 'reactstrap';
import Sidebar from './Sidebar';
import './History.css';

const History = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Sample data - replace with actual data from your backend/state
    const tasks = [
        {
            id: 1,
            title: 'Assignment FullStack',
            description: 'A full-stack web application that integrates a responsive front-end with a secure back-end and database. It allows users to register, log in, and manage data through a smooth and interactive interface using modern web technologies.',
            status: 'pending',
            image: '/api/placeholder/100/100'
        },
        {
            id: 2,
            title: 'Homework',
            description: 'A full-stack web application that integrates a responsive front-end with a secure back-end and database. It allows users to register, log in, and manage data through a smooth and interactive interface using modern web technologies.',
            status: 'pending',
            image: '/api/placeholder/100/100'
        },
        {
            id: 3,
            title: 'Assignment FullStack',
            description: 'A full-stack web application that integrates a responsive front-end with a secure back-end and database. It allows users to register, log in, and manage data through a smooth and interactive interface using modern web technologies.',
            status: 'completed',
            image: '/api/placeholder/100/100'
        }
    ];

    // Filter tasks based on active tab and search query
    const filteredTasks = tasks.filter(task => {
        const matchesTab = task.status === activeTab;
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase());
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
                                <Col md={6} lg={4} key={task.id} className="mb-4">
                                    <Card className={`task-card ${task.status}`}>
                                        <CardBody>
                                            <div className="task-card-content">
                                                <img src={task.image} alt={task.title} className="task-image" />
                                                <div className="task-details">
                                                    <h5 className="task-title">{task.title}</h5>
                                                    <p className="task-description">{task.description}</p>
                                                </div>
                                            </div>
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
