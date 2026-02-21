import React, { useState } from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import Button from '../components/ui/Button';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
    const [searchParams] = useSearchParams();
    const [isEmployer, setIsEmployer] = useState(searchParams.get('role') === 'employer');
    const navigate = useNavigate();
    const { login } = useJobs();

    const handleGoogleLogin = () => {
        // Mock Google Login User Data
        const mockUser = {
            id: 'demo-user-123',
            name: isEmployer ? 'Test Employer' : 'Test Job Seeker',
            email: 'alex.johnson@example.com',
            role: isEmployer ? 'employer' : 'job_seeker',
            profileImage: `https://ui-avatars.com/api/?name=${isEmployer ? 'Test+Employer' : 'Test+Job+Seeker'}&background=0D8ABC&color=fff`,
            isNewUser: true // Flag to indicate new user for redirection
        };

        login(mockUser);

        if (mockUser.role === 'employer') {
            navigate('/recruiter-dashboard');
        } else if (mockUser.isNewUser && mockUser.role === 'job_seeker') {
            navigate('/register-profile'); // Redirect to profile creation for new job seekers
        } else {
            navigate('/'); // Default redirect
        }
    };

    return (
        <AuthLayout
            title={`Login as ${isEmployer ? 'Employer' : 'Job Seeker'}`}
            subtitle="Welcome back! Please enter your details."
        >
            {/* Toggle */}
            {/* Toggle - Only show if no specific role is requested via URL */}
            {!searchParams.get('role') && (
                <div style={{
                    display: 'flex',
                    backgroundColor: '#F1F5F9',
                    padding: '0.35rem',
                    borderRadius: '12px',
                    marginBottom: '2.5rem',
                    border: '1px solid #E2E8F0'
                }}>
                    <button
                        onClick={() => setIsEmployer(false)}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: '10px',
                            backgroundColor: !isEmployer ? 'white' : 'transparent',
                            color: !isEmployer ? '#2563EB' : '#64748B',
                            fontWeight: 600,
                            boxShadow: !isEmployer ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Job Seeker
                    </button>
                    <button
                        onClick={() => setIsEmployer(true)}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: '10px',
                            backgroundColor: isEmployer ? 'white' : 'transparent',
                            color: isEmployer ? '#2563EB' : '#64748B',
                            fontWeight: 600,
                            boxShadow: isEmployer ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Employer
                    </button>
                </div>
            )}

            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <button type="button"
                    onClick={handleGoogleLogin}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        padding: '0.85rem',
                        borderRadius: '12px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: 'white',
                        fontWeight: 600,
                        color: '#475569',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                        fontSize: '0.95rem'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#F8FAFC';
                        e.currentTarget.style.borderColor = '#CBD5E1';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = '#E2E8F0';
                    }}
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: '20px' }} />
                    Continue with Google
                </button>

                <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
                    <span style={{ padding: '0 1rem', color: '#94A3B8', fontSize: '0.85rem', fontWeight: 500 }}>OR</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>Email Address</label>
                    <div style={{ position: 'relative' }}>
                        <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={18} />
                        <input
                            type="email"
                            placeholder="name@company.com"
                            style={{
                                width: '100%',
                                padding: '0.85rem 1rem 0.85rem 2.8rem',
                                borderRadius: '12px',
                                border: '1px solid #E2E8F0',
                                outline: 'none',
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '0.95rem',
                                backgroundColor: '#F8FAFC',
                                transition: 'all 0.2s'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#3B82F6';
                                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                                e.target.style.backgroundColor = 'white';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#E2E8F0';
                                e.target.style.boxShadow = 'none';
                                e.target.style.backgroundColor = '#F8FAFC';
                            }}
                        />
                    </div>
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>Password</label>
                    <div style={{ position: 'relative' }}>
                        <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={18} />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            style={{
                                width: '100%',
                                padding: '0.85rem 1rem 0.85rem 2.8rem',
                                borderRadius: '12px',
                                border: '1px solid #E2E8F0',
                                outline: 'none',
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '0.95rem',
                                backgroundColor: '#F8FAFC',
                                transition: 'all 0.2s'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#3B82F6';
                                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                                e.target.style.backgroundColor = 'white';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#E2E8F0';
                                e.target.style.boxShadow = 'none';
                                e.target.style.backgroundColor = '#F8FAFC';
                            }}
                        />
                    </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <a href="#" style={{ fontSize: '0.85rem', color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>Forgot Password?</a>
                </div>

                <Button
                    variant="primary"
                    style={{
                        marginTop: '0.5rem',
                        background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                        border: 'none',
                        padding: '0.9rem',
                        fontSize: '1rem',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                        width: '100%'
                    }}
                >
                    Login to Existing Account
                </Button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#64748B' }}>
                Don't have an account? <Link to="/register" style={{ color: '#2563EB', fontWeight: 700, textDecoration: 'none' }}>Sign up</Link>
            </div>
        </AuthLayout>
    );
};

export default Login;
