import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, EyeOff, Eye, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PurchaseResdex = () => {
    const [userType, setUserType] = useState('new'); // 'new' or 'existing'
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeWhatsapp, setAgreeWhatsapp] = useState(true);
    const [agreeTerms, setAgreeTerms] = useState(true);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', fontFamily: "'Montserrat', sans-serif" }}>

            {/* Header (Minimalist) */}
            <header style={{ padding: '1.5rem 3rem', background: 'white' }}>
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: 'linear-gradient(135deg, #2563EB, #3B82F6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: 800, fontSize: '1.2rem'
                    }}>
                        jb
                    </div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px' }}>JobBoard</span>
                </Link>
            </header>

            {/* Main Content Area */}
            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '1100px', width: '100%', alignItems: 'center', gap: '4rem' }}>

                    {/* Left Column (Branding) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ flex: 1, minWidth: '400px' }}
                    >
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2, marginBottom: '1.5rem', letterSpacing: '-1.5px' }}>
                            Find & hire the<br />right talent with us
                        </h1>
                        <p style={{ fontSize: '1.1rem', color: '#64748B', marginBottom: '2.5rem' }}>
                            Trusted by 9 Cr+ candidates | 5 Lakh+ employers
                        </p>

                        {/* Avatars */}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {[
                                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
                                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
                                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
                                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
                                "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150"
                            ].map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt={`Candidate ${i}`}
                                    style={{
                                        width: '60px', height: '60px', borderRadius: '50%',
                                        objectFit: 'cover', border: '3px solid #F8FAFC',
                                        marginLeft: i === 0 ? '0' : '-15px',
                                        zIndex: 5 - i
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column (Form Card) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            flex: 1, minWidth: '350px', maxWidth: '450px', background: 'white',
                            borderRadius: '24px', padding: '3rem', boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                            position: 'relative'
                        }}
                    >
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '2rem' }}>
                            Continue your purchase as
                        </h2>

                        {/* User Type Toggles */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <div style={{
                                    width: '20px', height: '20px', borderRadius: '50%',
                                    border: `2px solid ${userType === 'new' ? '#2563EB' : '#CBD5E1'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}>
                                    {userType === 'new' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#2563EB' }} />}
                                </div>
                                <span style={{ fontSize: '1rem', color: userType === 'new' ? '#0F172A' : '#64748B', fontWeight: userType === 'new' ? 600 : 400 }}>
                                    a new user
                                </span>
                                <input
                                    type="radio" name="userType" value="new"
                                    checked={userType === 'new'}
                                    onChange={() => setUserType('new')}
                                    style={{ display: 'none' }}
                                />
                            </label>

                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <div style={{
                                    width: '20px', height: '20px', borderRadius: '50%',
                                    border: `2px solid ${userType === 'existing' ? '#2563EB' : '#CBD5E1'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}>
                                    {userType === 'existing' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#2563EB' }} />}
                                </div>
                                <span style={{ fontSize: '1rem', color: userType === 'existing' ? '#0F172A' : '#64748B', fontWeight: userType === 'existing' ? 600 : 400 }}>
                                    an existing user
                                </span>
                                <input
                                    type="radio" name="userType" value="existing"
                                    checked={userType === 'existing'}
                                    onChange={() => setUserType('existing')}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>

                        {/* Dynamic Form Area */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={userType}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {userType === 'new' ? (
                                    /* NEW USER FORM */
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>
                                            Mobile number
                                        </label>
                                        <div style={{ display: 'flex', border: '1px solid #CBD5E1', borderRadius: '8px', overflow: 'hidden', marginBottom: '1.5rem', transition: 'border-color 0.2s' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.8rem 1rem', background: '#F8FAFC', borderRight: '1px solid #CBD5E1', cursor: 'pointer' }}>
                                                <span style={{ fontSize: '0.9rem', color: '#475569' }}>+91</span>
                                                <ChevronDown size={14} color="#64748B" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Enter mobile number"
                                                value={mobileNumber}
                                                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                style={{ flex: 1, padding: '0.8rem', border: 'none', outline: 'none', fontSize: '0.95rem' }}
                                            />
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                                                <div
                                                    onClick={() => setAgreeWhatsapp(!agreeWhatsapp)}
                                                    style={{
                                                        width: '18px', height: '18px', borderRadius: '4px', marginTop: '0.15rem',
                                                        background: agreeWhatsapp ? '#2563EB' : 'white', flexShrink: 0,
                                                        border: `1px solid ${agreeWhatsapp ? '#2563EB' : '#CBD5E1'}`,
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                    }}
                                                >
                                                    {agreeWhatsapp && <CheckCircle2 size={14} color="white" />}
                                                </div>
                                                <span style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.4 }}>
                                                    I agree to receive important updates on <span style={{ color: '#10B981', fontWeight: 600 }}>WhatsApp</span>
                                                </span>
                                            </label>

                                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                                                <div
                                                    onClick={() => setAgreeTerms(!agreeTerms)}
                                                    style={{
                                                        width: '18px', height: '18px', borderRadius: '4px', marginTop: '0.15rem',
                                                        background: agreeTerms ? '#2563EB' : 'white', flexShrink: 0,
                                                        border: `1px solid ${agreeTerms ? '#2563EB' : '#CBD5E1'}`,
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                    }}
                                                >
                                                    {agreeTerms && <CheckCircle2 size={14} color="white" />}
                                                </div>
                                                <span style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.4 }}>
                                                    I agree to the <a href="#" style={{ color: '#2563EB', textDecoration: 'none' }}>Privacy Policy</a> and <a href="#" style={{ color: '#2563EB', textDecoration: 'none' }}>Terms & Conditions</a>
                                                </span>
                                            </label>
                                        </div>

                                        <button
                                            disabled={mobileNumber.length < 10}
                                            style={{
                                                width: '100%', padding: '1rem', borderRadius: '8px', border: 'none',
                                                background: mobileNumber.length === 10 ? '#2563EB' : '#F1F5F9',
                                                color: mobileNumber.length === 10 ? 'white' : '#94A3B8',
                                                fontSize: '1rem', fontWeight: 600, cursor: mobileNumber.length === 10 ? 'pointer' : 'not-allowed',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            Send OTP
                                        </button>
                                    </div>
                                ) : (
                                    /* EXISTING USER FORM */
                                    <div>
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>
                                                Email ID
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="Enter registered email ID"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                style={{
                                                    width: '100%', padding: '0.9rem 1rem', border: '1px solid #CBD5E1',
                                                    borderRadius: '8px', outline: 'none', fontSize: '0.95rem'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#2563EB'}
                                                onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                                            />
                                        </div>

                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>
                                                Password
                                            </label>
                                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #CBD5E1', borderRadius: '8px', paddingRight: '1rem', background: 'white' }}>
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Enter password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    style={{
                                                        flex: 1, padding: '0.9rem 1rem', border: 'none',
                                                        background: 'transparent', outline: 'none', fontSize: '0.95rem'
                                                    }}
                                                />
                                                <button
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
                                                >
                                                    {showPassword ? <Eye size={18} color="#94A3B8" /> : <EyeOff size={18} color="#94A3B8" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
                                            <a href="#" style={{ color: '#2563EB', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>
                                                Forgot password?
                                            </a>
                                        </div>

                                        <button
                                            style={{
                                                width: '100%', padding: '1rem', borderRadius: '8px', border: 'none',
                                                background: '#2563EB', color: 'white',
                                                fontSize: '1rem', fontWeight: 600, cursor: 'pointer'
                                            }}
                                        >
                                            Log in
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                    </motion.div>

                </div>
            </main>

        </div>
    );
};

export default PurchaseResdex;
