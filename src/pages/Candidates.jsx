import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Briefcase, ChevronDown, ChevronUp, MapPin, Clock, Search, Mail, Phone, FileText, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { useJobs } from '../context/JobContext';

const Candidates = () => {
    const { jobs, resumes, user } = useJobs();
    const [expandedJobId, setExpandedJobId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Use mock jobs or filter by the employer's company name if they have one
    const myJobs = React.useMemo(() => {
        let employerJobs = [];
        if (user?.companyName) {
            employerJobs = jobs.filter(job => job.company === user.companyName);
        }

        // Fallback to top 4 jobs if user has no specific company mock data
        if (employerJobs.length === 0) {
            employerJobs = jobs.slice(0, 4).map(job => ({ ...job, company: user?.companyName || 'Your Company' }));
        }

        // Add mock candidate counts to these jobs
        return employerJobs.map((job, index) => ({
            ...job,
            applicantsCount: (index * 3) + 2,
            mockCandidates: resumes.slice(0, (index * 3) + 2) // assign some resumes as candidates
        }));
    }, [jobs, user, resumes]);


    const filteredJobs = myJobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleJob = (id) => {
        setExpandedJobId(prev => (prev === id ? null : id));
    };

    return (
        <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: "'Montserrat', sans-serif", paddingBottom: '4rem' }}>

            {/* Header */}
            <div style={{ backgroundColor: 'white', borderBottom: '1px solid #E2E8F0', paddingTop: '6rem', paddingBottom: '2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <div style={{ padding: '0.5rem', background: '#EEF2FF', borderRadius: '10px' }}>
                                    <Users color="#4F46E5" size={20} />
                                </div>
                                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Candidate Pipeline</h1>
                            </div>
                            <p style={{ color: '#64748B', margin: 0, fontSize: '0.95rem' }}>
                                Review and contact applicants for your job postings.
                            </p>
                        </div>

                        <div style={{ position: 'relative', width: '300px' }}>
                            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={18} />
                            <input
                                type="text"
                                placeholder="Search postings..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem',
                                    borderRadius: '12px', border: '1px solid #E2E8F0',
                                    fontSize: '0.9rem', outline: 'none', fontFamily: "'Montserrat', sans-serif"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '2.5rem auto 0', padding: '0 2rem' }}>

                {filteredJobs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                        <Briefcase size={40} color="#CBD5E1" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ fontSize: '1.2rem', color: '#334155', fontWeight: 700, margin: '0 0 0.5rem 0' }}>No job postings found</h3>
                        <p style={{ color: '#64748B', margin: 0 }}>Try adjusting your search or post a new job to start receiving candidates.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {filteredJobs.map((job) => (
                            <div key={job.id} style={{
                                background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0',
                                overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
                            }}>

                                {/* Job Header Row (Clickable) */}
                                <div
                                    onClick={() => toggleJob(job.id)}
                                    style={{
                                        padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        cursor: 'pointer', backgroundColor: expandedJobId === job.id ? '#F8FAFC' : 'white',
                                        transition: 'background-color 0.2s', borderBottom: expandedJobId === job.id ? '1px solid #E2E8F0' : 'none'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                        <div style={{
                                            width: '48px', height: '48px', borderRadius: '12px',
                                            background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <Briefcase color="#4F46E5" size={20} />
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.25rem 0' }}>
                                                {job.title}
                                            </h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748B', fontSize: '0.85rem' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> {job.location}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> {job.posted}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563EB', lineHeight: 1 }}>{job.applicantsCount}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, marginTop: '0.2rem' }}>Candidates</div>
                                        </div>
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '50%', background: 'white', border: '1px solid #E2E8F0',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            {expandedJobId === job.id ? <ChevronUp size={18} color="#64748B" /> : <ChevronDown size={18} color="#64748B" />}
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Candidates List */}
                                <AnimatePresence>
                                    {expandedJobId === job.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            style={{ backgroundColor: '#F8FAFC' }}
                                        >
                                            <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1rem' }}>

                                                {job.mockCandidates.map((candidate, i) => (
                                                    <div key={i} style={{
                                                        background: 'white', borderRadius: '12px', padding: '1.25rem',
                                                        border: '1px solid #E2E8F0'
                                                    }}>
                                                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                                <img
                                                                    src={`https://ui-avatars.com/api/?name=${candidate.name.replace(' ', '+')}&background=0D8ABC&color=fff`}
                                                                    alt={candidate.name}
                                                                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                                                />
                                                                <div>
                                                                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.2rem 0' }}>{candidate.name}</h4>
                                                                    <div style={{ color: '#64748B', fontSize: '0.85rem' }}>{candidate.title}</div>
                                                                </div>
                                                            </div>
                                                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10B981', background: '#D1FAE5', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                                                New
                                                            </div>
                                                        </div>

                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                                            {candidate.skills.slice(0, 3).map((skill, idx) => (
                                                                <span key={idx} style={{
                                                                    fontSize: '0.75rem', background: '#F1F5F9', color: '#475569',
                                                                    padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 500
                                                                }}>
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                            {candidate.skills.length > 3 && (
                                                                <span style={{ fontSize: '0.75rem', color: '#94A3B8', padding: '0.2rem 0.5rem' }}>+{candidate.skills.length - 3}</span>
                                                            )}
                                                        </div>

                                                        <div style={{
                                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                            borderTop: '1px solid #F1F5F9', paddingTop: '1rem'
                                                        }}>
                                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                                <button style={{
                                                                    width: '32px', height: '32px', borderRadius: '8px',
                                                                    background: '#EFF6FF', color: '#2563EB', border: 'none',
                                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                                                }} title="Send Email">
                                                                    <Mail size={14} />
                                                                </button>
                                                                <button style={{
                                                                    width: '32px', height: '32px', borderRadius: '8px',
                                                                    background: '#F0FDF4', color: '#16A34A', border: 'none',
                                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                                                }} title="Call Candidate">
                                                                    <Phone size={14} />
                                                                </button>
                                                            </div>

                                                            <button style={{
                                                                padding: '0.5rem 1rem', borderRadius: '8px', background: 'white',
                                                                color: '#334155', border: '1px solid #E2E8F0', fontSize: '0.85rem',
                                                                fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem'
                                                            }}>
                                                                View Resume <ExternalLink size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}

                                                {job.mockCandidates.length === 0 && (
                                                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: '#94A3B8' }}>
                                                        No candidates have applied to this job yet.
                                                    </div>
                                                )}

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default Candidates;
