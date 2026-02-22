import { Home, Building2, GraduationCap, Briefcase, Rocket, TrendingUp, Code, DollarSign, Settings, Monitor, BarChart } from 'lucide-react';

export const categoryConfig = {
    'remote-jobs': {
        slug: 'remote-jobs',
        label: 'Remote Jobs',
        description: 'Work from anywhere with top global companies offering flexible, fully remote roles.',
        contextCategory: 'Remote',
        icon: Home,
        gradient: 'linear-gradient(135deg, #047857 0%, #059669 50%, #10B981 100%)',
    },
    'mnc-jobs': {
        slug: 'mnc-jobs',
        label: 'MNC Jobs',
        description: 'Accelerate your career with Fortune 500 companies and leading multi-national corporations.',
        contextCategory: 'MNC',
        icon: Building2,
        gradient: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #3B82F6 100%)',
    },
    'internship-jobs': {
        slug: 'internship-jobs',
        label: 'Internships',
        description: 'Kickstart your career with hands-on experience and mentorship at top-tier organizations.',
        contextCategory: 'Internship',
        icon: GraduationCap,
        gradient: 'linear-gradient(135deg, #B45309 0%, #D97706 50%, #F59E0B 100%)',
    },
    'sales-jobs': {
        slug: 'sales-jobs',
        label: 'Sales Jobs',
        description: 'Drive growth, close deals, and build relationships in high-impact sales roles.',
        contextCategory: 'Sales',
        icon: Briefcase,
        gradient: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 50%, #EF4444 100%)',
    },
    'startup-jobs': {
        slug: 'startup-jobs',
        label: 'Startup Jobs',
        description: 'Join fast-paced, high-growth startups and build products from the ground up.',
        contextCategory: 'Startup',
        icon: Rocket,
        gradient: 'linear-gradient(135deg, #4338CA 0%, #4F46E5 50%, #6366F1 100%)',
    },
    'fresher-jobs': {
        slug: 'fresher-jobs',
        label: 'Fresher Jobs',
        description: 'Entry-level roles designed for recent graduates to learn, grow, and build their career foundations.',
        contextCategory: 'Fresher',
        icon: TrendingUp,
        gradient: 'linear-gradient(135deg, #065F46 0%, #059669 50%, #34D399 100%)',
    },
    'data-science-jobs': {
        slug: 'data-science-jobs',
        label: 'Data Science Jobs',
        description: 'Turn data into insights. Find roles in ML, AI, analytics, and data engineering.',
        contextCategory: 'Data Science',
        icon: BarChart,
        gradient: 'linear-gradient(135deg, #0F766E 0%, #0D9488 50%, #14B8A6 100%)',
    },
    'banking-jobs': {
        slug: 'banking-jobs',
        label: 'Finance & Banking',
        description: 'Explore opportunities in investment banking, risk management, and wealth advisory.',
        contextCategory: 'Finance',
        icon: DollarSign,
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #3B82F6 100%)',
    },
    'engineering-jobs': {
        slug: 'engineering-jobs',
        label: 'Engineering Jobs',
        description: 'Design, build, and innovate across mechanical, civil, and hardware engineering disciplines.',
        contextCategory: 'Engineering',
        icon: Settings,
        gradient: 'linear-gradient(135deg, #374151 0%, #4B5563 50%, #6B7280 100%)',
    },
    'software-jobs': {
        slug: 'software-jobs',
        label: 'Software Development',
        description: 'Code the future with roles in frontend, backend, full-stack, and mobile development.',
        contextCategory: 'Development',
        icon: Monitor,
        gradient: 'linear-gradient(135deg, #0E7490 0%, #0891B2 50%, #06B6D4 100%)',
    },
    'marketing-jobs': {
        slug: 'marketing-jobs',
        label: 'Marketing Jobs',
        description: 'From SEO to social media, PPC to brand strategy — find your next marketing role at top companies.',
        contextCategory: 'Marketing',
        icon: TrendingUp,
        gradient: 'linear-gradient(135deg, #4C1D95 0%, #1E3A8A 50%, #0F4C75 100%)',
    }
};

export const getCategoryByContext = (contextCategory) => {
    return Object.values(categoryConfig).find(cat => cat.contextCategory === contextCategory);
};
