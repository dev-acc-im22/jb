import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { useJobs } from '../../context/JobContext';

const companies = [
    { name: 'AmGen', color: '#0063BE', reviews: '4.2', reviewsCount: '128', description: 'Biotechnology', label: 'MNC' },
    { name: 'J.P. Morgan', color: '#003A70', reviews: '4.1', reviewsCount: '4.2K', description: 'Financial Services', label: 'FinTech' },
    { name: 'Lyrical', color: '#7C3AED', reviews: '4.5', reviewsCount: '56', description: 'Music Tech', label: 'Startup' },
    { name: 'Datamatics', color: '#E41B13', reviews: '3.9', reviewsCount: '1.5K', description: 'IT Services', label: 'Service' },
    { name: 'Infosys', color: '#007CC3', reviews: '3.8', reviewsCount: '25K+', description: 'IT Consulting', label: 'MNC' },
];

const FeaturedCompanies = () => {
    const { setSearchFilter } = useJobs();

    const handleViewJobs = (companyName) => {
        setSearchFilter({
            keyword: companyName,
            location: '',
            category: ''
        });
        const jobSection = document.getElementById('job-listing-section');
        if (jobSection) {
            jobSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section style={{ padding: '2rem 4rem', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 800, color: '#111827', marginBottom: '2rem' }}>
                Featured companies actively hiring
            </h2>

            <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none' }}>
                {companies.map((company, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                        style={{
                            minWidth: '260px',
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            border: '1px solid #E5E7EB',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                    >
                        <div style={{
                            width: '60px', height: '60px', borderRadius: '12px',
                            backgroundColor: company.color, color: 'white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.4rem', fontWeight: 700,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}>
                            {company.name.charAt(0)}
                        </div>

                        <div style={{ padding: '0.5rem', backgroundColor: '#EFF6FF', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#1E40AF', marginTop: '-0.5rem' }}>
                            {company.label}
                        </div>

                        <div>
                            <div style={{ fontWeight: 600, color: '#111827' }}>{company.name}</div>
                            <div style={{ fontSize: '0.8rem', color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                                <span style={{ color: '#F59E0B' }}>★</span> {company.reviews} | {company.reviewsCount} reviews
                            </div>
                        </div>

                        <div style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: '1.4' }}>
                            Global leader in {company.description}.
                        </div>

                        <Button
                            variant="ghost"
                            fullWidth
                            style={{ marginTop: 'auto', color: '#2563EB', backgroundColor: '#F0F9FF' }}
                            onClick={() => handleViewJobs(company.name)}
                        >
                            View jobs
                        </Button>
                    </motion.div>
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <Button variant="outline" style={{ borderRadius: '100px', fontWeight: 600 }}>View all companies</Button>
            </div>
        </section>
    );
};

export default FeaturedCompanies;
