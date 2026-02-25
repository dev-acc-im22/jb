import React, { useState, useEffect } from 'react';
import { FileText, Wand2, Download, ArrowRight, ArrowLeft, Copy, Check, Sparkles, Briefcase, Building2, Target, User, Award, Lightbulb, RotateCcw, ChevronRight, Upload, Zap, PenTool } from 'lucide-react';

const tones = [
    { label: 'Professional', emoji: '👔', desc: 'Formal and polished', color: '#2563EB' },
    { label: 'Friendly', emoji: '😊', desc: 'Warm and approachable', color: '#059669' },
    { label: 'Confident', emoji: '💪', desc: 'Bold and assertive', color: '#DC2626' },
    { label: 'Creative', emoji: '🎨', desc: 'Unique and expressive', color: '#7C3AED' },
];

const generateCoverLetter = (data, tone) => {
    const name = data.yourName || '[Your Name]';
    const title = data.jobTitle || '[Job Title]';
    const company = data.company || '[Company]';
    const skills = data.keySkills || 'relevant skills';
    const experience = data.experience || 'significant professional experience';
    const achievements = data.achievements || 'notable achievements in my career';

    const greetings = {
        Professional: 'Dear Hiring Manager,',
        Friendly: 'Hello there,',
        Confident: 'Dear Hiring Team,',
        Creative: 'Hi!',
    };

    const intros = {
        Professional: `I am writing to express my strong interest in the ${title} position at ${company}. With ${experience}, I am confident in my ability to contribute meaningfully to your team.`,
        Friendly: `I was thrilled to come across the ${title} opening at ${company} — it feels like the perfect next step for my career. With ${experience}, I believe I'd be a great addition to your team.`,
        Confident: `I am an accomplished professional applying for the ${title} role at ${company}. My track record of ${experience} makes me an ideal candidate for this position.`,
        Creative: `When I discovered the ${title} opportunity at ${company}, I knew I had to reach out. My journey through ${experience} has uniquely prepared me for exactly this role.`,
    };

    const bodyText = `Throughout my career, I have developed deep expertise in ${skills}. Some highlights that I believe are particularly relevant to this role include:

• ${achievements.split('\n')[0] || 'Delivered measurable results that drove business growth and innovation'}
• ${achievements.split('\n')[1] || 'Collaborated across cross-functional teams to ship high-impact projects'}
• ${achievements.split('\n')[2] || 'Demonstrated strong problem-solving abilities in fast-paced environments'}`;

    const closings = {
        Professional: `I am particularly drawn to ${company}'s reputation for excellence and innovation. I am confident that my background in ${skills} aligns well with the requirements of this role.\n\nI would welcome the opportunity to discuss how my skills and experience can contribute to your team's continued success. Thank you for considering my application.`,
        Friendly: `What excites me most about ${company} is the chance to work with a team that values creativity and collaboration. I truly believe my experience with ${skills} would be a great match for this role.\n\nI'd love the chance to chat more about how I can bring value to your team. Thanks so much for your time!`,
        Confident: `My proven track record with ${skills} positions me as a strong candidate who can deliver immediate value. I am ready to bring my expertise to ${company} and drive measurable results from day one.\n\nI look forward to the opportunity to discuss this position further.`,
        Creative: `I see ${company} as a place where innovation thrives, and that resonates deeply with me. My experience with ${skills} has taught me to approach challenges with fresh perspectives.\n\nI would be excited to bring my unique blend of skills and passion to your team. Let's connect!`,
    };

    const toneLabel = tone.label;

    return `${greetings[toneLabel]}

${intros[toneLabel]}

${bodyText}

${closings[toneLabel]}

Sincerely,
${name}`;
};

const InputField = ({ label, icon: Icon, value, onChange, placeholder, required, type = 'text' }) => (
    <div>
        <label style={{
            fontSize: '0.78rem', fontWeight: 600, color: '#475569',
            display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.35rem'
        }}>
            {Icon && <Icon size={13} style={{ color: '#94A3B8' }} />}
            {label}{required && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
        <input
            type={type} value={value} onChange={onChange} placeholder={placeholder}
            style={{
                width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px',
                border: '1.5px solid #E2E8F0', fontSize: '0.85rem',
                fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
                transition: 'border-color 0.2s, box-shadow 0.2s', background: '#FAFBFC'
            }}
            onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.08)'; e.target.style.background = '#fff'; }}
            onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#FAFBFC'; }}
        />
    </div>
);

const TextareaField = ({ label, icon: Icon, value, onChange, placeholder, rows = 3, hint }) => (
    <div>
        <label style={{
            fontSize: '0.78rem', fontWeight: 600, color: '#475569',
            display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.35rem'
        }}>
            {Icon && <Icon size={13} style={{ color: '#94A3B8' }} />}
            {label}
        </label>
        {hint && <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginBottom: '0.35rem' }}>{hint}</div>}
        <textarea
            rows={rows} value={value} onChange={onChange} placeholder={placeholder}
            style={{
                width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px',
                border: '1.5px solid #E2E8F0', fontSize: '0.85rem',
                fontFamily: 'inherit', resize: 'vertical', outline: 'none',
                boxSizing: 'border-box', transition: 'border-color 0.2s, box-shadow 0.2s',
                background: '#FAFBFC', lineHeight: 1.5
            }}
            onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.08)'; e.target.style.background = '#fff'; }}
            onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#FAFBFC'; }}
        />
    </div>
);

export default function CoverLetterGenerator() {
    const [step, setStep] = useState(1);
    const [selectedTone, setSelectedTone] = useState(0);
    const [generating, setGenerating] = useState(false);
    const [generated, setGenerated] = useState(false);
    const [copied, setCopied] = useState(false);
    const [letterContent, setLetterContent] = useState('');
    const [formData, setFormData] = useState({
        yourName: '',
        jobTitle: '',
        company: '',
        jobDescription: '',
        experience: '',
        keySkills: '',
        achievements: '',
    });

    const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

    const handleGenerate = () => {
        setGenerating(true);
        setTimeout(() => {
            const letter = generateCoverLetter(formData, tones[selectedTone]);
            setLetterContent(letter);
            setGenerating(false);
            setGenerated(true);
            setStep(3);
        }, 1800);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(letterContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadTxt = () => {
        const blob = new Blob([letterContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cover-letter-${formData.company || 'draft'}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const stepLabels = [
        { num: 1, label: 'Job Details', icon: Briefcase },
        { num: 2, label: 'Choose Tone', icon: PenTool },
        { num: 3, label: 'Your Letter', icon: FileText },
    ];

    const canProceedStep1 = formData.jobTitle.trim().length > 0;

    return (
        <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#F8FAFC', minHeight: '100vh' }}>
            {/* Compact Hero */}
            <section style={{
                background: 'linear-gradient(135deg, #1D4ED8 0%, #1E3A8A 35%, #172554 70%, #0F172A 100%)',
                padding: '6rem 2rem 4rem', color: 'white', position: 'relative', overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.08,
                    backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 30%, white 1px, transparent 1px)',
                    backgroundSize: '55px 55px'
                }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ maxWidth: '580px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                            <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                background: 'rgba(255,255,255,0.18)', padding: '0.3rem 0.9rem',
                                borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700,
                                backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.15)'
                            }}><Sparkles size={12} /> AI-Powered</span>
                            <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                background: 'rgba(16,185,129,0.25)', padding: '0.3rem 0.9rem',
                                borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700,
                                border: '1px solid rgba(16,185,129,0.35)', color: '#D1FAE5'
                            }}>100% Free</span>
                        </div>
                        <h1 style={{
                            fontSize: '2.4rem', fontWeight: 800, margin: '0 0 0.75rem', lineHeight: 1.2,
                            background: 'linear-gradient(90deg, #93C5FD 0%, #3B82F6 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textFillColor: 'transparent',
                            display: 'inline-block'
                        }}>
                            Cover Letter Generator
                        </h1>
                        <p style={{ fontSize: '1rem', opacity: 0.92, lineHeight: 1.7, margin: 0 }}>
                            Craft a compelling, job-specific cover letter in under 60 seconds. Enter your details, pick a tone, and let AI handle the rest.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', opacity: 0.85 }}>
                        {[
                            { num: '10K+', label: 'Letters Generated' },
                            { num: '4', label: 'Writing Tones' },
                            { num: '< 1min', label: 'Generation Time' },
                        ].map((s, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>{s.num}</div>
                                <div style={{ fontSize: '0.7rem', marginTop: '0.2rem', whiteSpace: 'nowrap', opacity: 0.8 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
                {/* Progress Stepper - overlaps hero */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0',
                    background: 'white', borderRadius: '14px', padding: '0.9rem 2rem',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0',
                    marginTop: '-1.25rem', position: 'relative', zIndex: 2, marginBottom: '1.5rem'
                }}>
                    {stepLabels.map((s, i) => {
                        const Icon = s.icon;
                        const isActive = step === s.num;
                        const isCompleted = step > s.num;
                        return (
                            <React.Fragment key={i}>
                                <div
                                    onClick={() => { if (isCompleted) setStep(s.num); }}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        cursor: isCompleted ? 'pointer' : 'default',
                                        padding: '0.35rem 0.8rem', borderRadius: '8px',
                                        background: isActive ? '#EFF6FF' : 'transparent',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{
                                        width: '30px', height: '30px', borderRadius: '50%',
                                        background: isCompleted ? 'linear-gradient(135deg, #2563EB, #3B82F6)' : isActive ? '#2563EB' : '#F1F5F9',
                                        color: isCompleted || isActive ? 'white' : '#94A3B8',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.75rem', fontWeight: 700, transition: 'all 0.3s',
                                        boxShadow: isActive ? '0 2px 8px rgba(37,99,235,0.3)' : 'none'
                                    }}>
                                        {isCompleted ? <Check size={14} strokeWidth={3} /> : <Icon size={14} />}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600, lineHeight: 1 }}>Step {s.num}</div>
                                        <div style={{
                                            fontSize: '0.82rem', fontWeight: 700,
                                            color: isActive ? '#1E293B' : isCompleted ? '#2563EB' : '#94A3B8'
                                        }}>{s.label}</div>
                                    </div>
                                </div>
                                {i < 2 && (
                                    <div style={{
                                        flex: 1, height: '2px', margin: '0 0.5rem',
                                        background: isCompleted ? 'linear-gradient(90deg, #2563EB, #3B82F6)' : '#E2E8F0',
                                        borderRadius: '2px', maxWidth: '120px', transition: 'background 0.3s'
                                    }} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Step 1: Job Details — Two column layout */}
                {step === 1 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.25rem', alignItems: 'start' }}>
                        <div style={{
                            background: 'white', borderRadius: '16px', padding: '1.75rem',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0'
                        }}>
                            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginTop: 0, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <span style={{ background: '#EFF6FF', padding: '0.3rem', borderRadius: '8px', display: 'inline-flex' }}>
                                    <Briefcase size={18} color="#2563EB" />
                                </span>
                                Tell us about the role
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <InputField label="Your Full Name" icon={User} value={formData.yourName} onChange={e => updateField('yourName', e.target.value)} placeholder="e.g. John Doe" required />
                                <InputField label="Job Title" icon={Briefcase} value={formData.jobTitle} onChange={e => updateField('jobTitle', e.target.value)} placeholder="e.g. Software Engineer" required />
                                <InputField label="Company Name" icon={Building2} value={formData.company} onChange={e => updateField('company', e.target.value)} placeholder="e.g. Google" />
                                <InputField label="Your Experience" icon={Award} value={formData.experience} onChange={e => updateField('experience', e.target.value)} placeholder="e.g. 3+ years in full-stack dev" />
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <InputField label="Key Skills" icon={Zap} value={formData.keySkills} onChange={e => updateField('keySkills', e.target.value)} placeholder="e.g. React, Node.js, Python, AWS" />
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <TextareaField label="Key Achievements" icon={Award} value={formData.achievements} onChange={e => updateField('achievements', e.target.value)} placeholder={"Led a team of 5 engineers to deliver a core API\nReduced page load time by 40% with performance optimizations\nBuilt dashboards used by 10K+ monthly users"} rows={3} hint="One per line — these will appear as bullet points" />
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <TextareaField label="Job Description" icon={Target} value={formData.jobDescription} onChange={e => updateField('jobDescription', e.target.value)} placeholder="Paste the job description for a more tailored letter..." rows={3} hint="Optional — helps AI match your letter to the role" />
                            </div>
                            <button
                                onClick={() => setStep(2)}
                                disabled={!canProceedStep1}
                                style={{
                                    marginTop: '1.5rem', width: '100%',
                                    background: canProceedStep1 ? 'linear-gradient(135deg, #2563EB, #3B82F6)' : '#E2E8F0',
                                    color: canProceedStep1 ? 'white' : '#94A3B8',
                                    border: 'none', padding: '0.8rem', borderRadius: '10px',
                                    fontWeight: 700, fontSize: '0.9rem',
                                    cursor: canProceedStep1 ? 'pointer' : 'not-allowed',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                                    transition: 'all 0.2s', fontFamily: 'inherit',
                                    boxShadow: canProceedStep1 ? '0 4px 12px rgba(37,99,235,0.25)' : 'none'
                                }}
                                onMouseOver={e => { if (canProceedStep1) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                Next: Choose Tone <ArrowRight size={16} />
                            </button>
                        </div>

                        {/* Right sidebar — Tips & Upload */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* Upload Resume Card */}
                            <div style={{
                                background: 'white', borderRadius: '14px', padding: '1.25rem',
                                border: '1.5px dashed #CBD5E1', textAlign: 'center',
                                cursor: 'pointer', transition: 'all 0.2s'
                            }}
                                onMouseOver={e => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.background = '#F8FAFF'; }}
                                onMouseOut={e => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.background = 'white'; }}
                            >
                                <div style={{
                                    width: '42px', height: '42px', borderRadius: '12px',
                                    background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 0.6rem'
                                }}>
                                    <Upload size={20} color="#2563EB" />
                                </div>
                                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1E293B', marginBottom: '0.25rem' }}>Upload Your Resume</div>
                                <div style={{ fontSize: '0.72rem', color: '#94A3B8', lineHeight: 1.4 }}>AI will extract your details automatically</div>
                                <div style={{ fontSize: '0.65rem', color: '#CBD5E1', marginTop: '0.4rem' }}>PDF, DOCX accepted • Max 5MB</div>
                            </div>

                            {/* Tips Card */}
                            <div style={{
                                background: 'linear-gradient(135deg, #F0F9FF, #EFF6FF)', borderRadius: '14px', padding: '1.25rem',
                                border: '1px solid #BFDBFE'
                            }}>
                                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#1E3A5F', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    <Lightbulb size={14} color="#2563EB" /> Pro Tips
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    {[
                                        'Include the exact job title for better keyword matching',
                                        'Add 3 specific achievements with quantified results',
                                        'Mention the company name to show genuine interest',
                                        'List skills that match the job description',
                                    ].map((tip, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
                                            <div style={{
                                                width: '18px', height: '18px', borderRadius: '50%', background: 'white',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                                fontSize: '0.6rem', fontWeight: 800, color: '#2563EB', border: '1px solid #BFDBFE',
                                                marginTop: '1px'
                                            }}>{i + 1}</div>
                                            <span style={{ fontSize: '0.72rem', color: '#334155', lineHeight: 1.4 }}>{tip}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div style={{
                                background: 'white', borderRadius: '14px', padding: '1rem 1.25rem',
                                border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-around'
                            }}>
                                {[
                                    { icon: '📊', label: 'ATS Score', val: '95%' },
                                    { icon: '⏱️', label: 'Avg Time', val: '45s' },
                                    { icon: '⭐', label: 'Rating', val: '4.8' },
                                ].map((s, i) => (
                                    <div key={i} style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '1.1rem', marginBottom: '0.15rem' }}>{s.icon}</div>
                                        <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1E293B' }}>{s.val}</div>
                                        <div style={{ fontSize: '0.62rem', color: '#94A3B8', fontWeight: 600 }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Choose Tone — Two column with preview */}
                {step === 2 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.25rem', alignItems: 'start' }}>
                        <div style={{
                            background: 'white', borderRadius: '16px', padding: '1.75rem',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0'
                        }}>
                            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginTop: 0, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <span style={{ background: '#EFF6FF', padding: '0.3rem', borderRadius: '8px', display: 'inline-flex' }}>
                                    <PenTool size={18} color="#2563EB" />
                                </span>
                                Choose your writing tone
                            </h2>
                            <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: 0, marginBottom: '1.25rem' }}>
                                Select the voice that best matches the role and company culture
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                {tones.map((t, i) => {
                                    const isSelected = selectedTone === i;
                                    return (
                                        <div
                                            key={i}
                                            onClick={() => setSelectedTone(i)}
                                            style={{
                                                padding: '1.1rem', borderRadius: '12px', cursor: 'pointer',
                                                border: isSelected ? `2px solid ${t.color}` : '2px solid #E2E8F0',
                                                background: isSelected ? `${t.color}08` : 'white',
                                                transition: 'all 0.2s', position: 'relative',
                                                boxShadow: isSelected ? `0 4px 12px ${t.color}20` : 'none'
                                            }}
                                            onMouseOver={e => { if (!isSelected) e.currentTarget.style.borderColor = '#CBD5E1'; }}
                                            onMouseOut={e => { if (!isSelected) e.currentTarget.style.borderColor = '#E2E8F0'; }}
                                        >
                                            {isSelected && (
                                                <div style={{
                                                    position: 'absolute', top: '8px', right: '8px',
                                                    width: '20px', height: '20px', borderRadius: '50%',
                                                    background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}>
                                                    <Check size={11} color="white" strokeWidth={3} />
                                                </div>
                                            )}
                                            <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>{t.emoji}</div>
                                            <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '0.9rem' }}>{t.label}</div>
                                            <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.15rem' }}>{t.desc}</div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                                <button
                                    onClick={() => setStep(1)}
                                    style={{
                                        flex: 1, background: 'white', color: '#64748B',
                                        border: '1.5px solid #E2E8F0', padding: '0.8rem', borderRadius: '10px',
                                        fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
                                        fontFamily: 'inherit', transition: 'all 0.2s'
                                    }}
                                    onMouseOver={e => { e.currentTarget.style.background = '#F8FAFC'; }}
                                    onMouseOut={e => { e.currentTarget.style.background = 'white'; }}
                                ><ArrowLeft size={15} /> Back</button>
                                <button
                                    onClick={handleGenerate}
                                    disabled={generating}
                                    style={{
                                        flex: 2, background: generating ? '#94A3B8' : 'linear-gradient(135deg, #2563EB, #3B82F6)',
                                        color: 'white', border: 'none', padding: '0.8rem', borderRadius: '10px',
                                        fontWeight: 700, fontSize: '0.9rem',
                                        cursor: generating ? 'wait' : 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                                        fontFamily: 'inherit', transition: 'all 0.2s',
                                        boxShadow: generating ? 'none' : '0 4px 12px rgba(37,99,235,0.25)'
                                    }}
                                    onMouseOver={e => { if (!generating) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                    onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                                >
                                    {generating ? (
                                        <>
                                            <div style={{
                                                width: '16px', height: '16px', borderRadius: '50%',
                                                border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white',
                                                animation: 'clSpin 0.8s linear infinite'
                                            }} />
                                            <style>{`@keyframes clSpin { to { transform: rotate(360deg); } }`}</style>
                                            Generating...
                                        </>
                                    ) : (
                                        <><Sparkles size={16} /> Generate Cover Letter</>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Tone Preview */}
                        <div style={{
                            background: 'white', borderRadius: '14px', padding: '1.25rem',
                            border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
                        }}>
                            <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#1E3A5F', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <span style={{ fontSize: '1rem' }}>{tones[selectedTone].emoji}</span> {tones[selectedTone].label} Tone Preview
                            </div>
                            <div style={{
                                padding: '1rem', borderRadius: '10px', background: '#F8FAFC',
                                border: `1px solid ${tones[selectedTone].color}20`,
                                fontFamily: "'Georgia', 'Times New Roman', serif",
                                fontSize: '0.78rem', color: '#475569', lineHeight: 1.65,
                                fontStyle: 'italic'
                            }}>
                                {selectedTone === 0 && `"I am writing to express my strong interest in the ${formData.jobTitle || 'position'}... With my proven experience, I am confident in my ability to contribute meaningfully to your team."`}
                                {selectedTone === 1 && `"I was thrilled to come across the ${formData.jobTitle || 'position'} opening... I believe I'd be a great addition to your team and would love the chance to chat!"`}
                                {selectedTone === 2 && `"I am an accomplished professional with a track record of delivering outstanding results. My expertise makes me an ideal candidate for the ${formData.jobTitle || 'role'}."`}
                                {selectedTone === 3 && `"When I discovered this ${formData.jobTitle || 'opportunity'}, I knew I had to reach out. My unique journey has prepared me for exactly this role."`}
                            </div>

                            {/* Summary of inputs */}
                            <div style={{ marginTop: '1rem', padding: '0.85rem', borderRadius: '10px', background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                                <div style={{ fontWeight: 700, fontSize: '0.72rem', color: '#166534', marginBottom: '0.5rem' }}>✓ Your Details Summary</div>
                                {[
                                    { label: 'Name', value: formData.yourName },
                                    { label: 'Role', value: formData.jobTitle },
                                    { label: 'Company', value: formData.company },
                                    { label: 'Experience', value: formData.experience },
                                    { label: 'Skills', value: formData.keySkills },
                                ].filter(item => item.value).map((item, i) => (
                                    <div key={i} style={{ fontSize: '0.7rem', color: '#334155', marginBottom: '0.25rem', display: 'flex', gap: '0.3rem' }}>
                                        <span style={{ fontWeight: 700, color: '#475569', minWidth: '55px' }}>{item.label}:</span>
                                        <span style={{ color: '#64748B' }}>{item.value.length > 40 ? item.value.slice(0, 40) + '...' : item.value}</span>
                                    </div>
                                ))}
                                {!formData.yourName && !formData.company && (
                                    <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontStyle: 'italic' }}>No details filled yet</div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Generated Letter */}
                {step === 3 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.25rem', alignItems: 'start' }}>
                        <div style={{
                            background: 'white', borderRadius: '16px', padding: '1.75rem',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0'
                        }}>
                            {/* Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <span style={{ background: '#F0FDF4', padding: '0.3rem', borderRadius: '8px', display: 'inline-flex' }}>
                                        <FileText size={18} color="#059669" />
                                    </span>
                                    Your Cover Letter
                                </h2>
                                <div style={{ display: 'flex', gap: '0.4rem' }}>
                                    <button
                                        onClick={handleCopy}
                                        style={{
                                            background: copied ? '#059669' : '#F1F5F9', color: copied ? 'white' : '#475569',
                                            border: 'none', padding: '0.4rem 0.75rem', borderRadius: '8px',
                                            fontWeight: 600, fontSize: '0.72rem', cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', gap: '0.3rem', transition: 'all 0.2s',
                                            fontFamily: 'inherit'
                                        }}
                                    >
                                        {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
                                    </button>
                                    <button
                                        onClick={handleDownloadTxt}
                                        style={{
                                            background: '#F1F5F9', color: '#475569',
                                            border: 'none', padding: '0.4rem 0.75rem', borderRadius: '8px',
                                            fontWeight: 600, fontSize: '0.72rem', cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'inherit'
                                        }}
                                    >
                                        <Download size={12} /> TXT
                                    </button>
                                </div>
                            </div>

                            {/* Letter Document */}
                            <div style={{
                                padding: '2rem 2.25rem', borderRadius: '12px',
                                border: '1px solid #E2E8F0', background: 'white',
                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02), 0 1px 3px rgba(0,0,0,0.04)',
                                position: 'relative'
                            }}>
                                {/* Document accent */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                                    background: `linear-gradient(90deg, ${tones[selectedTone].color}, ${tones[selectedTone].color}80)`,
                                    borderRadius: '12px 12px 0 0'
                                }} />
                                <div style={{
                                    fontFamily: "'Georgia', 'Times New Roman', serif",
                                    fontSize: '0.88rem', lineHeight: 1.8, color: '#334155',
                                    whiteSpace: 'pre-line'
                                }}>
                                    {letterContent}
                                </div>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                                <button
                                    onClick={() => { setStep(1); setGenerated(false); }}
                                    style={{
                                        flex: 1, background: 'white', color: '#64748B',
                                        border: '1.5px solid #E2E8F0', padding: '0.75rem', borderRadius: '10px',
                                        fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
                                        fontFamily: 'inherit', transition: 'all 0.2s'
                                    }}
                                    onMouseOver={e => { e.currentTarget.style.background = '#F8FAFC'; }}
                                    onMouseOut={e => { e.currentTarget.style.background = 'white'; }}
                                >
                                    <ArrowLeft size={14} /> New Letter
                                </button>
                                <button
                                    onClick={() => { setStep(2); }}
                                    style={{
                                        flex: 1, background: 'white', color: '#2563EB',
                                        border: '1.5px solid #BFDBFE', padding: '0.75rem', borderRadius: '10px',
                                        fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
                                        fontFamily: 'inherit', transition: 'all 0.2s'
                                    }}
                                    onMouseOver={e => { e.currentTarget.style.background = '#EFF6FF'; }}
                                    onMouseOut={e => { e.currentTarget.style.background = 'white'; }}
                                >
                                    <PenTool size={14} /> Change Tone
                                </button>
                                <button
                                    onClick={handleGenerate}
                                    disabled={generating}
                                    style={{
                                        flex: 1, background: generating ? '#94A3B8' : 'linear-gradient(135deg, #2563EB, #3B82F6)',
                                        color: 'white', border: 'none', padding: '0.75rem', borderRadius: '10px',
                                        fontWeight: 700, fontSize: '0.85rem', cursor: generating ? 'wait' : 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
                                        fontFamily: 'inherit', transition: 'all 0.2s',
                                        boxShadow: generating ? 'none' : '0 4px 12px rgba(37,99,235,0.25)'
                                    }}
                                    onMouseOver={e => { if (!generating) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                    onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                                >
                                    {generating ? (
                                        <>
                                            <div style={{
                                                width: '14px', height: '14px', borderRadius: '50%',
                                                border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white',
                                                animation: 'clSpin 0.8s linear infinite'
                                            }} />
                                            <style>{`@keyframes clSpin { to { transform: rotate(360deg); } }`}</style>
                                            Regenerating...
                                        </>
                                    ) : (
                                        <><RotateCcw size={14} /> Regenerate</>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Right sidebar — Letter Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* Letter Stats */}
                            <div style={{
                                background: 'white', borderRadius: '14px', padding: '1.25rem',
                                border: '1px solid #E2E8F0'
                            }}>
                                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#1E293B', marginBottom: '0.75rem' }}>Letter Details</div>
                                {[
                                    { label: 'Word Count', value: letterContent.split(/\s+/).filter(Boolean).length },
                                    { label: 'Tone', value: tones[selectedTone].label },
                                    { label: 'Target Role', value: formData.jobTitle || 'Not specified' },
                                    { label: 'Company', value: formData.company || 'Not specified' },
                                ].map((item, i) => (
                                    <div key={i} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '0.4rem 0', borderBottom: i < 3 ? '1px solid #F1F5F9' : 'none'
                                    }}>
                                        <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600 }}>{item.label}</span>
                                        <span style={{ fontSize: '0.75rem', color: '#1E293B', fontWeight: 700 }}>{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Quality Score */}
                            <div style={{
                                background: 'linear-gradient(135deg, #F0FDF4, #ECFDF5)', borderRadius: '14px', padding: '1.25rem',
                                border: '1px solid #BBF7D0', textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#059669', marginBottom: '0.2rem' }}>A+</div>
                                <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#166534', marginBottom: '0.15rem' }}>Quality Score</div>
                                <div style={{ fontSize: '0.68rem', color: '#15803D', lineHeight: 1.4 }}>Your letter is well-structured and professionally written</div>
                            </div>

                            {/* Checklist */}
                            <div style={{
                                background: 'white', borderRadius: '14px', padding: '1.25rem',
                                border: '1px solid #E2E8F0'
                            }}>
                                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#1E293B', marginBottom: '0.6rem' }}>✓ Letter Checklist</div>
                                {[
                                    { label: 'Addressed to hiring manager', done: true },
                                    { label: 'Company name included', done: !!formData.company },
                                    { label: 'Job title mentioned', done: !!formData.jobTitle },
                                    { label: 'Skills highlighted', done: !!formData.keySkills },
                                    { label: 'Call to action present', done: true },
                                    { label: 'Professional closing', done: true },
                                ].map((item, i) => (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                                        fontSize: '0.72rem', color: item.done ? '#334155' : '#CBD5E1',
                                        marginBottom: '0.35rem'
                                    }}>
                                        <div style={{
                                            width: '16px', height: '16px', borderRadius: '4px',
                                            background: item.done ? '#059669' : '#F1F5F9',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            border: item.done ? 'none' : '1px solid #E2E8F0'
                                        }}>
                                            {item.done && <Check size={10} color="white" strokeWidth={3} />}
                                        </div>
                                        <span style={{ textDecoration: item.done ? 'none' : 'none' }}>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <div style={{ height: '2.5rem' }} />
        </div>
    );
}
