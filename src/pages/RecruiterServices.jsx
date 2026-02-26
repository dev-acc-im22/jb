import React from 'react';
import { motion } from 'framer-motion';
import { Check, HeadphonesIcon, Target, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { useJobs } from '../context/JobContext';
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

const EXPERT_SERVICES = [
    {
        title: 'Dedicated Recruiter', price: '₹5,000', period: '/mo',
        desc: 'Get a dedicated recruitment expert who sources, screens, and shortlists candidates for you.',
        features: ['End-to-end recruiting', 'Screening & shortlisting', 'Interview scheduling', 'Weekly reports'],
        icon: HeadphonesIcon, color: '#2563EB'
    },
    {
        title: 'Recruitment Drives', price: '₹8,000', period: '/drive',
        desc: 'Organize large-scale hiring drives with our expert team managing logistics and assessments.',
        features: ['Event planning & logistics', 'Assessment setup', 'Candidate management', 'Post-event analytics'],
        icon: Target, color: '#7C3AED'
    },
    {
        title: 'Campus Hiring', price: '₹4,000', period: '/campus',
        desc: 'Connect with top colleges and universities to hire the best fresh talent.',
        features: ['College network access', 'Campus event coordination', 'Bulk assessments', 'Offer management'],
        icon: GraduationCap, color: '#10B981'
    }
];

const RecruiterServices = () => {
    const { user } = useJobs();

    return (
        <div style={{ backgroundColor: 'white', minHeight: '100vh', fontFamily: "'Montserrat', sans-serif" }}>

            {/* ═══════ HERO ═══════ */}
            <section style={{
                marginTop: '80px',
                padding: '6rem 2rem 4rem',
                background: 'linear-gradient(170deg, #020617 0%, #0F172A 50%, #020617 100%)',
                color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04,
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute', top: '-120px', right: '-100px', width: '500px', height: '500px',
                        borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)',
                        filter: 'blur(60px)', pointerEvents: 'none'
                    }}
                />
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute', bottom: '-80px', left: '-80px', width: '400px', height: '400px',
                        borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.12), transparent 70%)',
                        filter: 'blur(50px)', pointerEvents: 'none'
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.5rem 1.25rem', borderRadius: '100px',
                            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                            marginBottom: '2rem', fontSize: '0.9rem', fontWeight: 600
                        }}
                    >
                        <Sparkles size={14} color="#F59E0B" /> Expert Services
                    </motion.div>

                    <h1 style={{
                        fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 800,
                        lineHeight: 1.15, letterSpacing: '-1.5px', color: 'white'
                    }}>
                        Let our experts handle<br />
                        <span style={{
                            background: 'linear-gradient(to right, #FFFFFF, #818CF8)',
                            backgroundClip: 'text', WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent', color: 'transparent'
                        }}>
                            your hiring needs
                        </span>
                    </h1>

                    <p style={{
                        fontSize: '1.15rem', color: 'rgba(255,255,255,0.8)',
                        maxWidth: '620px', margin: '0 auto 2.5rem', lineHeight: 1.7
                    }}>
                        From dedicated recruiters to campus hiring, our expert services take the stress out of talent acquisition so you can focus on what matters.
                    </p>
                </motion.div>
            </section>

            {/* ═══════ EXPERT ASSISTANCE ═══════ */}
            <ScrollReveal>
                <section style={{ padding: '5rem 2rem' }}>
                    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.2rem', textAlign: 'center', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem' }}>
                            Get Expert Assistance
                        </h2>
                        <p style={{ textAlign: 'center', color: '#64748B', marginBottom: '3rem', fontSize: '1.05rem' }}>
                            Let our recruitment experts do the heavy lifting
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {EXPERT_SERVICES.map((svc, i) => (
                                <ScrollReveal key={i} delay={i * 0.1}>
                                    <motion.div
                                        whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                                        style={{
                                            background: 'white', borderRadius: '24px', padding: '2rem',
                                            border: '1px solid #E2E8F0', transition: 'all 0.3s', height: '100%',
                                            display: 'flex', flexDirection: 'column'
                                        }}
                                    >
                                        <div style={{
                                            width: '56px', height: '56px', borderRadius: '16px',
                                            background: `${svc.color}10`, display: 'flex',
                                            alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'
                                        }}>
                                            <svc.icon size={28} color={svc.color} />
                                        </div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>{svc.title}</h3>
                                        <div style={{ marginBottom: '1rem' }}>
                                            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A' }}>{svc.price}</span>
                                            <span style={{ color: '#64748B', fontWeight: 600, fontSize: '0.9rem' }}>{svc.period}</span>
                                        </div>
                                        <p style={{ color: '#64748B', lineHeight: 1.6, fontSize: '0.9rem', marginBottom: '1.5rem' }}>{svc.desc}</p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', flex: 1 }}>
                                            {svc.features.map((f, j) => (
                                                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#334155' }}>
                                                    <Check size={14} color="#10B981" strokeWidth={3} />
                                                    <span>{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <button style={{
                                            width: '100%', padding: '0.9rem', borderRadius: '12px',
                                            border: '2px solid #E2E8F0', background: 'white',
                                            color: '#0F172A', fontWeight: 700, fontSize: '0.9rem',
                                            cursor: 'pointer', transition: 'all 0.2s'
                                        }}>
                                            Contact Sales
                                        </button>
                                    </motion.div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* ═══════ CTA BANNER ═══════ */}
            <ScrollReveal>
                <section style={{ padding: '2rem', marginBottom: '3rem' }}>
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
                                borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)',
                                filter: 'blur(40px)', pointerEvents: 'none'
                            }}
                        />
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white', fontWeight: 800, position: 'relative' }}>
                            Ready to get expert help?
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', position: 'relative' }}>
                            Talk to our team and find the right service for your hiring needs.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
                            <motion.button
                                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
                                style={{
                                    padding: '1rem 2.5rem', borderRadius: '12px', border: 'none',
                                    background: 'white', color: '#1E40AF', fontSize: '1rem', fontWeight: 700,
                                    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)', fontFamily: "'Montserrat', sans-serif"
                                }}
                            >
                                Contact Sales <ArrowRight size={18} />
                            </motion.button>
                            <Link to="/recruiter-pricing" style={{
                                padding: '1rem 2.5rem', borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.3)',
                                background: 'rgba(255,255,255,0.08)',
                                color: 'white', fontSize: '1rem', fontWeight: 600,
                                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                            }}>
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </section>
            </ScrollReveal>
        </div>
    );
};

export default RecruiterServices;
