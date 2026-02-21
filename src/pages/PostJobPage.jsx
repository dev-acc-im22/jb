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
            paddingTop: '100px', // Below navbar
            paddingBottom: '4rem',
            fontFamily: "'Montserrat', sans-serif"
        }}>
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>

                {/* Back Navigation */}
                <Button
                    variant="ghost"
                    onClick={() => navigate('/recruiter-dashboard')}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', padding: '0', marginBottom: '2rem' }}
                >
                    <ArrowLeft size={18} /> Back to Dashboard
                </Button>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)'
                    }}>
                        <Briefcase color="white" size={32} />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', letterSpacing: '-1px' }}>
                        Post a New Job
                    </h1>
                    <p style={{ color: '#64748B', fontSize: '1.1rem' }}>
                        Create a detailed listing to attract the best talent for your team.
                    </p>
                </div>

                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        padding: '3rem',
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
