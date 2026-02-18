import React from 'react';
import { BookOpen, FileCheck, ArrowRight, Star, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const cards = [
    {
        icon: BookOpen,
        accent: '#7C3AED',
        bg: '#F5F3FF',
        border: '#DDD6FE',
        title: 'Interview preparation',
        subtitle: 'Practice with curated questions',
        items: [
            { label: 'HR Round Questions', count: '120+ Q&A' },
            { label: 'Technical Interviews', count: '250+ Q&A' },
            { label: 'Group Discussion Tips', count: '45+ Topics' }
        ]
    },
    {
        icon: FileCheck,
        accent: '#059669',
        bg: '#ECFDF5',
        border: '#A7F3D0',
        title: 'Improve your resume',
        subtitle: 'Stand out from the competition',
        items: [
            { label: 'ATS-Friendly Templates', count: '30+' },
            { label: 'Resume Score Checker', count: 'Free' },
            { label: 'Cover Letter Builder', count: '15+' }
        ]
    }
];

const InterviewPrep = () => {
    return (
        <section style={{ padding: '2rem 4rem', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{ y: -4 }}
                        style={{
                            backgroundColor: 'white',
                            border: '1px solid #E5E7EB',
                            borderRadius: '20px',
                            padding: '2rem',
                            cursor: 'pointer',
                            transition: 'box-shadow 0.3s',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'}
                        onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
                    >
                        {/* Header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '14px',
                                backgroundColor: card.bg, display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                border: `1px solid ${card.border}`
                            }}>
                                <card.icon size={24} color={card.accent} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111827', marginBottom: '0.15rem' }}>{card.title}</h3>
                                <p style={{ fontSize: '0.85rem', color: '#6B7280' }}>{card.subtitle}</p>
                            </div>
                        </div>

                        {/* Items */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {card.items.map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '1rem 1.25rem',
                                    backgroundColor: '#FAFAFA',
                                    borderRadius: '12px',
                                    border: '1px solid #F3F4F6',
                                    transition: 'background-color 0.2s'
                                }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = card.bg}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                                >
                                    <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#374151' }}>{item.label}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{
                                            fontSize: '0.8rem', fontWeight: 600, color: card.accent,
                                            backgroundColor: card.bg, padding: '0.2rem 0.6rem', borderRadius: '6px'
                                        }}>{item.count}</span>
                                        <ArrowRight size={14} color="#9CA3AF" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            marginTop: '1.5rem', color: card.accent, fontWeight: 600, fontSize: '0.9rem'
                        }}>
                            Explore all resources <ArrowRight size={16} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default InterviewPrep;
