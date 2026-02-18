import React from 'react';
import { Briefcase, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'white', borderTop: '1px solid #E5E7EB', padding: '4rem 2rem' }}>
            <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>

                <div style={{ maxWidth: '300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ width: '32px', height: '32px', backgroundColor: '#2563EB', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <Briefcase size={20} />
                        </div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>JobBoard</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        Connecting talent with opportunities. The #1 platform for blue chip careers and premium jobs.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Twitter size={20} color="#9CA3AF" style={{ cursor: 'pointer' }} />
                        <Facebook size={20} color="#9CA3AF" style={{ cursor: 'pointer' }} />
                        <Linkedin size={20} color="#9CA3AF" style={{ cursor: 'pointer' }} />
                        <Instagram size={20} color="#9CA3AF" style={{ cursor: 'pointer' }} />
                    </div>
                </div>

                <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '1.25rem' }}>Job Seekers</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#6B7280', fontSize: '0.9rem' }}>
                        <li>Browse Jobs</li>
                        <li>Job Alerts</li>
                        <li>Career Advice</li>
                        <li>Resume Builder</li>
                        <li>Salaries</li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '1.25rem' }}>Employers</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#6B7280', fontSize: '0.9rem' }}>
                        <li>Post a Job</li>
                        <li>Employer Login</li>
                        <li>Recruitment Solutions</li>
                        <li>Success Stories</li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '1.25rem' }}>Get the App</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ backgroundColor: 'black', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', width: 'fit-content', cursor: 'pointer' }}>
                            Download on App Store
                        </div>
                        <div style={{ backgroundColor: 'black', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', width: 'fit-content', cursor: 'pointer' }}>
                            Get it on Google Play
                        </div>
                    </div>
                </div>

            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #F3F4F6', color: '#9CA3AF', fontSize: '0.85rem' }}>
                © 2026 JobBoard Inc. ❤️ Made with Love by Allen ❤️ All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
