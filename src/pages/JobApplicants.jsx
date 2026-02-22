import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, FileText, Mail, Phone, Briefcase, Calendar, X, Download, Eye } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import Button from '../components/ui/Button';

const JobApplicants = () => {
    const { id } = useParams();
    const { jobs, applications } = useJobs();
    const [selectedResume, setSelectedResume] = useState(null);

    const jobId = parseInt(id) || id;
    const job = jobs.find(j => j.id === jobId);
    const jobApplicants = applications.filter(app => app.jobId === jobId);

    if (!job) {
        return (
            <div style={{
                minHeight: '100vh', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', paddingTop: '100px',
                fontFamily: "'Montserrat', sans-serif"
            }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>Job not found</h2>
                <Link to="/recruiter-dashboard" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>← Back to Dashboard</Link>
            </div>
        );
    }

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div style={{
            minHeight: '100vh', backgroundColor: '#F8FAFC',
            paddingTop: '7.5rem', paddingBottom: '4rem',
            fontFamily: "'Montserrat', sans-serif"
        }}>
            <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
                    <Link to="/recruiter-dashboard" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '44px', height: '44px', borderRadius: '50%',
                        backgroundColor: 'white', border: '1px solid #E2E8F0',
                        color: '#64748B', transition: 'all 0.2s', textDecoration: 'none',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                    }} onMouseOver={e => { e.currentTarget.style.backgroundColor = '#F1F5F9'; e.currentTarget.style.color = '#0F172A'; }} onMouseOut={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#64748B'; }}>
                        <ArrowLeft size={20} />
                    </Link>
                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.5px' }}>
                            Applicants for {job.title}
                        </h1>
                        <p style={{ color: '#64748B', fontSize: '0.95rem', margin: '0.3rem 0 0 0' }}>
                            {jobApplicants.length} candidate{jobApplicants.length !== 1 ? 's' : ''} applied • {job.location} • {job.type}
                        </p>
                    </div>
                </div>

                {/* Applicant List */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {jobApplicants.length === 0 ? (
                        <div style={{
                            backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0',
                            padding: '4rem 2rem', textAlign: 'center'
                        }}>
                            <div style={{
                                width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#F1F5F9',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 1rem'
                            }}>
                                <Users size={28} color="#94A3B8" />
                            </div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#334155', margin: '0 0 0.5rem 0' }}>No applicants yet</h3>
                            <p style={{ fontSize: '0.9rem', color: '#64748B' }}>
                                Candidates who apply to this job will appear here.
                            </p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {jobApplicants.map((app, idx) => (
                                <motion.div
                                    key={app.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    style={{
                                        backgroundColor: 'white', borderRadius: '14px', border: '1px solid #E2E8F0',
                                        padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        boxShadow: '0 2px 6px rgba(0,0,0,0.02)', transition: 'box-shadow 0.2s'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)'}
                                    onMouseOut={e => e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.02)'}
                                >
                                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flex: 1 }}>
                                        {/* Avatar */}
                                        <div style={{
                                            width: '48px', height: '48px', borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                                            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '1.1rem', fontWeight: 700, flexShrink: 0
                                        }}>
                                            {(app.applicantName || 'A').charAt(0).toUpperCase()}
                                        </div>

                                        {/* Info */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                                                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                                                    {app.applicantName || 'Anonymous'}
                                                </h3>
                                                <span style={{
                                                    fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.5rem',
                                                    borderRadius: '100px', backgroundColor: app.status === 'new' ? '#DBEAFE' : '#ECFDF5',
                                                    color: app.status === 'new' ? '#1E40AF' : '#065F46', textTransform: 'uppercase', letterSpacing: '0.5px'
                                                }}>
                                                    {app.status || 'New'}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: '#64748B' }}>
                                                {app.applicantEmail && (
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                        <Mail size={12} /> {app.applicantEmail}
                                                    </span>
                                                )}
                                                {app.applicantPhone && (
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                        <Phone size={12} /> {app.applicantPhone}
                                                    </span>
                                                )}
                                                {app.applicantExperience && (
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                        <Briefcase size={12} /> {app.applicantExperience} yrs
                                                    </span>
                                                )}
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                    <Calendar size={12} /> {formatDate(app.appliedDate)}
                                                </span>
                                            </div>

                                            {/* Skills */}
                                            {app.applicantSkills && app.applicantSkills.length > 0 && (
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.6rem' }}>
                                                    {(Array.isArray(app.applicantSkills) ? app.applicantSkills : [app.applicantSkills]).slice(0, 5).map((skill, i) => (
                                                        <span key={i} style={{
                                                            padding: '0.2rem 0.6rem', fontSize: '0.7rem', fontWeight: 600,
                                                            backgroundColor: '#F1F5F9', color: '#475569', borderRadius: '100px'
                                                        }}>
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, marginLeft: '1rem' }}>
                                        {app.resumeData ? (
                                            <>
                                                <button
                                                    onClick={() => setSelectedResume(app)}
                                                    style={{
                                                        padding: '0.5rem 0.9rem', fontSize: '0.8rem', fontWeight: 600,
                                                        color: '#2563EB', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE',
                                                        borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    onMouseOver={e => { e.currentTarget.style.backgroundColor = '#DBEAFE'; }}
                                                    onMouseOut={e => { e.currentTarget.style.backgroundColor = '#EFF6FF'; }}
                                                >
                                                    <Eye size={14} /> View Resume
                                                </button>
                                                <a
                                                    href={app.resumeData}
                                                    download={app.resumeName || 'resume'}
                                                    style={{
                                                        padding: '0.5rem 0.9rem', fontSize: '0.8rem', fontWeight: 600,
                                                        color: '#475569', backgroundColor: 'white', border: '1px solid #E2E8F0',
                                                        borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem',
                                                        textDecoration: 'none', transition: 'all 0.2s'
                                                    }}
                                                    onMouseOver={e => { e.currentTarget.style.backgroundColor = '#F8FAFC'; }}
                                                    onMouseOut={e => { e.currentTarget.style.backgroundColor = 'white'; }}
                                                >
                                                    <Download size={14} /> Download
                                                </a>
                                            </>
                                        ) : (
                                            <span style={{
                                                padding: '0.5rem 0.9rem', fontSize: '0.8rem', fontWeight: 500,
                                                color: '#94A3B8', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0',
                                                borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.3rem'
                                            }}>
                                                <FileText size={14} /> No resume
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Resume Viewer Modal */}
            <AnimatePresence>
                {selectedResume && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '2rem'
                        }}
                        onClick={() => setSelectedResume(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            style={{
                                backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '900px',
                                maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                            }}
                        >
                            {/* Modal Header */}
                            <div style={{
                                padding: '1.25rem 1.5rem', borderBottom: '1px solid #E2E8F0',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                                        {selectedResume.applicantName}'s Resume
                                    </h3>
                                    <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0.2rem 0 0 0' }}>
                                        {selectedResume.resumeName}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <a
                                        href={selectedResume.resumeData}
                                        download={selectedResume.resumeName || 'resume'}
                                        style={{
                                            padding: '0.4rem 0.8rem', fontSize: '0.8rem', fontWeight: 600,
                                            color: '#2563EB', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE',
                                            borderRadius: '6px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem'
                                        }}
                                    >
                                        <Download size={14} /> Download
                                    </a>
                                    <button
                                        onClick={() => setSelectedResume(null)}
                                        style={{
                                            width: '36px', height: '36px', borderRadius: '50%',
                                            border: '1px solid #E2E8F0', backgroundColor: 'white',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            cursor: 'pointer', color: '#64748B', transition: 'all 0.2s'
                                        }}
                                        onMouseOver={e => { e.currentTarget.style.backgroundColor = '#F1F5F9'; }}
                                        onMouseOut={e => { e.currentTarget.style.backgroundColor = 'white'; }}
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body — iframe for PDF, fallback for others */}
                            <div style={{ flex: 1, overflow: 'auto', padding: '1rem', backgroundColor: '#F8FAFC' }}>
                                {selectedResume.resumeData.includes('application/pdf') ? (
                                    <iframe
                                        src={selectedResume.resumeData}
                                        style={{ width: '100%', height: '70vh', border: 'none', borderRadius: '8px' }}
                                        title="Resume Viewer"
                                    />
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
                                        <FileText size={48} color="#94A3B8" style={{ marginBottom: '1rem' }} />
                                        <p style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>
                                            Preview not available for this file type
                                        </p>
                                        <p style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                                            {selectedResume.resumeName} — Download to view the full document.
                                        </p>
                                        <a
                                            href={selectedResume.resumeData}
                                            download={selectedResume.resumeName || 'resume'}
                                            style={{
                                                padding: '0.6rem 1.5rem', fontSize: '0.9rem', fontWeight: 600,
                                                color: 'white', backgroundColor: '#2563EB', borderRadius: '8px',
                                                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                                            }}
                                        >
                                            <Download size={16} /> Download Resume
                                        </a>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default JobApplicants;
