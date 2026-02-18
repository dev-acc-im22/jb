import React from 'react';
import { motion } from 'framer-motion';
import { Home, Globe, Briefcase, Zap, Star } from 'lucide-react';

const filters = [
    { label: 'Remote', icon: Home },
    { label: 'MNC', icon: Globe },
    { label: 'Internship', icon: Briefcase },
    { label: 'Startup', icon: Zap },
    { label: 'Premium', icon: Star },
];

const QuickFilters = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            margin: '2rem 0 3rem',
            flexWrap: 'wrap',
            padding: '0 1rem'
        }}>
            {filters.map((filter, index) => (
                <motion.button
                    key={filter.label}
                    whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(59, 130, 246, 0.15)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        padding: '1rem 1.8rem',
                        backgroundColor: 'white',
                        border: '1px solid var(--neutral-200)',
                        borderRadius: 'var(--radius-xl)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--neutral-700)',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                        transition: 'border-color 0.2s',
                        cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary-400)';
                        e.currentTarget.style.color = 'var(--primary-600)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = 'var(--neutral-200)';
                        e.currentTarget.style.color = 'var(--neutral-700)';
                    }}
                >
                    <filter.icon size={20} />
                    {filter.label}
                </motion.button>
            ))}
        </div>
    );
};

export default QuickFilters;
