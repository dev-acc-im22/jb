import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Building2, MapPin, Globe, Briefcase, Users, Eye, FileCheck, Clock, Settings, ArrowRight, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import Button from '../components/ui/Button';

const RecruiterDashboard = () => {
    const { jobs, user, deleteJob, applications } = useJobs();

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
            deleteJob(id);
        }
    };

    // Filter jobs by current company
    const effectiveCompanyName = user?.companyName || 'Your Company';
    const companyJobs = jobs.filter(job => job.company === effectiveCompanyName);
    const companyJobIds = companyJobs.map(j => j.id);
    const companyApplications = applications.filter(app => companyJobIds.includes(app.jobId));
    const totalApplicants = companyApplications.length;
    const profileViews = (companyJobs.length * 124) + (totalApplicants * 3);
    const shortlistedCount = Math.floor(totalApplicants * 0.2);

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F8FAFC',
            paddingTop: '80px', // Right below navbar
            paddingBottom: '2rem',
            fontFamily: "'Montserrat', sans-serif"
        }}>
            {/* Slim Profile Header Row */}
            <div style={{ backgroundColor: 'white', borderBottom: '1px solid #E2E8F0', padding: '1.25rem 0' }}>
                <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '48px', height: '48px', borderRadius: '10px',
                            border: '1px solid #E2E8F0', backgroundColor: '#F1F5F9',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                        }}>
                            {user?.companyLogo ? (
                                <img src={user.companyLogo} alt={user.companyName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            ) : (
                                <Building2 size={24} color="#94A3B8" />
                            )}
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.2 }}>
                                {effectiveCompanyName}
                            </h1>

                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <Link to="/recruiter-settings" style={{ textDecoration: 'none' }}>
                            <Button variant="outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
                                <Settings size={16} /> Settings
                            </Button>
                        </Link>
                        <Link
                            to="/post-job"
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', textDecoration: 'none',
                                background: 'linear-gradient(135deg, #2563EB, #4F46E5)', padding: '0.6rem 1.25rem',
                                fontSize: '0.85rem', borderRadius: '8px', boxShadow: '0 4px 10px rgba(37, 99, 235, 0.2)'
                            }}
                        >
                            <PlusCircle size={16} /> Post a Job
                        </Link>
                    </div>
                </div>
            </div>

            <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', marginTop: '1.5rem' }}>
                {/* 4-Column KPI Stats Row */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem'
                }}>
                    <StatCard title="Active Postings" value={companyJobs.length.toString()} icon={<Briefcase size={20} color="#2563EB" />} bg="#EFF6FF" trend={companyJobs.length > 0 ? "+1 this week" : "0 this week"} />
                    <StatCard title="Total Applicants" value={totalApplicants.toString()} icon={<Users size={20} color="#10B981" />} bg="#ECFDF5" trend={totalApplicants > 0 ? "+14% vs last mo" : "0% vs last mo"} />
                    <StatCard title="Profile Views" value={profileViews.toString()} icon={<Eye size={20} color="#8B5CF6" />} bg="#F5F3FF" trend={profileViews > 0 ? "+5% vs last mo" : "0% vs last mo"} />
                    <StatCard title="Shortlisted" value={shortlistedCount.toString()} icon={<FileCheck size={20} color="#F59E0B" />} bg="#FFFBEB" trend={shortlistedCount > 0 ? "4 new today" : "0 new today"} />
                </div>

                {/* Main 2-Column Dashboard Area */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>

                    {/* Left Column: Job Management */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}
                    >
                        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Active Postings</h2>
                            <Link to="#" style={{ fontSize: '0.85rem', color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>View All</Link>
                        </div>

                        <div style={{ padding: '0' }}>
                            {companyJobs.length === 0 ? (
                                <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#94A3B8' }}>
                                        <Briefcase size={24} />
                                    </div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', margin: '0 0 0.5rem 0' }}>No active jobs found</h3>
                                    <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>Create a listing to start receiving applications.</p>
                                    <Link
                                        to="/post-job"
                                        style={{
                                            fontSize: '0.85rem', padding: '0.6rem 1.25rem', backgroundColor: '#2563EB', color: 'white',
                                            borderRadius: '8px', textDecoration: 'none', fontWeight: 600, display: 'inline-block'
                                        }}
                                    >
                                        Post Your First Job
                                    </Link>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {/* Compact Job List Item */}
                                    {companyJobs.map((job, idx) => (
                                        <div key={job.id} style={{
                                            padding: '1.25rem 1.5rem',
                                            borderBottom: idx !== companyJobs.length - 1 ? '1px solid #F1F5F9' : 'none',
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            transition: 'background-color 0.2s'
                                        }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <div>
                                                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.25rem 0' }}>{job.title}</h3>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: '#64748B' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={12} /> {job.location}</span>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={12} /> {job.type}</span>
                                                    <Link to={`/job/${job.id}/applicants`} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#10B981', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#059669'} onMouseOut={e => e.currentTarget.style.color = '#10B981'}><Users size={12} /> {applications.filter(a => a.jobId === job.id).length} Candidates</Link>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                <Link to={`/jobs/${job.id}`} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: '6px', textDecoration: 'none', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.3rem' }} onMouseOver={e => { e.currentTarget.style.backgroundColor = '#F8FAFC'; e.currentTarget.style.borderColor = '#CBD5E1' }} onMouseOut={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#E2E8F0' }}>
                                                    <Eye size={13} /> Preview
                                                </Link>

                                                <Link to={`/edit-job/${job.id}`} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8125rem', fontWeight: 600, color: 'white', backgroundColor: '#3B82F6', border: '1px solid #3B82F6', borderRadius: '6px', textDecoration: 'none', transition: 'background-color 0.2s', display: 'flex', alignItems: 'center', gap: '0.3rem' }} onMouseOver={e => { e.currentTarget.style.backgroundColor = '#2563EB'; e.currentTarget.style.borderColor = '#2563EB' }} onMouseOut={e => { e.currentTarget.style.backgroundColor = '#3B82F6'; e.currentTarget.style.borderColor = '#3B82F6' }}>
                                                    <Edit2 size={13} /> Edit
                                                </Link>

                                                <button onClick={() => handleDelete(job.id)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8125rem', fontWeight: 600, color: '#EF4444', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.3rem' }} onMouseOver={e => { e.currentTarget.style.backgroundColor = '#FEE2E2'; e.currentTarget.style.borderColor = '#FCA5A5'; }} onMouseOut={e => { e.currentTarget.style.backgroundColor = '#FEF2F2'; e.currentTarget.style.borderColor = '#FECACA'; }}>
                                                    <Trash2 size={13} /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Right Column: Sidebar / Recent Activity */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Quick Action / Promotion */}
                        <div style={{
                            background: 'linear-gradient(135deg, #1E293B, #0F172A)', borderRadius: '16px', padding: '1.5rem', color: 'white', position: 'relative', overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: '#E8D5B7', whiteSpace: 'nowrap' }}>Boost Your Company's Job Listings</h3>
                            <p style={{ fontSize: '0.85rem', color: '#CBD5E1', margin: '0 0 1rem 0', lineHeight: 1.5 }}>Get 3x more visibility by sponsoring your top job posts to passive candidates.</p>
                            <button style={{
                                width: '100%', padding: '0.6rem', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'background-color 0.2s'
                            }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}>
                                Explore Premium
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

// Mini Component for Stat Cards
const StatCard = ({ title, value, icon, bg, trend }) => (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10B981', backgroundColor: '#ECFDF5', padding: '0.2rem 0.5rem', borderRadius: '20px' }}>{trend}</span>
        </div>
        <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.2rem' }}>{value}</div>
            <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500 }}>{title}</div>
        </div>
    </div>
);

// Mini Component for Recent Applicant List Item
const ApplicantItem = ({ name, role, time, img, color }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 700 }}>
            {img}
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0F172A' }}>{name}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{role}</div>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}>{time}</span>
    </div>
);

export default RecruiterDashboard;
