import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useJobs } from '../context/JobContext';
import Button from '../components/ui/Button';
import PostJobForm from '../components/employer/PostJobForm';
import { CheckCircle, Search, FileText, Users, TrendingUp, MessageSquare, Sparkles, X, ArrowRight, Building2, Zap, Shield, BarChart3, Globe, Star, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ScrollReveal = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
        {children}
    </motion.div>
);

const ForEmployers = () => {
    const { user } = useJobs();
    const [showPostJob, setShowPostJob] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    const handlePostJobClick = () => {
        if (user) {
            setShowPostJob(true);
        } else {
            setShowLoginPrompt(true);
        }
    };

    const handlePostJobSuccess = () => {
        setShowPostJob(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>

            {/* ======= HERO SECTION ======= */}
            <section style={{
                marginTop: '80px',
                padding: '7rem 2rem 5rem',
                background: 'linear-gradient(170deg, #020617 0%, #0F172A 50%, #020617 100%)',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background grid */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.06,
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} />

                {/* Gradient orbs */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px',
                        borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)',
                        filter: 'blur(60px)', pointerEvents: 'none'
                    }}
                />
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute', bottom: '-80px', left: '-80px', width: '400px', height: '400px',
                        borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)',
                        filter: 'blur(50px)', pointerEvents: 'none'
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.5rem 1.25rem', borderRadius: '100px',
                            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
                            marginBottom: '2rem', fontSize: '0.9rem', fontWeight: 600
                        }}
                    >
                        <Sparkles size={14} color="#F59E0B" />
                        #1 Hiring Platform in India
                    </motion.div>

                    <h1 style={{
                        fontSize: '3.8rem', marginBottom: '1.5rem', fontWeight: 800,
                        lineHeight: 1.15, letterSpacing: '-1.5px', color: 'white'
                    }}>
                        Hire the best talent,<br />
                        <span style={{
                            background: 'linear-gradient(to right, #FFFFFF, #FCD34D)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            color: 'transparent',
                            display: 'inline-block'
                        }}>
                            Faster than ever.
                        </span>
                    </h1>

                    <p style={{
                        fontSize: '1.2rem', marginBottom: '2.5rem',
                        color: 'rgba(255,255,255,0.9)', maxWidth: '650px', margin: '0 auto 2.5rem',
                        lineHeight: 1.7
                    }}>
                        Connect with millions of top-tier job seekers. Post jobs, search resumes, and build your employer brand — all from one powerful platform.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handlePostJobClick}
                            style={{
                                padding: '1rem 2.5rem', borderRadius: '12px', border: 'none',
                                background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                                color: 'white', fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                boxShadow: '0 4px 20px rgba(37,99,235,0.4)',
                                fontFamily: "'Montserrat', sans-serif"
                            }}
                        >
                            Post a Job for Free <ArrowRight size={18} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                padding: '1rem 2.5rem', borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.4)',
                                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
                                color: 'white', fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
                                fontFamily: "'Montserrat', sans-serif"
                            }}
                        >
                            Request a Demo
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* ======= STATS STRIP ======= */}
            <div style={{
                background: 'linear-gradient(135deg, #0D1B5E, #081450)',
                padding: '3rem 2rem',
                display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap'
            }}>
                {[
                    { label: 'Active Candidates', value: '10M+', icon: Users, color: '#60A5FA' },
                    { label: 'Resumes Added Daily', value: '50K+', icon: FileText, color: '#60A5FA' },
                    { label: 'Companies Hiring', value: '500K+', icon: Building2, color: '#60A5FA' },
                    { label: 'Avg. Time to Hire', value: '5 Days', icon: Zap, color: '#60A5FA' }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        style={{ textAlign: 'center', minWidth: '150px' }}
                    >
                        <stat.icon size={24} color={stat.color} style={{ marginBottom: '0.5rem' }} />
                        <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white' }}>{stat.value}</div>
                        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* ======= HOW IT WORKS ======= */}
            <ScrollReveal>
                <section style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem', fontWeight: 800, color: '#0F172A' }}>
                        How It Works
                    </h2>
                    <p style={{ textAlign: 'center', color: '#64748B', fontSize: '1.1rem', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
                        Three simple steps to find your perfect candidate
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', position: 'relative' }}>
                        {/* Connecting line */}
                        <div style={{
                            position: 'absolute', top: '40px', left: '16.67%', right: '16.67%',
                            height: '2px', background: 'linear-gradient(90deg, #E2E8F0, #2563EB, #E2E8F0)',
                            zIndex: 0
                        }} />
                        {[
                            { step: '01', title: 'Post Your Job', desc: 'Create a detailed job listing in under 2 minutes with our guided form.', icon: FileText, color: '#2563EB' },
                            { step: '02', title: 'Get Matched', desc: 'Our AI matches your listing with the most relevant candidates instantly.', icon: Zap, color: '#7C3AED' },
                            { step: '03', title: 'Hire the Best', desc: 'Review applications, schedule interviews, and make your hire.', icon: CheckCircle, color: '#10B981' }
                        ].map((item, i) => (
                            <ScrollReveal key={i} delay={i * 0.15}>
                                <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                                    <div style={{
                                        width: '80px', height: '80px', borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${item.color}15, ${item.color}25)`,
                                        border: `2px solid ${item.color}30`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 1.5rem', backgroundColor: 'white'
                                    }}>
                                        <item.icon size={32} color={item.color} />
                                    </div>
                                    <div style={{
                                        fontSize: '0.75rem', fontWeight: 800, color: item.color,
                                        textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem'
                                    }}>
                                        Step {item.step}
                                    </div>
                                    <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', fontWeight: 700, color: '#0F172A' }}>{item.title}</h3>
                                    <p style={{ color: '#64748B', lineHeight: 1.6, fontSize: '0.95rem' }}>{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            </ScrollReveal>

            {/* ======= HIRING SOLUTIONS ======= */}
            <section style={{ padding: '6rem 2rem', background: '#F8FAFC' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem', fontWeight: 800, color: '#0F172A' }}>
                            Comprehensive Hiring Solutions
                        </h2>
                        <p style={{ textAlign: 'center', color: '#64748B', fontSize: '1.1rem', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
                            Everything you need to build your dream team
                        </p>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { title: 'Smart Job Posts', icon: FileText, desc: 'AI-optimized job posts that reach the right candidates. Get 3x more quality applications.', color: '#2563EB' },
                            { title: 'Resume Search', icon: Search, desc: 'Access our database of 10M+ verified resumes with advanced filters and AI matching.', color: '#7C3AED' },
                            { title: 'Employer Branding', icon: TrendingUp, desc: 'Showcase your culture, benefits, and workplace to attract top-tier talent.', color: '#10B981' },
                            { title: 'Smart Screening', icon: Shield, desc: 'Automated screening questions & assessments to filter candidates effectively.', color: '#F59E0B' },
                            { title: 'Analytics Dashboard', icon: BarChart3, desc: 'Track views, applications, and conversion rates with real-time analytics.', color: '#EF4444' },
                            { title: 'Global Reach', icon: Globe, desc: 'Post once, reach candidates across 50+ cities. Remote-friendly tools built in.', color: '#06B6D4' }
                        ].map((item, i) => (
                            <ScrollReveal key={i} delay={i * 0.08}>
                                <motion.div
                                    whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                                    style={{
                                        padding: '2rem', borderRadius: '16px',
                                        border: '1px solid #E2E8F0', backgroundColor: 'white',
                                        transition: 'box-shadow 0.3s ease', cursor: 'pointer'
                                    }}
                                >
                                    <div style={{
                                        width: '52px', height: '52px', borderRadius: '12px',
                                        background: `${item.color}12`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginBottom: '1.25rem'
                                    }}>
                                        <item.icon size={26} color={item.color} />
                                    </div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem', fontWeight: 700, color: '#0F172A' }}>{item.title}</h3>
                                    <p style={{ color: '#64748B', lineHeight: 1.6, fontSize: '0.9rem' }}>{item.desc}</p>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ======= TESTIMONIALS ======= */}
            <ScrollReveal>
                <section style={{ padding: '6rem 2rem' }}>
                    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem', fontWeight: 800, color: '#0F172A' }}>
                            Trusted by Recruiters Everywhere
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                            {[
                                {
                                    quote: "Since switching to JobBoard, our time-to-hire decreased by 40%. The quality of candidates is unmatched.",
                                    name: "Sarah Jenkins", role: "Head of Talent", company: "TechStream Inc.", color: '#2563EB'
                                },
                                {
                                    quote: "We filled 15 positions in just 3 weeks. The AI matching is incredibly accurate and saves us hours.",
                                    name: "Rajesh Mehta", role: "HR Director", company: "FinVault", color: '#7C3AED'
                                },
                                {
                                    quote: "The employer branding tools helped us increase our application rate by 60%. Highly recommend!",
                                    name: "Priya Sharma", role: "Recruitment Lead", company: "ScaleUp Labs", color: '#10B981'
                                }
                            ].map((t, i) => (
                                <ScrollReveal key={i} delay={i * 0.12}>
                                    <div style={{
                                        padding: '2rem', borderRadius: '16px',
                                        background: 'white', border: '1px solid #E2E8F0',
                                        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                                        position: 'relative'
                                    }}>
                                        <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                                            {[...Array(5)].map((_, j) => (
                                                <Star key={j} size={16} fill="#F59E0B" color="#F59E0B" />
                                            ))}
                                        </div>
                                        <p style={{ color: '#334155', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                                            "{t.quote}"
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: '42px', height: '42px', borderRadius: '50%',
                                                background: `linear-gradient(135deg, ${t.color}, ${t.color}90)`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: 'white', fontWeight: 800, fontSize: '1rem'
                                            }}>
                                                {t.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }}>{t.name}</div>
                                                <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>{t.role}, {t.company}</div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* ======= CTA BANNER ======= */}
            <ScrollReveal>
                <section style={{ padding: '2rem', marginBottom: '4rem' }}>
                    <div style={{
                        maxWidth: '1100px', margin: '0 auto',
                        background: 'linear-gradient(160deg, #0A1A6B, #1444C8)',
                        borderRadius: '24px', padding: '5rem 3rem',
                        textAlign: 'center', position: 'relative', overflow: 'hidden'
                    }}>
                        <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                                position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px',
                                borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)',
                                filter: 'blur(40px)', pointerEvents: 'none'
                            }}
                        />
                        <h2 style={{ fontSize: '2.8rem', marginBottom: '1rem', color: 'white', fontWeight: 800, position: 'relative' }}>
                            Ready to build your winning team?
                        </h2>
                        <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.85)', marginBottom: '2.5rem', position: 'relative' }}>
                            Start with a free job post — no credit card required.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handlePostJobClick}
                            style={{
                                padding: '1rem 3rem', borderRadius: '12px', border: 'none',
                                background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                                color: 'white', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                boxShadow: '0 4px 20px rgba(37,99,235,0.4)',
                                fontFamily: "'Montserrat', sans-serif",
                                position: 'relative'
                            }}
                        >
                            Post a Job for Free <ArrowRight size={20} />
                        </motion.button>
                    </div>
                </section>
            </ScrollReveal>

            {/* ======= POST JOB MODAL ======= */}
            <AnimatePresence>
                {showPostJob && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowPostJob(false)}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 1000,
                            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '2rem'
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            onClick={e => e.stopPropagation()}
                            style={{
                                background: 'white', borderRadius: '20px',
                                padding: '2.5rem', maxWidth: '700px', width: '100%',
                                maxHeight: '90vh', overflowY: 'auto',
                                boxShadow: '0 32px 64px rgba(0,0,0,0.2)',
                                position: 'relative'
                            }}
                        >
                            <button
                                onClick={() => setShowPostJob(false)}
                                style={{
                                    position: 'absolute', top: '1.25rem', right: '1.25rem',
                                    background: '#F1F5F9', border: 'none', borderRadius: '50%',
                                    width: '36px', height: '36px', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                <X size={18} color="#64748B" />
                            </button>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0F172A' }}>
                                Post a New Job
                            </h2>
                            <p style={{ color: '#64748B', marginBottom: '2rem', fontSize: '0.9rem' }}>
                                Fill in the details below to publish your job listing instantly.
                            </p>
                            <PostJobForm onSuccess={handlePostJobSuccess} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ======= LOGIN PROMPT MODAL ======= */}
            <AnimatePresence>
                {showLoginPrompt && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowLoginPrompt(false)}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 1000,
                            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '2rem'
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            onClick={e => e.stopPropagation()}
                            style={{
                                background: 'white', borderRadius: '20px',
                                padding: '3rem 2rem', maxWidth: '450px', width: '100%',
                                textAlign: 'center',
                                boxShadow: '0 32px 64px rgba(0,0,0,0.2)',
                                position: 'relative'
                            }}
                        >
                            <button
                                onClick={() => setShowLoginPrompt(false)}
                                style={{
                                    position: 'absolute', top: '1rem', right: '1rem',
                                    background: '#F1F5F9', border: 'none', borderRadius: '50%',
                                    width: '32px', height: '32px', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                <X size={16} color="#64748B" />
                            </button>

                            <div style={{
                                width: '64px', height: '64px', borderRadius: '50%',
                                background: '#EFF6FF', color: '#2563EB',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 1.5rem'
                            }}>
                                <Lock size={32} />
                            </div>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0F172A' }}>
                                Log in to post a job
                            </h2>
                            <p style={{ color: '#64748B', marginBottom: '2rem', lineHeight: 1.6 }}>
                                You need to be signed in to post job listings and manage applications.
                            </p>

                            <Link
                                to="/login?role=employer"
                                style={{
                                    display: 'block', width: '100%',
                                    padding: '1rem', borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                                    color: 'white', fontWeight: 700, textDecoration: 'none',
                                    marginBottom: '1rem',
                                    boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
                                }}
                            >
                                Log in / Sign up
                            </Link>

                            <button
                                onClick={() => setShowLoginPrompt(false)}
                                style={{
                                    background: 'none', border: 'none',
                                    color: '#64748B', fontWeight: 600,
                                    cursor: 'pointer', fontSize: '0.9rem'
                                }}
                            >
                                Cancel
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ======= SUCCESS TOAST ======= */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        style={{
                            position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
                            zIndex: 1100, background: '#0F172A', color: 'white',
                            padding: '1rem 2rem', borderRadius: '12px',
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            fontWeight: 600, fontSize: '0.95rem'
                        }}
                    >
                        <CheckCircle size={20} color="#10B981" />
                        Job posted successfully!
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default ForEmployers;
