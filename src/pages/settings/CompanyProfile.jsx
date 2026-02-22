import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, Upload, Globe, MapPin, Camera } from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import Button from '../../components/ui/Button';

const SettingsCompanyProfile = () => {
    const { user, updateUser } = useJobs();
    const [isSaved, setIsSaved] = useState(false);
    const [form, setForm] = useState({
        companyName: user?.companyName || 'Your Company',
        industry: user?.industry || '',
        website: user?.website || '',
        location: user?.companyLocation || '',
        size: user?.companySize || '',
        founded: user?.founded || '',
        about: user?.about || ''
    });

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        updateUser({
            companyName: form.companyName,
            industry: form.industry,
            website: form.website,
            companyLocation: form.location,
            companySize: form.size,
            founded: form.founded,
            about: form.about
        });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2500);
    };

    const inputStyle = {
        width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
        border: '1px solid #E2E8F0', fontSize: '0.9rem', outline: 'none',
        fontFamily: "'Montserrat', sans-serif", transition: 'border-color 0.2s',
        backgroundColor: '#FAFBFC'
    };
    const labelStyle = { display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155' };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', paddingTop: '80px', paddingBottom: '4rem', fontFamily: "'Montserrat', sans-serif" }}>
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                {/* Header */}
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
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Company Profile</h1>
                        <p style={{ color: '#64748B', fontSize: '0.95rem', margin: '0.3rem 0 0 0' }}>Manage your company details and public information.</p>
                    </div>
                </div>

                <motion.form
                    onSubmit={handleSave}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}
                >
                    {/* Logo Section */}
                    <div style={{ padding: '2rem', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '16px', backgroundColor: '#EFF6FF',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB',
                            fontSize: '2rem', fontWeight: 700, position: 'relative'
                        }}>
                            {form.companyName.charAt(0)}
                            <div style={{
                                position: 'absolute', bottom: '-4px', right: '-4px', width: '28px', height: '28px',
                                borderRadius: '50%', backgroundColor: '#2563EB', color: 'white', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', border: '2px solid white', cursor: 'pointer'
                            }}>
                                <Camera size={12} />
                            </div>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.3rem 0' }}>{form.companyName}</h3>
                            <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0 }}>Upload a logo (recommended 200×200px)</p>
                        </div>
                    </div>

                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={labelStyle}>Company Name</label>
                                <input name="companyName" value={form.companyName} onChange={handleChange} style={inputStyle} required />
                            </div>
                            <div>
                                <label style={labelStyle}>Industry</label>
                                <select name="industry" value={form.industry} onChange={handleChange} style={inputStyle}>
                                    <option value="">Select Industry</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="E-Commerce">E-Commerce</option>
                                    <option value="Education">Education</option>
                                    <option value="Manufacturing">Manufacturing</option>
                                    <option value="Consulting">Consulting</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={labelStyle}><Globe size={14} style={{ marginRight: '0.3rem', verticalAlign: 'middle' }} />Website</label>
                                <input name="website" value={form.website} onChange={handleChange} placeholder="https://yourcompany.com" style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}><MapPin size={14} style={{ marginRight: '0.3rem', verticalAlign: 'middle' }} />Location</label>
                                <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Bangalore, India" style={inputStyle} />
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={labelStyle}>Company Size</label>
                                <select name="size" value={form.size} onChange={handleChange} style={inputStyle}>
                                    <option value="">Select Size</option>
                                    <option value="1-10">1-10 employees</option>
                                    <option value="11-50">11-50 employees</option>
                                    <option value="51-200">51-200 employees</option>
                                    <option value="201-500">201-500 employees</option>
                                    <option value="500+">500+ employees</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Founded Year</label>
                                <input name="founded" type="number" value={form.founded} onChange={handleChange} placeholder="e.g. 2020" style={inputStyle} />
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>About the Company</label>
                            <textarea name="about" value={form.about} onChange={handleChange} rows={4} placeholder="Tell candidates about your company culture, mission, and what makes you unique..." style={{ ...inputStyle, resize: 'vertical' }} />
                        </div>
                    </div>

                    <div style={{ padding: '1.25rem 2rem', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', alignItems: 'center' }}>
                        {isSaved && <span style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 600 }}>✓ Changes saved!</span>}
                        <Button type="submit" variant="primary" style={{ padding: '0.7rem 2rem', fontSize: '0.9rem', fontWeight: 600 }}>
                            Save Changes
                        </Button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default SettingsCompanyProfile;
