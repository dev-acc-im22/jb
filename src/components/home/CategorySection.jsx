import React from 'react';
import { Home, Building2, GraduationCap, Briefcase, Rocket, TrendingUp, Code, DollarSign, Settings, Monitor, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { getCategoryByContext } from '../../data/categoryConfig';

const categories = [
    { label: 'Remote', icon: Home, value: 'Remote' },
    { label: 'MNC', icon: Building2, value: 'MNC' },
    { label: 'Internship', icon: GraduationCap, value: 'Internship' },
    { label: 'Sales', icon: Briefcase, value: 'Sales' },
    { label: 'Startup', icon: Rocket, value: 'Startup' },
    { label: 'Fresher', icon: TrendingUp, value: 'Fresher' },
    { label: 'Data Science', icon: BarChart, value: 'Data Science' },
    { label: 'Banking', icon: DollarSign, value: 'Finance' },
    { label: 'Engineering', icon: Settings, value: 'Engineering' },
    { label: 'Software', icon: Monitor, value: 'Development' },
    { label: 'Marketing', icon: TrendingUp, value: 'Marketing' }
];

const CategorySection = () => {
    const { setSearchFilter } = useJobs();
    const navigate = useNavigate();

    const handleCategoryClick = (categoryContext) => {
        const config = getCategoryByContext(categoryContext);
        if (config) {
            navigate(`/jobs/category/${config.slug}`);
        }
    };

    return (
        <section style={{ padding: '2rem 4rem', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                {categories.map((cat, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.05, borderColor: '#2563EB', color: '#2563EB' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCategoryClick(cat.value)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1.5rem',
                            backgroundColor: 'white',
                            border: '1px solid #E5E7EB',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: '#374151',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                    >
                        <cat.icon size={18} />
                        {cat.label}
                        <span style={{ color: '#9CA3AF', marginLeft: '0.25rem' }}>›</span>
                    </motion.button>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
