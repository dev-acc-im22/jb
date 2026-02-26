import { Briefcase, User, PlusCircle, LogOut, ChevronDown, ChevronUp, Building2, CircleUser, Crown, Settings, HelpCircle, BookOpen, ChevronRight, X, FileText, PenTool, Sparkles, CheckCircle, Search, Users, LayoutDashboard } from 'lucide-react';
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
    const [showResumeTools, setShowResumeTools] = useState(false);
    const [showJobs, setShowJobs] = useState(false);

    const employerPaths = ['/employers', '/for-employers', '/recruiter', '/search-resumes', '/post-job', '/pricing', '/recruiter-pricing', '/recruiter-services', '/candidates'];
    const searchParams = new URLSearchParams(location.search);
    const isEmployerMode = employerPaths.some(p => location.pathname.startsWith(p)) || user?.role === 'employer' || searchParams.get('role') === 'employer';

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
                <Link to={isEmployerMode ? '/for-employers' : '/'} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
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
                    {!isEmployerMode ? (
                        <>
                            {/* Job Seeker Menu */}
                            {/* Jobs Dropdown */}
                            <div
                                style={{ position: 'relative' }}
                                onMouseEnter={() => setShowJobs(true)}
                                onMouseLeave={() => setShowJobs(false)}
                            >
                                <button style={{
                                    color: showJobs ? '#2563EB' : 'var(--neutral-800)',
                                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    fontWeight: 600, fontSize: '0.95rem', fontFamily: 'inherit',
                                    padding: 0, transition: 'color 0.2s'
                                }}>
                                    Jobs
                                    {showJobs ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                                </button>

                                <AnimatePresence>
                                    {showJobs && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 8 }}
                                            transition={{ duration: 0.15 }}
                                            style={{
                                                position: 'absolute', top: '100%', left: 0,
                                                marginTop: '0.6rem', width: '520px',
                                                background: 'white', borderRadius: '16px',
                                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)',
                                                border: '1px solid #000',
                                                padding: '1.25rem', zIndex: 1002,
                                                display: 'flex', gap: '1.5rem',
                                                fontFamily: "'Montserrat', sans-serif"
                                            }}
                                        >
                                            <div style={{
                                                position: 'absolute', top: 0, left: '10%', right: '10%',
                                                height: '3px', borderRadius: '0 0 4px 4px',
                                                background: 'linear-gradient(90deg, #2563EB, #3B82F6, #60A5FA)'
                                            }} />
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                {[
                                                    'Work From Home Jobs', 'Part Time Jobs', 'Freshers Jobs',
                                                    'Jobs for women', 'Full Time Jobs', 'Night Shift Jobs'
                                                ].map((item, i) => (
                                                    <React.Fragment key={i}>
                                                        <a href="#" style={{ padding: '0.6rem 0.8rem', borderRadius: '100px', textDecoration: 'none', color: '#475569', fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.2s', display: 'block' }} onMouseOver={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#0F172A'; }} onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569'; }}>
                                                            {item}
                                                        </a>
                                                        {i < 5 && <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '0.1rem 0.5rem' }} />}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                            <div style={{ width: '1px', backgroundColor: '#E2E8F0' }} />
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                {[
                                                    'Jobs By City', 'Jobs By Department', 'Jobs By Company',
                                                    'Jobs By Qualification', 'Others'
                                                ].map((item, i) => (
                                                    <React.Fragment key={i}>
                                                        <a href="#" style={{ padding: '0.6rem 0.8rem', borderRadius: '100px', textDecoration: 'none', color: '#475569', fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} onMouseOver={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#0F172A'; }} onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569'; }}>
                                                            {item}
                                                            <ChevronRight size={14} color="#94A3B8" />
                                                        </a>
                                                        {i < 4 && <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '0.1rem 0.5rem' }} />}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Companies</Link>
                            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link>
                            <Link to="/" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                Online Degrees
                                <span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'white', background: 'linear-gradient(135deg, #2563EB, #3B82F6, #60A5FA)', padding: '0.1rem 0.6rem', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.5px', boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)' }}>New</span>
                            </Link>

                            {/* Resume Tools Dropdown */}
                            <div
                                style={{ position: 'relative' }}
                                onMouseEnter={() => setShowResumeTools(true)}
                                onMouseLeave={() => setShowResumeTools(false)}
                            >
                                <button style={{
                                    color: showResumeTools ? '#2563EB' : 'inherit',
                                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    fontWeight: 600, fontSize: '0.95rem', fontFamily: 'inherit',
                                    padding: 0, transition: 'color 0.2s'
                                }}>
                                    Resume Tools
                                    {showResumeTools ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                                </button>
                                <AnimatePresence>
                                    {showResumeTools && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 8 }}
                                            transition={{ duration: 0.15 }}
                                            style={{
                                                position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                                                marginTop: '0.6rem', width: '280px',
                                                background: 'white', borderRadius: '16px',
                                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)',
                                                border: '1px solid #000',
                                                padding: '0.5rem', zIndex: 1002,
                                                fontFamily: "'Montserrat', sans-serif"
                                            }}
                                        >
                                            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '3px', borderRadius: '0 0 4px 4px', background: 'linear-gradient(90deg, #2563EB, #3B82F6, #60A5FA)' }} />
                                            {[
                                                { title: 'AI Resume builder', path: '/resume-builder' },
                                                { title: 'AI Resume checker', path: '/resume-checker' },
                                                { title: 'AI Cover letter generator', path: '/cover-letter' },
                                                { title: 'Blog', path: '/blog' },
                                            ].map((item, i) => (
                                                <React.Fragment key={i}>
                                                    <Link to={item.path} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 1rem', borderRadius: '12px', textDecoration: 'none', transition: 'background 0.15s', color: 'inherit', whiteSpace: 'nowrap' }} onMouseOver={e => e.currentTarget.style.background = '#F9FAFB'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                                                        {i < 3 && <span style={{ fontSize: '0.6rem', fontWeight: 900, backgroundColor: '#EFF6FF', color: '#2563EB', padding: '0.15rem 0.6rem', borderRadius: '100px', letterSpacing: '0.5px', display: 'inline-flex', alignItems: 'center' }}>FREE</span>}
                                                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>{item.title}</span>
                                                    </Link>
                                                    {i < 3 && <div style={{ height: '1px', background: '#E2E8F0', margin: '0.2rem 0.75rem' }} />}
                                                </React.Fragment>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Employer Menu */}
                            {[
                                { to: '/search-resumes', icon: Search, label: 'Search Resumes', always: true },
                                { to: '/post-job', icon: PlusCircle, label: 'Post a Job', always: true },
                                { to: '/recruiter-dashboard', icon: LayoutDashboard, label: 'Recruiter Dashboard', always: false },
                                { to: '/candidates', icon: Users, label: 'Candidates', always: false },
                                { to: '/recruiter-services', icon: Briefcase, label: 'Services', always: false },
                                { to: '/recruiter-pricing', icon: Crown, label: 'Pricing', always: false },
                            ]
                                .filter(item => item.always || user)
                                .map((item, i) => {
                                    const isActive = location.pathname === item.to;
                                    return (
                                        <Link
                                            key={i}
                                            to={user ? item.to : `/login?role=employer&returnUrl=${item.to}`}
                                            style={{
                                                color: isActive ? 'white' : '#475569',
                                                textDecoration: 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.4rem',
                                                padding: '0.45rem 0.85rem',
                                                borderRadius: '100px',
                                                background: isActive
                                                    ? 'linear-gradient(135deg, #2563EB, #4F46E5, #7C3AED)'
                                                    : '#F1F5F9',
                                                border: isActive ? '1px solid transparent' : '1px solid #E2E8F0',
                                                transition: 'all 0.25s ease',
                                                fontSize: '0.85rem',
                                                fontWeight: isActive ? 700 : 600,
                                                boxShadow: isActive ? '0 2px 12px rgba(37,99,235,0.4)' : 'none'
                                            }}
                                            onMouseOver={e => {
                                                if (!isActive) {
                                                    e.currentTarget.style.backgroundColor = '#1E3A8A';
                                                    e.currentTarget.style.borderColor = '#1E3A8A';
                                                    e.currentTarget.style.color = 'white';
                                                }
                                            }}
                                            onMouseOut={e => {
                                                if (!isActive) {
                                                    e.currentTarget.style.backgroundColor = '#F1F5F9';
                                                    e.currentTarget.style.borderColor = '#E2E8F0';
                                                    e.currentTarget.style.color = '#475569';
                                                }
                                            }}
                                        >
                                            <item.icon size={14} /> {item.label}
                                        </Link>
                                    );
                                })}
                        </>
                    )}

                    {user && (() => {
                        const isSettingsActive = location.pathname === '/profile';
                        return (
                            <Link
                                to="/profile"
                                style={{
                                    color: isSettingsActive ? 'white' : '#475569',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    padding: '0.45rem 0.85rem',
                                    borderRadius: '100px',
                                    background: isSettingsActive
                                        ? 'linear-gradient(135deg, #2563EB, #4F46E5, #7C3AED)'
                                        : '#F1F5F9',
                                    border: isSettingsActive ? '1px solid transparent' : '1px solid #E2E8F0',
                                    transition: 'all 0.25s ease',
                                    fontSize: '0.85rem',
                                    fontWeight: isSettingsActive ? 700 : 600,
                                    boxShadow: isSettingsActive ? '0 2px 12px rgba(37,99,235,0.4)' : 'none'
                                }}
                                onMouseOver={e => {
                                    if (!isSettingsActive) {
                                        e.currentTarget.style.backgroundColor = '#1E3A8A';
                                        e.currentTarget.style.borderColor = '#1E3A8A';
                                        e.currentTarget.style.color = 'white';
                                    }
                                }}
                                onMouseOut={e => {
                                    if (!isSettingsActive) {
                                        e.currentTarget.style.backgroundColor = '#F1F5F9';
                                        e.currentTarget.style.borderColor = '#E2E8F0';
                                        e.currentTarget.style.color = '#475569';
                                    }
                                }}
                            >
                                <Settings size={14} /> Settings
                            </Link>
                        );
                    })()}
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
                                        backgroundColor: !isEmployerMode ? 'white' : 'transparent',
                                        color: !isEmployerMode ? 'var(--primary-600)' : 'var(--neutral-500)',
                                        fontWeight: 600,
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        boxShadow: !isEmployerMode ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Job Seeker
                                </button>
                            </Link>
                            <Link to="/for-employers" style={{ textDecoration: 'none' }}>
                                <button
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '100px',
                                        border: 'none',
                                        backgroundColor: isEmployerMode ? 'white' : 'transparent',
                                        color: isEmployerMode ? 'var(--primary-600)' : 'var(--neutral-500)',
                                        fontWeight: 600,
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        boxShadow: isEmployerMode ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
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
