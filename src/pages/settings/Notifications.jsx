import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Mail, Briefcase, Users, MessageSquare, TrendingUp } from 'lucide-react';
import Button from '../../components/ui/Button';

const ToggleSwitch = ({ checked, onChange }) => (
    <div onClick={onChange} style={{
        width: '44px', height: '24px', borderRadius: '12px', cursor: 'pointer',
        backgroundColor: checked ? '#2563EB' : '#CBD5E1', position: 'relative',
        transition: 'background-color 0.2s'
    }}>
        <div style={{
            width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white',
            position: 'absolute', top: '2px', left: checked ? '22px' : '2px',
            transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
        }} />
    </div>
);

const SettingsNotifications = () => {
    const [isSaved, setIsSaved] = useState(false);
    const [prefs, setPrefs] = useState({
        newApplicant: true,
        applicationUpdate: true,
        weeklyDigest: false,
        jobExpiry: true,
        platformUpdates: false,
        marketingEmails: false
    });

    const toggle = (key) => {
        setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2500);
    };

    const notifications = [
        { key: 'newApplicant', title: 'New Applicant Alert', desc: 'Get notified when a candidate applies to your job posting.', icon: <Users size={20} color="#2563EB" />, bg: '#EFF6FF' },
        { key: 'applicationUpdate', title: 'Application Status Updates', desc: 'Receive updates when candidates update their application or withdraw.', icon: <Briefcase size={20} color="#10B981" />, bg: '#ECFDF5' },
        { key: 'jobExpiry', title: 'Job Expiry Reminders', desc: 'Get reminded 3 days before your job postings expire.', icon: <Bell size={20} color="#F59E0B" />, bg: '#FFFBEB' },
        { key: 'weeklyDigest', title: 'Weekly Performance Digest', desc: 'A summary of job views, clicks, and applicant stats every Monday.', icon: <TrendingUp size={20} color="#8B5CF6" />, bg: '#F5F3FF' },
        { key: 'platformUpdates', title: 'Platform Announcements', desc: 'New features, improvements, and important platform changes.', icon: <MessageSquare size={20} color="#06B6D4" />, bg: '#ECFEFF' },
        { key: 'marketingEmails', title: 'Tips & Marketing Emails', desc: 'Recruiting tips, industry insights, and promotional offers.', icon: <Mail size={20} color="#EF4444" />, bg: '#FEF2F2' }
    ];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', paddingTop: '80px', paddingBottom: '4rem', fontFamily: "'Montserrat', sans-serif" }}>
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
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
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Notifications</h1>
                        <p style={{ color: '#64748B', fontSize: '0.95rem', margin: '0.3rem 0 0 0' }}>Choose what alerts you want to receive.</p>
                    </div>
                </div>

                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                    style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}
                >
                    {notifications.map((n, idx) => (
                        <div key={n.key} style={{
                            padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            borderBottom: idx < notifications.length - 1 ? '1px solid #F1F5F9' : 'none'
                        }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: n.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {n.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0F172A', margin: '0 0 0.2rem 0' }}>{n.title}</h3>
                                    <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>{n.desc}</p>
                                </div>
                            </div>
                            <ToggleSwitch checked={prefs[n.key]} onChange={() => toggle(n.key)} />
                        </div>
                    ))}

                    <div style={{ padding: '1.25rem 1.75rem', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', alignItems: 'center' }}>
                        {isSaved && <span style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 600 }}>✓ Preferences saved!</span>}
                        <Button variant="primary" onClick={handleSave} style={{ padding: '0.7rem 2rem', fontSize: '0.9rem', fontWeight: 600 }}>
                            Save Preferences
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SettingsNotifications;
