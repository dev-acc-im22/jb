import React from 'react';
import { useJobs } from '../../context/JobContext';
import Button from '../ui/Button';
import { Briefcase, MapPin, DollarSign, Calendar } from 'lucide-react';

const JobDetails = ({ job, onApplySuccess }) => {
    const { applyToJob } = useJobs();

    const handleApply = () => {
        // Simple application for the demo
        applyToJob({
            jobId: job.id,
            candidateName: "Demo User",
            email: "demo@example.com"
        });
        onApplySuccess();
    };

    return (
        <div style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: 'var(--primary-50)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-600)'
                }}>
                    <Briefcase size={40} />
                </div>
                <div>
                    <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-900)' }}>{job.title}</h2>
                    <p style={{ color: 'var(--primary-600)', fontWeight: 600, fontSize: '1.1rem' }}>{job.company}</p>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1.5rem',
                padding: '1.5rem',
                backgroundColor: 'var(--primary-50)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '2rem'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', fontWeight: 600 }}>LOCATION</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-800)', fontWeight: 600 }}>
                        <MapPin size={16} /> {job.location}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', fontWeight: 600 }}>SALARY</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-800)', fontWeight: 600 }}>
                        <DollarSign size={16} /> {job.salary}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', fontWeight: 600 }}>JOB TYPE</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-800)', fontWeight: 600 }}>
                        <Briefcase size={16} /> {job.type}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', fontWeight: 600 }}>DATE POSTED</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-800)', fontWeight: 600 }}>
                        <Calendar size={16} /> {job.postedDate}
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary-900)' }}>Description</h3>
                <p style={{ color: 'var(--neutral-600)', lineHeight: '1.8' }}>{job.description}</p>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary-900)' }}>Requirements</h3>
                <ul style={{ paddingLeft: '1.5rem', color: 'var(--neutral-600)' }}>
                    {job.requirements.map((req, i) => (
                        <li key={i} style={{ marginBottom: '0.5rem' }}>{req}</li>
                    ))}
                </ul>
            </div>

            <Button onClick={handleApply} style={{ width: '100%', padding: '1rem' }}>
                Apply for this Position
            </Button>
        </div>
    );
};

export default JobDetails;
