import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, Bell, Users, CreditCard, Shield, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const RecruiterSettings = () => {
    const settingsCards = [
        {
            title: 'Company Profile',
            desc: 'Manage your company details, logo, and public description.',
            icon: <Building2 size={24} color="#2563EB" />,
            bg: '#EFF6FF',
            action: 'Edit Profile',
            link: '/recruiter-settings/company-profile'
        },
        {
            title: 'Notifications',
            desc: 'Configure email alerts for new candidates and platform updates.',
            icon: <Bell size={24} color="#10B981" />,
            bg: '#ECFDF5',
            action: 'Manage Alerts',
            link: '/recruiter-settings/notifications'
        },
        {
            title: 'Team & Roles',
            desc: 'Invite coworkers and manage recruiter permissions.',
            icon: <Users size={24} color="#8B5CF6" />,
            bg: '#F5F3FF',
            action: 'Manage Team',
            link: '/recruiter-settings/team'
        },
        {
            title: 'Billing & Plans',
            desc: 'View your active subscription plan and download invoices.',
            icon: <CreditCard size={24} color="#F59E0B" />,
            bg: '#FFFBEB',
            action: 'View Billing',
            link: '/recruiter-settings/billing'
        },
        {
            title: 'Security & Privacy',
            desc: 'Update your password and manage active sessions.',
            icon: <Shield size={24} color="#EF4444" />,
            bg: '#FEF2F2',
            action: 'Security Settings',
            link: '/recruiter-settings/security'
        },
        {
            title: 'Email Templates',
            desc: 'Customize the automated emails sent to applicants.',
            icon: <Mail size={24} color="#06B6D4" />,
            bg: '#ECFEFF',
            action: 'Edit Templates',
            link: '/recruiter-settings/email-templates'
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F8FAFC',
            paddingTop: '80px',
            paddingBottom: '4rem',
            fontFamily: "'Montserrat', sans-serif"
        }}>
            <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}>
                    <Link to="/recruiter-dashboard" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '44px', height: '44px', borderRadius: '50%',
                        backgroundColor: 'white', border: '1px solid #E2E8F0',
                        color: '#64748B', transition: 'all 0.2s', textDecoration: 'none',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                    }} onMouseOver={e => { e.currentTarget.style.backgroundColor = '#F1F5F9'; e.currentTarget.style.color = '#0F172A'; }} onMouseOut={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#64748B'; }}>
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.5px' }}>Workspace Settings</h1>
                        <p style={{ color: '#64748B', fontSize: '1rem', margin: '0.4rem 0 0 0' }}>Manage your account, team, and billing preferences.</p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}
                >
                    {settingsCards.map((card, idx) => (
                        <div key={idx} style={{
                            backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: '16px',
                            padding: '1.5rem', display: 'flex', flexDirection: 'column',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.02)'
                        }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                {card.icon}
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.5rem 0' }}>{card.title}</h3>
                            <p style={{ fontSize: '0.9rem', color: '#64748B', margin: '0 0 1.5rem 0', lineHeight: 1.5, flex: 1 }}>{card.desc}</p>
                            <Link to={card.link} style={{ textDecoration: 'none' }}>
                                <Button variant="outline" style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem', fontWeight: 600 }}>
                                    {card.action}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default RecruiterSettings;
