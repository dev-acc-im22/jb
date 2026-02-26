import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Users, Globe, MapPin, Briefcase, GraduationCap, CheckCircle2, CheckCircle, Info, ChevronDown } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { useNavigate } from 'react-router-dom';

const SearchResumes = () => {
    const { resumes } = useJobs();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [shortlisted, setShortlisted] = useState(new Set());
    const [hasPurchasedResdex, setHasPurchasedResdex] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);

    const filteredResumes = useMemo(() => {
        return resumes.filter(resume => {
            const matchesSearch =
                resume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resume.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resume.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesLocation = resume.location.toLowerCase().includes(locationFilter.toLowerCase());

            return matchesSearch && matchesLocation;
        });
    }, [resumes, searchTerm, locationFilter]);

    const toggleShortlist = (id) => {
        const newShortlisted = new Set(shortlisted);
        if (newShortlisted.has(id)) {
            newShortlisted.delete(id);
        } else {
            newShortlisted.add(id);
        }
        setShortlisted(newShortlisted);
    };

    return (
        <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: "'Montserrat', sans-serif" }}>
            {isRedirecting && (
                <div style={{
                    position: 'fixed', inset: 0, backgroundColor: 'rgba(255,255,255,0.95)', zIndex: 9999,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Montserrat', sans-serif"
                }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        style={{ width: '56px', height: '56px', border: '5px solid #E2E8F0', borderTopColor: '#2563EB', borderRadius: '50%', marginBottom: '1.5rem' }}
                    />
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>Bypassing checkout...</h2>
                    <p style={{ color: '#64748B', fontSize: '1.1rem', fontWeight: 500 }}>Redirecting test admin to Resdex Database</p>
                </div>
            )}

            {/* PAYWALL TOP SECTION */}
            <div style={{ padding: '6rem 2rem 2rem', textAlign: 'center', background: 'linear-gradient(180deg, #F8FAFC 0%, rgba(248,250,252,0) 100%)', position: 'relative', zIndex: 10 }}>
                <div style={{ color: '#F97316', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
                    RESDEX
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', letterSpacing: '-0.5px' }}>
                    Search India's largest resume database
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#64748B', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
                    by location, industry, skills, and more to find the right fit
                </p>

                {/* PRICING CARDS */}
                <div style={{
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem',
                    marginTop: '4rem', maxWidth: '1000px', margin: '4rem auto 0', textAlign: 'left'
                }}>

                    {/* Resdex Lite Card */}
                    <div style={{
                        flex: '1', minWidth: '350px', background: 'white', borderRadius: '24px',
                        padding: '2.5rem', border: '1px solid #E2E8F0', boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                        position: 'relative'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                            <h2 style={{ color: '#2563EB', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Resdex Lite</h2>
                            <Info size={18} color="#94A3B8" />
                        </div>
                        <p style={{ color: '#64748B', fontSize: '0.9rem', margin: '0 0 2rem 0', lineHeight: 1.5 }}>
                            Best for small and medium businesses<br />with <strong style={{ color: '#475569' }}>smaller hiring needs</strong>
                        </p>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>₹500</div>
                            <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.4rem' }}>*GST as applicable</div>
                        </div>

                        <div style={{
                            border: '1px dashed #CBD5E1', borderRadius: '12px', padding: '0.75rem',
                            display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '2rem'
                        }}>
                            <div style={{ background: '#F1F5F9', borderRadius: '50%', padding: '0.2rem', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#475569' }}>
                                $
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#475569' }}>
                                Just <strong>₹ 500</strong> for viewing 1000 resumes
                            </div>
                        </div>

                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                "View & Download 1000 CV",
                                "Unlimited search results",
                                "Candidates active in last 6 months",
                                "10+ advanced filters",
                                "Single user access",
                                "Unlimited search query (role, location)"
                            ].map((feature, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#444', fontSize: '0.95rem' }}>
                                    <CheckCircle size={18} color="#10B981" fill="#D1FAE5" />
                                    {feature} <Info size={14} color="#CBD5E1" style={{ marginLeft: 'auto' }} />
                                </li>
                            ))}
                        </ul>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                            <div style={{
                                border: '1px solid #E2E8F0', borderRadius: '12px', padding: '0 1rem',
                                display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
                            }}>
                                <span style={{ fontWeight: 600 }}>01</span>
                                <ChevronDown size={16} color="#64748B" />
                            </div>
                            <button
                                onClick={() => {
                                    setIsRedirecting(true);
                                    window.scrollTo(0, 0);
                                    setTimeout(() => {
                                        setIsRedirecting(false);
                                        setHasPurchasedResdex(true);
                                    }, 1500);
                                }}
                                style={{
                                    flex: 1, backgroundColor: '#2563EB', color: 'white', border: 'none',
                                    borderRadius: '12px', padding: '1rem', fontSize: '1rem', fontWeight: 700, cursor: 'pointer'
                                }}>
                                Buy now
                            </button>
                        </div>
                        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94A3B8', marginTop: '1rem' }}>
                            Database Validity 30 days
                        </div>
                    </div>

                    {/* Resdex Standard / Custom Card */}
                    <div style={{
                        flex: '1', minWidth: '350px', background: 'white', borderRadius: '24px',
                        padding: '2.5rem', border: '1px solid #E2E8F0', boxShadow: '0 10px 40px rgba(0,0,0,0.04)'
                    }}>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <h2 style={{ color: '#2563EB', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Resdex</h2>
                        </div>
                        <p style={{ color: '#64748B', fontSize: '0.9rem', margin: '0 0 2.5rem 0', lineHeight: 1.5 }}>
                            Get customised solutions and dedicated<br />support for your <strong style={{ color: '#475569' }}>bigger hiring needs</strong>
                        </p>

                        <div style={{ marginBottom: '3.5rem' }}>
                            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>Custom price</div>
                            <div style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '0.4rem' }}>Based on your plan</div>
                        </div>

                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                "CV views as per plan",
                                "Unlimited search results",
                                "All available candidates",
                                "20+ advanced filters",
                                "Multiple user access",
                                "Email multiple candidates together",
                                "Boolean keyword search",
                                "Download CVs in bulk"
                            ].map((feature, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#444', fontSize: '0.95rem' }}>
                                    <CheckCircle size={18} color="#10B981" fill="#D1FAE5" />
                                    {feature} {i % 2 === 0 && <Info size={14} color="#CBD5E1" style={{ marginLeft: 'auto' }} />}
                                </li>
                            ))}
                        </ul>

                        <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                            <button style={{
                                width: '100%', backgroundColor: 'white', color: '#2563EB', border: '1px solid #2563EB',
                                borderRadius: '12px', padding: '1rem', fontSize: '1rem', fontWeight: 700, cursor: 'pointer'
                            }}>
                                Contact sales
                            </button>
                        </div>
                        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94A3B8', marginTop: '1rem' }}>
                            Database validity as per the plan
                        </div>
                    </div>

                </div>
            </div>

            {/* CONDITIONAL RENDER: Blurred Ghost UI or Real Interactive UI */}
            {!hasPurchasedResdex ? (
                <div style={{
                    position: 'relative', marginTop: '-15rem', paddingTop: '20rem',
                    background: 'linear-gradient(180deg, rgba(248,250,252,0) 0%, #F8FAFC 20%)',
                    zIndex: 1, pointerEvents: 'none'
                }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', filter: 'blur(8px)', opacity: 0.4 }}>
                        {/* Ghost Search Bar */}
                        <div style={{
                            background: 'white', padding: '1.25rem', borderRadius: '24px',
                            display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap',
                            border: '1px solid #E2E8F0'
                        }}>
                            <div style={{ flex: '2', minWidth: '300px', padding: '1rem', border: '1px solid #E2E8F0', borderRadius: '16px', background: '#F8FAFC' }} />
                            <div style={{ flex: '1', minWidth: '200px', padding: '1rem', border: '1px solid #E2E8F0', borderRadius: '16px', background: '#F8FAFC' }} />
                        </div>
                        {/* Ghost Results Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem' }}>
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                        <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#F1F5F9' }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ height: '1.5rem', width: '60%', background: '#F1F5F9', borderRadius: '8px', marginBottom: '0.5rem' }} />
                                            <div style={{ height: '1rem', width: '40%', background: '#F1F5F9', borderRadius: '8px' }} />
                                        </div>
                                    </div>
                                    <div style={{ height: '0.8rem', width: '90%', background: '#F1F5F9', borderRadius: '4px', marginBottom: '0.5rem' }} />
                                    <div style={{ height: '0.8rem', width: '80%', background: '#F1F5F9', borderRadius: '4px', marginBottom: '1.5rem' }} />
                                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                                        <div style={{ flex: 2, height: '3rem', background: '#F1F5F9', borderRadius: '12px' }} />
                                        <div style={{ flex: 1, height: '3rem', background: '#F1F5F9', borderRadius: '12px' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                /* ACTUAL FUNCTIONAL RESULTS UI */
                <div style={{ maxWidth: '1200px', margin: '4rem auto 0', padding: '0 2rem' }}>
                    {/* Search & Filter Bar */}
                    <div style={{
                        background: 'white',
                        padding: '1.25rem',
                        borderRadius: '24px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.05)',
                        display: 'flex',
                        gap: '1rem',
                        marginBottom: '3rem',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ flex: '2', minWidth: '300px', position: 'relative' }}>
                            <Search size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                            <input
                                type="text"
                                placeholder="Search by name, title, or skills (e.g. React, Node.js)"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1.1rem 1.25rem 1.1rem 3.5rem',
                                    border: '1px solid #E2E8F0',
                                    borderRadius: '16px',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    fontFamily: 'inherit'
                                }}
                                onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)' }}
                                onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none' }}
                            />
                        </div>
                        <div style={{ flex: '1', minWidth: '200px', position: 'relative' }}>
                            <MapPin size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                            <input
                                type="text"
                                placeholder="Location"
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1.1rem 1.25rem 1.1rem 3.5rem',
                                    border: '1px solid #E2E8F0',
                                    borderRadius: '16px',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    fontFamily: 'inherit'
                                }}
                                onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)' }}
                                onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none' }}
                            />
                        </div>
                    </div>

                    {/* Results Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem' }}>
                        <AnimatePresence mode="popLayout">
                            {filteredResumes.map((resume) => (
                                <motion.div
                                    key={resume.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                                    style={{
                                        background: 'white',
                                        padding: '2rem',
                                        borderRadius: '24px',
                                        border: '1px solid #E2E8F0',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <div style={{
                                                width: '60px', height: '60px', borderRadius: '16px',
                                                background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
                                                color: '#2563EB', fontWeight: 800, fontSize: '1.5rem',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                {resume.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{resume.name}</h3>
                                                <p style={{ fontSize: '0.9rem', color: '#2563EB', fontWeight: 600, margin: '2px 0 0 0' }}>{resume.title}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toggleShortlist(resume.id)}
                                            style={{
                                                background: shortlisted.has(resume.id) ? '#FDF2F8' : 'none',
                                                border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '12px'
                                            }}
                                        >
                                            <CheckCircle2 color={shortlisted.has(resume.id) ? '#EC4899' : '#CBD5E1'} size={24} />
                                        </button>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748B' }}>
                                            <Briefcase size={16} /> {resume.experience}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748B' }}>
                                            <MapPin size={16} /> {resume.location}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748B' }}>
                                            <GraduationCap size={16} /> {resume.education}
                                        </div>
                                    </div>

                                    <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                        {resume.summary}
                                    </p>

                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                                        {resume.skills.map((skill, i) => (
                                            <span key={i} style={{
                                                backgroundColor: '#F1F5F9', color: '#444',
                                                padding: '0.4rem 0.8rem', borderRadius: '8px',
                                                fontSize: '0.75rem', fontWeight: 700
                                            }}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                                        <button style={{
                                            flex: 2, background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                                            color: 'white', border: 'none', padding: '0.85rem', borderRadius: '12px',
                                            fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem'
                                        }}>
                                            View Resume
                                        </button>
                                        <button style={{
                                            flex: 1, background: 'white', border: '1px solid #E2E8F0',
                                            color: '#0F172A', padding: '0.85rem', borderRadius: '12px',
                                            fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem'
                                        }}>
                                            Contact
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {filteredResumes.length === 0 && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', opacity: 0.6 }}>
                                <Users size={64} color="#CBD5E1" style={{ margin: '0 auto 1.5rem' }} />
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#64748B' }}>
                                    No candidates match your search
                                </h3>
                                <p>Try broadening your keywords or location</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default SearchResumes;
