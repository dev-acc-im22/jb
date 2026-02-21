import React, { useState } from 'react';
import Button from '../ui/Button';
import { useJobs } from '../../context/JobContext';

const PostJobForm = ({ onSuccess }) => {
    const { addJob } = useJobs();
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        companyLogo: '',
        location: '',
        type: 'Full-time',
        salary: '',
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
        padding: '0.8rem 1rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--neutral-200)',
        fontSize: '0.95rem',
        fontFamily: 'Montserrat, sans-serif',
        outline: 'none',
        transition: 'var(--transition-fast)',
        marginBottom: '1rem'
    };

    const labelStyles = {
        display: 'block',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: 'var(--neutral-600)',
        marginBottom: '0.5rem'
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
            </div>

            <label style={labelStyles}>Company Logo URL (Optional)</label>
            <input
                style={inputStyles}
                placeholder="https://example.com/logo.png"
                value={formData.companyLogo}
                onChange={(e) => setFormData({ ...formData, companyLogo: e.target.value })}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                    <label style={labelStyles}>Salary Range</label>
                    <input
                        required
                        style={inputStyles}
                        placeholder="e.g. $100k - $120k"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
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
            </div>

            <label style={labelStyles}>Requirements (Comma separated)</label>
            <input
                required
                style={inputStyles}
                placeholder="e.g. React, Node.js, AWS"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            />

            <label style={labelStyles}>Job Description</label>
            <textarea
                required
                style={{ ...inputStyles, minHeight: '120px', resize: 'vertical' }}
                placeholder="Describe the role and responsibilities..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <Button
                type="submit"
                style={{
                    width: '100%',
                    marginTop: '1rem',
                    background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem'
                }}
            >
                Post Job Listing
            </Button>
        </form>
    );
};

export default PostJobForm;
