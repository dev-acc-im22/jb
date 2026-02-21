import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';
import AuthLayout from '../components/layout/AuthLayout';
import Button from '../components/ui/Button';
import { useJobs } from '../context/JobContext';

const RegisterProfile = () => {
    const navigate = useNavigate();
    const { login } = useJobs();
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        workStatus: '', // 'experienced' or 'fresher'
        updatesEnabled: true
    });

    const handleRegister = (e) => {
        e.preventDefault();
        // In a real app, we'd save this to the backend
        // For now, we update the user session
        const updatedUser = {
            id: 'demo-user-123',
            name: formData.fullName || 'Test Job Seeker',
            email: 'alex.johnson@example.com',
            role: 'job_seeker',
            profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName || 'Test Job Seeker')}&background=0D8ABC&color=fff`,
            mobile: formData.mobileNumber,
            workStatus: formData.workStatus,
            isNewUser: false // Mark as no longer new
        };

        login(updatedUser);
        navigate('/');
    };

    return (
        <AuthLayout
            title="Create your professional profile"
            subtitle="Search & apply to jobs from India's preferred job board"
            maxWidth="800px"
        >
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Name and Mobile Group */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
                    {/* Full Name */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.95rem', fontWeight: 600, color: '#334155' }}>
                            Full name<span style={{ color: '#EF4444', marginLeft: '2px' }}>*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="What is your name?"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '1rem 1.25rem',
                                borderRadius: '20px',
                                border: '1px solid #E2E8F0',
                                outline: 'none',
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '1rem',
                                transition: 'all 0.2s',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                            }}
                        />
                    </div>

                    {/* Mobile Number */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.95rem', fontWeight: 600, color: '#334155' }}>
                            Mobile number<span style={{ color: '#EF4444', marginLeft: '2px' }}>*</span>
                        </label>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <span style={{
                                position: 'absolute',
                                left: '1.25rem',
                                color: '#64748B',
                                fontWeight: 500,
                                paddingRight: '0.75rem',
                                borderRight: '1px solid #E2E8F0'
                            }}>+91</span>
                            <input
                                type="tel"
                                required
                                pattern="[0-9]{10}"
                                placeholder="Enter your mobile number"
                                value={formData.mobileNumber}
                                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1.25rem 1rem 4rem',
                                    borderRadius: '20px',
                                    border: '1px solid #E2E8F0',
                                    outline: 'none',
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '1rem',
                                    transition: 'all 0.2s'
                                }}
                            />
                        </div>
                        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#64748B' }}>
                            Recruiters will contact you on this number
                        </p>
                    </div>
                </div>

                {/* Work Status */}
                <div>
                    <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.95rem', fontWeight: 600, color: '#334155' }}>
                        Work status<span style={{ color: '#EF4444', marginLeft: '2px' }}>*</span>
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormData({ ...formData, workStatus: 'experienced' })}
                            style={{
                                cursor: 'pointer',
                                padding: '1.25rem',
                                borderRadius: '16px',
                                border: `2px solid ${formData.workStatus === 'experienced' ? '#4F46E5' : '#E2E8F0'}`,
                                backgroundColor: formData.workStatus === 'experienced' ? '#F5F3FF' : 'white',
                                transition: 'all 0.2s',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Briefcase size={24} color={formData.workStatus === 'experienced' ? '#4F46E5' : '#64748B'} />
                                {formData.workStatus === 'experienced' && <CheckCircle2 size={20} color="#4F46E5" />}
                            </div>
                            <span style={{ fontWeight: 700, color: '#1E293B', fontSize: '0.95rem' }}>I'm experienced</span>
                            <span style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.4 }}>
                                I have work experience (excluding internships)
                            </span>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormData({ ...formData, workStatus: 'fresher' })}
                            style={{
                                cursor: 'pointer',
                                padding: '1.25rem',
                                borderRadius: '16px',
                                border: `2px solid ${formData.workStatus === 'fresher' ? '#4F46E5' : '#E2E8F0'}`,
                                backgroundColor: formData.workStatus === 'fresher' ? '#F5F3FF' : 'white',
                                transition: 'all 0.2s',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <GraduationCap size={24} color={formData.workStatus === 'fresher' ? '#4F46E5' : '#64748B'} />
                                {formData.workStatus === 'fresher' && <CheckCircle2 size={20} color="#4F46E5" />}
                            </div>
                            <span style={{ fontWeight: 700, color: '#1E293B', fontSize: '0.95rem' }}>I'm a fresher</span>
                            <span style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.4 }}>
                                I am a student/ Haven't worked after graduation
                            </span>
                        </motion.div>
                    </div>
                </div>

                {/* Updates */}
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <input
                        type="checkbox"
                        id="updates"
                        checked={formData.updatesEnabled}
                        onChange={(e) => setFormData({ ...formData, updatesEnabled: e.target.checked })}
                        style={{ marginTop: '0.2rem', cursor: 'pointer', width: '18px', height: '18px' }}
                    />
                    <label htmlFor="updates" style={{ fontSize: '0.85rem', color: '#64748B', cursor: 'pointer', lineHeight: 1.5 }}>
                        Send me important updates & promotions via SMS, email, and <strong>WhatsApp</strong>
                    </label>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <p style={{ fontSize: '0.8rem', color: '#94A3B8', textAlign: 'center', marginBottom: '1.5rem' }}>
                        By clicking Register, you agree to the <a href="#" style={{ color: '#2563EB', textDecoration: 'none' }}>Terms and Conditions</a> & <a href="#" style={{ color: '#2563EB', textDecoration: 'none' }}>Privacy Policy</a>
                    </p>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={!formData.fullName || !formData.mobileNumber || !formData.workStatus}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: '100px',
                            background: formData.fullName && formData.mobileNumber && formData.workStatus
                                ? 'linear-gradient(135deg, #4F46E5, #3730A3)'
                                : '#CBD5E1',
                            border: 'none',
                            fontSize: '1rem',
                            fontWeight: 700,
                            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)'
                        }}
                    >
                        Register now
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
};

export default RegisterProfile;
