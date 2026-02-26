import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import Button from '../components/ui/Button';
import { Upload, User, FileText, Briefcase, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const UserProfile = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useJobs();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '+91 ',
        skills: '',
        experience: '',
        resumeName: '',
        resumeData: '',
        companyName: '',
        companyWebsite: '',
        companySize: '',
        industry: ''
    });
    const [isSaved, setIsSaved] = useState(false);

    // Use a ref to track if we have initialized the form for the current user ID
    // This prevents the form from resetting while the user is typing if the context re-renders
    const lastUserId = React.useRef(null);

    useEffect(() => {
        // Only update form data if we have a user and it's a DIFFERENT user (or first load)
        if (user && user.id !== lastUserId.current) {
            console.log("UserProfile: Initializing form for user", user.id);

            setFormData(prev => ({
                ...prev,
                fullName: user.name || user.fullName || '',
                email: user.email || '',
                phone: user.phone || '+91 ',
                skills: user.skills ? (Array.isArray(user.skills) ? user.skills.join(', ') : user.skills) : '',
                experience: user.experience || '',
                resumeName: user.resumeName || '',
                resumeData: user.resumeData || '',
                companyName: user.companyName || '',
                companyWebsite: user.companyWebsite || '',
                companySize: user.companySize || '',
                industry: user.industry || ''
            }));

            lastUserId.current = user.id;
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`UserProfile: Handling change for ${name}:`, value);
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData(prev => ({
                    ...prev,
                    resumeName: file.name,
                    resumeData: event.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create an updated user object
        const updatedUser = {
            ...user,
            name: user?.role === 'employer' ? formData.companyName : formData.fullName, // Make 'name' default to company Name for employers if needed, else full name
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            skills: user?.role === 'employer' ? [] : formData.skills.split(',').map(s => s.trim()),
            experience: formData.experience,
            resumeName: formData.resumeName,
            resumeData: formData.resumeData,
            companyName: formData.companyName,
            companyWebsite: formData.companyWebsite,
            companySize: formData.companySize,
            industry: formData.industry
        };

        updateUser(updatedUser);
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
            navigate('/');
        }, 1500);
    };

    return (
        <div style={{ backgroundColor: 'var(--neutral-50)', minHeight: '100vh', padding: '120px 2rem 4rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', borderRadius: 'var(--radius-xl)', padding: '3rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ padding: '1rem', backgroundColor: 'var(--primary-50)', borderRadius: '50%', color: 'var(--primary-600)' }}>
                        {user?.role === 'employer' ? <Briefcase size={32} /> : <User size={32} />}
                    </div>
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>{user?.role === 'employer' ? 'Company Settings' : 'My Profile'}</h1>
                        <p style={{ color: 'var(--neutral-500)' }}>{user?.role === 'employer' ? 'Manage your corporate identity and billing details.' : 'Manage your personal information and resume.'}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Personal Details */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Full Name</label>
                            <input
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="e.g. John Doe"
                                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-300)', outline: 'none' }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="e.g. john@example.com"
                                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-300)', outline: 'none' }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Phone</label>
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="e.g. +91 98765 43210"
                                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-300)', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <div style={{ height: '1px', backgroundColor: 'var(--neutral-200)' }} />

                    {user?.role === 'employer' ? (
                        /* Employer Section */
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Briefcase size={20} /> Company Details
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Company Name</label>
                                    <input
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        placeholder="e.g. Acme Corp"
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-300)', outline: 'none' }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Company Website</label>
                                    <input
                                        name="companyWebsite"
                                        value={formData.companyWebsite}
                                        onChange={handleChange}
                                        placeholder="e.g. www.acme.com"
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-300)', outline: 'none' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Industry</label>
                                    <input
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        placeholder="e.g. Software, Finance, Healthcare"
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-300)', outline: 'none' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Company Size</label>
                                    <select
                                        name="companySize"
                                        value={formData.companySize}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-300)', outline: 'none' }}
                                    >
                                        <option value="">Select Size</option>
                                        <option value="1-10">1-10 Employees</option>
                                        <option value="11-50">11-50 Employees</option>
                                        <option value="51-200">51-200 Employees</option>
                                        <option value="201-500">201-500 Employees</option>
                                        <option value="500+">500+ Employees</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Job Seeker Resume Section */
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FileText size={20} /> Resume
                            </h3>
                            <div style={{
                                border: '2px dashed var(--neutral-300)',
                                borderRadius: 'var(--radius-lg)',
                                padding: '2rem',
                                textAlign: 'center',
                                backgroundColor: 'var(--neutral-50)',
                                cursor: 'pointer',
                                position: 'relative'
                            }}>
                                <input
                                    type="file"
                                    onChange={handleResumeUpload}
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                                />
                                <Upload size={32} color="var(--neutral-400)" style={{ marginBottom: '1rem' }} />
                                {formData.resumeName ? (
                                    <div style={{ color: 'var(--success)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                        <FileText size={18} /> {formData.resumeName}
                                    </div>
                                ) : (
                                    <p style={{ color: 'var(--neutral-500)' }}>Click or Drag to upload your resume (PDF, DOCX)</p>
                                )}
                            </div>
                        </div>
                    )}

                    <div style={{ height: '1px', backgroundColor: 'var(--neutral-200)' }} />

                    {/* Skills & Experience - Only for Job Seekers */}
                    {user?.role === 'job_seeker' && (
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Briefcase size={20} /> Professional Details
                            </h3>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Skills (Comma separated)</label>
                                <input
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    placeholder="e.g. React, Node.js, Design"
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-300)', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Years of Experience</label>
                                <select
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-300)', outline: 'none' }}
                                >
                                    <option value="">Select Experience</option>
                                    <option value="0-1">Fresher (0-1 Years)</option>
                                    <option value="1-3">1-3 Years</option>
                                    <option value="3-5">3-5 Years</option>
                                    <option value="5+">5+ Years</option>
                                </select>
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <Button type="submit" variant="primary" style={{ padding: '0.8rem 2.5rem' }}>
                            Save Profile
                        </Button>
                    </div>

                    {isSaved && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--success)',
                                backgroundColor: '#dcfce7',
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                marginTop: '1rem'
                            }}
                        >
                            <CheckCircle size={20} /> Profile saved successfully! You can now use "One-Click Apply".
                        </motion.div>
                    )}
                </form>
            </motion.div>
        </div>
    );
};

export default UserProfile;
