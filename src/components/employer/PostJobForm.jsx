import React, { useState } from 'react';
import Button from '../ui/Button';
import { useJobs } from '../../context/JobContext';

const PostJobForm = ({ onSuccess }) => {
    const { addJob } = useJobs();
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        type: 'Full-time',
        category: 'Development',
        description: '',
        requirements: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedJob = {
            ...formData,
            requirements: formData.requirements.split(',').map(r => r.trim()).filter(r => r)
        };
        addJob(formattedJob);
        onSuccess();
    };

    const inputStyles = {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
        fontSize: '0.95rem',
        fontFamily: "'Montserrat', sans-serif",
        outline: 'none',
        transition: 'all 0.2s',
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', alignItems: 'start', marginBottom: '1.25rem' }}>
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
                        style={inputStyles}
                        placeholder="e.g. Google"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                </div>
                <div>
                    <label style={labelStyles}>Category</label>
                    <select
                        style={inputStyles}
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option>Development</option>
                        <option>Design</option>
                        <option>Marketing</option>
                        <option>Finance</option>
                        <option>Management</option>
                    </select>
                </div>

                <div>
                    <label style={labelStyles}>Location</label>
                    <input
                        required
                        style={inputStyles}
                        placeholder="e.g. Remote or London"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
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
                    style={{ ...inputStyles, minHeight: '120px', resize: 'vertical' }}
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
                    background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem 2rem',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    borderRadius: '10px',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
                    float: 'right'
                }}
            >
                Publish Job Listing
            </Button>
            <div style={{ clear: 'both' }}></div>
        </form>
    );
};

export default PostJobForm;
