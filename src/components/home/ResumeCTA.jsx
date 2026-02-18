import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Sparkles, ArrowRight, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { useJobs } from '../../context/JobContext';

const ResumeCTA = () => {
    const { user } = useJobs();

    return (
        <section style={{ padding: '2rem 4rem', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    borderRadius: '24px',
                    padding: '3rem 4rem',
                    background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #E0E7FF 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '3rem',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Decorative circles */}
                <div style={{
                    position: 'absolute', top: '-50px', right: '-50px',
                    width: '200px', height: '200px', borderRadius: '50%',
                    backgroundColor: 'rgba(59, 130, 246, 0.08)'
                }}></div>
                <div style={{
                    position: 'absolute', bottom: '-30px', left: '30%',
                    width: '120px', height: '120px', borderRadius: '50%',
                    backgroundColor: 'rgba(99, 102, 241, 0.06)'
                }}></div>

                <div style={{ flex: 1, zIndex: 1 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        padding: '0.4rem 1rem', borderRadius: '100px',
                        fontSize: '0.8rem', fontWeight: 600, color: '#2563EB',
                        marginBottom: '1rem'
                    }}>
                        <Sparkles size={14} /> Boost your chances
                    </div>

                    <h2 style={{
                        fontSize: '2rem', fontWeight: 800, color: '#111827',
                        marginBottom: '0.75rem', lineHeight: 1.2
                    }}>
                        Accelerate your job search<br />
                        <span style={{ color: '#2563EB' }}>with a standout profile</span>
                    </h2>

                    <p style={{ color: '#4B5563', fontSize: '1rem', marginBottom: '2rem', maxWidth: '480px', lineHeight: 1.6 }}>
                        Complete your profile, upload your resume, and let recruiters find you. Profiles with resumes get <strong>3x more interviews</strong>.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '0.85rem 2rem',
                                    backgroundColor: '#2563EB', color: 'white',
                                    border: 'none', borderRadius: '12px',
                                    fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer',
                                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
                                }}
                            >
                                <Upload size={18} /> {user ? 'Update Profile' : 'Build Your Profile'}
                            </motion.button>
                        </Link>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.85rem 2rem',
                                backgroundColor: 'white', color: '#2563EB',
                                border: '1px solid #BFDBFE', borderRadius: '12px',
                                fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer'
                            }}
                        >
                            <FileText size={18} /> Upload Resume
                        </motion.button>
                    </div>
                </div>

                {/* Stats side */}
                <div style={{
                    display: 'flex', flexDirection: 'column', gap: '1rem',
                    zIndex: 1
                }}>
                    {[
                        { value: '85%', label: 'of recruiters prefer profiles with resumes' },
                        { value: '3x', label: 'more interview calls with complete profiles' },
                        { value: '48 hrs', label: 'average time to first recruiter contact' }
                    ].map((stat, i) => (
                        <div key={i} style={{
                            backgroundColor: 'white', padding: '1.25rem 1.5rem',
                            borderRadius: '12px', width: '260px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            border: '1px solid #E5E7EB'
                        }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2563EB', marginBottom: '0.2rem' }}>{stat.value}</div>
                            <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default ResumeCTA;
