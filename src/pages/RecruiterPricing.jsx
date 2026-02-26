import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Check, Zap, Star, Shield, ArrowRight, Users, FileText, Building2,
    Search, Briefcase, ChevronDown, ChevronUp, X, CreditCard,
    Sparkles, Award, HeadphonesIcon, GraduationCap, Target, TrendingUp,
    Clock, Eye, Filter, Download, Mail, Phone
} from 'lucide-react';
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

// ─── DATA ───────────────────────────────────────────────────────────
const JOB_POSTING_PLANS = [
    {
        name: 'Starter', price: 'Free', period: '', validity: '30 days',
        desc: 'Try before you buy',
        features: ['1 Job Posting', 'Basic Applicant View', 'Email Support', '30-day Listing'],
        color: '#64748B', badge: null
    },
    {
        name: 'Basic', price: '₹50', period: '/post', validity: '60 days',
        desc: 'For individual hiring',
        features: ['1 Job Posting', 'Featured Listing', 'Applicant Ranking', '60-day Listing', 'Chat Support'],
        color: '#2563EB', badge: null
    },
    {
        name: 'Standard', price: '₹500', period: '/pack', validity: '90 days',
        desc: 'Perfect for small teams',
        features: ['10 Job Postings', 'Premium Visibility', 'AI Candidate Matching', 'Analytics Dashboard', 'Priority Support', '90-day Listing'],
        color: '#7C3AED', badge: 'Most Popular'
    },
    {
        name: 'Premium', price: '₹900', period: '/pack', validity: '120 days',
        desc: 'Best for growing companies',
        features: ['30 Job Postings', 'Top Placement', 'AI Screening', '120-day Listing'],
        color: '#0F172A', badge: 'Best Value',
        savings: 'Save 40% (₹600)'
    }
];

const RESUME_DB_PLANS = [
    {
        name: 'Basic', price: '₹1,000', period: '/mo',
        desc: 'Start sourcing candidates',
        features: ['50 Resume Views/mo', 'Basic Filters', 'Download Resumes', 'Email Support'],
        color: '#2563EB', badge: null
    },
    {
        name: 'Professional', price: '₹2,500', period: '/mo',
        desc: 'Unlock advanced sourcing',
        features: ['200 Resume Views/mo', 'Advanced Filters', 'Boolean Search', 'Download & Export', 'Direct Contact Info', 'Priority Support'],
        color: '#7C3AED', badge: 'Recommended'
    },
    {
        name: 'Enterprise', price: 'Custom', period: '',
        desc: 'For large-scale hiring',
        features: ['Unlimited Views', 'AI Recommendations', 'Talent Pipeline', 'Dedicated Manager', 'API Integration', 'Custom SLA'],
        color: '#0F172A', badge: null
    }
];

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

const FAQ_ITEMS = [
    { q: 'How does the free Starter plan work?', a: 'The Starter plan lets you post 1 job for free for 30 days. No credit card required. You can upgrade anytime to access premium features like AI matching and analytics.' },
    { q: 'Can I switch plans anytime?', a: 'Yes! You can upgrade, downgrade, or cancel your plan at any time. When upgrading, you only pay the difference. Downgrades take effect at the next billing cycle.' },
    { q: 'What is the Resume Database?', a: 'Our Resume Database gives you access to over 10 million verified candidate profiles. You can search by skills, experience, location, and more to proactively source talent.' },
    { q: 'Do you offer refunds?', a: 'We offer a full refund within 7 days of purchase if you haven\'t used the resume views or posted any jobs. After 7 days, unused credits roll over to the next month.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, UPI, net banking, and corporate invoicing for Enterprise plans. GST invoices are generated automatically.' },
    { q: 'How does AI Candidate Matching work?', a: 'Our AI analyzes your job description, required skills, and company culture to rank and surface the most relevant candidates from our database, saving you hours of manual screening.' }
];

const TRUSTED_COMPANIES = ['Google', 'Microsoft', 'Flipkart', 'Razorpay', 'Swiggy', 'CRED', 'Paytm', 'Zerodha', 'Meesho', 'PhonePe'];

// ─── COMPONENT ──────────────────────────────────────────────────────
const RecruiterPricing = () => {
    const { user, updateUser } = useJobs();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const [activeTab, setActiveTab] = useState('postings');

    const handleSelectPlan = (plan) => setSelectedPlan(plan);

    const handleConfirmPurchase = () => {
        setIsProcessing(true);
        setTimeout(() => {
            if (user) updateUser({ ...user, plan: selectedPlan.name });
            setIsProcessing(false);
            setShowSuccess(true);
            setTimeout(() => { setShowSuccess(false); setSelectedPlan(null); }, 3000);
        }, 1500);
    };

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
                        <Sparkles size={14} color="#F59E0B" /> Recruiter Pro
                    </motion.div>

                    <h1 style={{
                        fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 800,
                        lineHeight: 1.15, letterSpacing: '-1.5px', color: 'white'
                    }}>
                        Find, attract, and hire<br />
                        <span style={{
                            background: 'linear-gradient(to right, #FFFFFF, #818CF8)',
                            backgroundClip: 'text', WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent', color: 'transparent'
                        }}>
                            talent with Recruiter Pro
                        </span>
                    </h1>

                    <p style={{
                        fontSize: '1.15rem', color: 'rgba(255,255,255,0.8)',
                        maxWidth: '620px', margin: '0 auto 2.5rem', lineHeight: 1.7
                    }}>
                        Choose from flexible hiring products designed for every business size. Post jobs, search resumes, and get expert help — all in one place.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <motion.a
                            href="#plans"
                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
                            style={{
                                padding: '1rem 2.5rem', borderRadius: '12px', border: 'none',
                                background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                                color: 'white', fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                boxShadow: '0 4px 20px rgba(37,99,235,0.4)', textDecoration: 'none'
                            }}
                        >
                            View Plans <ArrowRight size={18} />
                        </motion.a>
                        <motion.button
                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
                            style={{
                                padding: '1rem 2.5rem', borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.3)',
                                background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)',
                                color: 'white', fontSize: '1rem', fontWeight: 600, cursor: 'pointer'
                            }}
                        >
                            Talk to Sales
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* ═══════ STATS STRIP ═══════ */}
            <div style={{
                background: 'linear-gradient(135deg, #0D1B5E, #081450)',
                padding: '2.5rem 2rem', display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap'
            }}>
                {[
                    { label: 'Active Candidates', value: '10M+', icon: Users },
                    { label: 'Resumes Added Daily', value: '50K+', icon: FileText },
                    { label: 'Companies Hiring', value: '500K+', icon: Building2 },
                    { label: 'Avg. Time to Hire', value: '5 Days', icon: Clock }
                ].map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                        style={{ textAlign: 'center', minWidth: '140px' }}
                    >
                        <stat.icon size={22} color="#60A5FA" style={{ marginBottom: '0.4rem' }} />
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>{stat.value}</div>
                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* ═══════ HOW IT WORKS ═══════ */}
            <ScrollReveal>
                <section style={{ padding: '5rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.2rem', textAlign: 'center', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem' }}>
                        Hiring Made Easy
                    </h2>
                    <p style={{ textAlign: 'center', color: '#64748B', marginBottom: '3.5rem', fontSize: '1.05rem' }}>
                        Get started in minutes, hire in days
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', position: 'relative' }}>
                        <div style={{
                            position: 'absolute', top: '40px', left: '16.67%', right: '16.67%',
                            height: '2px', background: 'linear-gradient(90deg, #E2E8F0, #2563EB, #E2E8F0)', zIndex: 0
                        }} />
                        {[
                            { step: '01', title: 'Post a Job', desc: 'Create a detailed listing in under 2 minutes.', icon: FileText, color: '#2563EB' },
                            { step: '02', title: 'Get Matched', desc: 'AI matches your listing with top candidates.', icon: Zap, color: '#7C3AED' },
                            { step: '03', title: 'Hire Fast', desc: 'Review, interview, and make your hire.', icon: Award, color: '#10B981' }
                        ].map((item, i) => (
                            <ScrollReveal key={i} delay={i * 0.15}>
                                <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                                    <div style={{
                                        width: '80px', height: '80px', borderRadius: '50%',
                                        background: `${item.color}12`, border: `2px solid ${item.color}25`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 1.25rem', backgroundColor: 'white'
                                    }}>
                                        <item.icon size={32} color={item.color} />
                                    </div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: item.color, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.4rem' }}>
                                        Step {item.step}
                                    </div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>{item.title}</h3>
                                    <p style={{ color: '#64748B', lineHeight: 1.6, fontSize: '0.9rem' }}>{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            </ScrollReveal>

            {/* ═══════ PRODUCT TABS ═══════ */}
            <section id="plans" style={{ padding: '4rem 2rem 5rem', background: '#F8FAFC' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontSize: '2.2rem', textAlign: 'center', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem' }}>
                            Choose Your Hiring Products
                        </h2>
                        <p style={{ textAlign: 'center', color: '#64748B', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
                            Flexible plans for every stage of growth
                        </p>
                    </ScrollReveal>

                    {/* Tab Switcher */}
                    <div style={{
                        display: 'flex', justifyContent: 'center', gap: '0.5rem',
                        marginBottom: '3rem', background: 'white', borderRadius: '16px',
                        padding: '6px', maxWidth: '500px', margin: '0 auto 3rem',
                        border: '1px solid #E2E8F0'
                    }}>
                        {[
                            { id: 'postings', label: 'Job Postings', icon: Briefcase },
                            { id: 'database', label: 'Resume Database', icon: Search }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    flex: 1, padding: '0.85rem 1.5rem', borderRadius: '12px', border: 'none',
                                    background: activeTab === tab.id ? 'linear-gradient(135deg, #2563EB, #4F46E5)' : 'transparent',
                                    color: activeTab === tab.id ? 'white' : '#64748B',
                                    fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    transition: 'all 0.25s ease'
                                }}
                            >
                                <tab.icon size={16} /> {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Job Posting Plans */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'postings' && (
                            <motion.div
                                key="postings"
                                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}
                            >
                                {JOB_POSTING_PLANS.map((plan, i) => (
                                    <PricingCard key={i} plan={plan} index={i} user={user} onSelect={handleSelectPlan} />
                                ))}
                            </motion.div>
                        )}

                        {/* Resume DB Plans */}
                        {activeTab === 'database' && (
                            <motion.div
                                key="database"
                                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}
                            >
                                {RESUME_DB_PLANS.map((plan, i) => (
                                    <PricingCard key={i} plan={plan} index={i} user={user} onSelect={handleSelectPlan} />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
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

            {/* ═══════ TRUSTED BY ═══════ */}
            <ScrollReveal>
                <section style={{ padding: '3rem 2rem 4rem', background: '#F8FAFC' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem' }}>
                            Trusted by leading companies
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                            {TRUSTED_COMPANIES.map((name, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                                    style={{
                                        padding: '0.75rem 1.75rem', borderRadius: '12px',
                                        backgroundColor: 'white', border: '1px solid #E2E8F0',
                                        fontSize: '0.95rem', fontWeight: 700, color: '#475569',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                                    }}
                                >
                                    {name}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* ═══════ FAQ ═══════ */}
            <ScrollReveal>
                <section style={{ padding: '5rem 2rem' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.2rem', textAlign: 'center', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem' }}>
                            Frequently Asked Questions
                        </h2>
                        <p style={{ textAlign: 'center', color: '#64748B', marginBottom: '3rem', fontSize: '1.05rem' }}>
                            Everything you need to know
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {FAQ_ITEMS.map((faq, i) => (
                                <motion.div
                                    key={i}
                                    initial={false}
                                    style={{
                                        background: 'white', borderRadius: '16px',
                                        border: `1px solid ${openFaq === i ? '#2563EB' : '#E2E8F0'}`,
                                        overflow: 'hidden', transition: 'border-color 0.25s'
                                    }}
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        style={{
                                            width: '100%', padding: '1.25rem 1.5rem',
                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                            background: 'none', border: 'none', cursor: 'pointer',
                                            fontSize: '1rem', fontWeight: 700, color: '#0F172A', textAlign: 'left'
                                        }}
                                    >
                                        {faq.q}
                                        <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                            <ChevronDown size={20} color="#64748B" />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                <div style={{ padding: '0 1.5rem 1.25rem', color: '#64748B', lineHeight: 1.7, fontSize: '0.9rem' }}>
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
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
                            Start hiring smarter today
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', position: 'relative' }}>
                            Join 500K+ companies that trust us. Post your first job for free — no credit card needed.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
                            <Link to="/post-job" style={{
                                padding: '1rem 2.5rem', borderRadius: '12px', border: 'none',
                                background: 'white', color: '#1E40AF', fontSize: '1rem', fontWeight: 700,
                                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                            }}>
                                Post a Job for Free <ArrowRight size={18} />
                            </Link>
                            <Link to="/search-resumes" style={{
                                padding: '1rem 2.5rem', borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.3)',
                                background: 'rgba(255,255,255,0.08)',
                                color: 'white', fontSize: '1rem', fontWeight: 600,
                                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                            }}>
                                Search Resumes
                            </Link>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* ═══════ CHECKOUT MODAL ═══════ */}
            <AnimatePresence>
                {selectedPlan && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 1000, padding: '1rem'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            style={{
                                background: 'white', borderRadius: '32px', padding: '2.5rem',
                                maxWidth: '480px', width: '100%', position: 'relative',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                            }}
                        >
                            {!showSuccess ? (
                                <>
                                    <button onClick={() => setSelectedPlan(null)}
                                        style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
                                    >
                                        <X size={24} />
                                    </button>
                                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                        <div style={{
                                            width: '72px', height: '72px', borderRadius: '20px',
                                            backgroundColor: `${selectedPlan.color}10`, display: 'flex',
                                            alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem'
                                        }}>
                                            <CreditCard size={36} color={selectedPlan.color} />
                                        </div>
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.4rem' }}>Confirm Purchase</h2>
                                        <p style={{ color: '#64748B', fontSize: '0.9rem' }}>You're subscribing to <strong>{selectedPlan.name}</strong></p>
                                    </div>

                                    <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                            <span style={{ color: '#64748B' }}>Plan</span>
                                            <span style={{ color: '#0F172A', fontWeight: 700 }}>{selectedPlan.name}</span>
                                        </div>
                                        {selectedPlan.validity && (
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                <span style={{ color: '#64748B' }}>Validity</span>
                                                <span style={{ color: '#0F172A', fontWeight: 600 }}>{selectedPlan.validity}</span>
                                            </div>
                                        )}
                                        <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '0.75rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem' }}>
                                            <span style={{ color: '#0F172A', fontWeight: 800 }}>Total</span>
                                            <span style={{ color: '#2563EB', fontWeight: 800 }}>{selectedPlan.price}{selectedPlan.period}</span>
                                        </div>
                                    </div>

                                    <button onClick={handleConfirmPurchase} disabled={isProcessing}
                                        style={{
                                            width: '100%', padding: '1rem', borderRadius: '14px',
                                            background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                                            color: 'white', fontWeight: 800, fontSize: '0.95rem', border: 'none',
                                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem'
                                        }}
                                    >
                                        {isProcessing ? (
                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                                style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }}
                                            />
                                        ) : (
                                            <>Confirm & Pay <ArrowRight size={16} /></>
                                        )}
                                    </button>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                        style={{
                                            width: '90px', height: '90px', borderRadius: '50%',
                                            backgroundColor: '#10B981', display: 'flex',
                                            alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
                                        }}
                                    >
                                        <Check size={50} color="white" strokeWidth={3} />
                                    </motion.div>
                                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem' }}>
                                        Welcome to {selectedPlan.name}!
                                    </h2>
                                    <p style={{ color: '#64748B', lineHeight: 1.6 }}>
                                        Your plan is now active. Start hiring smarter today!
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ─── PRICING CARD ───────────────────────────────────────────────────
const PricingCard = ({ plan, index, user, onSelect }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
        style={{
            padding: '2rem 1.75rem', borderRadius: '24px',
            border: plan.badge ? `2px solid ${plan.color}` : '1px solid #E2E8F0',
            background: 'white', position: 'relative', display: 'flex', flexDirection: 'column',
            transition: 'all 0.3s'
        }}
    >
        {plan.badge && (
            <div style={{
                position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                backgroundColor: plan.color, color: 'white', padding: '4px 16px', borderRadius: '100px',
                fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px',
                whiteSpace: 'nowrap'
            }}>
                {plan.badge}
            </div>
        )}
        {user?.plan === plan.name && (
            <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                backgroundColor: '#ECFDF5', color: '#10B981', padding: '3px 10px', borderRadius: '100px',
                fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px'
            }}>
                <Check size={12} /> Active
            </div>
        )}
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.4rem' }}>{plan.name}</h3>
        <div style={{ marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>{plan.price}</span>
            {plan.period && <span style={{ color: '#64748B', fontWeight: 600, fontSize: '0.85rem' }}>{plan.period}</span>}
        </div>

        {plan.savings && (
            <div style={{
                color: '#10B981',
                fontSize: '0.75rem',
                fontWeight: 800,
                backgroundColor: '#ECFDF5',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                width: 'fit-content',
                marginBottom: '1rem'
            }}>
                {plan.savings}
            </div>
        )}

        <p style={{ color: '#94A3B8', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.5rem' }}>{plan.desc}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.75rem', flex: 1 }}>
            {plan.features.map((f, j) => {
                const isJobPosting = f.includes('Job Posting');
                return (
                    <div key={j} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        fontSize: '0.82rem',
                        color: isJobPosting ? plan.color : '#334155',
                        background: isJobPosting ? `${plan.color}10` : 'transparent',
                        padding: isJobPosting ? '0.4rem 0.75rem' : '0',
                        borderRadius: isJobPosting ? '100px' : '0',
                        border: isJobPosting ? `1px solid ${plan.color}20` : 'none',
                        width: isJobPosting ? 'fit-content' : 'auto'
                    }}>
                        {!isJobPosting && <Check size={14} color="#10B981" strokeWidth={3} />}
                        {isJobPosting && <Zap size={14} color={plan.color} strokeWidth={3} />}
                        <span style={{ fontWeight: isJobPosting ? 700 : 400 }}>{f}</span>
                    </div>
                );
            })}
        </div>
        <button
            onClick={() => onSelect(plan)}
            disabled={user?.plan === plan.name}
            style={{
                width: '100%', padding: '0.85rem', borderRadius: '12px',
                border: plan.badge ? 'none' : '2px solid #E2E8F0',
                background: plan.badge ? `linear-gradient(135deg, ${plan.color}, ${plan.color}CC)` : 'white',
                color: plan.badge ? 'white' : '#0F172A',
                fontWeight: 700, fontSize: '0.85rem',
                cursor: user?.plan === plan.name ? 'default' : 'pointer',
                transition: 'all 0.2s',
                opacity: user?.plan === plan.name ? 0.5 : 1
            }}
        >
            {user?.plan === plan.name ? 'Current Plan' : plan.price === 'Custom' ? 'Contact Sales' : 'Buy Now'}
        </button>
    </motion.div>
);

export default RecruiterPricing;
