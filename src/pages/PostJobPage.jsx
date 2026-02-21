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
            paddingTop: '7.5rem',
            paddingBottom: '4rem',
            fontFamily: "'Montserrat', sans-serif"
        }}>
            <div style={{ width: '100%', maxWidth: '1050px', margin: '0 auto', padding: '0 2rem' }}>

                {/* Header Area */}
                < div style={{ display: 'flex', flexDirection: 'column', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            flexShrink: 0,
                            borderRadius: '14px',
                            background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 20px rgba(37, 99, 235, 0.25)'
                        }}>
                            <Briefcase color="white" size={28} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.3rem', letterSpacing: '-0.5px', marginTop: 0, lineHeight: 1.1 }}>
                                Post a New Job
                            </h1>
                            <p style={{ color: '#64748B', fontSize: '1rem', margin: 0 }}>
                                Create a detailed listing to attract the best talent for your team.
                            </p>
                        </div>
                    </div>
                </div >

                {/* Form Container */}
                < motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '2rem 2.5rem',
                        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.05)',
                        border: '1px solid #E2E8F0',
                        marginBottom: '1.5rem'
                    }}
                >
                    <PostJobForm onSuccess={() => navigate('/recruiter-dashboard')} />
                </motion.div >

                {/* Bottom Navigation */}
                < div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/recruiter-dashboard')}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontWeight: 600 }}
                    >
                        <ArrowLeft size={18} /> Back to Dashboard
                    </Button>
                </div >
            </div >
        </div >
    );
};

export default PostJobPage;
