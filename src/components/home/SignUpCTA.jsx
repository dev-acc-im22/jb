import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Chrome } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';

const SignUpCTA = () => {
    const navigate = useNavigate();
    const { login } = useJobs();

    const handleGoogleLogin = () => {
        // Mock Google Login / Sign Up
        const mockUser = {
            id: 'google-user-123',
            name: 'Google User',
            email: 'user@gmail.com',
            role: 'job_seeker',
            profileImage: 'https://ui-avatars.com/api/?name=Google+User&background=4285F4&color=fff',
            isNewUser: true
        };
        login(mockUser);
        navigate('/register-profile');
    };

    return (
        <section style={{
            padding: '2rem 4rem 4rem',
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #172554 100%)',
                    borderRadius: '24px',
                    padding: '3rem 4rem',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    boxShadow: '0 20px 40px rgba(15,23,42,0.3)',
                    gap: '4rem',
                    flexWrap: 'wrap'
                }}
            >
                {/* Visual Accent */}
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }} />

                <div style={{ flex: '1 1 auto', minWidth: '300px' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.4rem 0.8rem',
                            background: 'rgba(255,255,255,0.15)',
                            borderRadius: '100px',
                            color: 'white',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            marginBottom: '1.5rem',
                            backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                    >
                        <Sparkles size={14} />
                        100% FREE FOREVER
                    </motion.div>

                    <h2 style={{
                        fontSize: '3rem',
                        fontWeight: 900,
                        color: 'white',
                        marginBottom: '0',
                        letterSpacing: '-1.5px',
                        lineHeight: 1,
                        maxWidth: '540px'
                    }}>
                        Create a free account.
                    </h2>
                </div>

                {/* Funky Swirly Arrow - Positioned between text and button */}
                <div className="funky-arrow-container">
                    <motion.div
                        animate={{
                            x: [0, 5, 0],
                            y: [0, -3, 0],
                            rotate: [0, -1, 1, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 4,
                            ease: "easeInOut"
                        }}
                        style={{ position: 'relative', width: '140px' }}
                    >
                        <svg width="140" height="75" viewBox="0 0 140 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Swirly curve */}
                            <path
                                d="M10 50 C 30 10, 80 10, 80 40 C 80 60, 60 60, 60 40 C 60 20, 100 20, 120 32"
                                stroke="white"
                                strokeWidth="5"
                                strokeLinecap="round"
                                fill="none"
                                style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.4))' }}
                            />
                            {/* Arrowhead — aligned to curve's ~30° exit angle */}
                            <polygon
                                points="140,42 112,44 128,20"
                                fill="white"
                                style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.4))' }}
                            />
                        </svg>
                    </motion.div>
                </div>

                <div style={{ flex: '0 1 auto', minWidth: '320px', position: 'relative', zIndex: 10 }}>
                    <style>{`
                        .funky-arrow-container {
                            display: none;
                            pointer-events: none;
                            z-index: 5;
                            margin: 0 -1rem; /* Better balance */
                        }
                        @media (min-width: 1200px) {
                            .funky-arrow-container {
                                display: block;
                            }
                        }
                    `}</style>
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: '#f8fafc', boxShadow: '0 10px 20px rgba(0,0,0,0.15)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleGoogleLogin}
                        style={{
                            width: '100%',
                            padding: '1.25rem 2.5rem',
                            borderRadius: '16px',
                            background: 'white',
                            color: '#0F172A',
                            fontSize: '1.1rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem',
                            border: 'none',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: '24px' }} />
                        Sign up with Google
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
};

export default SignUpCTA;
