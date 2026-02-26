import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import {
    Home, Briefcase, Building2, BookOpen, HelpCircle,
    Star, MapPin, ChevronRight, PlayCircle
} from 'lucide-react';

const JobSeekerHomepage = () => {
    const { user } = useJobs();

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F1F5F9', // Light gray background matching reference
            paddingTop: '100px', // Below navbar
            paddingBottom: '4rem',
            fontFamily: "'Inter', 'Montserrat', sans-serif"
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 1rem',
                display: 'grid',
                gridTemplateColumns: '260px 1fr 280px', // 3-column layout
                gap: '1.5rem',
                alignItems: 'start'
            }}>

                {/* --- LEFT SIDEBAR --- */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}
                    >
                        <div style={{ padding: '1.5rem', textAlign: 'center', borderBottom: '1px solid #F1F5F9' }}>
                            <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 1rem' }}>
                                {/* Progress Circle */}
                                <svg style={{ position: 'absolute', top: -4, left: -4, width: '88px', height: '88px', transform: 'rotate(-90deg)' }}>
                                    <circle cx="44" cy="44" r="42" fill="none" stroke="#F1F5F9" strokeWidth="4" />
                                    <circle cx="44" cy="44" r="42" fill="none" stroke="#EF4444" strokeWidth="4" strokeDasharray="263.8" strokeDashoffset="250" strokeLinecap="round" />
                                </svg>
                                <div style={{
                                    width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#F8FAFC',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                                }}>
                                    {user?.profileImage ? (
                                        <img src={user.profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '40px', height: '40px', backgroundColor: '#E2E8F0', borderRadius: '50%' }}></div> // Placeholder avatar
                                    )}
                                </div>
                                <div style={{
                                    position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
                                    backgroundColor: 'white', padding: '2px 8px', borderRadius: '12px',
                                    fontSize: '11px', fontWeight: 800, color: '#EF4444', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}>
                                    5%
                                </div>
                            </div>
                            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>{user?.name || 'Chrome Profile'}</h3>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B' }}>{user?.headline || 'Not Mentioned'}</p>
                        </div>

                        <div style={{ padding: '1.5rem', backgroundColor: '#FFFBF5' }}>
                            <h4 style={{ margin: '0 0 1rem', fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>What are you missing?</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem', fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: '#EF4444' }}>•</span> Daily job recommendations</li>
                                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: '#EF4444' }}>•</span> Job application updates</li>
                                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><span style={{ color: '#EF4444' }}>•</span> Direct jobs from recruiters</li>
                            </ul>
                            <Link to="/profile" style={{ textDecoration: 'none' }}>
                                <button style={{
                                    width: '100%', padding: '0.6rem', borderRadius: '100px', border: 'none',
                                    backgroundColor: '#EA580C', color: 'white', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }} onMouseOver={e => e.target.style.backgroundColor = '#C2410C'} onMouseOut={e => e.target.style.backgroundColor = '#EA580C'}>
                                    Complete profile
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Navigation Menu */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '0.5rem' }}
                    >
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', color: '#0F172A', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', borderRadius: '8px', backgroundColor: '#F8FAFC' }}>
                            <Home size={18} color="#64748B" /> My home
                        </Link>
                        <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', color: '#475569', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', borderRadius: '8px', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <Briefcase size={18} color="#64748B" /> Jobs
                        </Link>
                        <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', color: '#475569', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', borderRadius: '8px', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <Building2 size={18} color="#64748B" /> Companies
                        </Link>
                        <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', color: '#475569', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', borderRadius: '8px', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <BookOpen size={18} color="#64748B" /> Blogs
                        </Link>
                        <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '0.5rem' }}></div>
                        <Link to="#" style={{ display: 'block', padding: '0.5rem 1rem', color: '#94A3B8', textDecoration: 'none', fontSize: '0.8rem', textAlign: 'center' }}>
                            How JobBoard works?
                        </Link>
                    </motion.div>
                </div>

                {/* --- MAIN CONTENT --- */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {/* Recommended Jobs */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.5rem' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>Recommended jobs for you</h2>
                            <Link to="#" style={{ color: '#2563EB', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>View all</Link>
                        </div>

                        {/* Tabs */}
                        <div style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
                            <button style={{ padding: '0.5rem 0', background: 'none', border: 'none', borderBottom: '2px solid #0F172A', color: '#0F172A', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' }}>Profile (40)</button>
                            <button style={{ padding: '0.5rem 0', background: 'none', border: 'none', color: '#64748B', fontWeight: 500, fontSize: '0.95rem', cursor: 'pointer' }}>Preferences (0)</button>
                        </div>

                        {/* Job Cards Carousel */}
                        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
                            {[
                                { title: 'JUNIOR ENGINEER', company: 'Wipro', rating: '3.6', loc: 'Pune', time: '12d ago' },
                                { title: 'Fresher Opportunit...', company: 'Genpact', rating: '3.6', loc: 'Hyderabad, Chennai...', time: '4d ago' },
                                { title: 'Wipro is Hiring...', company: 'Wipro', rating: '3.6', loc: 'Chennai', time: '3d ago' }
                            ].map((job, i) => (
                                <div key={i} style={{
                                    minWidth: '220px', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0',
                                    display: 'flex', flexDirection: 'column', gap: '0.5rem'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '4px', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyItems: 'center', border: '1px solid #E2E8F0' }}>
                                            {/* Mock Logo */}
                                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'conic-gradient(#3B82F6, #EF4444, #F59E0B)' }}></div>
                                        </div>
                                        <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{job.time}</span>
                                    </div>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{job.title}</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748B' }}>
                                        <span>{job.company}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#F59E0B' }}><Star size={12} fill="#F59E0B" /> {job.rating}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#94A3B8', marginTop: 'auto' }}>
                                        <MapPin size={14} /> {job.loc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Resume Creation Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        style={{ backgroundColor: '#FFF0F5', borderRadius: '16px', display: 'flex', overflow: 'hidden' }}
                    >
                        {/* Mock Resume Image */}
                        <div style={{ width: '120px', backgroundColor: '#FFE4E1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '80px', height: '100px', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', padding: '4px' }}>
                                <div style={{ height: '2px', backgroundColor: '#E2E8F0', marginBottom: '2px', width: '40%' }}></div>
                                <div style={{ height: '2px', backgroundColor: '#E2E8F0', marginBottom: '8px', width: '60%' }}></div>
                                <div style={{ height: '10px', backgroundColor: '#F1F5F9', marginBottom: '4px' }}></div>
                                <div style={{ height: '10px', backgroundColor: '#F1F5F9', marginBottom: '4px' }}></div>
                            </div>
                        </div>
                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Create your resume in 3 easy steps ✨</h3>
                                <ol style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                    <li>Add the missing details in your profile</li>
                                    <li>Choose a template for your resume</li>
                                    <li>Improve the content with AI</li>
                                </ol>
                            </div>
                            <button style={{ backgroundColor: '#2563EB', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '100px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
                                Create resume
                            </button>
                        </div>
                    </motion.div>

                    {/* Salary Insight Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        style={{ backgroundColor: '#EEFBF4', borderRadius: '16px', display: 'flex', overflow: 'hidden', padding: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <div>
                            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Explore salaries of 5 Lakh+ companies</h3>
                            <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#059669' }}>Compare salaries by designations and experience.</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <button style={{ backgroundColor: '#2563EB', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '100px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
                                    Explore salaries
                                </button>
                                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Powered by AmbitionBox</span>
                            </div>
                        </div>
                        {/* Mock Salary Cards */}
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <div style={{ width: '80px', height: '100px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', padding: '0.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ fontSize: '1rem', fontWeight: 800 }}>D.</div>
                                <div style={{ fontSize: '0.5rem', color: '#64748B', marginTop: '0.5rem' }}>Deloitte</div>
                            </div>
                            <div style={{ width: '80px', height: '100px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', padding: '0.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ fontSize: '1rem', fontWeight: 800 }}>a</div>
                                <div style={{ fontSize: '0.5rem', color: '#64748B', marginTop: '0.5rem' }}>Amazon</div>
                                <div style={{ fontSize: '0.7rem', fontWeight: 700, marginTop: '0.2rem' }}>₹25.8 Lakhs</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sponsored Video Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                        style={{ backgroundColor: '#611612', borderRadius: '16px', overflow: 'hidden', position: 'relative', height: '180px', display: 'flex' }}
                    >
                        <div style={{ padding: '2rem', flex: 1, color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <div style={{ padding: '2px 6px', backgroundColor: '#CD4135', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>Kyndryl</div>
                                <span style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '2px' }}><Star size={10} fill="#F59E0B" color="#F59E0B" /> 4.0</span>
                            </div>
                            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.4rem', fontWeight: 800 }}>progress with purpose</h2>
                            <Link to="#" style={{ color: '#60A5FA', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>Learn more</Link>
                        </div>
                        <div style={{ width: '50%', backgroundColor: '#8B2C24', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Mock Video Placeholder */}
                            <div style={{ width: '100%', height: '100%', opacity: 0.6, background: 'linear-gradient(45deg, #1A1A1A, #4A4A4A)' }}></div>
                            <PlayCircle size={48} color="white" style={{ position: 'absolute', opacity: 0.9, cursor: 'pointer' }} />
                        </div>
                    </motion.div>

                    {/* Top Companies */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.5rem' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>Top companies</h2>
                            <Link to="#" style={{ color: '#2563EB', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>View all</Link>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
                            {[
                                { name: 'Fico', rating: '3.5', reviews: '263', logo: 'FICO' },
                                { name: 'Intellect Design Ar...', rating: '3.6', reviews: '2.4K+', logo: 'intellect' },
                                { name: 'Safran Engineerin...', rating: '3.1', reviews: '227', logo: 'S' }
                            ].map((company, i) => (
                                <div key={i} style={{
                                    minWidth: '180px', padding: '1.5rem 1rem', borderRadius: '12px', border: '1px solid #E2E8F0',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.5rem'
                                }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2563EB', marginBottom: '0.5rem' }}>{company.logo}</div>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>{company.name}</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#64748B' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#F59E0B' }}><Star size={10} fill="#F59E0B" /> {company.rating}</span>
                                        | <span>{company.reviews} reviews</span>
                                    </div>
                                    <button style={{ marginTop: '0.5rem', backgroundColor: 'transparent', color: '#2563EB', border: 'none', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>View jobs</button>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Blogs */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                        style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.5rem' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>Stay updated with our blogs</h2>
                            <Link to="#" style={{ color: '#2563EB', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>View all</Link>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
                            {[
                                { title: 'Career Objective Or Resume Objective Samples', date: '2 Feb 2026', bg: '#D1D5DB' },
                                { title: 'JobBoard JobSpeak: White-Collar Hiring Opens 2026 with 3%...', date: '1 Feb 2026', bg: '#1E293B' },
                                { title: 'Job Application Letter Format, Samples, and Writing Tips (2026)', date: '29 Jan 2026', bg: '#E2E8F0' }
                            ].map((blog, i) => (
                                <div key={i} style={{
                                    minWidth: '220px', borderRadius: '12px', border: '1px solid #E2E8F0',
                                    display: 'flex', flexDirection: 'column', overflow: 'hidden'
                                }}>
                                    <div style={{ height: '100px', backgroundColor: blog.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>Image Placeholder</span>
                                    </div>
                                    <div style={{ padding: '1rem' }}>
                                        <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', fontWeight: 700, color: '#0F172A', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{blog.title}</h4>
                                        <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>JobBoard blog • {blog.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>

                {/* --- RIGHT SIDEBAR --- */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {/* App Download */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.5rem', textAlign: 'center' }}
                    >
                        <div style={{ width: '80px', height: '80px', margin: '0 auto 1rem', padding: '4px', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                            {/* Mock QR Code */}
                            <div style={{ width: '100%', height: '100%', backgroundColor: '#0F172A', opacity: 0.8 }}></div>
                        </div>
                        <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>3587 users downloaded our app in last 30 mins!</h4>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>Scan to download from ▶ </p>
                    </motion.div>

                    {/* Featured Article */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}
                    >
                        <div style={{ height: '120px', backgroundColor: '#E2E8F0', position: 'relative' }}>
                            {/* Decorative element */}
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px', background: 'linear-gradient(to top, white, transparent)' }}></div>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>Career Objective Or Resume Objective Samples</h4>
                            <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5 }}>
                                A career objective is a crucial aspect of a professional resume. Get it right with thi...
                            </p>
                            <Link to="#" style={{ color: '#2563EB', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none' }}>Know more</Link>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default JobSeekerHomepage;
