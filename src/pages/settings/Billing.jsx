import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Check, Zap, Download, Calendar } from 'lucide-react';
import Button from '../../components/ui/Button';

const SettingsBilling = () => {
    const [currentPlan] = useState('free');

    const plans = [
        {
            id: 'free', name: 'Starter', price: '₹0', period: '/month',
            features: ['3 Active Job Posts', 'Basic Applicant Tracking', 'Email Support', 'Company Profile Page'],
            color: '#64748B', bg: '#F8FAFC', border: '#E2E8F0'
        },
        {
            id: 'pro', name: 'Professional', price: '₹2,499', period: '/month',
            features: ['15 Active Job Posts', 'Advanced ATS + Filters', 'Priority Support', 'Resume Database Access', 'Analytics Dashboard', 'Custom Email Templates'],
            color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE', popular: true
        },
        {
            id: 'enterprise', name: 'Enterprise', price: '₹7,999', period: '/month',
            features: ['Unlimited Job Posts', 'AI Candidate Matching', 'Dedicated Account Manager', 'API Access', 'Custom Integrations', 'White-label Options', 'Team Management'],
            color: '#7C3AED', bg: '#F5F3FF', border: '#C4B5FD'
        }
    ];

    const invoices = [
        { id: 'INV-001', date: 'Jan 15, 2026', amount: '₹0.00', status: 'Paid', plan: 'Starter' },
        { id: 'INV-002', date: 'Feb 15, 2026', amount: '₹0.00', status: 'Paid', plan: 'Starter' }
    ];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', paddingTop: '80px', paddingBottom: '4rem', fontFamily: "'Montserrat', sans-serif" }}>
            <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}>
                    <Link to="/recruiter-settings" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '44px', height: '44px', borderRadius: '50%',
                        backgroundColor: 'white', border: '1px solid #E2E8F0',
                        color: '#64748B', textDecoration: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                    }}>
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Billing & Plans</h1>
                        <p style={{ color: '#64748B', fontSize: '0.95rem', margin: '0.3rem 0 0 0' }}>Manage your subscription and view invoices.</p>
                    </div>
                </div>

                {/* Plans Grid */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}
                >
                    {plans.map(plan => (
                        <div key={plan.id} style={{
                            backgroundColor: 'white', borderRadius: '16px', padding: '1.75rem',
                            border: currentPlan === plan.id ? `2px solid ${plan.color}` : '1px solid #E2E8F0',
                            position: 'relative', display: 'flex', flexDirection: 'column',
                            boxShadow: currentPlan === plan.id ? `0 4px 14px ${plan.color}20` : '0 2px 6px rgba(0,0,0,0.02)'
                        }}>
                            {plan.popular && (
                                <span style={{
                                    position: 'absolute', top: '-10px', right: '16px',
                                    padding: '0.25rem 0.75rem', fontSize: '0.7rem', fontWeight: 700,
                                    backgroundColor: '#2563EB', color: 'white', borderRadius: '100px'
                                }}>MOST POPULAR</span>
                            )}
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: plan.color, margin: '0 0 0.5rem 0' }}>{plan.name}</h3>
                            <div style={{ marginBottom: '1.25rem' }}>
                                <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>{plan.price}</span>
                                <span style={{ fontSize: '0.85rem', color: '#64748B' }}>{plan.period}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1, marginBottom: '1.5rem' }}>
                                {plan.features.map((f, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#475569' }}>
                                        <Check size={14} color={plan.color} /> {f}
                                    </div>
                                ))}
                            </div>
                            <Button
                                variant={currentPlan === plan.id ? 'outline' : 'primary'}
                                style={{
                                    width: '100%', padding: '0.65rem', fontSize: '0.85rem', fontWeight: 600,
                                    backgroundColor: currentPlan === plan.id ? 'transparent' : plan.color,
                                    borderColor: plan.color, color: currentPlan === plan.id ? plan.color : 'white'
                                }}
                                disabled={currentPlan === plan.id}
                            >
                                {currentPlan === plan.id ? '✓ Current Plan' : 'Upgrade'}
                            </Button>
                        </div>
                    ))}
                </motion.div>

                {/* Invoices */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}
                >
                    <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Invoice History</h2>
                    </div>
                    {invoices.map((inv, idx) => (
                        <div key={inv.id} style={{
                            padding: '1rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            borderBottom: idx < invoices.length - 1 ? '1px solid #F1F5F9' : 'none'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Calendar size={16} color="#64748B" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0F172A' }}>{inv.id}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{inv.date} • {inv.plan}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0F172A' }}>{inv.amount}</span>
                                <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.5rem', borderRadius: '100px', backgroundColor: '#ECFDF5', color: '#065F46' }}>{inv.status}</span>
                                <button style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '0.3rem' }}>
                                    <Download size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default SettingsBilling;
