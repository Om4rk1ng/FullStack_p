import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen, toggle }) {
    const navigate = useNavigate();

const handleLogout = () => {
  // ✅ Clear all saved login data
  localStorage.clear();

  // ✅ Force navigation and block going back to Home
  navigate("/", { replace: true });

  // ✅ Optional: refresh app to reset Redux state (fixes all glitches)
  window.location.reload();
};

    return (
        <div
            className="bg-dark text-white"
            id="sidebar-wrapper"
            style={{
                height: '100vh',
                width: isOpen ? '250px' : '60px',
                transition: 'width 0.3s ease',
                position: 'relative',
                boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
            }}
        >
            <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary">
                <h5 className="mb-0" style={{
                    opacity: isOpen ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    whiteSpace: 'nowrap'
                }}>
                    Menu
                </h5>
                <button
                    onClick={toggle}
                    className="btn btn-sm btn-outline-light"
                    style={{ minWidth: '30px' }}
                >
                    {isOpen ? '←' : '→'}
                </button>
            </div>
            <ListGroup flush>
                <ListGroupItem
                    action
                    tag="button"
                    onClick={() => navigate('/home')}
                    className="bg-dark text-white border-secondary d-flex align-items-center"
                    style={{
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                >
                    <span style={{ fontSize: '1.2rem', minWidth: '30px' }}>🏠</span>
                    <span style={{
                        opacity: isOpen ? 1 : 0,
                        marginLeft: isOpen ? '10px' : '0',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap'
                    }}>
                        Home
                    </span>
                </ListGroupItem>
                <ListGroupItem
                    action
                    tag="button"
                    onClick={() => navigate('/history')}
                    className="bg-dark text-white border-secondary d-flex align-items-center"
                    style={{
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                >
                    <span style={{ fontSize: '1.2rem', minWidth: '30px' }}>📋</span>
                    <span style={{
                        opacity: isOpen ? 1 : 0,
                        marginLeft: isOpen ? '10px' : '0',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap'
                    }}>
                        History
                    </span>
                </ListGroupItem>
                <ListGroupItem
                    action
                    tag="button"
                    onClick={() => navigate('/aboutus')}
                    className="bg-dark text-white border-secondary d-flex align-items-center"
                    style={{
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                >
                    <span style={{ fontSize: '1.2rem', minWidth: '30px' }}>👤</span>
                    <span style={{
                        opacity: isOpen ? 1 : 0,
                        marginLeft: isOpen ? '10px' : '0',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap'
                    }}>
                        About
                    </span>
                </ListGroupItem>
                <ListGroupItem
                    action
                    tag="button"
                    onClick={handleLogout} // 👈 USE logout function instead of navigate
                    className="bg-dark text-white border-secondary d-flex align-items-center"
                    style={{
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                >
                    <span style={{ fontSize: '1.2rem', minWidth: '30px' }}>🚪</span>
                    <span style={{
                        opacity: isOpen ? 1 : 0,
                        marginLeft: isOpen ? '10px' : '0',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap'
                    }}>
                        Logout
                    </span>
                </ListGroupItem>

            </ListGroup>
        </div>
    );
}
