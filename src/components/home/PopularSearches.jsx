import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Briefcase, Home, Clock, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';

const TRENDING_CATEGORIES = [
    {
        rank: 1,
        title: 'Jobs for Freshers',
        keyword: 'Fresher',
        icon: Briefcase,
        accent: '#2563EB',
        bgAccent: 'rgba(37, 99, 235, 0.08)'
    },
    {
        rank: 2,
        title: 'Work from Home Jobs',
        keyword: 'Remote',
        icon: Home,
        accent: '#7C3AED',
        bgAccent: 'rgba(124, 58, 237, 0.08)'
    },
    {
        rank: 3,
        title: 'Part Time Jobs',
        keyword: 'Part Time',
        icon: Clock,
        accent: '#059669',
        bgAccent: 'rgba(5, 150, 105, 0.08)'
    },
    {
        rank: 4,
        title: 'Jobs for Women',
        keyword: 'Women',
        icon: Users,
        accent: '#DB2777',
        bgAccent: 'rgba(219, 39, 119, 0.08)'
    },
    {
        rank: 5,
        title: 'Full Time Jobs',
        keyword: 'Full Time',
        icon: Calendar,
        accent: '#EA580C',
        bgAccent: 'rgba(234, 88, 12, 0.08)'
    }
];

const TrendingCard = ({ category, index }) => {
    const navigate = useNavigate();
    const { setSearchFilter } = useJobs();
    const Icon = category.icon;

    const handleClick = () => {
        setSearchFilter(prev => ({ ...prev, keyword: category.keyword }));
        navigate('/search');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            whileHover={{ y: -2, boxShadow: '0 6px 16px rgba(0,0,0,0.05)' }}
            onClick={handleClick}
            style={{
                background: '#FFFFFF',
                borderRadius: '10px',
                padding: '0.5rem 0.75rem',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                transition: 'box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem',
                minHeight: 'auto'
            }}
        >

            {/* Trending badge */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
            }}>
                <TrendingUp size={9} color={category.accent} strokeWidth={3} />
                <span style={{
                    fontSize: '0.5rem',
                    fontWeight: 700,
                    color: category.accent,
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px'
                }}>
                    Trending at #{category.rank}
                </span>
            </div>

            {/* Icon + Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', zIndex: 2 }}>
                <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    background: category.bgAccent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                }}>
                    <Icon size={12} color={category.accent} strokeWidth={2.5} />
                </div>
                <h3 style={{
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    margin: 0,
                    lineHeight: 1.1
                }}>
                    {category.title}
                </h3>
            </div>

            {/* View all link */}
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.2rem',
                fontSize: '0.62rem',
                fontWeight: 700,
                color: category.accent,
                background: category.bgAccent.replace('0.08', '0.15'),
                padding: '0.25rem 0.6rem',
                borderRadius: '100px',
                zIndex: 2,
                marginTop: '0.3rem',
                width: 'fit-content'
            }}>
                View all <ArrowRight size={10} />
            </div>
        </motion.div>
    );
};

const PopularSearches = () => {
    return (
        <section style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '2.5rem 2rem'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '1rem 1.25rem',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 6px 20px -5px rgba(0,0,0,0.04)'
            }}>
                {/* Layout: Title column + Cards grid */}
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    alignItems: 'flex-start'
                }}>
                    {/* Title Column */}
                    <div style={{
                        minWidth: '160px',
                        maxWidth: '180px',
                        flexShrink: 0
                    }}>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={{
                                fontSize: '1.5rem',
                                fontWeight: 900,
                                color: '#0F172A',
                                lineHeight: 1.1,
                                letterSpacing: '-0.5px',
                                margin: 0
                            }}
                        >
                            Popular<br />Searches
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            style={{
                                fontSize: '0.7rem',
                                color: '#64748B',
                                marginTop: '0.4rem',
                                lineHeight: 1.4
                            }}
                        >
                            Explore trending job categories.
                        </motion.p>
                    </div>

                    {/* Cards Grid */}
                    <div style={{
                        flex: 1,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '0.5rem'
                    }}>
                        {TRENDING_CATEGORIES.map((category, index) => (
                            <TrendingCard key={category.rank} category={category} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularSearches;
