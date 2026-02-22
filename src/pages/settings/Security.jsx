import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, EyeOff, Smartphone, Monitor, LogOut } from 'lucide-react';
import Button from '../../components/ui/Button';

const SettingsSecurity = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });

    const sessions = [
        { id: 1, device: 'Chrome on Windows', icon: <Monitor size={18} />, location: 'Bangalore, India', time: 'Active now', current: true },
        { id: 2, device: 'Safari on iPhone', icon: <Smartphone size={18} />, location: 'Mumbai, India', time: '2 hours ago', current: false },
        { id: 3, device: 'Firefox on MacOS', icon: <Monitor size={18} />, location: 'Delhi, India', time: '3 days ago', current: false }
    ];

    const handleSave = (e) => {
        e.preventDefault();
        if (passwords.newPass !== passwords.confirm) {
            alert('Passwords do not match!');
            return;
        }
        setIsSaved(true);
        setPasswords({ current: '', newPass: '', confirm: '' });
        setTimeout(() => setIsSaved(false), 2500);
    };

    const inputStyle = {
        width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
        border: '1px solid #E2E8F0', fontSize: '0.9rem', outline: 'none',
        fontFamily: "'Montserrat', sans-serif", backgroundColor: '#FAFBFC'
    };
    const labelStyle = { display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155' };

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
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Security & Privacy</h1>
                        <p style={{ color: '#64748B', fontSize: '0.95rem', margin: '0.3rem 0 0 0' }}>Update your password and manage active sessions.</p>
                    </div>
                </div>

                {/* Change Password */}
                <motion.form onSubmit={handleSave} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                    style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}
                >
                    <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Shield size={18} color="#EF4444" /> Change Password
                        </h2>
                    </div>
                    <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label style={labelStyle}>Current Password</label>
                            <div style={{ position: 'relative' }}>
                                <input type={showPassword ? 'text' : 'password'} value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} placeholder="Enter current password" required style={inputStyle} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                            <div>
                                <label style={labelStyle}>New Password</label>
                                <input type="password" value={passwords.newPass} onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))} placeholder="Enter new password" required style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Confirm New Password</label>
                                <input type="password" value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} placeholder="Confirm new password" required style={inputStyle} />
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: '1rem 1.75rem', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', alignItems: 'center' }}>
                        {isSaved && <span style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 600 }}>✓ Password updated!</span>}
                        <Button type="submit" variant="primary" style={{ padding: '0.7rem 2rem', fontSize: '0.9rem', fontWeight: 600 }}>
                            Update Password
                        </Button>
                    </div>
                </motion.form>

                {/* Active Sessions */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}
                >
                    <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Active Sessions</h2>
                    </div>
                    {sessions.map((s, idx) => (
                        <div key={s.id} style={{
                            padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            borderBottom: idx < sessions.length - 1 ? '1px solid #F1F5F9' : 'none'
                        }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: s.current ? '#EFF6FF' : '#F1F5F9', color: s.current ? '#2563EB' : '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {s.icon}
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0F172A' }}>{s.device}</span>
                                        {s.current && <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: '100px', backgroundColor: '#ECFDF5', color: '#065F46' }}>This device</span>}
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>{s.location} • {s.time}</span>
                                </div>
                            </div>
                            {!s.current && (
                                <button style={{
                                    display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.4rem 0.8rem',
                                    fontSize: '0.8rem', fontWeight: 600, color: '#EF4444', backgroundColor: '#FEF2F2',
                                    border: '1px solid #FECACA', borderRadius: '6px', cursor: 'pointer'
                                }}>
                                    <LogOut size={13} /> Revoke
                                </button>
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default SettingsSecurity;
