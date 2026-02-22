import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Clock, Briefcase, CheckCircle, ArrowLeft, Share2, Bookmark, Building, Users, GraduationCap, Globe, Zap, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import JobCard from '../components/job/JobCard';

const JobPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { jobs, applyToJob, user, applications } = useJobs();
    const [job, setJob] = useState(null);
    const [similarJobs, setSimilarJobs] = useState([]);
    const [isApplying, setIsApplying] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Check if user already applied
    const hasApplied = applications.some(app => app.jobId === parseInt(id));

    useEffect(() => {
        const foundJob = jobs.find(j => j.id === parseInt(id));
        if (foundJob) {
            setJob(foundJob);
            const similar = jobs.filter(j => j.category === foundJob.category && j.id !== foundJob.id).slice(0, 3);
            setSimilarJobs(similar);
            setShowSuccess(false);
            setIsApplying(false);
            window.scrollTo(0, 0);
        }
    }, [id, jobs]);

    const handleApply = () => {
        if (!job) return;
        setIsApplying(true);
        setTimeout(() => {
            const success = applyToJob({
                jobId: job.id,
                jobTitle: job.title,
                company: job.company,
                applicantName: user?.name || user?.fullName || 'Anonymous',
                applicantEmail: user?.email || '',
                applicantPhone: user?.phone || '',
                applicantSkills: user?.skills || [],
                applicantExperience: user?.experience || '',
                resumeName: user?.resumeName || '',
                resumeData: user?.resumeData || '',
                appliedDate: new Date().toISOString()
            });

            if (success) {
                setShowSuccess(true);
            }
            setIsApplying(false);
        }, 1200);
    };

    if (!job) return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '100px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>Job not found</h2>
            <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>This job may have been removed or the link is incorrect.</p>
            <Link to="/" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>← Back to all jobs</Link>
        </div>
    );

    const isActiveHiring = job.posted && (job.posted.includes('hour') || job.posted.includes('Just') || job.posted.includes('day'));

    return (
        <div style={{ backgroundColor: '#F8F9FB', minHeight: '100vh', paddingTop: '90px', paddingBottom: '4rem', fontFamily: "'Montserrat', sans-serif" }}>

            {/* Breadcrumb & Back */}
            <div style={{ backgroundColor: 'white', borderBottom: '1px solid #E5E7EB' }}>
                <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '1rem 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#6B7280' }}>
                        <Link to="/" style={{ color: '#6B7280', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <ArrowLeft size={14} /> Home
                        </Link>
                        <span>/</span>
                        <Link to="/" style={{ color: '#6B7280', textDecoration: 'none' }}>Jobs</Link>
                        <span>/</span>
                        <span style={{ color: '#111827', fontWeight: 500, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '300px' }}>{job.title}</span>
                    </div>
                </div>
            </div>

            {/* Main Header Card */}
            <div style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '2.5rem 2rem 3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            {/* Company Logo */}
                            <div style={{
                                width: '80px', height: '80px', borderRadius: '16px',
                                backgroundColor: '#EFF6FF', color: '#2563EB',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '2rem', fontWeight: 700,
                                boxShadow: 'inset 0 0 0 1px rgba(37, 99, 235, 0.1)'
                            }}>
                                {job.company.charAt(0)}
                            </div>

                            <div>
                                <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: '0.5rem' }}>
                                    {job.title}
                                </h1>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem', color: '#374151', marginBottom: '1rem' }}>
                                    <span style={{ fontWeight: 600 }}>{job.company}</span>
                                    <span style={{ color: '#9CA3AF' }}>•</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#F59E0B' }}>
                                        ★ 4.2 <span style={{ color: '#6B7280' }}>Reviews</span>
                                    </span>
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem', color: '#4B5563' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#F9FAFB', padding: '0.4rem 0.8rem', borderRadius: '8px' }}>
                                        <Briefcase size={16} color="#6B7280" />
                                        <span>{job.experience || '2-4 Years'}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#F9FAFB', padding: '0.4rem 0.8rem', borderRadius: '8px' }}>
                                        <DollarSign size={16} color="#6B7280" />
                                        <span>{job.salary}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#F9FAFB', padding: '0.4rem 0.8rem', borderRadius: '8px' }}>
                                        <MapPin size={16} color="#6B7280" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#F9FAFB', padding: '0.4rem 0.8rem', borderRadius: '8px' }}>
                                        <Clock size={16} color="#6B7280" />
                                        <span>{job.type}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                            {isActiveHiring && (
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                                    padding: '0.4rem 0.8rem', backgroundColor: '#F0FDF4',
                                    color: '#16A34A', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700
                                }}>
                                    <Zap size={14} fill="#16A34A" /> Actively Hiring
                                </div>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                                <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#6B7280' }}>
                                    <div>Posted: <span style={{ color: '#111827', fontWeight: 500 }}>{job.posted}</span></div>
                                    <div style={{ marginTop: '0.25rem' }}>Applicants: <span style={{ color: '#2563EB', fontWeight: 600 }}>{job.applicants}</span></div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button style={{ padding: '0.6rem', border: '1px solid #E5E7EB', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>
                                        <Share2 size={20} color="#6B7280" />
                                    </button>
                                    <button style={{ padding: '0.6rem', border: '1px solid #E5E7EB', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>
                                        <Bookmark size={20} color="#6B7280" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) 380px', gap: '2.5rem' }}>

                {/* Left Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Job Description Card */}
                    <motion.section
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '2rem' }}
                    >
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '1.5rem' }}>Job Description</h2>

                        <div style={{ fontSize: '1rem', lineHeight: '1.8', color: '#4B5563', whiteSpace: 'pre-line' }}>
                            {job.description}
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827', marginBottom: '1rem' }}>Key Requirements</h3>
                            <ul style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {job.requirements && job.requirements.map((req, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#4B5563', fontSize: '0.95rem' }}>
                                        <CheckCircle size={18} color="#16A34A" style={{ marginTop: '2px', flexShrink: 0 }} />
                                        <span>Proficiency in <strong>{req}</strong> and related technologies</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ marginTop: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827', marginBottom: '1rem' }}>Skills & Tags</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {job.requirements && job.requirements.map((tag, i) => (
                                    <span key={i} style={{
                                        padding: '0.5rem 1rem', backgroundColor: '#EFF6FF',
                                        color: '#1E40AF', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 600,
                                        border: '1px solid #DBEAFE'
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* Detailed Info Grid */}
                    <motion.section
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '2rem' }}
                    >
                        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', marginBottom: '1.5rem' }}>About this role</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            {[
                                { label: 'Role Category', value: job.roleCategory || 'Software Development', icon: '💼' },
                                { label: 'Industry Type', value: job.industry || 'IT Services & Consulting', icon: '🏢' },
                                { label: 'Department', value: job.department || 'Engineering', icon: '🔧' },
                                { label: 'Employment Type', value: job.type, icon: '📋' },
                                { label: 'Education', value: job.education || 'Graduate', icon: '🎓' },
                                { label: 'Experience', value: job.experience || '2-4 Years', icon: '⏰' }
                            ].map((item, i) => (
                                <div key={i} style={{ padding: '1rem', backgroundColor: '#FAFAFA', borderRadius: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                                        <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                                        <label style={{ fontSize: '0.8rem', color: '#9CA3AF', fontWeight: 500 }}>{item.label}</label>
                                    </div>
                                    <div style={{ color: '#111827', fontWeight: 600, fontSize: '0.95rem' }}>{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Similar Jobs */}
                    {similarJobs.length > 0 && (
                        <section style={{ marginTop: '1rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '1.5rem' }}>Similar Jobs</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                {similarJobs.map(simJob => (
                                    <JobCard key={simJob.id} job={simJob} />
                                ))}
                            </div>
                        </section>
                    )}

                </div>

                {/* Right Sticky Sidebar */}
                <aside style={{ position: 'relative' }}>
                    <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Apply Widget */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB' }}
                        >
                            {(showSuccess || hasApplied) ? (
                                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <div style={{
                                        width: '64px', height: '64px', borderRadius: '50%',
                                        backgroundColor: '#F0FDF4', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 1rem'
                                    }}>
                                        <CheckCircle size={32} color="#16A34A" />
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111827' }}>Application Sent! 🎉</h3>
                                    <p style={{ color: '#6B7280', fontSize: '0.9rem', lineHeight: 1.5 }}>
                                        Your application has been submitted to {job.company}. Good luck!
                                    </p>
                                    <Link to="/" style={{
                                        display: 'inline-block', marginTop: '1rem',
                                        color: '#2563EB', fontWeight: 600, fontSize: '0.9rem',
                                        textDecoration: 'none'
                                    }}>
                                        Browse more jobs →
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
                                        ⚡ 1-Click Apply
                                    </h3>
                                    <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '1.5rem' }}>
                                        {job.applicants < 25 ? 'Be among the first 25 applicants!' : `${job.applicants} people have already applied`}
                                    </p>

                                    {user && (
                                        <div style={{
                                            padding: '0.75rem', backgroundColor: '#EFF6FF',
                                            borderRadius: '10px', marginBottom: '1rem',
                                            display: 'flex', gap: '0.75rem', alignItems: 'center'
                                        }}>
                                            <div style={{
                                                width: '40px', height: '40px', borderRadius: '50%',
                                                backgroundColor: '#2563EB', color: 'white',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '0.9rem', fontWeight: 700
                                            }}>
                                                {user.name ? user.name.charAt(0) : 'U'}
                                            </div>
                                            <div style={{ overflow: 'hidden' }}>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1E40AF' }}>{user.name || 'User'}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#3B82F6', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user.email}</div>
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        variant="primary"
                                        fullWidth
                                        size="lg"
                                        onClick={user ? handleApply : () => navigate('/login')}
                                        disabled={isApplying}
                                        style={{
                                            height: '52px', fontSize: '1rem', fontWeight: 700,
                                            backgroundColor: '#2563EB', border: 'none', borderRadius: '12px',
                                            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {isApplying ? (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8 }}>⏳</motion.span>
                                                Sending...
                                            </span>
                                        ) : user ? '🚀 Apply Now — 1 Click' : '🔐 Login to Apply'}
                                    </Button>

                                    {!user && (
                                        <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#6B7280' }}>
                                            New here? <Link to="/register" style={{ color: '#2563EB', fontWeight: 600 }}>Create an account</Link>
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>

                        {/* Company Card */}
                        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', border: '1px solid #E5E7EB' }}>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111827', marginBottom: '1rem' }}>About {job.company}</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '12px',
                                    backgroundColor: '#EFF6FF', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    color: '#2563EB', fontWeight: 700, fontSize: '1.2rem'
                                }}>
                                    {job.company.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111827' }}>{job.company}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>{job.industry || 'IT Services'}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#6B7280' }}>
                                <div><strong style={{ color: '#111827' }}>51-200</strong> employees</div>
                                <div><strong style={{ color: '#111827' }}>★ 4.2</strong> rating</div>
                            </div>
                        </div>

                        {/* Recruiter Card */}
                        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', border: '1px solid #E5E7EB' }}>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111827', marginBottom: '1rem' }}>Meet the Recruiter</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Users size={20} color="#9CA3AF" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111827' }}>Sarah Jenkins</div>
                                    <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>HR Manager at {job.company}</div>
                                </div>
                            </div>
                            <Button variant="ghost" fullWidth style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#2563EB' }}>Send Message</Button>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <span style={{ fontSize: '0.85rem', color: '#9CA3AF', cursor: 'pointer' }}>Report this job</span>
                        </div>

                    </div>
                </aside>
            </main>
        </div>
    );
};

export default JobPage;
