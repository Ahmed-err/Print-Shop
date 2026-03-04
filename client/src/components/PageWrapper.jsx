import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 8,
    },
    in: {
        opacity: 1,
        y: 0,
    },
    out: {
        opacity: 0,
        y: -8,
    }
};

const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
};

export default function PageWrapper({ children, className = "" }) {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className={`w-full ${className}`}
        >
            {children}
        </motion.div>
    );
}
