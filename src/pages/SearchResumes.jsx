import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Users, Globe, MapPin, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';
import { useJobs } from '../context/JobContext';

const SearchResumes = () => {
    const { resumes } = useJobs();
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [shortlisted, setShortlisted] = useState(new Set());

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
        <div style={{ padding: '8rem 2rem 4rem', minHeight: '100vh', backgroundColor: '#F8FAFC', fontFamily: "'Montserrat', sans-serif" }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', letterSpacing: '-1.5px' }}>
                        Find Top Talent
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#64748B', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                        Access over 10 million verified resumes and build your dream team with AI-powered search.
                    </p>
                </motion.div>

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
        </div>
    );
};

export default SearchResumes;
