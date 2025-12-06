import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Input, Button, InputGroup, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask, deleteTask, updateTask } from "../features/taskSlice";
import Sidebar from './Sidebar';
import { useNavigate } from "react-router-dom";
export default function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tasks = useSelector((state) => state.tasks.items);

    const [modalOpen, setModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);

    // Logged-in user name (stored in localStorage by your auth flow)
    const [name, setName] = useState(localStorage.getItem("name") || "");
    const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || ""); // 👈 NEW

    // Form state
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');   // 👈 NEW


    useEffect(() => {
        const storedName = localStorage.getItem("name");
        if (storedName) setName(storedName);

        const storedProfileImage = localStorage.getItem("profileImage"); // 👈 NEW
        if (storedProfileImage) setProfileImage(storedProfileImage);

        dispatch(fetchTasks());
    }, [dispatch]);


    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
        if (modalOpen) {
            setTaskTitle('');
            setTaskDescription('');
            setStartDate('');
            setEndDate('');
            setLocation('');          // 👈 NEW
            setIsEditMode(false);
            setCurrentTaskId(null);
        }
    };

    const handlePublish = () => {
        if (!taskTitle || !taskDescription || !startDate || !endDate) {
            alert("Please fill all fields");
            return;
        }

        const taskData = {
            tasktitle: taskTitle,
            description: taskDescription,
            duedate: endDate, // using endDate as due date
            lon: location,    // 👈 store user-entered location here
            lat: ""           // still unused
        };


        if (isEditMode) {
            dispatch(updateTask({
                id: currentTaskId,
                data: taskData
            }));
        } else {
            dispatch(addTask(taskData));
        }

        toggleModal();
    };

    const handleEdit = (task) => {
        setIsEditMode(true);
        setCurrentTaskId(task._id);
        setTaskTitle(task.tasktitle);
        setTaskDescription(task.description);
        setStartDate(task.duedate);
        setEndDate(task.duedate);
        setLocation(task.lon || "");     // 👈 NEW
        toggleModal();
    };


    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            dispatch(deleteTask(id));
        }
    };

    const handleComplete = (task) => {
    const updatedData = {
        tasktitle: task.tasktitle,
        description: task.description,
        duedate: task.duedate,
        lon: task.lon,
        lat: task.lat,
        status: "completed"
    };

    dispatch(updateTask({
        id: task._id,
        data: updatedData
    }));
};


    // Filter tasks based on search query
    const filteredTasks = (tasks || []).filter(task =>
        (task.tasktitle || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="d-flex" id="wrapper" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffffffff 0%, #fafafaff 100%)' }}>
            <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
            <Container fluid className="p-5" style={{
                transition: 'margin-left 0.3s ease',
                overflowY: 'auto'
            }}>
                {/* Header Section */}
                <Row className="align-items-start mb-4">
                    <Col md={6}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "15px",
                                marginBottom: "10px",
                            }}
                        >
                            {profileImage && (
                                <img
                                    src={profileImage}
                                    alt={name || "Profile"}
                                    onClick={() => navigate("/profile")}  // 👈 navigate to Profile
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border: "2px solid #667eea",
                                        cursor: "pointer",                 // 👈 so user knows it's clickable
                                    }}
                                />
                            )}
                            <div>
                                <h2
                                    style={{
                                        margin: 0,
                                        marginBottom: "5px",
                                        fontWeight: "bold",
                                        color: "#000",
                                    }}
                                >
                                    Welcome {name}
                                </h2>
                                <h4
                                    style={{
                                        margin: 0,
                                        fontWeight: "600",
                                        color: "#000",
                                    }}
                                >
                                    My Tasks
                                </h4>
                            </div>
                        </div>
                    </Col>


                    <Col md={6} className="d-flex justify-content-end">
                        <div style={{
                            background: '#fff',
                            padding: '10px 20px',
                            borderRadius: '25px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            width: '300px'
                        }}>
                            <InputGroup style={{ border: 'none' }}>
                                <Input
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        border: 'none',
                                        background: 'transparent',
                                        fontSize: '14px',
                                        boxShadow: 'none'
                                    }}
                                />
                                <Button
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#999',
                                        padding: '0'
                                    }}
                                >
                                    🔍
                                </Button>
                            </InputGroup>

                        </div>
                    </Col>
                </Row>

                {/* Conditional Rendering: Empty State or Tasks */}
                {filteredTasks.length === 0 ? (
                    <Row className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                        <Col md={6} className="text-center">
                            <Card style={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                border: 'none',
                                borderRadius: '20px',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                                backdropFilter: 'blur(10px)',
                                padding: '40px'
                            }}>
                                <CardBody>
                                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📝</div>
                                    <h4 className="mb-4" style={{
                                        color: '#6c757d',
                                        fontWeight: '600'
                                    }}>
                                        {searchQuery ? 'No tasks found' : 'There are no assigned Tasks'}
                                    </h4>
                                    <p style={{ color: '#6c757d', marginBottom: '30px' }}>
                                        {searchQuery ? 'Try a different search term' : 'Get started by creating your first task'}
                                    </p>
                                    {!searchQuery && (
                                        <Button
                                            size="lg"
                                            onClick={toggleModal}
                                            style={{
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                border: 'none',
                                                padding: '12px 40px',
                                                borderRadius: '50px',
                                                fontWeight: 'bold',
                                                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'translateY(-2px)';
                                                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'translateY(0)';
                                                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                                            }}
                                        >
                                            + Create Task
                                        </Button>
                                    )}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                ) : (
                    <>
                        {/* Create Task Button */}
                        <Row className="mb-4">
                            <Col className="d-flex justify-content-end">
                                <Button
                                    onClick={toggleModal}
                                    style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        border: 'none',
                                        padding: '10px 30px',
                                        borderRadius: '50px',
                                        fontWeight: 'bold',
                                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                                    }}
                                >
                                    + Create Task
                                </Button>
                            </Col>
                        </Row>

                        {/* Tasks Grid */}
                        <Row>
                            {filteredTasks.map(task => (
                                <Col md={6} lg={4} key={task._id} className="mb-4">
                                    <Card style={{
                                        borderRadius: '15px',
                                        border: 'none',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        height: '100%'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-5px)';
                                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                                        }}
                                    >
                                        <CardBody>
                                            <h5 style={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                                                {task.tasktitle}
                                            </h5>
                                            <p style={{ color: '#6c757d', fontSize: '0.9rem', marginBottom: '15px' }}>
                                                {task.description}
                                            </p>
                                            <div style={{ fontSize: '0.85rem', color: '#999' }}>
                                                <div className="mb-1">
                                                    <strong>Start:</strong>{" "}
                                                    {task.duedate ? new Date(task.duedate).toLocaleDateString() : "—"}
                                                </div>

                                                <div className="mb-1">
                                                    <strong>End:</strong>{" "}
                                                    {task.duedate ? new Date(task.duedate).toLocaleDateString() : "—"}
                                                </div>

                                                {task.lon && (
                                                    <div className="mb-1">
                                                        <strong>Location:</strong> {task.lon}
                                                    </div>
                                                )}
                                            </div>

                                            <div style={{
                                                marginTop: '15px',
                                                padding: '5px 15px',
                                                background: (task.status || 'pending') === 'pending' ? '#fff3cd' : '#d4edda',
                                                color: (task.status || 'pending') === 'pending' ? '#856404' : '#155724',
                                                borderRadius: '20px',
                                                display: 'inline-block',
                                                fontSize: '0.8rem',
                                                fontWeight: 'bold'
                                            }}>
                                                {(task.status || 'pending').toUpperCase()}
                                            </div>

                                            {/* Action Buttons */}
                                            <div style={{
                                                marginTop: '15px',
                                                display: 'flex',
                                                gap: '10px',
                                                paddingTop: '15px',
                                                borderTop: '1px solid #e0e0e0'
                                            }}>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleEdit(task)}
                                                    style={{
                                                        background: '#667eea',
                                                        border: 'none',
                                                        borderRadius: '8px',
                                                        padding: '6px 15px',
                                                        fontSize: '0.85rem',
                                                        fontWeight: '600',
                                                        flex: 1
                                                    }}
                                                >
                                                    ✏️ Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleDelete(task._id)}
                                                    style={{
                                                        background: '#dc3545',
                                                        border: 'none',
                                                        borderRadius: '8px',
                                                        padding: '6px 15px',
                                                        fontSize: '0.85rem',
                                                        fontWeight: '600',
                                                        flex: 1
                                                    }}
                                                >
                                                    🗑️ Remove
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleComplete(task)}
                                                    style={{
                                                        background: '#28a745',
                                                        border: 'none',
                                                        borderRadius: '8px',
                                                        padding: '6px 15px',
                                                        fontSize: '0.85rem',
                                                        fontWeight: '600',
                                                        flex: 1
                                                    }}
                                                    disabled={task.status === "completed"}
                                                >
                                                    ✔️ Complete
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </>
                )}

                {/* Create/Edit Task Modal */}
                <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
                    <ModalHeader toggle={toggleModal}>
                        {isEditMode ? 'Edit Task' : 'Create New Task'}
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="taskTitle">Title</Label>
                                <Input
                                    type="text"
                                    id="taskTitle"
                                    placeholder="Enter task title"
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="taskDescription">Description</Label>
                                <Input
                                    type="textarea"
                                    id="taskDescription"
                                    placeholder="Enter task description"
                                    rows="4"
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="taskLocation">Location</Label>
                                <Input
                                    type="text"
                                    id="taskLocation"
                                    placeholder="Enter task location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </FormGroup>

                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="startDate">Start Date</Label>
                                        <Input
                                            type="date"
                                            id="startDate"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="endDate">End Date</Label>
                                        <Input
                                            type="date"
                                            id="endDate"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggleModal}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handlePublish}
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                                fontWeight: 'bold'
                            }}
                        >
                            {isEditMode ? 'Update' : 'Publish'}
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container>
        </div>
    );
}
