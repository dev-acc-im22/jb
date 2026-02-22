import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin, Briefcase } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import JobCard from '../components/job/JobCard';
import Footer from '../components/layout/Footer';

const SearchResults = () => {
    const { jobs, searchFilter, setSearchFilter } = useJobs();
    const navigate = useNavigate();
    const location = useLocation();

    const [localKeyword, setLocalKeyword] = useState(searchFilter.keyword || '');
    const [localLocation, setLocalLocation] = useState(searchFilter.location || '');
    const [sortBy, setSortBy] = useState('relevance');

    // Sync state if context changes externally
    useEffect(() => {
        setLocalKeyword(searchFilter.keyword);
        setLocalLocation(searchFilter.location);
    }, [searchFilter.keyword, searchFilter.location]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchFilter(prev => ({ ...prev, keyword: localKeyword, location: localLocation }));
    };

    const searchResults = useMemo(() => {
        let filtered = [...jobs];

        // Keyword filter
        if (searchFilter.keyword) {
            const term = searchFilter.keyword.toLowerCase();
            filtered = filtered.filter(job =>
                job.title?.toLowerCase().includes(term) ||
                job.company?.toLowerCase().includes(term) ||
                job.description?.toLowerCase().includes(term) ||
                job.category?.toLowerCase().includes(term) ||
                (job.tags && job.tags.some(tag => tag.toLowerCase().includes(term)))
            );
        }

        // Location filter
        if (searchFilter.location) {
            const locTerm = searchFilter.location.toLowerCase();
            filtered = filtered.filter(job =>
                job.location?.toLowerCase().includes(locTerm) ||
                (locTerm.includes('remote') && (job.location?.toLowerCase().includes('remote') || job.type?.toLowerCase().includes('remote')))
            );
        }

        // Sort
        if (sortBy === 'salary-high') {
            filtered.sort((a, b) => {
                const getMax = (s) => {
                    const match = (s || '').match(/(\d+)L/g);
                    return match ? parseInt(match[match.length - 1]) : 0;
                };
                return getMax(b.salary) - getMax(a.salary);
            });
        } else if (sortBy === 'salary-low') {
            filtered.sort((a, b) => {
                const getMin = (s) => {
                    const match = (s || '').match(/(\d+)L/);
                    return match ? parseInt(match[1]) : 0;
                };
                return getMin(a.salary) - getMin(b.salary);
            });
        } else if (sortBy === 'applicants') {
            filtered.sort((a, b) => (b.applicants || 0) - (a.applicants || 0));
        }

        return filtered;
    }, [jobs, searchFilter, sortBy]);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--neutral-50, #F9FAFB)' }}>

            {/* Header Area */}
            <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', padding: '100px 2rem 30px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Search size={20} color="#2563EB" />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'Montserrat, sans-serif' }}>
                                Find Jobs
                            </h1>
                            <p style={{ color: '#6B7280', margin: 0, fontSize: '0.9rem' }}>
                                Searching {searchFilter.keyword ? `for "${searchFilter.keyword}"` : 'all jobs'} {searchFilter.location ? `in ${searchFilter.location}` : ''}
                            </p>
                        </div>
                    </div>

                    {/* Secondary Search Bar */}
                    <form onSubmit={handleSearchSubmit} style={{
                        display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
                        padding: '0.5rem', borderRadius: '16px', border: '1px solid #E5E7EB',
                        backgroundColor: '#F9FAFB', maxWidth: '800px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{ flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                            <Briefcase size={18} color="#9CA3AF" />
                            <input
                                placeholder="Job title, keyword, or company..."
                                value={localKeyword}
                                onChange={(e) => setLocalKeyword(e.target.value)}
                                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem' }}
                            />
                        </div>
                        <div style={{ width: '1px', backgroundColor: '#E5E7EB', margin: '0.5rem 0' }} />
                        <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                            <MapPin size={18} color="#9CA3AF" />
                            <input
                                placeholder="City or remote..."
                                value={localLocation}
                                onChange={(e) => setLocalLocation(e.target.value)}
                                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem' }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                padding: '0.75rem 2rem', borderRadius: '12px', border: 'none',
                                background: '#2563EB', color: 'white', fontWeight: 600,
                                cursor: 'pointer', transition: 'background 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.background = '#1D4ED8'}
                            onMouseOut={(e) => e.target.style.background = '#2563EB'}
                        >
                            Update
                        </button>
                    </form>

                </div>
            </div>

            {/* Results & Controls Area */}
            <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ fontSize: '1.1rem', color: '#374151', fontWeight: 500 }}>
                        Showing <strong style={{ color: '#111827', fontWeight: 700 }}>{searchResults.length}</strong> {searchResults.length === 1 ? 'match' : 'matches'}
                    </div>

                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        backgroundColor: 'white', padding: '0.5rem 1rem',
                        borderRadius: '10px', border: '1px solid #E5E7EB',
                    }}>
                        <SlidersHorizontal size={16} color="#6B7280" />
                        <span style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 500 }}>Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                border: 'none', outline: 'none',
                                fontSize: '0.9rem', color: '#111827',
                                backgroundColor: 'transparent', cursor: 'pointer', fontWeight: 600
                            }}
                        >
                            <option value="relevance">Relevance</option>
                            <option value="recent">Most Recent</option>
                            <option value="salary-high">Salary: High → Low</option>
                            <option value="salary-low">Salary: Low → High</option>
                            <option value="applicants">Most Applicants</option>
                        </select>
                    </div>
                </div>

                {/* Job Cards Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                        gap: '1.5rem',
                        paddingBottom: '4rem'
                    }}
                >
                    {searchResults.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * Math.min(index, 10), duration: 0.4 }}
                        >
                            <JobCard job={job} />
                        </motion.div>
                    ))}

                    {searchResults.length === 0 && (
                        <div style={{
                            gridColumn: '1 / -1', textAlign: 'center',
                            padding: '6rem 2rem', backgroundColor: 'white',
                            borderRadius: '16px', border: '1px border #E5E7EB'
                        }}>
                            <Search size={48} style={{ marginBottom: '1rem', opacity: 0.3, color: '#6B7280' }} />
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>No perfect match found</h3>
                            <p style={{ fontSize: '1rem', color: '#6B7280', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                                We couldn't find any jobs matching "{searchFilter.keyword}". Try checking your spelling or using more general terms.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchFilter({ keyword: '', location: '', category: '' });
                                    setLocalKeyword('');
                                    setLocalLocation('');
                                }}
                                style={{
                                    padding: '0.6rem 1.5rem', borderRadius: '100px', border: '1px solid #E5E7EB',
                                    background: 'white', color: '#374151', fontWeight: 600, cursor: 'pointer'
                                }}
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default SearchResults;
