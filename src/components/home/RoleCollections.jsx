import React from 'react';
import { ArrowRight, Code, PenTool, TrendingUp, DollarSign, Database, Shield, Smartphone } from 'lucide-react';
import { useJobs } from '../../context/JobContext';

const roles = [
    { title: 'Full Stack Developer', places: '22k+ Jobs', icon: Code, filter: 'Development', keyword: 'Full Stack' },
    { title: 'Mobile App Developer', places: '12k+ Jobs', icon: Smartphone, filter: 'Development', keyword: 'Mobile' },
    { title: 'Data Scientist', places: '8k+ Jobs', icon: Database, filter: 'Data Science', keyword: 'Data' },
    { title: 'Product Manager', places: '5k+ Jobs', icon: TrendingUp, filter: 'Management', keyword: 'Product' },
    { title: 'Financial Analyst', places: '3k+ Jobs', icon: DollarSign, filter: 'Finance', keyword: 'Financial' },
    { title: 'Cyber Security', places: '2k+ Jobs', icon: Shield, filter: 'Cyber Security', keyword: 'Security' },
];

const RoleCollections = () => {
    const { setSearchFilter } = useJobs();

    const handleRoleClick = (role) => {
        setSearchFilter({
            keyword: role.keyword || '',
            location: '',
            category: role.filter || ''
        });

        // Smooth scroll to job listing
        const jobSection = document.getElementById('job-listing-section');
        if (jobSection) {
            jobSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h3 style={{
                fontSize: '1.8rem',
                marginBottom: '2.5rem',
                color: 'var(--neutral-800)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                Discover jobs across popular roles
            </h3>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                {roles.map((role, index) => (
                    <div key={index}
                        onClick={() => handleRoleClick(role)}
                        style={{
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--neutral-200)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            backgroundColor: 'white'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = 'var(--primary-300)';
                            e.currentTarget.style.backgroundColor = 'var(--primary-50)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = 'var(--neutral-200)';
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                padding: '10px',
                                borderRadius: '8px',
                                backgroundColor: 'var(--neutral-100)',
                                color: 'var(--neutral-600)'
                            }}>
                                <role.icon size={20} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{role.title}</h4>
                                <span style={{ color: 'var(--neutral-500)', fontSize: '0.9rem' }}>{role.places}</span>
                            </div>
                        </div>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--neutral-200)'
                        }}>
                            <ArrowRight size={16} color="var(--neutral-400)" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RoleCollections;
