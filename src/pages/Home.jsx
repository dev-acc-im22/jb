import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/layout/Hero';
import Footer from '../components/layout/Footer';
import CategorySection from '../components/home/CategorySection';
import FeaturedCompanies from '../components/home/FeaturedCompanies';
import TopCompaniesSection from '../components/home/TopCompaniesSection';
import PromoBanner from '../components/home/PromoBanner';
import RoleCollections from '../components/home/RoleCollections';
import SponsoredCompanies from '../components/home/SponsoredCompanies';
import UpcomingEvents from '../components/home/UpcomingEvents';
import ResumeCTA from '../components/home/ResumeCTA';
import InterviewPrep from '../components/home/InterviewPrep';
import JobCard from '../components/job/JobCard';
import { useJobs } from '../context/JobContext';

// Lightweight scroll animation wrapper — uses IntersectionObserver + CSS transforms (GPU)
const ScrollReveal = ({ children, delay = 0, direction = 'up' }) => {
    const variants = {
        up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
        left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
        right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
        fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
            variants={variants[direction]}
        >
            {children}
        </motion.div>
    );
};

const Home = () => {
    const { filteredJobs, searchFilter } = useJobs();

    return (
        <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
            <Hero />

            <ScrollReveal>
                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4rem' }}>
                    <h2 style={{
                        fontSize: '1.8rem',
                        fontWeight: 800,
                        color: 'var(--primary-900)',
                        marginBottom: '1.5rem'
                    }}>
                        Latest Remote Jobs For You
                    </h2>
                    <CategorySection />
                </div>
            </ScrollReveal>



            <ScrollReveal direction="left">
                <TopCompaniesSection />
            </ScrollReveal>

            <ScrollReveal direction="right">
                <FeaturedCompanies />
            </ScrollReveal>

            <ScrollReveal direction="fade">
                <PromoBanner />
            </ScrollReveal>

            <ScrollReveal>
                <RoleCollections />
            </ScrollReveal>

            <ScrollReveal direction="left">
                <SponsoredCompanies />
            </ScrollReveal>

            <ScrollReveal>
                <UpcomingEvents />
            </ScrollReveal>

            <ScrollReveal direction="fade">
                <ResumeCTA />
            </ScrollReveal>

            <ScrollReveal>
                <InterviewPrep />
            </ScrollReveal>

            <Footer />
        </div>
    );
};

export default Home;
