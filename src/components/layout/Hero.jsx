import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Sparkles, ArrowRight, Briefcase, Building2, Users, TrendingUp } from 'lucide-react';
import Button from '../ui/Button';
import { useJobs } from '../../context/JobContext';

const ROTATING_WORDS = ['Effortlessly', 'Seamlessly', 'Confidently', 'Instantly'];
const TRUSTED_BY = ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Razorpay', 'Swiggy'];

const Hero = () => {
    const { jobs, searchFilter, setSearchFilter } = useJobs();
    const navigate = useNavigate();
    const [wordIndex, setWordIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestions, setActiveSuggestions] = useState([]);
    const searchContainerRef = useRef(null);
    const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
    const [activeLocationSuggestions, setActiveLocationSuggestions] = useState([]);
    const locationContainerRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex(prev => (prev + 1) % ROTATING_WORDS.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
            if (locationContainerRef.current && !locationContainerRef.current.contains(event.target)) {
                setShowLocationSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => window.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchFilter(prev => ({ ...prev, keyword: query }));

        if (query.trim().length > 0) {
            const term = query.toLowerCase();
            const matches = jobs
                .map(job => job.title)
                .filter(title => title.toLowerCase().includes(term))
                // Ensure unique titles
                .filter((value, index, self) => self.indexOf(value) === index)
                .slice(0, 5); // Max 5 suggestions

            setActiveSuggestions(matches);
            setShowSuggestions(matches.length > 0);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchFilter(prev => ({ ...prev, keyword: suggestion }));
        setShowSuggestions(false);
    };

    const handleLocationChange = (e) => {
        const query = e.target.value;
        setSearchFilter(prev => ({ ...prev, location: query }));

        if (query.trim().length > 0) {
            const term = query.toLowerCase();
            const matches = jobs
                .map(job => job.location)
                .filter(location => location && location.toLowerCase().includes(term))
                // Ensure unique locations
                .filter((value, index, self) => self.indexOf(value) === index)
                .slice(0, 5); // Max 5 suggestions

            setActiveLocationSuggestions(matches);
            setShowLocationSuggestions(matches.length > 0);
        } else {
            setShowLocationSuggestions(false);
        }
    };

    const handleLocationSuggestionClick = (suggestion) => {
        setSearchFilter(prev => ({ ...prev, location: suggestion }));
        setShowLocationSuggestions(false);
    };

    const handleSearchSubmit = () => {
        navigate('/search');
    };

    return (
        <section style={{
            position: 'relative',
            padding: '160px 2rem 80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 100%)'
        }}>

            {/* Animated Background Orbs */}
            <motion.div
                animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute', top: '-60px', left: '-80px',
                    width: '400px', height: '400px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
                    filter: 'blur(40px)', pointerEvents: 'none'
                }}
            />
            <motion.div
                animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute', top: '20px', right: '-100px',
                    width: '500px', height: '500px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
                    filter: 'blur(50px)', pointerEvents: 'none'
                }}
            />
            <motion.div
                animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute', bottom: '40px', left: '20%',
                    width: '300px', height: '300px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
                    filter: 'blur(40px)', pointerEvents: 'none'
                }}
            />

            {/* Subtle Grid Pattern */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.3,
                backgroundImage: 'radial-gradient(circle, #CBD5E1 1px, transparent 1px)',
                backgroundSize: '48px 48px'
            }} />

            {/* Floating Emojis */}
            {[
                { emoji: '💼', top: '20%', left: '8%', duration: 5, delay: 0, size: '2.2rem' },
                { emoji: '🚀', top: '55%', left: '6%', duration: 4.5, delay: 0.5, size: '2rem' },
                { emoji: '📊', top: '75%', left: '12%', duration: 5.5, delay: 1, size: '1.8rem' },
                { emoji: '💡', top: '35%', left: '3%', duration: 4, delay: 1.5, size: '1.6rem' },
                { emoji: '🎯', top: '25%', right: '7%', duration: 4.8, delay: 0.3, size: '2rem' },
                { emoji: '⭐', top: '50%', right: '5%', duration: 5.2, delay: 0.8, size: '1.8rem' },
                { emoji: '📈', top: '70%', right: '10%', duration: 4.2, delay: 1.2, size: '2.2rem' },
                { emoji: '🏢', top: '40%', right: '3%', duration: 5, delay: 0.6, size: '1.6rem' },
            ].map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + item.delay, duration: 0.5 }}
                    style={{
                        position: 'absolute',
                        top: item.top,
                        left: item.left,
                        right: item.right,
                        fontSize: item.size,
                        pointerEvents: 'none',
                        zIndex: 1
                    }}
                >
                    <motion.span
                        animate={{
                            y: [0, -35, 0],
                            x: [0, i % 2 === 0 ? 25 : -25, 0],
                            rotate: [0, i % 2 === 0 ? 30 : -30, 0],
                            scale: [1, 1.25, 1]
                        }}
                        transition={{
                            duration: item.duration,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: item.delay
                        }}
                        style={{ display: 'block' }}
                    >
                        {item.emoji}
                    </motion.span>
                </motion.div>
            ))}

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{ maxWidth: '860px', position: 'relative', zIndex: 2 }}
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.5rem 1.25rem', borderRadius: '100px',
                        background: 'linear-gradient(135deg, #EFF6FF, #E0E7FF)',
                        border: '1px solid rgba(99,102,241,0.15)',
                        marginBottom: '2rem', fontSize: '0.85rem',
                        fontWeight: 700, color: '#4338CA',
                        boxShadow: '0 2px 12px rgba(99,102,241,0.1)'
                    }}
                >
                    <Sparkles size={16} />
                    #1 Platform for Careers
                </motion.div>

                {/* Heading with Rotating Word */}
                <h1 style={{
                    fontSize: '4.2rem', fontWeight: 800, lineHeight: 1.1,
                    letterSpacing: '-2px', color: '#0F172A',
                    marginBottom: '1.5rem'
                }}>
                    Find your dream job<br />
                    <span style={{ position: 'relative', display: 'inline-block' }}>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={wordIndex}
                                initial={{ y: 30, opacity: 0, rotateX: -40 }}
                                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                exit={{ y: -30, opacity: 0, rotateX: 40 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                style={{
                                    display: 'inline-block',
                                    background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}
                            >
                                {ROTATING_WORDS[wordIndex]}.
                            </motion.span>
                        </AnimatePresence>
                        {/* Underline Accent */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
                            style={{
                                position: 'absolute', bottom: '-4px', left: 0, right: 0,
                                height: '6px', borderRadius: '3px', transformOrigin: 'left',
                                background: 'linear-gradient(90deg, #2563EB, #7C3AED, #EC4899)',
                                opacity: 0.3
                            }}
                        />
                    </span>
                </h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{
                        fontSize: '1.2rem', color: '#64748B', lineHeight: 1.7,
                        maxWidth: '560px', margin: '0 auto 2.5rem'
                    }}
                >
                    Explore thousands of opportunities from top companies and startups worldwide. Your next big career move starts here.
                </motion.p>

                {/* Search Bar — Glassmorphic */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '20px',
                        display: 'flex',
                        gap: '0.5rem',
                        maxWidth: '780px',
                        width: '100%',
                        margin: '0 auto',
                        background: '#FFFFFF',
                        border: '1.5px solid rgba(0,0,0,0.15)',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1), 0 0 20px rgba(37,99,235,0.08)'
                    }}
                >
                    <div ref={searchContainerRef} style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', padding: '0.6rem 1.25rem', gap: '0.6rem' }}>
                        <Search size={20} color="#94A3B8" />
                        <input
                            placeholder="Enter Job Title / Designation "
                            value={searchFilter.keyword}
                            onChange={handleSearchChange}
                            onFocus={() => {
                                if (activeSuggestions.length > 0) setShowSuggestions(true);
                            }}
                            style={{
                                width: '100%', border: 'none', outline: 'none', background: 'none',
                                fontSize: '0.95rem', fontWeight: 500, color: '#1E293B',
                                fontFamily: "'Montserrat', sans-serif"
                            }}
                        />

                        {/* Autocomplete Dropdown */}
                        <AnimatePresence>
                            {showSuggestions && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        width: '100%',
                                        background: '#FFFFFF',
                                        borderRadius: '12px',
                                        marginTop: '0.5rem',
                                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid rgba(0,0,0,0.08)',
                                        zIndex: 50,
                                        overflow: 'hidden',
                                        textAlign: 'left'
                                    }}
                                >
                                    {activeSuggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            style={{
                                                padding: '0.75rem 1.25rem',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                color: '#1E293B',
                                                fontWeight: 500,
                                                borderBottom: index < activeSuggestions.length - 1 ? '1px solid #F1F5F9' : 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}
                                            onMouseOver={(e) => Object.assign(e.currentTarget.style, { background: '#F8FAFC', color: '#2563EB' })}
                                            onMouseOut={(e) => Object.assign(e.currentTarget.style, { background: '#FFFFFF', color: '#1E293B' })}
                                        >
                                            <Search size={14} color="#94A3B8" />
                                            {suggestion}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div style={{ width: '1px', backgroundColor: '#E2E8F0', margin: '0.6rem 0' }} />
                    <div ref={locationContainerRef} style={{ flex: 0.7, position: 'relative', display: 'flex', alignItems: 'center', padding: '0.6rem 1.25rem', gap: '0.6rem' }}>
                        <MapPin size={20} color="#94A3B8" />
                        <input
                            placeholder="City or remote"
                            value={searchFilter.location}
                            onChange={handleLocationChange}
                            onFocus={() => {
                                if (activeLocationSuggestions.length > 0) setShowLocationSuggestions(true);
                            }}
                            style={{
                                width: '100%', border: 'none', outline: 'none', background: 'none',
                                fontSize: '0.95rem', fontWeight: 500, color: '#1E293B',
                                fontFamily: "'Montserrat', sans-serif"
                            }}
                        />

                        {/* Location Autocomplete Dropdown */}
                        <AnimatePresence>
                            {showLocationSuggestions && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        width: '100%',
                                        background: '#FFFFFF',
                                        borderRadius: '12px',
                                        marginTop: '0.5rem',
                                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid rgba(0,0,0,0.08)',
                                        zIndex: 50,
                                        overflow: 'hidden',
                                        textAlign: 'left'
                                    }}
                                >
                                    {activeLocationSuggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleLocationSuggestionClick(suggestion)}
                                            style={{
                                                padding: '0.75rem 1.25rem',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                color: '#1E293B',
                                                fontWeight: 500,
                                                borderBottom: index < activeLocationSuggestions.length - 1 ? '1px solid #F1F5F9' : 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}
                                            onMouseOver={(e) => Object.assign(e.currentTarget.style, { background: '#F8FAFC', color: '#2563EB' })}
                                            onMouseOut={(e) => Object.assign(e.currentTarget.style, { background: '#FFFFFF', color: '#1E293B' })}
                                        >
                                            <MapPin size={14} color="#94A3B8" />
                                            {suggestion}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.03, boxShadow: '0 8px 25px rgba(37,99,235,0.3)' }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleSearchSubmit}
                        style={{
                            padding: '0.85rem 2rem', borderRadius: '14px', border: 'none',
                            background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                            color: 'white', fontSize: '0.95rem', fontWeight: 700,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                            boxShadow: '0 4px 16px rgba(37,99,235,0.25)',
                            fontFamily: "'Montserrat', sans-serif",
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Search <ArrowRight size={18} />
                    </motion.button>
                </motion.div>

                {/* Quick Tags */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    style={{ marginTop: '1.25rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.8rem', color: '#94A3B8' }}
                >
                    <span>Popular:</span>
                    {['Remote', 'Full Stack', 'Data Science', 'Product Manager', 'UI/UX'].map(tag => (
                        <motion.span
                            key={tag}
                            whileHover={{ color: '#2563EB', cursor: 'pointer' }}
                            onClick={() => {
                                setSearchFilter(prev => ({ ...prev, keyword: tag }));
                                navigate('/search');
                            }}
                            style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}
                        >
                            {tag}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Stats Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    style={{
                        marginTop: '3rem', display: 'flex', gap: '0', justifyContent: 'center',
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(0,0,0,0.06)',
                        borderRadius: '16px',
                        padding: '0',
                        maxWidth: '600px',
                        margin: '3rem auto 0'
                    }}
                >
                    {[
                        { icon: Briefcase, value: '12K+', label: 'Live Jobs', color: '#2563EB' },
                        { icon: Building2, value: '500+', label: 'Companies', color: '#7C3AED' },
                        { icon: Users, value: '1M+', label: 'Candidates', color: '#0EA5E9' },
                        { icon: TrendingUp, value: '98%', label: 'Success', color: '#10B981' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ backgroundColor: 'rgba(37,99,235,0.04)' }}
                            style={{
                                flex: 1, padding: '1.25rem 1rem', textAlign: 'center',
                                borderRight: i < 3 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                                transition: 'background 0.2s'
                            }}
                        >
                            <stat.icon size={20} color={stat.color} style={{ marginBottom: '0.4rem' }} />
                            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A' }}>{stat.value}</div>
                            <div style={{ fontSize: '0.75rem', color: '#111827', fontWeight: 500 }}>{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Trusted By Marquee */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    style={{
                        marginTop: '2.5rem', textAlign: 'center',
                        background: 'linear-gradient(135deg, #0F172A, #1E293B)',
                        borderRadius: '16px',
                        padding: '1.5rem 2rem',
                        maxWidth: '700px',
                        width: '100%',
                        margin: '2.5rem auto 0'
                    }}
                >
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500, display: 'block', marginBottom: '0.75rem' }}>Trusted by teams at</span>
                    <div style={{
                        overflow: 'hidden',
                        position: 'relative',
                        maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
                        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)'
                    }}>
                        <div style={{
                            display: 'flex',
                            gap: '3rem',
                            animation: 'marquee 15s linear infinite',
                            width: 'max-content'
                        }}>
                            {[...TRUSTED_BY, ...TRUSTED_BY, ...TRUSTED_BY].map((name, i) => (
                                <span key={i} style={{
                                    fontSize: '1rem', fontWeight: 700, color: '#FFFFFF',
                                    letterSpacing: '0.5px', whiteSpace: 'nowrap'
                                }}>
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <style>{`
                        @keyframes marquee {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-33.33%); }
                        }
                    `}</style>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
