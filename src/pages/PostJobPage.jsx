import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import PostJobForm from '../components/employer/PostJobForm';
import Button from '../components/ui/Button';

const PostJobPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { jobs } = useJobs();
    const [isSuccess, setIsSuccess] = useState(false);

    const jobToEdit = id ? jobs.find(job => job.id === parseInt(id) || job.id === id) : null;
    const isEdit = !!jobToEdit;

    const handleSuccess = () => {
        setIsSuccess(true);
        setTimeout(() => {
            navigate('/recruiter-dashboard');
        }, 2500);
    };

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
                                {isEdit ? 'Edit Job Posting' : 'Post a New Job'}
                            </h1>
                            <p style={{ color: '#64748B', fontSize: '1rem', margin: 0 }}>
                                {isEdit ? 'Update the details for your open position.' : 'Create a detailed listing to attract the best talent for your team.'}
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
                        marginBottom: '1.5rem',
                        overflow: 'hidden'
                    }}
                >
                    <AnimatePresence mode="wait">
                        {!isSuccess ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <PostJobForm onSuccess={handleSuccess} initialData={jobToEdit} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
                                style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center'
                                }}
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                                    style={{
                                        width: '80px', height: '80px', borderRadius: '50%',
                                        backgroundColor: '#ECFDF5', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        marginBottom: '1.5rem'
                                    }}
                                >
                                    <CheckCircle size={40} color="#10B981" />
                                </motion.div>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem 0' }}>
                                    {isEdit ? 'Job Updated Successfully!' : 'Job Posted Successfully!'}
                                </h2>
                                <p style={{ color: '#64748B', fontSize: '1rem', maxWidth: '400px', margin: '0 0 2.5rem 0' }}>
                                    {isEdit ? 'Your modifications are now live and visible to candidates.' : 'Your listing is now live and visible to candidates.'}
                                </p>
                                <div style={{ fontSize: '0.9rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}>
                                    <div style={{
                                        width: '18px', height: '18px', borderRadius: '50%',
                                        border: '2px solid #E2E8F0', borderTopColor: '#2563EB',
                                        animation: 'spin 1s linear infinite'
                                    }} />
                                    Redirecting to dashboard...
                                </div>
                                <style>
                                    {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
                                </style>
                            </motion.div>
                        )}
                    </AnimatePresence>
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
