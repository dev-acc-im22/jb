import React, { useState } from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import Button from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobContext';

const Register = () => {
    const [isEmployer, setIsEmployer] = useState(false);
    const navigate = useNavigate();
    const { login } = useJobs();

    const handleGoogleLogin = () => {
        // Mock Google Registration User Data
        const mockUser = {
            id: 'demo-user-123',
            name: 'New User',
            email: 'new.user@example.com',
            role: isEmployer ? 'employer' : 'job_seeker',
            profileImage: `https://ui-avatars.com/api/?name=New+User&background=0D8ABC&color=fff`,
            isNewUser: true
        };

        login(mockUser);

        if (mockUser.role === 'employer') {
            navigate('/recruiter-profile');
        } else {
            navigate('/register-profile');
        }
    };

    return (
        <AuthLayout
            title={`Sign Up as ${isEmployer ? 'Employer' : 'Job Seeker'}`}
            subtitle="Create an account to get started."
        >
            {/* Toggle */}
            <div style={{
                display: 'flex',
                backgroundColor: 'var(--neutral-100)',
                padding: '0.3rem',
                borderRadius: '100px',
                marginBottom: '2rem'
            }}>
                <button
                    onClick={() => setIsEmployer(false)}
                    style={{
                        flex: 1,
                        padding: '0.6rem',
                        borderRadius: '100px',
                        backgroundColor: !isEmployer ? 'white' : 'transparent',
                        color: !isEmployer ? 'var(--primary-600)' : 'var(--neutral-500)',
                        fontWeight: 600,
                        boxShadow: !isEmployer ? '0 2px 5px rgba(0,0,0,0.05)' : 'none',
                        transition: 'all 0.2s'
                    }}
                >
                    Job Seeker
                </button>
                <button
                    onClick={() => setIsEmployer(true)}
                    style={{
                        flex: 1,
                        padding: '0.6rem',
                        borderRadius: '100px',
                        backgroundColor: isEmployer ? 'white' : 'transparent',
                        color: isEmployer ? 'var(--primary-600)' : 'var(--neutral-500)',
                        fontWeight: 600,
                        boxShadow: isEmployer ? '0 2px 5px rgba(0,0,0,0.05)' : 'none',
                        transition: 'all 0.2s'
                    }}
                >
                    Employer
                </button>
            </div>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--neutral-700)' }}>Full Name</label>
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--neutral-300)',
                            outline: 'none',
                            fontFamily: 'Montserrat, sans-serif'
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--neutral-700)' }}>Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--neutral-300)',
                            outline: 'none',
                            fontFamily: 'Montserrat, sans-serif'
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--neutral-700)' }}>Password</label>
                    <input
                        type="password"
                        placeholder="Create a password"
                        style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--neutral-300)',
                            outline: 'none',
                            fontFamily: 'Montserrat, sans-serif'
                        }}
                    />
                </div>

                <Button variant="primary" style={{ marginTop: '0.5rem' }}>
                    Create Account
                </Button>

                <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--neutral-200)' }} />
                    <span style={{ padding: '0 1rem', color: 'var(--neutral-400)', fontSize: '0.9rem' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--neutral-200)' }} />
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        padding: '0.8rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--neutral-300)',
                        backgroundColor: 'white',
                        fontWeight: 600,
                        color: 'var(--neutral-700)',
                        transition: 'var(--transition-fast)',
                        cursor: 'pointer'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--neutral-50)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: '20px' }} />
                    Continue with Google
                </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--neutral-600)' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--primary-600)', fontWeight: 700 }}>Login</Link>
            </div>
        </AuthLayout>
    );
};

export default Register;
