import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Search, SlidersHorizontal, Megaphone, BarChart3, Target, Sparkles } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import JobCard from '../components/job/JobCard';
import Footer from '../components/layout/Footer';

const MarketingJobs = () => {
    const { jobs } = useJobs();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('recent');

    const marketingJobs = useMemo(() => {
        let filtered = jobs.filter(job => job.category === 'Marketing');

        // Search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(job =>
                job.title?.toLowerCase().includes(term) ||
                job.company?.toLowerCase().includes(term) ||
                job.description?.toLowerCase().includes(term)
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
            filtered.sort((a, b) => b.applicants - a.applicants);
        }
        // 'recent' is the default order from MOCK_JOBS

        return filtered;
    }, [jobs, searchTerm, sortBy]);

    const stats = [
        { icon: Megaphone, label: 'Open Roles', value: marketingJobs.length, color: '#8B5CF6' },
        { icon: BarChart3, label: 'Avg. Salary', value: '₹14L+', color: '#06B6D4' },
        { icon: Target, label: 'Top Companies', value: '10+', color: '#F59E0B' },
        { icon: Sparkles, label: 'Posted Today', value: marketingJobs.filter(j => j.posted?.includes('hour') || j.posted === 'Just now').length, color: '#10B981' },
    ];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--neutral-50, #F9FAFB)' }}>
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '120px 2rem 60px',
                    background: 'linear-gradient(135deg, #4C1D95 0%, #1E3A8A 50%, #0F4C75 100%)',
                }}
            >
                {/* Animated Background Shapes */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                    style={{
                        position: 'absolute', top: '-120px', right: '-80px',
                        width: '400px', height: '400px', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'
                    }}
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
                    style={{
                        position: 'absolute', bottom: '-150px', left: '-100px',
                        width: '500px', height: '500px', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)'
                    }}
                />

                <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
                            padding: '0.5rem 1rem', borderRadius: '100px', marginBottom: '1.5rem',
                            color: 'white', fontSize: '0.85rem', fontWeight: 600,
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            <TrendingUp size={16} />
                            Trending Career Path
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, color: 'white',
                            lineHeight: 1.2, marginBottom: '1rem', maxWidth: '700px',
                            fontFamily: 'Montserrat, sans-serif'
                        }}>
                            Digital Marketing Jobs
                        </h1>
                        <p style={{
                            fontSize: '1.15rem', color: 'rgba(255,255,255,0.85)',
                            lineHeight: 1.6, maxWidth: '600px', marginBottom: '2rem'
                        }}>
                            From SEO to social media, PPC to brand strategy — find your next marketing role at India's top companies.
                        </p>
                    </motion.div>

                    {/* Stats Row */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                            gap: '1rem', maxWidth: '700px'
                        }}
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05, y: -4 }}
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.12)',
                                    backdropFilter: 'blur(10px)',
                                    padding: '1rem', borderRadius: '16px',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    display: 'flex', flexDirection: 'column', gap: '0.3rem'
                                }}
                            >
                                <stat.icon size={20} color={stat.color} />
                                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{stat.value}</span>
                                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{stat.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Controls Bar */}
            <div style={{
                maxWidth: '1200px', margin: '0 auto', padding: '2rem 2rem 0',
                display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {/* Search */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    backgroundColor: 'white', padding: '0.75rem 1.25rem',
                    borderRadius: '14px', border: '1px solid #E5E7EB',
                    flex: '1 1 300px', maxWidth: '500px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}>
                    <Search size={18} color="#9CA3AF" />
                    <input
                        type="text"
                        placeholder="Search marketing jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            border: 'none', outline: 'none', flex: 1,
                            fontSize: '0.95rem', color: '#374151', backgroundColor: 'transparent',
                            fontFamily: 'inherit'
                        }}
                    />
                </div>

                {/* Sort */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    backgroundColor: 'white', padding: '0.75rem 1.25rem',
                    borderRadius: '14px', border: '1px solid #E5E7EB',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}>
                    <SlidersHorizontal size={16} color="#6B7280" />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                            border: 'none', outline: 'none',
                            fontSize: '0.9rem', color: '#374151',
                            backgroundColor: 'transparent', cursor: 'pointer',
                            fontFamily: 'inherit', fontWeight: 500
                        }}
                    >
                        <option value="recent">Most Recent</option>
                        <option value="salary-high">Salary: High → Low</option>
                        <option value="salary-low">Salary: Low → High</option>
                        <option value="applicants">Most Applicants</option>
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <div style={{
                maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem 0',
                fontSize: '0.9rem', color: '#6B7280', fontWeight: 500
            }}>
                Showing <strong style={{ color: '#111827' }}>{marketingJobs.length}</strong> marketing jobs
            </div>

            {/* Job Cards Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                    maxWidth: '1200px', margin: '0 auto',
                    padding: '1.5rem 2rem 4rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: '1.5rem'
                }}
            >
                {marketingJobs.map((job, index) => (
                    <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index, duration: 0.4 }}
                    >
                        <JobCard job={job} />
                    </motion.div>
                ))}

                {marketingJobs.length === 0 && (
                    <div style={{
                        gridColumn: '1 / -1', textAlign: 'center',
                        padding: '4rem 2rem', color: '#9CA3AF'
                    }}>
                        <Search size={48} style={{ marginBottom: '1rem', opacity: 0.4 }} />
                        <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>No marketing jobs match your search.</p>
                        <p style={{ fontSize: '0.9rem' }}>Try adjusting your search term.</p>
                    </div>
                )}
            </motion.div>

            <Footer />
        </div>
    );
};

export default MarketingJobs;
