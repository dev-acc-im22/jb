import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Briefcase, Zap, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const JobCard = ({ job, onClick }) => {
    const navigate = useNavigate();
    const isHighPriority = job.applicants < 20;

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(`/jobs/${job.id}`);
        }
    };

    return (
        <motion.div
            whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.08)' }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={handleClick}
            style={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '16px',
                padding: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {isHighPriority && (
                <div style={{
                    position: 'absolute', top: 0, right: 0,
                    backgroundColor: '#F0FDF4', color: '#16A34A',
                    fontSize: '0.7rem', fontWeight: 700,
                    padding: '0.25rem 0.75rem',
                    borderBottomLeftRadius: '12px',
                    borderLeft: '1px solid #DCFCE7',
                    borderBottom: '1px solid #DCFCE7'
                }}>
                    <Zap size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    ACTIVELY HIRING
                </div>
            )}

            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{
                        width: '56px', height: '56px', borderRadius: '12px',
                        backgroundColor: '#EFF6FF', color: '#2563EB',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.5rem', fontWeight: 700,
                        border: '1px solid #DBEAFE'
                    }}>
                        {job.company.charAt(0)}
                    </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem', lineHeight: '1.3' }}>
                        {job.title}
                    </h3>
                    <div style={{ fontSize: '0.9rem', color: '#4B5563', fontWeight: 500 }}>
                        {job.company}
                    </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: '#6B7280', backgroundColor: '#F9FAFB', padding: '0.25rem 0.6rem', borderRadius: '6px' }}>
                        <MapPin size={14} /> {job.location}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: '#6B7280', backgroundColor: '#F9FAFB', padding: '0.25rem 0.6rem', borderRadius: '6px' }}>
                        <Briefcase size={14} /> {job.type}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: '#6B7280', backgroundColor: '#F9FAFB', padding: '0.25rem 0.6rem', borderRadius: '6px' }}>
                        <DollarSign size={14} /> {job.salary}
                    </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                    {job.requirements && job.requirements.slice(0, 3).map((req, i) => (
                        <span key={i} style={{ fontSize: '0.75rem', color: '#4B5563', border: '1px solid #E5E7EB', padding: '0.2rem 0.5rem', borderRadius: '100px' }}>
                            {req}
                        </span>
                    ))}
                    {job.requirements && job.requirements.length > 3 && (
                        <span style={{ fontSize: '0.75rem', color: '#9CA3AF', padding: '0.2rem 0.5rem' }}>+{job.requirements.length - 3}</span>
                    )}
                </div>
            </div>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                <div style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={14} /> {job.posted}
                </div>
                <div style={{ color: '#2563EB', fontWeight: 600 }}>
                    {job.applicants} Applicants
                </div>
            </div>
        </motion.div>
    );
};

export default JobCard;
