import React, { useState } from 'react';
import Button from '../ui/Button';
import { useJobs } from '../../context/JobContext';

const PostJobForm = ({ onSuccess, initialData }) => {
    const { addJob, updateJob, locations, addLocation, user } = useJobs();
    const effectiveCompanyName = user?.companyName || 'Your Company';

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        company: initialData?.company || effectiveCompanyName,
        location: initialData?.location || '',
        type: initialData?.type || 'Full-time',
        category: initialData?.category || '',
        description: initialData?.description || '',
        requirements: initialData?.requirements ? (Array.isArray(initialData.requirements) ? initialData.requirements.join(', ') : initialData.requirements) : ''
    });
    const [showLocationSug, setShowLocationSug] = useState(false);

    const suggestedLocations = locations.filter(loc =>
        formData.location &&
        loc.toLowerCase().startsWith(formData.location.toLowerCase()) &&
        loc.toLowerCase() !== formData.location.toLowerCase()
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalLocation = formData.location.trim();
        const formattedJob = {
            ...formData,
            location: finalLocation,
            requirements: formData.requirements.split(',').map(r => r.trim()).filter(r => r)
        };

        if (initialData?.id) {
            updateJob(initialData.id, formattedJob);
        } else {
            addJob(formattedJob);
        }
        if (finalLocation) {
            addLocation(finalLocation);
        }
        onSuccess();
    };

    const inputStyles = {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
        fontSize: '0.9rem',
        fontFamily: "'Montserrat', sans-serif",
        outline: 'none',
        transition: 'all 0.2s',
        marginBottom: '1.25rem',
        backgroundColor: '#F8FAFC',
        color: '#0F172A'
    };

    const labelStyles = {
        display: 'block',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: '#334155',
        marginBottom: '0.4rem'
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', alignItems: 'start', marginBottom: '1.5rem' }}>
                <div>
                    <label style={labelStyles}>Job Title</label>
                    <input
                        required
                        style={inputStyles}
                        placeholder="e.g. Senior React Developer"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
                <div>
                    <label style={labelStyles}>Company Name</label>
                    <input
                        required
                        style={{
                            ...inputStyles,
                            backgroundColor: '#F1F5F9',
                            color: '#64748B',
                            cursor: 'not-allowed'
                        }}
                        placeholder="e.g. Google"
                        value={formData.company}
                        disabled={true}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                </div>
                <div>
                    <label style={labelStyles}>Category</label>
                    <select
                        required
                        style={{ ...inputStyles, color: formData.category === '' ? '#9CA3AF' : '#0F172A' }}
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value="" disabled hidden style={{ color: '#9CA3AF' }}>Select category</option>
                        <option value="MNC" style={{ color: '#0F172A' }}>MNC</option>
                        <option value="Internship" style={{ color: '#0F172A' }}>Internship</option>
                        <option value="Sales" style={{ color: '#0F172A' }}>Sales</option>
                        <option value="Startup" style={{ color: '#0F172A' }}>Startup</option>
                        <option value="Fresher" style={{ color: '#0F172A' }}>Fresher</option>
                        <option value="Data Science" style={{ color: '#0F172A' }}>Data Science</option>
                        <option value="Finance" style={{ color: '#0F172A' }}>Finance</option>
                        <option value="Engineering" style={{ color: '#0F172A' }}>Engineering</option>
                        <option value="Development" style={{ color: '#0F172A' }}>Development</option>
                        <option value="Marketing" style={{ color: '#0F172A' }}>Marketing</option>
                    </select>
                </div>

                <div style={{ position: 'relative' }}>
                    <label style={labelStyles}>Location</label>
                    <input
                        required
                        style={inputStyles}
                        placeholder="e.g. Remote or London"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        onFocus={() => setShowLocationSug(true)}
                        onBlur={() => setTimeout(() => setShowLocationSug(false), 200)}
                    />
                    {showLocationSug && suggestedLocations.length > 0 && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            backgroundColor: 'white',
                            border: '1px solid #E2E8F0',
                            borderRadius: '8px',
                            marginTop: '-1rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            zIndex: 10,
                            overflow: 'hidden',
                            maxHeight: '150px',
                            overflowY: 'auto'
                        }}>
                            {suggestedLocations.map((loc, index) => (
                                <div
                                    key={index}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        color: '#0F172A',
                                        fontWeight: 500,
                                        transition: 'background-color 0.2s',
                                        backgroundColor: 'transparent'
                                    }}
                                    onClick={() => {
                                        setFormData({ ...formData, location: loc });
                                        setShowLocationSug(false);
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#F8FAFC'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                    {loc}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <label style={labelStyles}>Job Type</label>
                    <select
                        style={inputStyles}
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                        <option>Hybrid</option>
                    </select>
                </div>
                <div>
                    <label style={labelStyles}>Requirements (Comma separated)</label>
                    <input
                        required
                        style={inputStyles}
                        placeholder="e.g. React, Node.js, AWS"
                        value={formData.requirements}
                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    />
                </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
                <label style={labelStyles}>Job Description</label>
                <textarea
                    required
                    style={{ ...inputStyles, minHeight: '100px', resize: 'vertical', marginBottom: 0 }}
                    placeholder="Describe the role and responsibilities..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            <Button
                type="submit"
                style={{
                    width: 'auto',
                    minWidth: '200px',
                    marginTop: '1.75rem',
                    background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem 2rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderRadius: '10px',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
                    float: 'right'
                }}
            >
                {initialData ? 'Update Job Listing' : 'Publish Job Listing'}
            </Button>
            <div style={{ clear: 'both' }}></div>
        </form>
    );
};

export default PostJobForm;
