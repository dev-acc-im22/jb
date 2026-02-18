import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    className = '',
    type = 'button',
    disabled = false,
    icon: Icon,
    style = {}
}) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: {
            backgroundColor: 'var(--primary-600)',
            color: 'white',
            boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.3)',
        },
        secondary: {
            backgroundColor: 'white',
            color: 'var(--primary-600)',
            border: '2px solid var(--primary-600)',
        },
        ghost: {
            backgroundColor: 'transparent',
            color: 'var(--primary-600)',
        },
        outline: {
            backgroundColor: 'var(--primary-50)',
            color: 'var(--primary-700)',
            border: '1px solid var(--primary-200)',
        }
    };

    const getStyle = () => {
        switch (variant) {
            case 'secondary': return {
                backgroundColor: 'white',
                color: 'var(--primary-600)',
                border: '2px solid var(--primary-600)',
            };
            case 'ghost': return {
                backgroundColor: 'transparent',
                color: 'var(--primary-600)',
            };
            case 'outline': return {
                backgroundColor: 'var(--primary-50)',
                color: 'var(--primary-700)',
                border: '1px solid var(--primary-200)',
            };
            default: return {
                backgroundColor: 'var(--primary-600)',
                color: 'white',
                boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.3)',
            };
        }
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
                ...getStyle(),
                fontFamily: 'Montserrat, sans-serif',
                padding: '0.8rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.95rem',
                ...style
            }}
            className={className}
        >
            {Icon && <Icon size={18} />}
            {children}
        </motion.button>
    );
};

export default Button;
