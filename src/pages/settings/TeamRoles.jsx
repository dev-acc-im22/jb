import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, UserPlus, Shield, Trash2, Mail } from 'lucide-react';
import Button from '../../components/ui/Button';

const SettingsTeam = () => {
    const [showInvite, setShowInvite] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('recruiter');
    const [inviteSent, setInviteSent] = useState(false);

    const [members] = useState([
        { id: 1, name: 'You (Owner)', email: 'admin@yourcompany.com', role: 'Owner', status: 'active', color: '#2563EB' },
        { id: 2, name: 'Priya Sharma', email: 'priya@yourcompany.com', role: 'Recruiter', status: 'active', color: '#8B5CF6' },
        { id: 3, name: 'Rahul Kumar', email: 'rahul@yourcompany.com', role: 'Recruiter', status: 'pending', color: '#F59E0B' }
    ]);

    const handleInvite = (e) => {
        e.preventDefault();
        setInviteSent(true);
        setInviteEmail('');
        setTimeout(() => { setInviteSent(false); setShowInvite(false); }, 2000);
    };

    const inputStyle = {
        width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
        border: '1px solid #E2E8F0', fontSize: '0.9rem', outline: 'none',
        fontFamily: "'Montserrat', sans-serif", backgroundColor: '#FAFBFC'
    };

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
                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Team & Roles</h1>
                        <p style={{ color: '#64748B', fontSize: '0.95rem', margin: '0.3rem 0 0 0' }}>Manage your team members and their permissions.</p>
                    </div>
                    <Button variant="primary" onClick={() => setShowInvite(!showInvite)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
                        <UserPlus size={16} /> Invite Member
                    </Button>
                </div>

                {/* Invite Form */}
                {showInvite && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        style={{ backgroundColor: 'white', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}
                    >
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 1rem 0' }}>Invite a new team member</h3>
                        <form onSubmit={handleInvite} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
                            <div style={{ flex: 2 }}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Email Address</label>
                                <input type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="colleague@company.com" required style={inputStyle} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Role</label>
                                <select value={inviteRole} onChange={e => setInviteRole(e.target.value)} style={inputStyle}>
                                    <option value="recruiter">Recruiter</option>
                                    <option value="admin">Admin</option>
                                    <option value="viewer">Viewer</option>
                                </select>
                            </div>
                            <Button type="submit" variant="primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                                {inviteSent ? '✓ Sent!' : 'Send Invite'}
                            </Button>
                        </form>
                    </motion.div>
                )}

                {/* Members List */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                    style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}
                >
                    <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Team Members ({members.length})</h2>
                    </div>
                    {members.map((member, idx) => (
                        <div key={member.id} style={{
                            padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            borderBottom: idx < members.length - 1 ? '1px solid #F1F5F9' : 'none'
                        }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '50%', backgroundColor: member.color,
                                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.9rem', fontWeight: 700
                                }}>
                                    {member.name.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0F172A', margin: 0 }}>{member.name}</h3>
                                        {member.status === 'pending' && (
                                            <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: '100px', backgroundColor: '#FEF3C7', color: '#92400E' }}>Pending</span>
                                        )}
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0.15rem 0 0 0' }}>{member.email}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{
                                    fontSize: '0.8rem', fontWeight: 600, padding: '0.3rem 0.75rem', borderRadius: '6px',
                                    backgroundColor: member.role === 'Owner' ? '#EFF6FF' : '#F1F5F9',
                                    color: member.role === 'Owner' ? '#1E40AF' : '#475569'
                                }}>
                                    {member.role}
                                </span>
                                {member.role !== 'Owner' && (
                                    <button style={{
                                        background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer',
                                        padding: '0.3rem', borderRadius: '6px', transition: 'color 0.2s'
                                    }}>
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default SettingsTeam;
