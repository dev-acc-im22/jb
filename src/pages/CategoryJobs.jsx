import React, { useState, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    TrendingUp, Search, Filter, ChevronUp, ChevronDown,
    MapPin, DollarSign, Briefcase, Building2, Clock, Globe,
    ArrowRight, CheckCircle, AlertCircle, X
} from 'lucide-react';
import { useJobs } from '../context/JobContext';
import Footer from '../components/layout/Footer';
import { categoryConfig } from '../data/categoryConfig';

// ─── Filter Section Component ───
const FilterSection = ({ title, isOpen, onToggle, children }) => (
    <div style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: '1rem', marginBottom: '1rem' }}>
        <button
            onClick={onToggle}
            style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                padding: 0, marginBottom: isOpen ? '0.75rem' : 0,
                fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: 700, color: '#111827'
            }}
        >
            {title}
            {isOpen ? <ChevronUp size={16} color="#6B7280" /> : <ChevronDown size={16} color="#6B7280" />}
        </button>
        {isOpen && children}
    </div>
);

// ─── Radio Option ───
const RadioOption = ({ label, checked, onChange }) => (
    <label style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer',
        fontSize: '0.85rem', color: checked ? '#111827' : '#4B5563',
        fontWeight: checked ? 600 : 400, padding: '0.2rem 0'
    }}>
        <div style={{
            width: '16px', height: '16px', borderRadius: '50%',
            border: `2px solid ${checked ? '#059669' : '#D1D5DB'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
            {checked && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669' }} />}
        </div>
        {label}
    </label>
);

// ─── Checkbox Option ───
const CheckboxOption = ({ label, checked, onChange }) => (
    <label style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer',
        fontSize: '0.85rem', color: checked ? '#111827' : '#4B5563',
        fontWeight: checked ? 600 : 400, padding: '0.2rem 0'
    }}>
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            style={{ width: '15px', height: '15px', accentColor: '#059669', cursor: 'pointer' }}
        />
        {label}
    </label>
);

// ─── Job Listing Row ───
const JobListingRow = ({ job }) => {
    const navigate = useNavigate();
    const tags = [];
    if (job.location === 'Remote') tags.push({ icon: Globe, label: 'Work from Home' });
    else tags.push({ icon: Building2, label: 'Work from Office' });
    tags.push({ icon: Briefcase, label: job.type });
    if (job.experience) tags.push({ icon: Clock, label: job.experience });

    return (
        <motion.div
            whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
            onClick={() => navigate(`/jobs/${job.id}`)}
            style={{
                background: 'white', borderRadius: '16px', padding: '1.25rem 1.5rem',
                border: '1px solid #E5E7EB', cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.03)', transition: 'box-shadow 0.2s ease',
                display: 'flex', alignItems: 'flex-start', gap: '1rem'
            }}
        >
            {/* Company Logo */}
            <div style={{
                width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0,
                background: '#EFF6FF', color: '#2563EB', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', fontWeight: 700, border: '1px solid #DBEAFE'
            }}>
                {job.company?.charAt(0)}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', margin: 0, lineHeight: 1.3 }}>
                            {job.title}
                        </h3>
                        <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '0.15rem 0 0', fontWeight: 500 }}>
                            {job.company}
                        </p>
                    </div>
                    <ArrowRight size={18} color="#2563EB" style={{ flexShrink: 0, marginTop: '2px' }} />
                </div>

                {/* Location + Salary */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.6rem', fontSize: '0.82rem', color: '#4B5563' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={13} color="#9CA3AF" /> {job.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <DollarSign size={13} color="#9CA3AF" /> {job.salary}
                    </span>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.6rem' }}>
                    {tags.map((tag, i) => (
                        <span key={i} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                            fontSize: '0.72rem', color: '#4B5563', fontWeight: 500,
                            background: '#F3F4F6', padding: '0.2rem 0.55rem', borderRadius: '6px'
                        }}>
                            <tag.icon size={11} color="#9CA3AF" /> {tag.label}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

// ─── Helper: parse "posted" string into hours ───
const parsePostedToHours = (posted) => {
    if (!posted) return Infinity;
    const lower = posted.toLowerCase();
    if (lower === 'just now') return 0;
    const match = lower.match(/(\d+)\s*(hour|day|week|month)/);
    if (!match) return Infinity;
    const num = parseInt(match[1]);
    const unit = match[2];
    if (unit === 'hour') return num;
    if (unit === 'day') return num * 24;
    if (unit === 'week') return num * 24 * 7;
    if (unit === 'month') return num * 24 * 30;
    return Infinity;
};

// ─── Helper: parse salary string to monthly number ───
const parseSalaryToMonthly = (salary) => {
    if (!salary) return 0;
    // Format: "₹14L - ₹22L" or "₹40K - ₹60K /month"
    const match = salary.match(/₹([\d.]+)(L|K)/);
    if (!match) return 0;
    const val = parseFloat(match[1]);
    const unit = match[2];
    if (unit === 'L') return val * 100000 / 12; // Annual to monthly
    if (unit === 'K') return val * 1000; // Already monthly
    return 0;
};


// ═══════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════
const CategoryJobs = () => {
    const { slug } = useParams();
    const { jobs } = useJobs();
    const config = categoryConfig[slug];

    // Filter state
    const [searchTerm, setSearchTerm] = useState('');
    const [datePosted, setDatePosted] = useState('all');
    const [minSalary, setMinSalary] = useState(0); // in lakhs
    const [workMode, setWorkMode] = useState([]);
    const [workType, setWorkType] = useState([]);
    const [workShift, setWorkShift] = useState([]);

    // Section open/close state
    const [sections, setSections] = useState({
        datePosted: true, salary: true, workMode: true, workType: true, workShift: true
    });

    const toggleSection = useCallback((key) => {
        setSections(prev => ({ ...prev, [key]: !prev[key] }));
    }, []);

    const toggleArrayFilter = useCallback((setter, value) => {
        setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    }, []);

    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (datePosted !== 'all') count++;
        if (minSalary > 0) count++;
        if (workMode.length > 0) count++;
        if (workType.length > 0) count++;
        if (workShift.length > 0) count++;
        return count;
    }, [datePosted, minSalary, workMode, workType, workShift]);

    const clearAllFilters = useCallback(() => {
        setDatePosted('all');
        setMinSalary(0);
        setWorkMode([]);
        setWorkType([]);
        setWorkShift([]);
        setSearchTerm('');
    }, []);

    // ─── Filter Logic ───
    const categoryJobs = useMemo(() => {
        if (!config) return [];
        let filtered = jobs.filter(job => job.category === config.contextCategory);

        // Search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(job =>
                job.title?.toLowerCase().includes(term) ||
                job.company?.toLowerCase().includes(term) ||
                job.description?.toLowerCase().includes(term)
            );
        }

        // Date Posted
        if (datePosted !== 'all') {
            const maxHours = { '24h': 24, '3d': 72, '7d': 168 }[datePosted] || Infinity;
            filtered = filtered.filter(job => parsePostedToHours(job.posted) <= maxHours);
        }

        // Salary
        if (minSalary > 0) {
            const minMonthly = minSalary * 100000 / 12;
            filtered = filtered.filter(job => parseSalaryToMonthly(job.salary) >= minMonthly);
        }

        // Work Mode
        if (workMode.length > 0) {
            filtered = filtered.filter(job => {
                const isRemote = job.location?.toLowerCase() === 'remote';
                if (workMode.includes('home') && isRemote) return true;
                if (workMode.includes('office') && !isRemote) return true;
                if (workMode.includes('field')) return true; // No field data, show all
                return false;
            });
        }

        // Work Type
        if (workType.length > 0) {
            filtered = filtered.filter(job => {
                const type = job.type?.toLowerCase() || '';
                if (workType.includes('fulltime') && type.includes('full')) return true;
                if (workType.includes('parttime') && type.includes('part')) return true;
                if (workType.includes('internship') && type.includes('intern')) return true;
                return false;
            });
        }

        return filtered;
    }, [jobs, config, searchTerm, datePosted, minSalary, workMode, workType]);

    // ─── Not Found ───
    if (!config) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB' }}>
                <AlertCircle size={48} color="#9CA3AF" style={{ marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>Category Not Found</h2>
                <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>The job category you're looking for doesn't exist.</p>
                <Link to="/" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>← Back to home</Link>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB' }}>

            {/* ─── Page Title ─── */}
            <div style={{
                maxWidth: '1200px', margin: '0 auto', padding: '100px 2rem 1.5rem',
            }}>
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        fontSize: '1.6rem', fontWeight: 800, color: '#1E3A5F',
                        fontFamily: "'Montserrat', sans-serif", lineHeight: 1.3, margin: 0
                    }}
                >
                    {config.label} — {categoryJobs.length} Verified Vacancies
                </motion.h1>
            </div>

            {/* ─── 3-Column Layout ─── */}
            <div style={{
                maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 3rem',
                display: 'flex', gap: '1.5rem', alignItems: 'flex-start'
            }}>

                {/* ═══ LEFT SIDEBAR — FILTERS ═══ */}
                <motion.aside
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        width: '260px', flexShrink: 0, position: 'sticky', top: '90px',
                        background: 'white', borderRadius: '16px', padding: '1.25rem',
                        border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                        maxHeight: 'calc(100vh - 110px)', overflowY: 'auto'
                    }}
                >
                    {/* Filter Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>
                            <Filter size={16} />
                            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                        </div>
                        {activeFilterCount > 0 && (
                            <button
                                onClick={clearAllFilters}
                                style={{
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    fontSize: '0.78rem', fontWeight: 600, color: '#2563EB',
                                    fontFamily: 'inherit', padding: 0
                                }}
                            >
                                Clear all
                            </button>
                        )}
                    </div>

                    {/* Search */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        background: '#F9FAFB', borderRadius: '10px', padding: '0.55rem 0.75rem',
                        border: '1px solid #E5E7EB', marginBottom: '1rem'
                    }}>
                        <Search size={14} color="#9CA3AF" />
                        <input
                            type="text" placeholder="Search jobs..."
                            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                            style={{
                                border: 'none', outline: 'none', background: 'transparent',
                                fontSize: '0.82rem', color: '#374151', width: '100%', fontFamily: 'inherit'
                            }}
                        />
                    </div>

                    {/* Date Posted */}
                    <FilterSection title="Date posted" isOpen={sections.datePosted} onToggle={() => toggleSection('datePosted')}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <RadioOption label="All" checked={datePosted === 'all'} onChange={() => setDatePosted('all')} />
                            <RadioOption label="Last 24 hours" checked={datePosted === '24h'} onChange={() => setDatePosted('24h')} />
                            <RadioOption label="Last 3 days" checked={datePosted === '3d'} onChange={() => setDatePosted('3d')} />
                            <RadioOption label="Last 7 days" checked={datePosted === '7d'} onChange={() => setDatePosted('7d')} />
                        </div>
                    </FilterSection>

                    {/* Salary */}
                    <FilterSection title="Salary" isOpen={sections.salary} onToggle={() => toggleSection('salary')}>
                        <div>
                            <p style={{ fontSize: '0.78rem', color: '#6B7280', margin: '0 0 0.5rem' }}>Minimum monthly salary</p>
                            <div style={{
                                background: '#059669', color: 'white', display: 'inline-block',
                                padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem',
                                fontWeight: 700, marginBottom: '0.5rem'
                            }}>
                                ₹{minSalary === 0 ? '0' : `${(minSalary / 12 * 10).toFixed(0)}K`}
                            </div>
                            <input
                                type="range" min={0} max={18} step={1}
                                value={minSalary}
                                onChange={e => setMinSalary(parseInt(e.target.value))}
                                style={{ width: '100%', accentColor: '#059669', cursor: 'pointer' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#9CA3AF', fontWeight: 500 }}>
                                <span>0</span>
                                <span>1.5 Lakhs</span>
                            </div>
                        </div>
                    </FilterSection>

                    {/* Work Mode */}
                    <FilterSection title="Work Mode" isOpen={sections.workMode} onToggle={() => toggleSection('workMode')}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <CheckboxOption label="Work from home" checked={workMode.includes('home')} onChange={() => toggleArrayFilter(setWorkMode, 'home')} />
                            <CheckboxOption label="Work from office" checked={workMode.includes('office')} onChange={() => toggleArrayFilter(setWorkMode, 'office')} />
                            <CheckboxOption label="Work from field" checked={workMode.includes('field')} onChange={() => toggleArrayFilter(setWorkMode, 'field')} />
                        </div>
                    </FilterSection>

                    {/* Work Type */}
                    <FilterSection title="Work Type" isOpen={sections.workType} onToggle={() => toggleSection('workType')}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <CheckboxOption label="Full time" checked={workType.includes('fulltime')} onChange={() => toggleArrayFilter(setWorkType, 'fulltime')} />
                            <CheckboxOption label="Part time" checked={workType.includes('parttime')} onChange={() => toggleArrayFilter(setWorkType, 'parttime')} />
                            <CheckboxOption label="Internship" checked={workType.includes('internship')} onChange={() => toggleArrayFilter(setWorkType, 'internship')} />
                        </div>
                    </FilterSection>

                    {/* Work Shift */}
                    <FilterSection title="Work Shift" isOpen={sections.workShift} onToggle={() => toggleSection('workShift')}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <CheckboxOption label="Day shift" checked={workShift.includes('day')} onChange={() => toggleArrayFilter(setWorkShift, 'day')} />
                            <CheckboxOption label="Night shift" checked={workShift.includes('night')} onChange={() => toggleArrayFilter(setWorkShift, 'night')} />
                        </div>
                    </FilterSection>
                </motion.aside>

                {/* ═══ CENTER — JOB LISTINGS ═══ */}
                <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {categoryJobs.length > 0 ? (
                        categoryJobs.map((job, index) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.03 * index, duration: 0.3 }}
                            >
                                <JobListingRow job={job} />
                            </motion.div>
                        ))
                    ) : (
                        <div style={{
                            textAlign: 'center', padding: '4rem 2rem', color: '#9CA3AF',
                            background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB'
                        }}>
                            <Search size={48} style={{ marginBottom: '1rem', opacity: 0.4 }} />
                            <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#6B7280' }}>No jobs match your filters.</p>
                            <p style={{ fontSize: '0.9rem' }}>Try adjusting your filters or search term.</p>
                            <button
                                onClick={clearAllFilters}
                                style={{
                                    marginTop: '1rem', padding: '0.6rem 1.5rem',
                                    background: '#2563EB', color: 'white', border: 'none',
                                    borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600,
                                    cursor: 'pointer', fontFamily: 'inherit'
                                }}
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </main>

                {/* ═══ RIGHT SIDEBAR — PROMO CTA ═══ */}
                <motion.aside
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    style={{
                        width: '280px', flexShrink: 0, position: 'sticky', top: '90px'
                    }}
                >
                    <div style={{
                        background: 'white', borderRadius: '16px', padding: '1.5rem',
                        border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
                    }}>
                        <h3 style={{
                            fontSize: '1.05rem', fontWeight: 800, color: '#1E3A5F',
                            lineHeight: 1.3, marginBottom: '1rem'
                        }}>
                            Know more about {config.label}
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                            {[
                                'Personalised job matches',
                                'Direct connect with HRs',
                                'Latest updates on the job'
                            ].map((text, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#374151' }}>
                                    <CheckCircle size={16} color="#059669" style={{ flexShrink: 0 }} />
                                    {text}
                                </div>
                            ))}
                        </div>

                        {/* Gradient illustration placeholder */}
                        <div style={{
                            width: '100%', height: '140px', borderRadius: '12px',
                            background: 'linear-gradient(135deg, #EFF6FF, #E0E7FF, #C7D2FE)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: '1rem'
                        }}>
                            <Briefcase size={40} color="#6366F1" style={{ opacity: 0.4 }} />
                        </div>

                        <Link to="/register" style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            gap: '0.4rem', width: '100%', padding: '0.75rem',
                            background: '#059669', color: 'white', borderRadius: '12px',
                            fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none',
                            border: 'none', cursor: 'pointer', fontFamily: 'inherit'
                        }}>
                            Create profile <ArrowRight size={16} />
                        </Link>
                    </div>
                </motion.aside>
            </div>

            <Footer />
        </div>
    );
};

export default CategoryJobs;
