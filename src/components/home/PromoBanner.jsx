import React from 'react';
import Button from '../ui/Button';

const PromoBanner = () => {
    return (
        <section style={{ padding: '2rem 4rem', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                background: 'linear-gradient(135deg, #1e1e2f 0%, #3b3b58 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                minHeight: '320px'
            }}>
                {/* Simulated Content */}
                <div style={{ flex: 1, padding: '4rem', zIndex: 10 }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        marginBottom: '1rem'
                    }}>
                        HACKATHON 2026
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: '1.1' }}>
                        Agency in Action: <br />
                        <span style={{ color: '#60A5FA' }}>AI in Motion</span>
                    </h2>
                    <p style={{ maxWidth: '500px', marginBottom: '2rem', opacity: 0.9, lineHeight: '1.6' }}>
                        Join the ultimate contest for creative agencies and tech innovators. Showcase your AI-driven campaigns and win big.
                    </p>
                    <Button variant="primary" size="lg" style={{ backgroundColor: '#2563EB', border: 'none' }}>Register Now</Button>
                </div>

                <div style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Placeholder for banner image */}
                    <div style={{ width: '80%', height: '80%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '20px', transform: 'rotate(-5deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '5rem' }}>🚀</span>
                    </div>
                </div>
            </div>

            {/* Sub-banner */}
            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🎓</div>
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>Introducing a career platform for college students & fresh grads.</h4>
                        <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>Explore internships, courses, and first jobs.</p>
                    </div>
                </div>
                <Button style={{ borderRadius: '100px', padding: '0.6rem 2rem' }}>Explore now</Button>
            </div>
        </section>
    );
};

export default PromoBanner;
