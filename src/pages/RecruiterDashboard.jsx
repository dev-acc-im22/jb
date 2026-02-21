import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Building2, MapPin, Globe, Briefcase } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import JobCard from '../components/job/JobCard';
import Button from '../components/ui/Button';

const RecruiterDashboard = ({ onPostJob }) => {
    const { jobs, user } = useJobs();

    // In a real app, this would filter by employer ID.
    // Here we filter by company name, defaulting to empty if user is not set up.
    const companyJobs = jobs.filter(job => job.company === user?.companyName);

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F8FAFC',
            paddingTop: '100px', // Below navbar
            paddingBottom: '4rem',
            fontFamily: "'Montserrat', sans-serif"
        }}>
            <div className="container">
                {/* Dashboard Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #E2E8F0',
                        marginBottom: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                border: '1px solid #E2E8F0',
                                backgroundColor: '#F1F5F9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {user?.companyLogo ? (
                                    <img src={user.companyLogo} alt={user?.companyName || 'Company'} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                ) : (
                                    <Building2 size={32} color="#94A3B8" />
                                )}
                            </div>
                            <div>
                                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
                                    {user?.companyName || 'Your Company'}
                                </h1>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748B', fontSize: '0.95rem' }}>
                                    {user?.name && (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            <Briefcase size={16} /> Recruiter: {user.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={onPostJob}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '12px',
                                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
                            }}
                        >
                            <PlusCircle size={18} />
                            Create New Job Post
                        </Button>
                    </div>

                    <div style={{ display: 'flex', gap: '2rem', padding: '1rem 0', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', marginTop: '0.5rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#0F172A' }}>{companyJobs.length}</div>
                            <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Live Jobs</div>
                        </div>
                        <div style={{ width: '1px', backgroundColor: '#E2E8F0' }} />
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#2563EB' }}>{companyJobs.reduce((acc, job) => acc + (job.applicants || 0), 0)}</div>
                            <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Applicants</div>
                        </div>
                    </div>
                </motion.div>

                {/* Job Listings Area */}
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1.5rem' }}>Active Postings</h2>

                    {companyJobs.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '24px',
                                padding: '4rem 2rem',
                                textAlign: 'center',
                                border: '1px dashed #CBD5E1',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                        >
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                backgroundColor: '#EFF6FF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#3B82F6',
                                marginBottom: '0.5rem'
                            }}>
                                <Briefcase size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#334155' }}>No current jobs posted</h3>
                            <p style={{ color: '#64748B', maxWidth: '400px', margin: '0 auto', fontSize: '0.95rem' }}>
                                You haven't posted any jobs yet. Create your first job listing to start attracting top talent.
                            </p>
                            <Button
                                onClick={onPostJob}
                                variant="outline"
                                style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.5rem' }}
                            >
                                <PlusCircle size={18} />
                                Post a Job
                            </Button>
                        </motion.div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {companyJobs.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <JobCard job={job} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecruiterDashboard;
