import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Star, Shield, X, ArrowRight, CreditCard } from 'lucide-react';
import { useJobs } from '../context/JobContext';

const Pricing = () => {
    const { user, updateUser } = useJobs();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
    };

    const handleConfirmPurchase = () => {
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            updateUser({ ...user, plan: selectedPlan.name });
            setIsProcessing(false);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setSelectedPlan(null);
            }, 3000);
        }, 1500);
    };

    const plans = [
        {
            name: 'Starter',
            price: 'Free',
            desc: 'Perfect for small businesses starting out.',
            features: ['1 Active Job Post', 'Search Resumes', 'Standard Support', 'Dashboard Access'],
            icon: Zap,
            color: '#64748B'
        },
        {
            name: 'Pro',
            price: '₹2,499',
            period: '/mo',
            desc: 'Best for growing teams with regular needs.',
            features: ['5 Active Job Posts', 'Premium Search Filters', 'Priority Support', 'AI Matching'],
            icon: Star,
            color: '#2563EB',
            popular: true
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            desc: 'Advanced solutions for large organizations.',
            features: ['Unlimited Job Posts', 'Dedicated Account Manager', 'Custom Integration', 'Enterprise Security'],
            icon: Shield,
            color: '#0F172A'
        }
    ];

    return (
        <div style={{ padding: '8rem 2rem 4rem', minHeight: '100vh', backgroundColor: '#F8FAFC', fontFamily: "'Montserrat', sans-serif" }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', letterSpacing: '-2px' }}>
                        Simple, Transparent Pricing
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#64748B', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                        Choose the plan that fits your hiring needs. No hidden fees, cancel anytime.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                            style={{
                                padding: '3.5rem 2rem',
                                border: plan.popular ? '2px solid #2563EB' : '1px solid #E2E8F0',
                                borderRadius: '32px',
                                background: 'white',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s'
                            }}
                        >
                            {plan.popular && (
                                <div style={{
                                    position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                                    backgroundColor: '#2563EB', color: 'white', padding: '6px 20px', borderRadius: '100px',
                                    fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px'
                                }}>
                                    Most Popular
                                </div>
                            )}
                            {user?.plan === plan.name && (
                                <div style={{
                                    position: 'absolute', top: '1.5rem', right: '1.5rem',
                                    backgroundColor: '#ECFDF5', color: '#10B981', padding: '4px 12px', borderRadius: '100px',
                                    fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px'
                                }}>
                                    <Check size={14} /> Current Plan
                                </div>
                            )}
                            <div style={{
                                width: '64px', height: '64px', borderRadius: '20px',
                                backgroundColor: `${plan.color}10`, display: 'flex',
                                alignItems: 'center', justifyContent: 'center', marginBottom: '2rem'
                            }}>
                                <plan.icon size={32} color={plan.color} />
                            </div>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>{plan.name}</h3>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <span style={{ fontSize: '3rem', fontWeight: 800, color: '#0F172A' }}>{plan.price}</span>
                                {plan.period && <span style={{ color: '#64748B', fontWeight: 600 }}>{plan.period}</span>}
                            </div>
                            <p style={{ color: '#64748B', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: 1.5 }}>{plan.desc}</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem', flex: 1 }}>
                                {plan.features.map((f, j) => (
                                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.95rem', color: '#334155' }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Check size={12} color="#10B981" strokeWidth={3} />
                                        </div>
                                        <span>{f}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => handleSelectPlan(plan)}
                                disabled={user?.plan === plan.name}
                                style={{
                                    width: '100%',
                                    padding: '1.1rem',
                                    borderRadius: '16px',
                                    border: plan.popular ? 'none' : '2px solid #E2E8F0',
                                    background: plan.popular ? 'linear-gradient(135deg, #2563EB, #4F46E5)' : 'white',
                                    color: plan.popular ? 'white' : '#0F172A',
                                    fontWeight: 800,
                                    fontSize: '1rem',
                                    cursor: user?.plan === plan.name ? 'default' : 'pointer',
                                    transition: 'all 0.2s',
                                    opacity: user?.plan === plan.name ? 0.6 : 1
                                }}
                            >
                                {user?.plan === plan.name ? 'Active' : 'Get Started'}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Selection Modal */}
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
                                maxWidth: '500px', width: '100%', position: 'relative',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                            }}
                        >
                            {!showSuccess ? (
                                <>
                                    <button
                                        onClick={() => setSelectedPlan(null)}
                                        style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
                                    >
                                        <X size={24} />
                                    </button>
                                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                        <div style={{
                                            width: '80px', height: '80px', borderRadius: '24px',
                                            backgroundColor: `${selectedPlan.color}10`, display: 'flex',
                                            alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
                                        }}>
                                            <CreditCard size={40} color={selectedPlan.color} />
                                        </div>
                                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>Confirm Subscription</h2>
                                        <p style={{ color: '#64748B' }}>You're subscribing to the {selectedPlan.name} plan.</p>
                                    </div>

                                    <div style={{ backgroundColor: '#F8FAFC', padding: '1.5rem', borderRadius: '20px', marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                            <span style={{ color: '#64748B', fontWeight: 600 }}>Plan</span>
                                            <span style={{ color: '#0F172A', fontWeight: 700 }}>{selectedPlan.name}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem' }}>
                                            <span style={{ color: '#0F172A', fontWeight: 800 }}>Total</span>
                                            <span style={{ color: '#2563EB', fontWeight: 800 }}>{selectedPlan.price}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleConfirmPurchase}
                                        disabled={isProcessing}
                                        style={{
                                            width: '100%', padding: '1.1rem', borderRadius: '16px',
                                            background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                                            color: 'white', fontWeight: 800, fontSize: '1rem', border: 'none',
                                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem'
                                        }}
                                    >
                                        {isProcessing ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                                style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }}
                                            />
                                        ) : (
                                            <>Confirm & Pay <ArrowRight size={18} /></>
                                        )}
                                    </button>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        style={{
                                            width: '100px', height: '100px', borderRadius: '50%',
                                            backgroundColor: '#10B981', display: 'flex',
                                            alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem'
                                        }}
                                    >
                                        <Check size={60} color="white" strokeWidth={3} />
                                    </motion.div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>Welcome to {selectedPlan.name}!</h2>
                                    <p style={{ color: '#64748B', lineHeight: 1.6, fontSize: '1.1rem' }}>
                                        Your subscription is now active. You can start using your premium features immediately.
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

export default Pricing;
