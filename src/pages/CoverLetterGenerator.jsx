import React, { useState } from 'react';
import { FileText, Wand2, Download, ArrowRight, Copy, Check, Sparkles, Briefcase, Building2, Target } from 'lucide-react';

const tones = [
    { label: 'Professional', emoji: '👔', desc: 'Formal and polished' },
    { label: 'Friendly', emoji: '😊', desc: 'Warm and approachable' },
    { label: 'Confident', emoji: '💪', desc: 'Bold and assertive' },
    { label: 'Creative', emoji: '🎨', desc: 'Unique and expressive' },
];

const sampleLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the Software Engineer position at your company. With over 3 years of experience in full-stack development and a passion for building scalable, user-centric applications, I am confident in my ability to contribute meaningfully to your team.

In my current role at TechCorp, I have:
• Led the development of a React-based dashboard that reduced customer support tickets by 40%
• Architected and deployed microservices handling 100K+ daily requests
• Mentored 3 junior developers and established code review best practices

I am particularly drawn to your company's mission of democratizing access to technology. My experience in building accessible, performant web applications aligns perfectly with this vision.

I would welcome the opportunity to discuss how my skills and experience can contribute to your team's success.

Best regards,
[Your Name]`;

export default function CoverLetterGenerator() {
    const [step, setStep] = useState(1);
    const [selectedTone, setSelectedTone] = useState(0);
    const [jobTitle, setJobTitle] = useState('');
    const [company, setCompany] = useState('');
    const [generating, setGenerating] = useState(false);
    const [generated, setGenerated] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = () => {
        setGenerating(true);
        setTimeout(() => {
            setGenerating(false);
            setGenerated(true);
            setStep(3);
        }, 2000);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(sampleLetter);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
                    backgroundImage: 'radial-gradient(circle at 25% 60%, white 1px, transparent 1px), radial-gradient(circle at 75% 30%, white 1px, transparent 1px)',
                    backgroundSize: '55px 55px'
                }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
                    <span style={{
                        display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '0.3rem 1rem',
                        borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem'
                    }}>✨ FREE — AI-Powered Writing</span>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: 800, margin: '0.5rem 0', lineHeight: 1.15 }}>
                        AI Cover Letter Generator
                    </h1>
                    <p style={{ fontSize: '1.15rem', opacity: 0.9, marginBottom: '2rem', lineHeight: 1.6 }}>
                        Generate a compelling, personalized cover letter in seconds. Just enter the job details and let AI craft the perfect letter for you.
                    </p>
                </div>
            </section>

            {/* Progress Steps */}
            <section style={{ maxWidth: '600px', margin: '-1.5rem auto 0', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    background: 'white', borderRadius: '14px', padding: '1rem 1.5rem',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0'
                }}>
                    {['Job Details', 'Choose Tone', 'Your Letter'].map((label, i) => (
                        <React.Fragment key={i}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <div style={{
                                    width: '28px', height: '28px', borderRadius: '50%',
                                    background: step > i ? 'linear-gradient(135deg, #2563EB, #3B82F6)' : step === i + 1 ? '#EFF6FF' : '#F1F5F9',
                                    color: step > i ? 'white' : step === i + 1 ? '#2563EB' : '#94A3B8',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.75rem', fontWeight: 700
                                }}>
                                    {step > i + 1 ? <Check size={14} /> : i + 1}
                                </div>
                                <span style={{
                                    fontSize: '0.8rem', fontWeight: 600,
                                    color: step >= i + 1 ? '#1E293B' : '#94A3B8'
                                }}>{label}</span>
                            </div>
                            {i < 2 && <div style={{ width: '40px', height: '2px', background: step > i + 1 ? '#2563EB' : '#E2E8F0', borderRadius: '2px' }} />}
                        </React.Fragment>
                    ))}
                </div>
            </section>

            {/* Main Content */}
            <section style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1.5rem' }}>
                {step === 1 && (
                    <div style={{
                        background: 'white', borderRadius: '16px', padding: '2rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0'
                    }}>
                        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.5rem', marginTop: 0 }}>
                            Tell us about the job
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                                    <Briefcase size={14} /> Job Title *
                                </label>
                                <input
                                    type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)}
                                    placeholder="e.g. Software Engineer"
                                    style={{
                                        width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
                                        border: '1px solid #E2E8F0', fontSize: '0.9rem',
                                        fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#2563EB'}
                                    onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                                    <Building2 size={14} /> Company Name
                                </label>
                                <input
                                    type="text" value={company} onChange={e => setCompany(e.target.value)}
                                    placeholder="e.g. Google"
                                    style={{
                                        width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
                                        border: '1px solid #E2E8F0', fontSize: '0.9rem',
                                        fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#2563EB'}
                                    onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                                    <Target size={14} /> Job Description (optional)
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Paste the job description to get a more tailored cover letter..."
                                    style={{
                                        width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
                                        border: '1px solid #E2E8F0', fontSize: '0.9rem',
                                        fontFamily: 'inherit', resize: 'vertical', outline: 'none', boxSizing: 'border-box'
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#2563EB'}
                                    onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => setStep(2)}
                            style={{
                                marginTop: '1.5rem', width: '100%',
                                background: 'linear-gradient(135deg, #2563EB, #3B82F6)', color: 'white',
                                border: 'none', padding: '0.85rem', borderRadius: '10px',
                                fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem'
                            }}
                        >
                            Next: Choose Tone <ArrowRight size={16} />
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div style={{
                        background: 'white', borderRadius: '16px', padding: '2rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0'
                    }}>
                        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.5rem', marginTop: 0 }}>
                            Choose your writing tone
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                            {tones.map((t, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedTone(i)}
                                    style={{
                                        padding: '1.25rem', borderRadius: '12px', cursor: 'pointer',
                                        border: selectedTone === i ? '2px solid #2563EB' : '2px solid #E2E8F0',
                                        background: selectedTone === i ? '#EFF6FF' : 'white',
                                        transition: 'all 0.2s', textAlign: 'center'
                                    }}
                                >
                                    <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>{t.emoji}</div>
                                    <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '0.9rem' }}>{t.label}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.2rem' }}>{t.desc}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                            <button
                                onClick={() => setStep(1)}
                                style={{
                                    flex: 1, background: 'white', color: '#64748B',
                                    border: '1px solid #E2E8F0', padding: '0.85rem', borderRadius: '10px',
                                    fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer'
                                }}
                            >Back</button>
                            <button
                                onClick={handleGenerate}
                                disabled={generating}
                                style={{
                                    flex: 2, background: 'linear-gradient(135deg, #2563EB, #3B82F6)',
                                    color: 'white', border: 'none', padding: '0.85rem', borderRadius: '10px',
                                    fontWeight: 700, fontSize: '0.95rem', cursor: generating ? 'wait' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                                    opacity: generating ? 0.7 : 1
                                }}
                            >
                                {generating ? (
                                    <>
                                        <div style={{
                                            width: '16px', height: '16px', borderRadius: '50%',
                                            border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white',
                                            animation: 'spin 0.8s linear infinite'
                                        }} />
                                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                                        Generating...
                                    </>
                                ) : (
                                    <><Sparkles size={16} /> Generate Cover Letter</>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div style={{
                        background: 'white', borderRadius: '16px', padding: '2rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1E293B', margin: 0 }}>
                                Your Cover Letter
                            </h2>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={handleCopy}
                                    style={{
                                        background: copied ? '#059669' : '#F1F5F9', color: copied ? 'white' : '#64748B',
                                        border: 'none', padding: '0.4rem 0.8rem', borderRadius: '8px',
                                        fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', gap: '0.3rem', transition: 'all 0.2s'
                                    }}
                                >
                                    {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
                                </button>
                                <button style={{
                                    background: '#F1F5F9', color: '#64748B',
                                    border: 'none', padding: '0.4rem 0.8rem', borderRadius: '8px',
                                    fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '0.3rem'
                                }}>
                                    <Download size={12} /> PDF
                                </button>
                            </div>
                        </div>
                        <div style={{
                            padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0',
                            background: '#FAFBFC', fontFamily: "'Georgia', serif", fontSize: '0.9rem',
                            lineHeight: 1.8, color: '#334155', whiteSpace: 'pre-line'
                        }}>
                            {sampleLetter}
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                            <button
                                onClick={() => { setStep(1); setGenerated(false); }}
                                style={{
                                    flex: 1, background: 'white', color: '#64748B',
                                    border: '1px solid #E2E8F0', padding: '0.85rem', borderRadius: '10px',
                                    fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer'
                                }}
                            >New Letter</button>
                            <button
                                onClick={handleGenerate}
                                style={{
                                    flex: 1, background: 'linear-gradient(135deg, #2563EB, #3B82F6)',
                                    color: 'white', border: 'none', padding: '0.85rem', borderRadius: '10px',
                                    fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem'
                                }}
                            >
                                <Wand2 size={14} /> Regenerate
                            </button>
                        </div>
                    </div>
                )}
            </section>

            <div style={{ height: '3rem' }} />
        </div>
    );
}
