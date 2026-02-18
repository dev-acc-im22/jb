import React from 'react';
import { motion } from 'framer-motion';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at 50% 50%, #F1F5F9 0%, #E2E8F0 100%)',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Pattern */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.4,
                backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                pointerEvents: 'none'
            }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    padding: '3.5rem',
                    borderRadius: '24px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255,255,255,0.8)',
                    maxWidth: '480px',
                    width: '100%',
                    position: 'relative',
                    zIndex: 10
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{
                        fontSize: '2.2rem',
                        marginBottom: '0.75rem',
                        color: '#0F172A',
                        fontWeight: 800,
                        letterSpacing: '-0.5px'
                    }}>
                        {title}
                    </h2>
                    <p style={{ color: '#64748B', fontSize: '1.05rem', lineHeight: 1.6 }}>{subtitle}</p>
                </div>
                {children}
            </motion.div>
        </div>
    );
};

export default AuthLayout;
