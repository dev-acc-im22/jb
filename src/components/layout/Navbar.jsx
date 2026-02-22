import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, User, PlusCircle, LogOut, ChevronDown, Building2, CircleUser } from 'lucide-react';
import Button from '../ui/Button';
import { useJobs } from '../../context/JobContext';

const Navbar = ({ onPostJob }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useJobs();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        setShowDropdown(false);
        navigate('/');
    };

    return (
        <nav className="glass-effect" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '80px',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 2rem'
        }}>
            <div style={{
                width: '100%',
                padding: '0 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {/* Logo */}
                <Link to={user?.role === 'employer' ? '/recruiter-dashboard' : '/'} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'var(--primary-600)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <Briefcase size={24} />
                    </div>
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: 'var(--primary-900)',
                        letterSpacing: '-0.5px'
                    }}>
                        Job<span style={{ color: 'var(--primary-500)' }}>Board</span>
                    </span>
                </Link>

                {/* Links */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2.5rem',
                    color: 'var(--neutral-600)',
                    fontWeight: 600,
                    fontSize: '0.95rem'
                }}>
                    <Link to="/" style={{ color: 'var(--neutral-800)' }}>Jobs</Link>
                    <a href="#">Companies</a>
                    <a href="#">Services</a>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {!user ? (
                        <div style={{
                            display: 'flex',
                            backgroundColor: 'var(--neutral-100)',
                            padding: '0.25rem',
                            borderRadius: '100px',
                            border: '1px solid var(--neutral-200)'
                        }}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <button
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '100px',
                                        border: 'none',
                                        backgroundColor: location.pathname !== '/employers' ? 'white' : 'transparent',
                                        color: location.pathname !== '/employers' ? 'var(--primary-600)' : 'var(--neutral-500)',
                                        fontWeight: 600,
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        boxShadow: location.pathname !== '/employers' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Job Seeker
                                </button>
                            </Link>
                            <Link to="/employers" style={{ textDecoration: 'none' }}>
                                <button
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '100px',
                                        border: 'none',
                                        backgroundColor: location.pathname === '/employers' ? 'white' : 'transparent',
                                        color: location.pathname === '/employers' ? 'var(--primary-600)' : 'var(--neutral-500)',
                                        fontWeight: 600,
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        boxShadow: location.pathname === '/employers' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Employer
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.8rem',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0.5rem',
                                    borderRadius: '100px',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--neutral-100)'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                {(!user.name || (user.name !== 'Incomplete Profile' && user.name !== 'Test Admin' && user.name !== 'Test Employer' && user.name !== 'Test Job Seeker')) && (
                                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--neutral-700)' }}>
                                        Hi, {user.name ? user.name.split(' ')[0] : 'User'}
                                    </span>
                                )}
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    backgroundColor: 'var(--primary-50)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--primary-600)',
                                    border: '1px solid var(--primary-100)'
                                }}>
                                    {user.profileImage ? (
                                        <img src={user.profileImage} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <User size={18} />
                                    )}
                                </div>
                                <ChevronDown size={16} color="var(--neutral-500)" />
                            </button>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <div style={{
                                    position: 'absolute',
                                    top: '120%',
                                    right: 0,
                                    width: '240px',
                                    backgroundColor: 'white',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    border: '1px solid var(--neutral-200)',
                                    padding: '0.5rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.2rem',
                                    zIndex: 1001
                                }}>
                                    <Link to={user.role === 'employer' ? '/recruiter-dashboard' : '/profile'} onClick={() => setShowDropdown(false)} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.8rem',
                                        padding: '0.8rem 1rem',
                                        borderRadius: '8px',
                                        color: 'var(--neutral-700)',
                                        fontWeight: 500,
                                        textDecoration: 'none',
                                        transition: 'background-color 0.2s',
                                        whiteSpace: 'nowrap'
                                    }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--neutral-50)'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        {user.role !== 'employer' && <User size={32} />}
                                        {user.role === 'employer' ? 'Recruiter Dashboard' : 'My Profile'}
                                    </Link>

                                    <div style={{ height: '1px', backgroundColor: 'var(--neutral-100)', margin: '0.2rem 0' }}></div>

                                    <button onClick={handleLogout} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.8rem',
                                        padding: '0.8rem 1rem',
                                        borderRadius: '8px',
                                        color: '#ef4444',
                                        fontWeight: 500,
                                        width: '100%',
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        fontSize: '0.9rem',
                                        transition: 'background-color 0.2s'
                                    }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <LogOut size={18} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}


                </div>
            </div>
        </nav>
    );
};

export default Navbar;
