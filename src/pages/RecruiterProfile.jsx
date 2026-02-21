import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Globe, MapPin, Users, FileText, Upload, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobContext';

const RecruiterProfile = () => {
    const navigate = useNavigate();
    const { updateUser } = useJobs();
    const [isLoading, setIsLoading] = useState(false);
    const [logoPreview, setLogoPreview] = useState(null);
    const [step, setStep] = useState(1); // 1: Basic Info, 2: Details & Branding

    const [formData, setFormData] = useState({
        recruiterName: '',
        companyName: '',
        website: '',
        location: '',
        industry: '',
        companySize: '',
        description: '',
        logo: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, logo: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.description || !formData.logo) {
            alert('Please fill in all fields and upload a logo');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            updateUser({
                name: formData.recruiterName, // Update user name with Recruiter Name
                companyName: formData.companyName,
                isProfileComplete: true,
                companyLogo: logoPreview || 'https://ui-avatars.com/api/?name=' + formData.companyName + '&background=random'
            });
            navigate('/recruiter-dashboard'); // Redirect to dashboard after setup
        }, 1500);
    };

    const nextStep = () => setStep(2);
    const prevStep = () => setStep(1);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'radial-gradient(circle at 50% 50%, #F8FAFC 0%, #E2E8F0 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '2rem',
            paddingTop: '4rem',
            position: 'relative',
            overflow: 'visible',
            fontFamily: "'Montserrat', sans-serif"
        }}>
            {/* Background Pattern */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.4,
                backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                pointerEvents: 'none'
            }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    padding: '3rem',
                    borderRadius: '24px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255,255,255,0.8)',
                    maxWidth: '800px',
                    width: '100%',
                    position: 'relative',
                    zIndex: 10
                }}
            >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{
                        width: '60px', height: '60px', borderRadius: '16px',
                        background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem', boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)'
                    }}>
                        <Building2 color="white" size={32} />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', letterSpacing: '-1px' }}>
                        Create Recruiter Profile
                    </h1>
                    <p style={{ color: '#64748B', fontSize: '1.1rem' }}>
                        Let's set up your employer brand to attract top talent.
                    </p>
                </div>

                {/* Progress Indicators */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <div style={{
                        width: '12px', height: '12px', borderRadius: '50%',
                        backgroundColor: step >= 1 ? '#2563EB' : '#E2E8F0',
                        transition: 'all 0.3s'
                    }} />
                    <div style={{
                        width: '12px', height: '12px', borderRadius: '50%',
                        backgroundColor: step >= 2 ? '#2563EB' : '#E2E8F0',
                        transition: 'all 0.3s'
                    }} />
                </div>

                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}
                        >
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={labelStyle}>Recruiter Name <span style={{ color: '#EF4444' }}>*</span></label>
                                <div style={inputContainerStyle}>
                                    <Users size={18} color="#94A3B8" style={iconStyle} />
                                    <input
                                        type="text"
                                        name="recruiterName"
                                        required
                                        placeholder="e.g. Sarah Jones"
                                        value={formData.recruiterName}
                                        onChange={handleInputChange}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={labelStyle}>Company Name <span style={{ color: '#EF4444' }}>*</span></label>
                                <div style={inputContainerStyle}>
                                    <Building2 size={18} color="#94A3B8" style={iconStyle} />
                                    <input
                                        type="text"
                                        name="companyName"
                                        required
                                        placeholder="e.g. Acme Corp"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Website <span style={{ color: '#EF4444' }}>*</span></label>
                                <div style={inputContainerStyle}>
                                    <Globe size={18} color="#94A3B8" style={iconStyle} />
                                    <input
                                        type="url"
                                        name="website"
                                        required
                                        placeholder="https://example.com"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Headquarters Location <span style={{ color: '#EF4444' }}>*</span></label>
                                <div style={inputContainerStyle}>
                                    <MapPin size={18} color="#94A3B8" style={iconStyle} />
                                    <input
                                        type="text"
                                        name="location"
                                        required
                                        placeholder="e.g. San Francisco, CA"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Industry <span style={{ color: '#EF4444' }}>*</span></label>
                                <div style={inputContainerStyle}>
                                    <FileText size={18} color="#94A3B8" style={iconStyle} />
                                    <select
                                        name="industry"
                                        required
                                        value={formData.industry}
                                        onChange={handleInputChange}
                                        style={inputStyle}
                                    >
                                        <option value="">Select Industry</option>
                                        <option value="Technology">Technology</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Healthcare">Healthcare</option>
                                        <option value="Education">Education</option>
                                        <option value="Retail">Retail</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Company Size <span style={{ color: '#EF4444' }}>*</span></label>
                                <div style={inputContainerStyle}>
                                    <Users size={18} color="#94A3B8" style={iconStyle} />
                                    <select
                                        name="companySize"
                                        required
                                        value={formData.companySize}
                                        onChange={handleInputChange}
                                        style={inputStyle}
                                    >
                                        <option value="">Select Size</option>
                                        <option value="1-10">1-10 employees</option>
                                        <option value="11-50">11-50 employees</option>
                                        <option value="51-200">51-200 employees</option>
                                        <option value="201-500">201-500 employees</option>
                                        <option value="500+">500+ employees</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ gridColumn: 'span 2', marginTop: '1rem', textAlign: 'right' }}>
                                <Button onClick={(e) => {
                                    e.preventDefault();
                                    if (formData.recruiterName && formData.companyName && formData.website && formData.location && formData.industry && formData.companySize) {
                                        nextStep();
                                    } else {
                                        alert('Please fill in all fields');
                                    }
                                }} style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)', width: 'auto', padding: '0.8rem 2rem' }}>
                                    Next Step <ArrowRight size={18} />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                        >
                            <div>
                                <label style={labelStyle}>Company Description <span style={{ color: '#EF4444' }}>*</span></label>
                                <div style={inputContainerStyle}>
                                    <textarea
                                        name="description"
                                        required
                                        placeholder="Tell us about your company culture, mission, and what makes it a great place to work..."
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        style={{ ...inputStyle, paddingLeft: '1rem', minHeight: '120px', resize: 'vertical' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Company Logo <span style={{ color: '#EF4444' }}>*</span></label>
                                <div style={{
                                    border: '2px dashed #CBD5E1',
                                    borderRadius: '16px',
                                    padding: '2rem',
                                    textAlign: 'center',
                                    backgroundColor: '#F8FAFC',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                    onMouseOver={(e) => e.currentTarget.style.borderColor = '#2563EB'}
                                    onMouseOut={(e) => e.currentTarget.style.borderColor = '#CBD5E1'}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                                    />
                                    {logoPreview ? (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                                            <img src={logoPreview} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '12px' }} />
                                            <div style={{ textAlign: 'left' }}>
                                                <p style={{ fontWeight: 600, color: '#0F172A' }}>Logo Uploaded</p>
                                                <p style={{ fontSize: '0.9rem', color: '#2563EB' }}>Click to change</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div style={{
                                                width: '50px', height: '50px', backgroundColor: '#EFF6FF',
                                                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                margin: '0 auto 1rem'
                                            }}>
                                                <Upload size={24} color="#2563EB" />
                                            </div>
                                            <p style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.25rem' }}>Click to upload logo</p>
                                            <p style={{ fontSize: '0.9rem', color: '#64748B' }}>SVG, PNG, JPG (max. 800x400px)</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                                <Button
                                    variant="ghost"
                                    onClick={prevStep}
                                    style={{ color: '#64748B' }}
                                >
                                    Back
                                </Button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    style={{
                                        background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: isLoading ? 'not-allowed' : 'pointer',
                                        fontWeight: 600,
                                        width: 'auto',
                                        padding: '0.8rem 2.5rem',
                                        boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
                                    }}
                                >
                                    {isLoading ? 'Creating Profile...' : 'Complete Setup'}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </form>
            </motion.div>
        </div>
    );
};

// Internal Styles
const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.95rem',
    fontWeight: 600,
    color: '#334155'
};

const inputContainerStyle = {
    position: 'relative'
};

const iconStyle = {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1
};

const inputStyle = {
    width: '100%',
    padding: '0.85rem 1rem 0.85rem 2.8rem',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
    outline: 'none',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '0.95rem',
    backgroundColor: 'white',
    transition: 'all 0.2s',
    color: '#0F172A'
};

export default RecruiterProfile;
