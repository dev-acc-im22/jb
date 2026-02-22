import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Edit3, Eye, Copy, Check } from 'lucide-react';
import Button from '../../components/ui/Button';

const SettingsEmailTemplates = () => {
    const [activeTemplate, setActiveTemplate] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    const [templates, setTemplates] = useState([
        {
            id: 'received', name: 'Application Received', status: 'active',
            subject: 'We received your application for {{job_title}}',
            body: `Hi {{candidate_name}},\n\nThank you for applying to the {{job_title}} position at {{company_name}}. We've received your application and our team will review it carefully.\n\nWe typically respond within 5–7 business days. In the meantime, feel free to explore more about our company.\n\nBest regards,\n{{company_name}} Hiring Team`,
            color: '#10B981', bg: '#ECFDF5'
        },
        {
            id: 'shortlisted', name: 'Shortlisted Notification', status: 'active',
            subject: 'Great news! You\'ve been shortlisted for {{job_title}}',
            body: `Hi {{candidate_name}},\n\nWe're excited to let you know that you've been shortlisted for the {{job_title}} role at {{company_name}}!\n\nOur team was impressed with your profile and we'd love to take things forward. We'll be reaching out shortly to schedule the next steps.\n\nBest regards,\n{{company_name}} Hiring Team`,
            color: '#2563EB', bg: '#EFF6FF'
        },
        {
            id: 'rejected', name: 'Application Update', status: 'active',
            subject: 'Update on your application for {{job_title}}',
            body: `Hi {{candidate_name}},\n\nThank you for your interest in the {{job_title}} position at {{company_name}} and for taking the time to apply.\n\nAfter careful consideration, we've decided to move forward with other candidates whose experience more closely aligns with this particular role.\n\nWe encourage you to apply for future openings. We wish you the best in your job search.\n\nBest regards,\n{{company_name}} Hiring Team`,
            color: '#F59E0B', bg: '#FFFBEB'
        },
        {
            id: 'interview', name: 'Interview Invitation', status: 'draft',
            subject: 'Interview invitation for {{job_title}} at {{company_name}}',
            body: `Hi {{candidate_name}},\n\nWe'd like to invite you for an interview for the {{job_title}} position.\n\nPlease let us know your availability for the coming week, and we'll send you a calendar invite with the meeting details.\n\nLooking forward to speaking with you!\n\nBest regards,\n{{company_name}} Hiring Team`,
            color: '#8B5CF6', bg: '#F5F3FF'
        }
    ]);

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => { setIsSaved(false); setActiveTemplate(null); }, 1500);
    };

    const updateTemplate = (id, field, value) => {
        setTemplates(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', paddingTop: '80px', paddingBottom: '4rem', fontFamily: "'Montserrat', sans-serif" }}>
            <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
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
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Email Templates</h1>
                        <p style={{ color: '#64748B', fontSize: '0.95rem', margin: '0.3rem 0 0 0' }}>Customize automated emails sent to applicants.</p>
                    </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#64748B', backgroundColor: '#F1F5F9', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
                    💡 <strong>Available variables:</strong> {'{{candidate_name}}'}, {'{{job_title}}'}, {'{{company_name}}'} — These will be auto-replaced when emails are sent.
                </div>

                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                    {templates.map(template => (
                        <div key={template.id} style={{
                            backgroundColor: 'white', borderRadius: '14px', border: '1px solid #E2E8F0',
                            overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                        }}>
                            {/* Template Header */}
                            <div style={{
                                padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                borderBottom: activeTemplate === template.id ? '1px solid #E2E8F0' : 'none',
                                cursor: 'pointer'
                            }} onClick={() => setActiveTemplate(activeTemplate === template.id ? null : template.id)}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: template.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Mail size={18} color={template.color} />
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0F172A', margin: 0 }}>{template.name}</h3>
                                            <span style={{
                                                fontSize: '0.65rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: '100px',
                                                backgroundColor: template.status === 'active' ? '#ECFDF5' : '#F1F5F9',
                                                color: template.status === 'active' ? '#065F46' : '#64748B',
                                                textTransform: 'uppercase'
                                            }}>{template.status}</span>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0.15rem 0 0 0' }}>Subject: {template.subject}</p>
                                    </div>
                                </div>
                                <button style={{
                                    padding: '0.4rem 0.8rem', fontSize: '0.8rem', fontWeight: 600,
                                    color: '#475569', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0',
                                    borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem'
                                }}>
                                    <Edit3 size={13} /> {activeTemplate === template.id ? 'Close' : 'Edit'}
                                </button>
                            </div>

                            {/* Expanded Editor */}
                            {activeTemplate === template.id && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                    style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                                >
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Subject Line</label>
                                        <input
                                            value={template.subject}
                                            onChange={e => updateTemplate(template.id, 'subject', e.target.value)}
                                            style={{
                                                width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
                                                border: '1px solid #E2E8F0', fontSize: '0.9rem', outline: 'none',
                                                fontFamily: "'Montserrat', sans-serif", backgroundColor: '#FAFBFC'
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Email Body</label>
                                        <textarea
                                            value={template.body}
                                            onChange={e => updateTemplate(template.id, 'body', e.target.value)}
                                            rows={8}
                                            style={{
                                                width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
                                                border: '1px solid #E2E8F0', fontSize: '0.85rem', outline: 'none',
                                                fontFamily: "'Montserrat', sans-serif", backgroundColor: '#FAFBFC',
                                                lineHeight: 1.6, resize: 'vertical'
                                            }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', alignItems: 'center' }}>
                                        {isSaved && <span style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 600 }}>✓ Template saved!</span>}
                                        <Button variant="primary" onClick={handleSave} style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                                            Save Template
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default SettingsEmailTemplates;
