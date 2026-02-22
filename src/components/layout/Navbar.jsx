import { Briefcase, User, PlusCircle, LogOut, ChevronDown, Building2, CircleUser, Crown, Settings, HelpCircle, BookOpen, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import Button from '../ui/Button';
import { useJobs } from '../../context/JobContext';

const Navbar = ({ onPostJob }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout, profileMetrics } = useJobs();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        setShowDropdown(false);
        navigate('/');
    };

    const menuItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        padding: '0.65rem 1rem',
        borderRadius: '12px',
        color: '#475569',
        fontWeight: 600,
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'all 0.2s'
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
                    <Link to="/" style={{ color: 'var(--neutral-800)', textDecoration: 'none' }}>Jobs</Link>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Companies</a>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Services</a>

                    {/* Items moved from Dropdown */}
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <BookOpen size={16} /> Blog
                    </a>
                    {user && (
                        <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Settings size={16} /> Settings
                        </Link>
                    )}
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <HelpCircle size={16} /> FAQs
                    </a>
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
                            <AnimatePresence>
                                {showDropdown && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            position: 'absolute',
                                            top: '120%',
                                            right: 0,
                                            width: '300px',
                                            backgroundColor: 'white',
                                            borderRadius: '20px',
                                            boxShadow: '0 10px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)',
                                            padding: '0',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            zIndex: 1001,
                                            overflow: 'hidden',
                                            fontFamily: "'Montserrat', sans-serif"
                                        }}
                                    >
                                        {/* Close Button (Mock for reference) */}
                                        <button
                                            onClick={() => setShowDropdown(false)}
                                            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
                                        >
                                            <X size={20} />
                                        </button>

                                        {/* Profile Header */}
                                        <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ position: 'relative', width: '48px', height: '48px' }}>
                                                {/* Progress Circle SVGs */}
                                                <svg style={{ position: 'absolute', top: -3, left: -3, width: '54px', height: '54px', transform: 'rotate(-90deg)' }}>
                                                    <circle cx="27" cy="27" r="25" fill="none" stroke="#F1F5F9" strokeWidth="2.5" />
                                                    <circle cx="27" cy="27" r="25" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="157" strokeDashoffset="149" strokeLinecap="round" />
                                                </svg>
                                                <div style={{
                                                    width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden',
                                                    backgroundColor: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}>
                                                    {user.profileImage ? (
                                                        <img src={user.profileImage} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    ) : (
                                                        <User size={24} color="var(--primary-600)" />
                                                    )}
                                                </div>
                                                <div style={{
                                                    position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
                                                    backgroundColor: 'white', padding: '1px 3px', borderRadius: '100px',
                                                    fontSize: '9px', fontWeight: 800, color: '#EF4444', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                }}>
                                                    5%
                                                </div>
                                            </div>
                                            <div>
                                                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>{user.name || 'User'}</h3>
                                                <p style={{ margin: '0.1rem 0 0.25rem 0', fontSize: '0.8rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                                                    {user.headline || 'Not Mentioned'}
                                                </p>
                                                <Link to="/profile" onClick={() => setShowDropdown(false)} style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563EB', textDecoration: 'none' }}>
                                                    View & Update Profile
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Upgrade Banner */}
                                        <div style={{ padding: '0 1rem 0.6rem' }}>
                                            <div style={{
                                                backgroundColor: '#FFF7ED', border: '1px solid #FFEDD5', borderRadius: '12px',
                                                padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                cursor: 'pointer'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                                        <Crown size={16} />
                                                    </div>
                                                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#92400E' }}>Upgrade to Board Pro</span>
                                                </div>
                                                <ChevronRight size={16} color="#92400E" />
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div style={{ height: '1px', backgroundColor: '#F1F5F9', margin: '0 1.5rem' }}></div>

                                        {/* Performance Section */}
                                        <div style={{ padding: '1rem 1rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                                                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>Your profile performance</h4>
                                                <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Last 90 days</span>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                                <div style={{ backgroundColor: '#F0F9FF', padding: '0.75rem 0.5rem', borderRadius: '12px', textAlign: 'center' }}>
                                                    <motion.div
                                                        key={`sa-${profileMetrics?.searchAppearances}`}
                                                        initial={{ scale: 1.2, color: '#3B82F6' }}
                                                        animate={{ scale: 1, color: '#0F172A' }}
                                                        transition={{ duration: 0.4 }}
                                                        style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.1rem', display: 'inline-block' }}
                                                    >
                                                        {profileMetrics?.searchAppearances || 0}
                                                    </motion.div>
                                                    <div style={{ fontSize: '0.7rem', color: '#64748B', marginBottom: '0.25rem' }}>Search Appearances</div>
                                                    <Link to="#" style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textDecoration: 'none' }}>View all</Link>
                                                </div>
                                                <div style={{ backgroundColor: '#F0F9FF', padding: '0.75rem 0.5rem', borderRadius: '12px', textAlign: 'center' }}>
                                                    <motion.div
                                                        key={`ra-${profileMetrics?.recruiterActions}`}
                                                        initial={{ scale: 1.2, color: '#3B82F6' }}
                                                        animate={{ scale: 1, color: '#0F172A' }}
                                                        transition={{ duration: 0.4 }}
                                                        style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.1rem', display: 'inline-block' }}
                                                    >
                                                        {profileMetrics?.recruiterActions || 0}
                                                    </motion.div>
                                                    <div style={{ fontSize: '0.7rem', color: '#64748B', marginBottom: '0.25rem' }}>Recruiter <br />Actions</div>
                                                    <Link to="#" style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, textDecoration: 'none' }}>View all</Link>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu List */}
                                        <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
                                            {/* Blog, Settings, and FAQs moved to main Navbar */}
                                            <button onClick={handleLogout} style={{ ...menuItemStyle, color: '#64748B', border: 'none', background: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
                                                <LogOut size={18} /> Logout
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}


                </div>
            </div>
        </nav>
    );
};

export default Navbar;
