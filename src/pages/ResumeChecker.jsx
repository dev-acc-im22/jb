import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, CheckCircle, XCircle, AlertTriangle, FileText, Wand2, ArrowRight, BarChart3, Shield, Zap, ChevronDown, ChevronUp, RotateCcw, TrendingUp, Target, Eye, Lightbulb } from 'lucide-react';

const checkCategories = [
    { label: 'ATS Compatibility', icon: Shield, color: '#2563EB', details: 'How well your resume parses through Applicant Tracking Systems' },
    { label: 'Content Quality', icon: FileText, color: '#7C3AED', details: 'Grammar, impact verbs, and achievement-oriented language' },
    { label: 'Formatting', icon: BarChart3, color: '#0891B2', details: 'Layout, font usage, section structure, and readability' },
    { label: 'Keyword Match', icon: Zap, color: '#EA580C', details: 'Industry-standard keywords and skills presence' },
];

const sampleIssues = [
    { type: 'error', text: 'Missing quantifiable achievements in work experience — add metrics like percentages, revenue, or user counts', section: 'Experience', priority: 'High' },
    { type: 'error', text: 'No professional summary found — recruiters spend 6 seconds on first scan', section: 'Summary', priority: 'High' },
    { type: 'warning', text: 'Email format may not be ATS-friendly — use a standard format like name@domain.com', section: 'Contact', priority: 'Medium' },
    { type: 'warning', text: 'Consider adding 3–5 more technical skills relevant to your target role', section: 'Skills', priority: 'Medium' },
    { type: 'warning', text: 'Resume exceeds recommended 1-page length for candidates with < 10 years experience', section: 'Format', priority: 'Medium' },
    { type: 'success', text: 'Good use of action verbs — "led", "developed", "optimized" are strong choices', section: 'Experience', priority: 'Low' },
    { type: 'success', text: 'Clean, consistent date formatting throughout the document', section: 'Experience', priority: 'Low' },
    { type: 'success', text: 'Education section is well structured with relevant details', section: 'Education', priority: 'Low' },
    { type: 'success', text: 'File format (PDF) is the preferred format for most ATS systems', section: 'Format', priority: 'Low' },
];

const sampleSuggestions = [
    { title: 'Add a professional summary', desc: 'Start with a 2–3 sentence overview highlighting your years of experience, key skills, and career goals.' },
    { title: 'Quantify your achievements', desc: 'Replace "improved performance" with "improved app performance by 40%, reducing load time from 3.2s to 1.9s".' },
    { title: 'Optimize for ATS keywords', desc: 'Include keywords from the job description: "project management", "agile", "stakeholder communication".' },
    { title: 'Add a skills section', desc: 'Create a dedicated skills section with 8–12 relevant hard and soft skills for better ATS parsing.' },
];

function AnimatedScore({ target, color, size = 120, strokeWidth = 8 }) {
    const [current, setCurrent] = useState(0);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        let frame;
        const duration = 1200;
        const start = performance.now();
        const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(Math.round(target * eased));
            if (progress < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [target]);

    const offset = circumference - (current / 100) * circumference;

    return (
        <div style={{ position: 'relative', width: size, height: size }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={size / 2} cy={size / 2} r={radius}
                    fill="none" stroke="#F1F5F9" strokeWidth={strokeWidth} />
                <circle cx={size / 2} cy={size / 2} r={radius}
                    fill="none" stroke={color} strokeWidth={strokeWidth}
                    strokeDasharray={circumference} strokeDashoffset={offset}
                    strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.1s ease' }} />
            </svg>
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
                <span style={{ fontSize: size * 0.28, fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{current}</span>
                <span style={{ fontSize: size * 0.1, color: '#94A3B8', fontWeight: 600 }}>/ 100</span>
            </div>
        </div>
    );
}

function MiniScoreBar({ score, color, label }) {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const t = setTimeout(() => setWidth(score), 300);
        return () => clearTimeout(t);
    }, [score]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>{label}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: color }}>{score}%</span>
            </div>
            <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                    height: '100%', width: `${width}%`, background: color,
                    borderRadius: '3px', transition: 'width 1s cubic-bezier(0.4,0,0.2,1)'
                }} />
            </div>
        </div>
    );
}

export default function ResumeChecker() {
    const [uploaded, setUploaded] = useState(false);
    const [fileName, setFileName] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [done, setDone] = useState(false);
    const [scores, setScores] = useState([null, null, null, null]);
    const [dragOver, setDragOver] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [expandedSuggestion, setExpandedSuggestion] = useState(0);
    const fileRef = useRef(null);

    const handleUpload = (name) => {
        setFileName(name || 'resume_john_doe.pdf');
        setUploaded(true);
        setAnalyzing(true);
        setTimeout(() => {
            setAnalyzing(false);
            setDone(true);
            setScores([78, 85, 92, 65]);
        }, 2500);
    };

    const handleReset = () => {
        setUploaded(false);
        setDone(false);
        setAnalyzing(false);
        setScores([null, null, null, null]);
        setFileName('');
        setActiveFilter('all');
    };

    const overallScore = done ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

    const getScoreColor = (s) => {
        if (s >= 80) return '#059669';
        if (s >= 60) return '#D97706';
        return '#DC2626';
    };
    const getScoreLabel = (s) => {
        if (s >= 90) return 'Excellent';
        if (s >= 80) return 'Great';
        if (s >= 70) return 'Good';
        if (s >= 60) return 'Fair';
        return 'Needs Work';
    };

    const getIcon = (type) => {
        if (type === 'error') return <XCircle size={16} color="#DC2626" />;
        if (type === 'warning') return <AlertTriangle size={16} color="#92400E" />;
        return <CheckCircle size={16} color="#059669" />;
    };

    const filteredIssues = activeFilter === 'all' ? sampleIssues : sampleIssues.filter(i => i.type === activeFilter);
    const errorCount = sampleIssues.filter(i => i.type === 'error').length;
    const warningCount = sampleIssues.filter(i => i.type === 'warning').length;
    const successCount = sampleIssues.filter(i => i.type === 'success').length;

    return (
        <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#F8FAFC', minHeight: '100vh' }}>
            <section style={{
                background: 'linear-gradient(135deg, #1D4ED8 0%, #1E3A8A 30%, #172554 65%, #0F172A 100%)',
                padding: '6rem 2rem 4rem', color: 'white', position: 'relative', overflow: 'hidden'
            }}>
                {/* Decorative orbs */}
                <div style={{
                    position: 'absolute', top: '-60px', right: '-40px', width: '250px', height: '250px',
                    borderRadius: '50%', background: 'rgba(255,255,255,0.06)', filter: 'blur(40px)'
                }} />
                <div style={{
                    position: 'absolute', bottom: '-50px', left: '10%', width: '200px', height: '200px',
                    borderRadius: '50%', background: 'rgba(255,255,255,0.04)', filter: 'blur(30px)'
                }} />
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.07,
                    backgroundImage: 'radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 30%, white 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ maxWidth: '560px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
                            <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                                background: 'rgba(255,255,255,0.15)', padding: '0.35rem 1rem',
                                borderRadius: '100px', fontSize: '0.78rem', fontWeight: 700,
                                backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)'
                            }}>✨ AI-Powered Analysis</span>
                            <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                background: 'rgba(16,185,129,0.2)', padding: '0.35rem 1rem',
                                borderRadius: '100px', fontSize: '0.78rem', fontWeight: 700,
                                border: '1px solid rgba(16,185,129,0.3)', color: '#D1FAE5'
                            }}>100% Free</span>
                        </div>
                        <h1 style={{
                            fontSize: '2.6rem', fontWeight: 800, margin: '0 0 0.85rem', lineHeight: 1.15, letterSpacing: '-0.02em',
                            background: 'linear-gradient(90deg, #93C5FD 0%, #3B82F6 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textFillColor: 'transparent',
                            display: 'inline-block'
                        }}>
                            AI Resume Checker
                        </h1>
                        <p style={{ fontSize: '1.05rem', opacity: 0.9, lineHeight: 1.75, margin: 0, fontWeight: 400 }}>
                            Get instant, detailed feedback on ATS compatibility, content quality, formatting, and keyword optimization.
                        </p>
                    </div>
                    {/* Stats with glass background */}
                    <div style={{
                        display: 'flex', gap: '0', background: 'rgba(255,255,255,0.1)',
                        borderRadius: '16px', padding: '1.1rem 0.5rem',
                        backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)'
                    }}>
                        {[
                            { num: '25K+', label: 'Resumes Analyzed' },
                            { num: '4', label: 'Check Categories' },
                            { num: '< 3s', label: 'Analysis Time' },
                        ].map((s, i) => (
                            <div key={i} style={{
                                textAlign: 'center', padding: '0 1.2rem',
                                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.15)' : 'none'
                            }}>
                                <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{s.num}</div>
                                <div style={{ fontSize: '0.68rem', marginTop: '0.2rem', whiteSpace: 'nowrap', opacity: 0.75, fontWeight: 500 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
                {/* Upload Area */}
                {!uploaded && (
                    <div style={{ marginTop: '-1.75rem', position: 'relative', zIndex: 2 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem', alignItems: 'start' }}>
                            {/* Upload Card */}
                            <div
                                onClick={() => handleUpload('resume_john_doe.pdf')}
                                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; handleUpload(f?.name); }}
                                style={{
                                    background: 'white', borderRadius: '20px', padding: '3rem 2.5rem',
                                    border: dragOver ? '2px dashed #2563EB' : '2px dashed #CBD5E1',
                                    textAlign: 'center', cursor: 'pointer', transition: 'all 0.25s',
                                    boxShadow: dragOver ? '0 12px 40px rgba(37,99,235,0.15)' : '0 8px 30px rgba(0,0,0,0.06)',
                                    transform: dragOver ? 'scale(1.01)' : 'scale(1)'
                                }}
                                onMouseOver={e => { if (!dragOver) { e.currentTarget.style.borderColor = '#93C5FD'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(37,99,235,0.1)'; } }}
                                onMouseOut={e => { if (!dragOver) { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)'; } }}
                            >
                                <input
                                    ref={fileRef} type="file" accept=".pdf,.docx,.txt"
                                    style={{ display: 'none' }}
                                    onChange={e => { const f = e.target.files[0]; if (f) handleUpload(f.name); }}
                                />
                                <div style={{
                                    width: '72px', height: '72px', borderRadius: '18px',
                                    background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1.25rem', border: '1px solid #BFDBFE',
                                    boxShadow: '0 4px 12px rgba(37,99,235,0.1)'
                                }}>
                                    <Upload size={28} color="#2563EB" />
                                </div>
                                <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                                    Drop your resume here or click to upload
                                </div>
                                <div style={{ color: '#64748B', fontSize: '0.88rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                                    Supports PDF, DOCX, and TXT • Max 5MB
                                </div>
                                <button style={{
                                    background: 'linear-gradient(135deg, #2563EB, #3B82F6)', color: 'white',
                                    border: 'none', padding: '0.85rem 2.5rem', borderRadius: '12px',
                                    fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
                                    fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                    boxShadow: '0 4px 14px rgba(37,99,235,0.3)', transition: 'all 0.2s'
                                }}
                                    onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.35)'; }}
                                    onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(37,99,235,0.3)'; }}
                                >
                                    <Upload size={16} /> Upload Resume
                                </button>
                                <div
                                    onClick={e => { e.stopPropagation(); fileRef.current?.click(); }}
                                    style={{ fontSize: '0.76rem', color: '#3B82F6', marginTop: '1rem', cursor: 'pointer', fontWeight: 600, transition: 'color 0.2s' }}
                                    onMouseOver={e => e.currentTarget.style.color = '#1D4ED8'}
                                    onMouseOut={e => e.currentTarget.style.color = '#3B82F6'}
                                >
                                    or select a file from your device
                                </div>
                            </div>

                            {/* Right Sidebar — What We Check */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{
                                    background: 'white', borderRadius: '14px', padding: '1.25rem',
                                    border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
                                }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0F172A', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                        <Eye size={15} color="#2563EB" /> What We Analyze
                                    </div>
                                    {checkCategories.map((cat, i) => {
                                        const Icon = cat.icon;
                                        return (
                                            <div key={i} style={{
                                                display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                                                padding: '0.6rem 0',
                                                borderBottom: i < checkCategories.length - 1 ? '1px solid #F1F5F9' : 'none'
                                            }}>
                                                <div style={{
                                                    width: '30px', height: '30px', borderRadius: '8px',
                                                    background: `${cat.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    flexShrink: 0
                                                }}>
                                                    <Icon size={15} color={cat.color} />
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#1E293B' }}>{cat.label}</div>
                                                    <div style={{ fontSize: '0.68rem', color: '#64748B', lineHeight: 1.4, marginTop: '0.1rem' }}>{cat.details}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div style={{
                                    background: 'linear-gradient(135deg, #F0F9FF, #EFF6FF)', borderRadius: '14px', padding: '1rem 1.25rem',
                                    border: '1px solid #BFDBFE'
                                }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#1E3A5F', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        <Lightbulb size={13} color="#2563EB" /> Did you know?
                                    </div>
                                    <div style={{ fontSize: '0.72rem', color: '#334155', lineHeight: 1.5 }}>
                                        75% of resumes are rejected by ATS before a human ever sees them. Our checker helps ensure yours gets through.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Analyzing State */}
                {uploaded && analyzing && (
                    <div style={{
                        background: 'white', borderRadius: '16px', padding: '3rem',
                        textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0',
                        marginTop: '-1.25rem', position: 'relative', zIndex: 2
                    }}>
                        <div style={{
                            width: '56px', height: '56px', borderRadius: '50%', margin: '0 auto 1.25rem',
                            border: '3px solid #E2E8F0', borderTopColor: '#2563EB',
                            animation: 'rcSpin 0.9s linear infinite'
                        }} />
                        <style>{`@keyframes rcSpin { to { transform: rotate(360deg); } }`}</style>
                        <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '1.05rem' }}>Analyzing your resume...</div>
                        <div style={{ color: '#64748B', fontSize: '0.82rem', marginTop: '0.3rem' }}>Checking ATS compatibility, formatting, and keywords</div>
                        <div style={{
                            display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.25rem'
                        }}>
                            {['ATS Check', 'Content Scan', 'Format Analysis', 'Keywords'].map((s, i) => (
                                <span key={i} style={{
                                    fontSize: '0.68rem', fontWeight: 600, padding: '0.25rem 0.65rem',
                                    borderRadius: '100px', background: '#F1F5F9', color: '#64748B'
                                }}>{s}</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Results */}
                {done && (
                    <div style={{ marginTop: '-1.25rem', position: 'relative', zIndex: 2 }}>
                        {/* Top Score Bar */}
                        <div style={{
                            background: 'white', borderRadius: '16px', padding: '1.5rem 2rem',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0',
                            display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.25rem'
                        }}>
                            <AnimatedScore target={overallScore} color={getScoreColor(overallScore)} size={100} strokeWidth={7} />
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                                        {getScoreLabel(overallScore)}
                                    </span>
                                    <span style={{
                                        fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.6rem',
                                        borderRadius: '100px',
                                        background: overallScore >= 80 ? '#F0FDF4' : overallScore >= 60 ? '#FFFBEB' : '#FEF2F2',
                                        color: overallScore >= 80 ? '#166534' : overallScore >= 60 ? '#92400E' : '#991B1B'
                                    }}>
                                        {overallScore >= 80 ? 'Ready to apply' : overallScore >= 60 ? 'Room to improve' : 'Needs attention'}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '1rem', lineHeight: 1.4 }}>
                                    Your resume scores {overallScore}/100 overall. Fix the {errorCount} critical issues below to significantly improve your chances.
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
                                    {checkCategories.map((cat, i) => (
                                        <MiniScoreBar key={i} score={scores[i]} color={cat.color} label={cat.label} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Two-column layout: Issues + Suggestions */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.25rem', alignItems: 'start' }}>
                            {/* Issues Panel */}
                            <div style={{
                                background: 'white', borderRadius: '16px', padding: '1.5rem',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Detailed Feedback</h3>
                                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                                        {[
                                            { key: 'all', label: 'All', count: sampleIssues.length },
                                            { key: 'error', label: 'Errors', count: errorCount, color: '#DC2626', bg: '#FEF2F2' },
                                            { key: 'warning', label: 'Warnings', count: warningCount, color: '#92400E', bg: '#FFFBEB' },
                                            { key: 'success', label: 'Passed', count: successCount, color: '#166534', bg: '#F0FDF4' },
                                        ].map(f => (
                                            <button
                                                key={f.key}
                                                onClick={() => setActiveFilter(f.key)}
                                                style={{
                                                    background: activeFilter === f.key ? (f.bg || '#EFF6FF') : '#F8FAFC',
                                                    color: activeFilter === f.key ? (f.color || '#1E40AF') : '#64748B',
                                                    border: activeFilter === f.key ? `1px solid ${f.color || '#BFDBFE'}` : '1px solid #E2E8F0',
                                                    padding: '0.3rem 0.6rem', borderRadius: '6px',
                                                    fontWeight: 600, fontSize: '0.68rem', cursor: 'pointer',
                                                    fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.25rem',
                                                    transition: 'all 0.15s'
                                                }}
                                            >
                                                {f.label} <span style={{
                                                    fontSize: '0.6rem', fontWeight: 800,
                                                    background: activeFilter === f.key ? 'rgba(0,0,0,0.08)' : '#E2E8F0',
                                                    padding: '0.1rem 0.3rem', borderRadius: '4px'
                                                }}>{f.count}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {filteredIssues.map((issue, i) => (
                                        <div key={i} style={{
                                            display: 'flex', alignItems: 'flex-start', gap: '0.65rem',
                                            padding: '0.75rem 0.85rem', borderRadius: '10px',
                                            background: issue.type === 'error' ? '#FEF2F2' : issue.type === 'warning' ? '#FFFBEB' : '#F0FDF4',
                                            border: `1px solid ${issue.type === 'error' ? '#FECACA' : issue.type === 'warning' ? '#FDE68A' : '#BBF7D0'}`,
                                            transition: 'transform 0.15s'
                                        }}
                                            onMouseOver={e => e.currentTarget.style.transform = 'translateX(2px)'}
                                            onMouseOut={e => e.currentTarget.style.transform = 'translateX(0)'}
                                        >
                                            <div style={{ marginTop: '1px', flexShrink: 0 }}>{getIcon(issue.type)}</div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontSize: '0.82rem', color: '#1E293B', fontWeight: 500, lineHeight: 1.45 }}>
                                                    {issue.text}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', flexShrink: 0 }}>
                                                <span style={{
                                                    fontSize: '0.6rem', fontWeight: 700,
                                                    color: '#64748B', background: 'rgba(255,255,255,0.8)',
                                                    padding: '0.15rem 0.45rem', borderRadius: '4px',
                                                    border: '1px solid rgba(0,0,0,0.06)'
                                                }}>{issue.section}</span>
                                                <span style={{
                                                    fontSize: '0.58rem', fontWeight: 700,
                                                    color: issue.priority === 'High' ? '#991B1B' : issue.priority === 'Medium' ? '#92400E' : '#166534',
                                                }}>{issue.priority}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Sidebar */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {/* File Info */}
                                <div style={{
                                    background: 'white', borderRadius: '14px', padding: '1rem 1.25rem',
                                    border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '0.75rem'
                                }}>
                                    <div style={{
                                        width: '36px', height: '36px', borderRadius: '8px',
                                        background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <FileText size={18} color="#DC2626" />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fileName}</div>
                                        <div style={{ fontSize: '0.65rem', color: '#94A3B8' }}>Uploaded just now • PDF</div>
                                    </div>
                                </div>

                                {/* AI Suggestions */}
                                <div style={{
                                    background: 'white', borderRadius: '14px', padding: '1.25rem',
                                    border: '1px solid #E2E8F0'
                                }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0F172A', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                        <Wand2 size={15} color="#7C3AED" /> AI Suggestions
                                    </div>
                                    {sampleSuggestions.map((s, i) => (
                                        <div key={i} style={{
                                            padding: '0.65rem 0',
                                            borderBottom: i < sampleSuggestions.length - 1 ? '1px solid #F1F5F9' : 'none',
                                            cursor: 'pointer'
                                        }}
                                            onClick={() => setExpandedSuggestion(expandedSuggestion === i ? -1 : i)}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ fontWeight: 600, fontSize: '0.78rem', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                    <span style={{
                                                        width: '18px', height: '18px', borderRadius: '4px',
                                                        background: '#7C3AED10', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                                        fontSize: '0.6rem', fontWeight: 800, color: '#7C3AED', flexShrink: 0
                                                    }}>{i + 1}</span>
                                                    {s.title}
                                                </div>
                                                {expandedSuggestion === i ? <ChevronUp size={13} color="#94A3B8" /> : <ChevronDown size={13} color="#94A3B8" />}
                                            </div>
                                            {expandedSuggestion === i && (
                                                <div style={{ fontSize: '0.72rem', color: '#64748B', lineHeight: 1.5, marginTop: '0.4rem', paddingLeft: '1.6rem' }}>
                                                    {s.desc}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <button
                                        onClick={handleReset}
                                        style={{
                                            width: '100%', background: 'white', color: '#475569',
                                            border: '1.5px solid #E2E8F0', padding: '0.7rem', borderRadius: '10px',
                                            fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
                                            fontFamily: 'inherit', transition: 'all 0.2s'
                                        }}
                                        onMouseOver={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#CBD5E1'; }}
                                        onMouseOut={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
                                    >
                                        <RotateCcw size={14} /> Check Another Resume
                                    </button>
                                    <Link to="/resume-builder" style={{ textDecoration: 'none' }}>
                                        <button style={{
                                            width: '100%', background: 'linear-gradient(135deg, #2563EB, #3B82F6)', color: 'white',
                                            border: 'none', padding: '0.7rem', borderRadius: '10px',
                                            fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
                                            fontFamily: 'inherit', boxShadow: '0 4px 12px rgba(37,99,235,0.25)', transition: 'all 0.2s'
                                        }}
                                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                                            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                                        >
                                            <Wand2 size={14} /> Fix with AI Resume Builder
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <div style={{ height: '2.5rem' }} />
        </div>
    );
}
