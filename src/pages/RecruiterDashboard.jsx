import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Building2, MapPin, Globe, Briefcase, Users, Eye, FileCheck, Clock, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import Button from '../components/ui/Button';

const RecruiterDashboard = ({ onPostJob }) => {
    const { jobs, user } = useJobs();

    // Filter jobs by current company
    const companyJobs = jobs.filter(job => job.company === user?.companyName);
    const totalApplicants = companyJobs.reduce((acc, job) => acc + (job.applicants || 0), 0);

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
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                                {user?.companyName || 'Your Company'}
                            </h1>
                            <div style={{ fontSize: '0.85rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                                <Globe size={14} /> Employer Workspace
                                <span style={{ color: '#CBD5E1' }}>|</span>
                                <Briefcase size={14} /> {user?.name || 'Recruiter'}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <Button variant="outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
                            <Settings size={16} /> Settings
                        </Button>
                        <Button
                            onClick={onPostJob}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                                padding: '0.6rem 1.25rem', fontSize: '0.85rem', borderRadius: '8px',
                                boxShadow: '0 4px 10px rgba(37, 99, 235, 0.2)'
                            }}
                        >
                            <PlusCircle size={16} /> Post a Job
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '1.5rem' }}>
                {/* 4-Column KPI Stats Row */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem'
                }}>
                    <StatCard title="Active Postings" value={companyJobs.length.toString()} icon={<Briefcase size={20} color="#2563EB" />} bg="#EFF6FF" trend="+2 this week" />
                    <StatCard title="Total Applicants" value={totalApplicants.toString()} icon={<Users size={20} color="#10B981" />} bg="#ECFDF5" trend="+14% vs last mo" />
                    <StatCard title="Profile Views" value="1,248" icon={<Eye size={20} color="#8B5CF6" />} bg="#F5F3FF" trend="+5% vs last mo" />
                    <StatCard title="Shortlisted" value="24" icon={<FileCheck size={20} color="#F59E0B" />} bg="#FFFBEB" trend="4 new today" />
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
                                    <Button onClick={onPostJob} style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>Post Your First Job</Button>
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
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#10B981', fontWeight: 500 }}><Users size={12} /> {job.applicants || 0} Candidates</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <Link to={`/jobs/${job.id}`} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', fontWeight: 600, color: '#475569', backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: '6px', textDecoration: 'none', transition: 'all 0.2s' }}>Preview</Link>
                                                <button style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', fontWeight: 600, color: 'white', backgroundColor: '#334155', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'background-color 0.2s' }}>Manage</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Right Column: Sidebar / Recent Activity */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* New Applicants Widget */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            style={{
                                backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', padding: '1.25rem'
                            }}
                        >
                            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Clock size={16} color="#2563EB" /> Recent Applications
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <ApplicantItem name="Alex Chen" role="Senior Frontend Eng" time="2h ago" img="A" color="#e11d48" />
                                <ApplicantItem name="Sarah Miller" role="Product Designer" time="4h ago" img="S" color="#059669" />
                                <ApplicantItem name="David Kim" role="Marketing Manager" time="1d ago" img="D" color="#2563eb" />
                            </div>
                            <Button variant="ghost" style={{ width: '100%', marginTop: '1rem', fontSize: '0.85rem', color: '#64748B', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                                View All Candidates <ArrowRight size={14} />
                            </Button>
                        </motion.div>

                        {/* Quick Action / Promotion */}
                        <div style={{
                            background: 'linear-gradient(135deg, #1E293B, #0F172A)', borderRadius: '16px', padding: '1.5rem', color: 'white', position: 'relative', overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Boost Your Listings</h3>
                            <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: '0 0 1rem 0', lineHeight: 1.5 }}>Get 3x more visibility by sponsoring your top job posts to passive candidates.</p>
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
