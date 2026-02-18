import React from 'react';
import { ChevronRight } from 'lucide-react';

const roles = [
    { name: 'Full Stack Developer', jobs: '24.5K+ Jobs' },
    { name: 'Mobile App Developer', jobs: '2.8K+ Jobs' },
    { name: 'Front End Developer', jobs: '3.1K+ Jobs' },
    { name: 'DevOps Engineer', jobs: '1.8K+ Jobs' },
    { name: 'Engineering Manager', jobs: '900+ Jobs' },
    { name: 'Technical Lead', jobs: '1.2K+ Jobs' },
];

const PopularRoles = () => {
    return (
        <section style={{ padding: '2rem 4rem', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', marginBottom: '2rem' }}>
                Discover jobs across popular roles
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {roles.map((role, index) => (
                    <div key={index} style={{
                        padding: '1.5rem',
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'box-shadow 0.2s'
                    }}>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827' }}>{role.name}</h3>
                            <p style={{ fontSize: '0.9rem', color: '#6B7280', marginTop: '0.3rem' }}>{role.jobs}</p>
                        </div>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ChevronRight size={18} color="#6B7280" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularRoles;
