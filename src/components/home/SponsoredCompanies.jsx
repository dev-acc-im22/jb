import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const sponsored = [
    { name: 'Palo Alto', reviews: '4.5', count: '57 Reviews', color: '#1A73E8', tags: ['MNC', 'Software', 'B2B'] },
    { name: 'PhonePe', reviews: '4.1', count: '450 Reviews', color: '#5F259F', tags: ['FinTech', 'Startup', 'Unicorn'] },
    { name: 'Genpact', reviews: '3.9', count: '12K+ Reviews', color: '#0A4DA2', tags: ['Service', 'BPO', 'Global'] },
    { name: 'Swiggy', reviews: '4.2', count: '2.1K+ Reviews', color: '#FC8019', tags: ['Internet', 'B2C', 'Unicorn'] },
];

const SponsoredCompanies = () => {
    return (
        <section style={{ padding: '2rem 4rem', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827' }}>
                    Sponsored companies
                </h2>
                <span style={{ padding: '0.2rem 0.6rem', backgroundColor: '#F3F4F6', color: '#6B7280', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600 }}>Promoted</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {sponsored.map((company, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '1.5rem', textAlign: 'center', position: 'relative' }}
                    >
                        <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.65rem', color: '#9CA3AF', border: '1px solid #F3F4F6', padding: '2px 6px', borderRadius: '4px' }}>Promoted</div>

                        <div style={{
                            width: '64px', height: '64px', margin: '0 auto 1rem', borderRadius: '12px',
                            backgroundColor: company.color, color: 'white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.5rem', fontWeight: 700
                        }}>
                            {company.name.charAt(0)}
                        </div>

                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>{company.name}</h3>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#6B7280', marginBottom: '1rem' }}>
                            <span style={{ color: '#F59E0B' }}>★</span> {company.reviews} | {company.count}
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {company.tags.map(tag => (
                                <span key={tag} style={{ fontSize: '0.7rem', padding: '0.25rem 0.75rem', backgroundColor: '#F9FAFB', borderRadius: '100px', color: '#4B5563' }}>{tag}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <Button variant="outline" style={{ borderRadius: '100px', fontWeight: 600 }}>View all companies</Button>
            </div>
        </section>
    );
};

export default SponsoredCompanies;
