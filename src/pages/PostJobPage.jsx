import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PostJobForm from '../components/employer/PostJobForm';
import Button from '../components/ui/Button';

const PostJobPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F8FAFC',
            paddingTop: '5rem',
            paddingBottom: '4rem',
            fontFamily: "'Montserrat', sans-serif"
        }}>
            <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

                {/* Compact Header Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/recruiter-dashboard')}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', padding: '0', alignSelf: 'flex-start' }}
                    >
                        <ArrowLeft size={18} /> Back to Dashboard
                    </Button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            flexShrink: 0,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)'
                        }}>
                            <Briefcase color="white" size={24} />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.2rem', letterSpacing: '-0.5px', marginTop: 0 }}>
                                Post a New Job
                            </h1>
                            <p style={{ color: '#64748B', fontSize: '0.95rem', margin: 0 }}>
                                Create a detailed listing to attract the best talent for your team.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        padding: '1.5rem 2.5rem',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.05)',
                        border: '1px solid #E2E8F0'
                    }}
                >
                    <PostJobForm onSuccess={() => navigate('/recruiter-dashboard')} />
                </motion.div>
            </div>
        </div>
    );
};

export default PostJobPage;
