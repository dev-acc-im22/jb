import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useJobs } from '../../context/JobContext';

const companiesData = [
    {
        title: 'MNCs',
        count: '2.2K+',
        logos: ['T', 'IBM', 'G', 'A'],
        color: '#E11D48',
        keyword: 'MNC'
    },
    {
        title: 'Internet',
        count: '249',
        logos: ['F', 'Uber', 'A', 'N'],
        color: '#2563EB',
        keyword: 'Internet'
    },
    {
        title: 'Manufacturing',
        count: '1.1K+',
        logos: ['TATA', 'JCB', 'L&T'],
        color: '#059669',
        keyword: 'Manufacturing'
    },
    {
        title: 'Fortune 500',
        count: '115',
        logos: ['W', 'Cisco', 'Pep'],
        color: '#D97706',
        keyword: 'Fortune'
    },
    {
        title: 'Product',
        count: '1.3K+',
        logos: ['Z', 'S', 'A'],
        color: '#000000',
        keyword: 'Product'
    }
];

const TopCompaniesSection = () => {
    const { setSearchFilter } = useJobs();

    const handleCategoryClick = (item) => {
        setSearchFilter({
            keyword: item.keyword,
            location: '',
            category: item.title
        });
        const jobSection = document.getElementById('job-listing-section');
        if (jobSection) {
            jobSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section style={{ padding: '3rem 4rem', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '2.5rem' }}>
                Top companies hiring now
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem'
            }}>
                {companiesData.map((item, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                        onClick={() => handleCategoryClick(item)}
                        style={{
                            backgroundColor: 'white',
                            border: '1px solid #E5E7EB',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '180px',
                            justifyContent: 'space-between',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Highlight bar */}
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', backgroundColor: item.color }}></div>

                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>{item.title}</h3>
                                <ChevronRight size={16} color="#9CA3AF" />
                            </div>
                            <p style={{ fontSize: '0.85rem', color: '#6B7280' }}>{item.count} are actively hiring</p>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                            {item.logos.map((logo, i) => (
                                <div key={i} style={{
                                    width: '36px', height: '36px',
                                    borderRadius: '8px',
                                    backgroundColor: '#F3F4F6',
                                    border: '1px solid #E5E7EB',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.6rem', fontWeight: 700, color: '#4B5563',
                                    overflow: 'hidden'
                                }}>
                                    {logo}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TopCompaniesSection;
