import React, { useState } from 'react';
import { Upload, CheckCircle, XCircle, AlertTriangle, FileText, Wand2, ArrowRight, BarChart3, Shield, Zap } from 'lucide-react';

const checkCategories = [
    { label: 'ATS Compatibility', icon: <Shield size={18} />, score: null, details: 'How well your resume parses through Applicant Tracking Systems' },
    { label: 'Content Quality', icon: <FileText size={18} />, score: null, details: 'Grammar, impact verbs, and achievement-oriented language' },
    { label: 'Formatting', icon: <BarChart3 size={18} />, score: null, details: 'Layout, font usage, section structure, and readability' },
    { label: 'Keyword Match', icon: <Zap size={18} />, score: null, details: 'Industry-standard keywords and skills presence' },
];

const sampleIssues = [
    { type: 'error', text: 'Missing quantifiable achievements in work experience', section: 'Experience' },
    { type: 'error', text: 'No professional summary found', section: 'Summary' },
    { type: 'warning', text: 'Email format may not be ATS-friendly', section: 'Contact' },
    { type: 'warning', text: 'Consider adding more technical skills', section: 'Skills' },
    { type: 'success', text: 'Good use of action verbs', section: 'Experience' },
    { type: 'success', text: 'Clean, consistent date formatting', section: 'Experience' },
    { type: 'success', text: 'Education section is well structured', section: 'Education' },
];

export default function ResumeChecker() {
    const [uploaded, setUploaded] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [done, setDone] = useState(false);
    const [scores, setScores] = useState([null, null, null, null]);
    const [dragOver, setDragOver] = useState(false);

    const handleUpload = () => {
        setUploaded(true);
        setAnalyzing(true);
        setTimeout(() => {
            setAnalyzing(false);
            setDone(true);
            setScores([78, 85, 92, 65]);
        }, 2500);
    };

    const overallScore = done ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    const getColor = (s) => s >= 80 ? '#059669' : s >= 60 ? '#D97706' : '#DC2626';
    const getIcon = (type) => {
        if (type === 'error') return <XCircle size={16} color="#DC2626" />;
        if (type === 'warning') return <AlertTriangle size={16} color="#D97706" />;
        return <CheckCircle size={16} color="#059669" />;
    };

    return (
        <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#FAFBFC', minHeight: '100vh' }}>
            {/* Hero */}
            <section style={{
                background: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 50%, #3B82F6 100%)',
                padding: '4rem 2rem 3rem', textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1,
                    backgroundImage: 'radial-gradient(circle at 30% 40%, white 1px, transparent 1px), radial-gradient(circle at 70% 70%, white 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
                    <span style={{
                        display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '0.3rem 1rem',
                        borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem'
                    }}>✨ FREE — Instant AI Analysis</span>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: 800, margin: '0.5rem 0', lineHeight: 1.15 }}>
                        AI Resume Checker
                    </h1>
                    <p style={{ fontSize: '1.15rem', opacity: 0.9, marginBottom: '1.5rem', lineHeight: 1.6 }}>
                        Get instant, detailed feedback on your resume. Our AI analyzes ATS compatibility, content quality, formatting, and keyword usage.
                    </p>
                </div>
            </section>

            {/* Upload Section */}
            <section style={{ maxWidth: '800px', margin: '-2rem auto 0', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
                {!uploaded ? (
                    <div
                        onClick={handleUpload}
                        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={e => { e.preventDefault(); setDragOver(false); handleUpload(); }}
                        style={{
                            background: 'white', borderRadius: '16px', padding: '3rem',
                            border: dragOver ? '2px dashed #2563EB' : '2px dashed #CBD5E1',
                            textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
                        }}
                    >
                        <div style={{
                            width: '70px', height: '70px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 1rem'
                        }}>
                            <Upload size={28} color="#2563EB" />
                        </div>
                        <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '1.1rem' }}>
                            Drop your resume here or click to upload
                        </div>
                        <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                            Supports PDF, DOCX, and TXT • Max 5MB
                        </div>
                        <button style={{
                            marginTop: '1.5rem', background: 'linear-gradient(135deg, #2563EB, #3B82F6)',
                            color: 'white', border: 'none', padding: '0.7rem 2rem', borderRadius: '10px',
                            fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer'
                        }}>
                            Upload Resume
                        </button>
                    </div>
                ) : analyzing ? (
                    <div style={{
                        background: 'white', borderRadius: '16px', padding: '3rem',
                        textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0'
                    }}>
                        <div style={{
                            width: '60px', height: '60px', borderRadius: '50%', margin: '0 auto 1.5rem',
                            border: '3px solid #E2E8F0', borderTopColor: '#2563EB',
                            animation: 'spin 1s linear infinite'
                        }} />
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                        <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '1.1rem' }}>Analyzing your resume...</div>
                        <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: '0.3rem' }}>This usually takes a few seconds</div>
                    </div>
                ) : (
                    /* Results */
                    <div style={{
                        background: 'white', borderRadius: '16px', padding: '2rem',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0'
                    }}>
                        {/* Overall Score */}
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto',
                                border: `4px solid ${getColor(overallScore)}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                            }}>
                                <span style={{ fontSize: '2rem', fontWeight: 800, color: getColor(overallScore) }}>{overallScore}</span>
                                <span style={{ fontSize: '0.65rem', color: '#94A3B8', fontWeight: 600 }}>/ 100</span>
                            </div>
                            <div style={{ fontWeight: 700, color: '#1E293B', marginTop: '0.75rem', fontSize: '1.05rem' }}>
                                {overallScore >= 80 ? 'Great Resume!' : overallScore >= 60 ? 'Good, But Could Be Better' : 'Needs Improvement'}
                            </div>
                        </div>

                        {/* Category Scores */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
                            {checkCategories.map((cat, i) => (
                                <div key={i} style={{
                                    padding: '1rem', borderRadius: '12px', border: '1px solid #F1F5F9',
                                    textAlign: 'center', background: '#FAFBFC'
                                }}>
                                    <div style={{ color: getColor(scores[i]), marginBottom: '0.3rem' }}>{cat.icon}</div>
                                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: getColor(scores[i]) }}>{scores[i]}</div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748B', marginTop: '0.2rem' }}>{cat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Issues */}
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.75rem' }}>Detailed Feedback</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {sampleIssues.map((issue, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                                    padding: '0.75rem 1rem', borderRadius: '10px',
                                    background: issue.type === 'error' ? '#FEF2F2' : issue.type === 'warning' ? '#FFFBEB' : '#F0FDF4',
                                    border: `1px solid ${issue.type === 'error' ? '#FEE2E2' : issue.type === 'warning' ? '#FEF3C7' : '#BBF7D0'}`
                                }}>
                                    {getIcon(issue.type)}
                                    <span style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 500, flex: 1 }}>{issue.text}</span>
                                    <span style={{
                                        fontSize: '0.65rem', fontWeight: 700, color: '#94A3B8',
                                        background: '#F1F5F9', padding: '0.15rem 0.5rem', borderRadius: '100px'
                                    }}>{issue.section}</span>
                                </div>
                            ))}
                        </div>

                        {/* Action */}
                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <button
                                onClick={() => { setUploaded(false); setDone(false); setScores([null, null, null, null]); }}
                                style={{
                                    background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: 'white',
                                    border: 'none', padding: '0.7rem 2rem', borderRadius: '10px',
                                    fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', marginRight: '0.75rem'
                                }}
                            >Check Another Resume</button>
                            <button style={{
                                background: 'white', color: '#2563EB', border: '2px solid #2563EB',
                                padding: '0.7rem 2rem', borderRadius: '10px', fontWeight: 700,
                                fontSize: '0.9rem', cursor: 'pointer'
                            }}>Fix with AI Builder</button>
                        </div>
                    </div>
                )}
            </section>

            <div style={{ height: '4rem' }} />
        </div>
    );
}
