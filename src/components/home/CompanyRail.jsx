import React from 'react';
import { motion } from 'framer-motion';

// Mock data for companies
const companies = [
    { name: 'Google', logo: 'G' },
    { name: 'Microsoft', logo: 'M' },
    { name: 'Amazon', logo: 'A' },
    { name: 'Meta', logo: 'M' },
    { name: 'Netflix', logo: 'N' },
    { name: 'Tesla', logo: 'T' },
    { name: 'Adobe', logo: 'A' },
    { name: 'Salesforce', logo: 'S' },
];

const CompanyRail = () => {
    return (
        <section style={{ padding: '2rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h3 style={{
                textAlign: 'center',
                fontSize: '1.8rem',
                marginBottom: '2.5rem',
                color: 'var(--neutral-800)'
            }}>
                Top companies hiring now
            </h3>

            <div style={{
                display: 'flex',
                gap: '2rem',
                overflowX: 'auto',
                padding: '1rem',
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none',  /* IE and Edge */
            }} className="hide-scrollbar">
                {companies.map((company, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        style={{
                            minWidth: '140px',
                            height: '100px',
                            backgroundColor: 'white',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            border: '1px solid var(--neutral-100)',
                            scrollSnapAlign: 'start'
                        }}
                    >
                        <div style={{
                            fontSize: '2rem',
                            fontWeight: 800,
                            color: 'var(--primary-600)',
                            marginBottom: '0.5rem'
                        }}>
                            {company.logo}
                        </div>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--neutral-600)' }}>
                            {company.name}
                        </span>
                    </motion.div>
                ))}
            </div>
            <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    );
};

export default CompanyRail;
