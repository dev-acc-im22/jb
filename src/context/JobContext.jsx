import React, { createContext, useContext, useState, useEffect } from 'react';

const JobContext = createContext();

export const useJobs = () => {
    const context = useContext(JobContext);
    if (!context) throw new Error('useJobs must be used within a JobProvider');
    return context;
};

const MOCK_JOBS = [
    // ========== Work From Home Jobs (Remote) ==========
    {
        id: 1, title: "Remote React Native Developer", company: "Zomato", location: "Remote", salary: "₹18L - ₹28L",
        type: "Full-time", posted: "2 hours ago", applicants: 45, category: "Remote",
        description: "Join Zomato's core mobile team building features for millions of daily active users. We are looking for an experienced React Native developer to help us improve performance, build new dining experiences, and scale our app architecture.\n\nThis role is 100% remote within India. You'll work asynchronously with a high-performing engineering team.",
        requirements: ["React Native", "TypeScript", "Redux", "Mobile UI/UX"], industry: "Food Tech", department: "Engineering", roleCategory: "Mobile Development", education: "B.Tech/B.E.", experience: "3-6 Years"
    },
    {
        id: 2, title: "Remote Content Strategist", company: "HubSpot", location: "Remote", salary: "₹12L - ₹20L",
        type: "Full-time", posted: "1 day ago", applicants: 112, category: "Remote",
        description: "Drive the global content strategy for HubSpot's marketing blog. You will manage an editorial calendar, collaborate with freelance writers, and ensure all content ranks highly on search engines while providing immense value to B2B marketers.\n\nWork from Home anywhere in India. Includes allowance for home office setup.",
        requirements: ["Content Strategy", "SEO", "B2B Writing", "Google Analytics"], industry: "SaaS", department: "Marketing", roleCategory: "Content Marketing", education: "Any Graduate", experience: "4-7 Years"
    },
    {
        id: 3, title: "Senior Cloud Architect (Remote)", company: "AWS", location: "Remote", salary: "₹35L - ₹50L",
        type: "Full-time", posted: "3 days ago", applicants: 28, category: "Remote",
        description: "Help enterprise customers migrate massive workloads to AWS. As a Senior Cloud Architect, you will design highly scalable, resilient, and secure architectures. You will run technical workshops, write whitepapers, and act as a trusted advisor to CTOs.\n\nFully remote role with occasional travel for client summits.",
        requirements: ["AWS Architecture", "Microservices", "Kubernetes", "Enterprise Migration"], industry: "Cloud Computing", department: "Solutions Architecture", roleCategory: "Cloud Architecture", education: "B.Tech/M.Tech", experience: "8-12 Years"
    },

    // ========== Part Time Jobs ==========
    {
        id: 4, title: "Part-Time Social Media Manager", company: "The Minimalist", location: "Mumbai (Hybrid)", salary: "₹3L - ₹5L",
        type: "Part Time", posted: "5 hours ago", applicants: 65, category: "Part Time",
        description: "Looking for a creative Part-Time Social Media Manager to handle Instagram and LinkedIn for a boutique design agency. You will need to commit 20 hours a week.\n\nResponsibilities include scheduling posts, engaging with the community, and tracking weekly analytics. Perfect for freelancers or students looking for steady part-time work.",
        requirements: ["Instagram Growth", "LinkedIn Strategy", "Canva", "Copywriting"], industry: "Design Agency", department: "Marketing", roleCategory: "Social Media", education: "Any Graduate", experience: "1-3 Years"
    },
    {
        id: 5, title: "Online Tutor (Mathematics) - Part Time", company: "Vedantu", location: "Remote", salary: "₹4L - ₹6L",
        type: "Part Time", posted: "1 day ago", applicants: 88, category: "Part Time",
        description: "Teach Mathematics to high school students (Grade 9-12) on Vedantu's live online platform. This is a part-time role requiring 4 hours of commitment every evening.\n\nYou must have excellent communication skills, a digital pen tablet, and a passion for teaching.",
        requirements: ["Mathematics", "Online Teaching", "Communication", "Subject Matter Expert"], industry: "EdTech", department: "Teaching", roleCategory: "Online Tutor", education: "B.Sc/M.Sc Mathematics or B.Tech", experience: "1-5 Years"
    },
    {
        id: 6, title: "Freelance/Part-Time Recruiter", company: "HiringMonk", location: "Remote", salary: "Commission Based",
        type: "Part Time", posted: "2 days ago", applicants: 34, category: "Part Time",
        description: "We are expanding our network of part-time, freelance recruiters to help source candidates for top-tier IT startups. You will be provided with requirements, and you will earn a lucrative commission for every successful placement.\n\nWork at your own pace, log in whenever you want, and leverage your existing LinkedIn network.",
        requirements: ["IT Recruitment", "Sourcing", "LinkedIn Recruiter", "Screening"], industry: "HR / Recruitment", department: "Human Resources", roleCategory: "Talent Acquisition", education: "Any Graduate", experience: "2-6 Years"
    },

    // ========== Freshers Jobs ==========
    {
        id: 7, title: "Software Engineer - Fresher", company: "Infosys", location: "Mysore / Pune", salary: "₹3.6L - ₹4.5L",
        type: "Full-time", posted: "Just now", applicants: 320, category: "Fresher",
        description: "Kickstart your IT career with Infosys. We are hiring fresh graduates for the role of Systems Engineer. You will undergo an intensive 3-month training program at our world-class Mysore campus before being assigned to exciting global projects.\n\nOpen to 2024 and 2025 batch engineering graduates.",
        requirements: ["C++ / Java / Python", "Aptitude", "Logical Reasoning", "Communication"], industry: "IT Services", department: "Engineering", roleCategory: "Software Development", education: "B.Tech/B.E/MCA", experience: "0 Years"
    },
    {
        id: 8, title: "Management Trainee - Sales", company: "HUL", location: "Pan India", salary: "₹12L - ₹15L",
        type: "Full-time", posted: "2 days ago", applicants: 156, category: "Fresher",
        description: "Join Hindustan Unilever's prestigious Management Trainee program. As a fresher, you will be thrown into real business challenges, managing distribution networks, leading sales teams, and driving revenue growth across regions.\n\nLooking for highly driven MBA freshers ready to accelerate their careers.",
        requirements: ["Sales Strategy", "Leadership", "Analytical Thinking", "Communication"], industry: "FMCG", department: "Sales", roleCategory: "Management Trainee", education: "MBA (2025/2026 Batch)", experience: "0 Years"
    },
    {
        id: 9, title: "Junior Data Analyst (Fresher)", company: "Fractal Analytics", location: "Bangalore", salary: "₹6L - ₹8L",
        type: "Full-time", posted: "1 day ago", applicants: 215, category: "Fresher",
        description: "Fractal is looking for sharp, analytical freshers to join our data analytics consulting team. You will work alongside senior data scientists to clean datasets, build dashboards in Tableau, and extract actionable insights for Fortune 500 clients.\n\nA strong foundation in SQL and statistics is mandatory.",
        requirements: ["SQL", "Excel", "Data Visualization", "Logical Reasoning"], industry: "Analytics Consulting", department: "Data Science", roleCategory: "Data Analyst", education: "B.Tech/B.Sc Statistics", experience: "0 Years"
    },

    // ========== Jobs for women ==========
    {
        id: 10, title: "Women Returnship Program - Full Stack Developer", company: "Mastercard", location: "Pune", salary: "₹16L - ₹24L",
        type: "Full-time", posted: "4 hours ago", applicants: 42, category: "Women",
        description: "Have you taken a career break of 2+ years and are looking to re-enter the workforce? Mastercard's 'Relaunch Your Career' program is specifically designed to support women technologists returning to work.\n\nJoin our payments engineering team. We provide a tailored 16-week onboarding curriculum, mentorship, and a supportive environment for you to regain your momentum.",
        requirements: ["Java / Spring Boot", "Angular / React", "Microservices", "Career Break > 2 years"], industry: "Fintech", department: "Engineering", roleCategory: "Software Development", education: "B.Tech/B.E.", experience: "3+ Years (Prior to break)"
    },
    {
        id: 11, title: "Diversity Hiring: Product Manager (Women)", company: "Microsoft", location: "Hyderabad", salary: "₹25L - ₹40L",
        type: "Full-time", posted: "3 days ago", applicants: 89, category: "Women",
        description: "At Microsoft, we believe diversity drives innovation. We are actively inviting applications from talented women Product Managers to lead the next generation of Azure cloud tools.\n\nYou will define product roadmaps, work closely with engineering and design, and drive cloud adoption globally.",
        requirements: ["Product Strategy", "Cloud Computing", "Agile", "Cross-functional Leadership"], industry: "Technology", department: "Product", roleCategory: "Product Management", education: "B.Tech + MBA", experience: "5-8 Years"
    },
    {
        id: 12, title: "Operations Lead (Women's Special Drive)", company: "Amazon", location: "Delhi NCR", salary: "₹14L - ₹20L",
        type: "Full-time", posted: "1 week ago", applicants: 67, category: "Women",
        description: "Amazon is conducting a special hiring drive for Women Operations Leaders. Manage large-scale fulfillment center operations, oversee a team of 100+ associates, and ensure delivery metrics are met safely and efficiently.\n\nWe offer excellent leadership training, maternity benefits, and a highly inclusive culture.",
        requirements: ["Operations Management", "Supply Chain", "Team Leadership", "Process Optimization"], industry: "E-Commerce", department: "Operations", roleCategory: "Fulfillment Operations", education: "Any Graduate / MBA", experience: "3-7 Years"
    },

    // ========== Full Time Jobs ==========
    {
        id: 13, title: "Senior Backend Engineer", company: "Stripe", location: "Bangalore", salary: "₹45L - ₹70L",
        type: "Full Time", posted: "Just now", applicants: 54, category: "Full-time",
        description: "Stripe is expanding its engineering hub in Bangalore. We are looking for Senior Backend Engineers to build the economic infrastructure of the internet. You will design extremely high-throughput APIs, ensure financial ledger accuracy, and scale distributed systems.\n\nThis is a standard Full Time role reporting to the Bangalore office 3 days a week.",
        requirements: ["Ruby/Java/Go", "Distributed Systems", "API Design", "PostgreSQL"], industry: "Fintech", department: "Engineering", roleCategory: "Backend Development", education: "B.Tech/M.Tech", experience: "5-10 Years"
    },
    {
        id: 14, title: "Enterprise Account Executive (Full Time)", company: "Oracle", location: "Mumbai", salary: "₹20L - ₹35L",
        type: "Full Time", posted: "2 days ago", applicants: 38, category: "Full-time",
        description: "Drive Oracle Cloud Infrastructure (OCI) sales into top-tier enterprise accounts. You will manage the entire sales cycle, from prospecting C-level executives to negotiating complex, multi-million dollar cloud contracts.\n\nFull-time permanent role with an uncapped commission structure.",
        requirements: ["B2B Sales", "Cloud Infrastructure", "Negotiation", "C-Level Presentations"], industry: "Cloud Software", department: "Sales", roleCategory: "Enterprise Sales", education: "MBA", experience: "6-10 Years"
    },
    {
        id: 15, title: "Visual Designer", company: "Swiggy", location: "Bangalore", salary: "₹12L - ₹18L",
        type: "Full Time", posted: "5 hours ago", applicants: 92, category: "Full-time",
        description: "Join Swiggy's central design team as a Full Time Visual Designer. You will be responsible for creating stunning marketing campaigns, app banners, and brand illustrations that reach millions of hungry customers every day.\n\nMust have a strong portfolio demonstrating typography, color theory, and illustration skills.",
        requirements: ["Figma", "Adobe Illustrator", "Typography", "Visual Storytelling"], industry: "Food Tech", department: "Design", roleCategory: "Graphic & Visual Design", education: "Degree in Design / Art", experience: "2-5 Years"
    },

    // ========== Night Shift Jobs ==========
    {
        id: 16, title: "Customer Success Manager (US Night Shift)", company: "Freshworks", location: "Chennai", salary: "₹9L - ₹15L",
        type: "Full-time", posted: "1 day ago", applicants: 45, category: "Night Shift",
        description: "Manage a portfolio of North American enterprise clients for Freshworks. This is a dedicated Night Shift role (6 PM to 3 AM IST). You will ensure smooth onboarding, drive product adoption, and handle renewals for US-based customers.\n\nIncludes a generous night shift allowance and complimentary transport.",
        requirements: ["Customer Success", "US Client Management", "CRM", "Excellent English"], industry: "SaaS", department: "Customer Success", roleCategory: "Account Management", education: "Any Graduate", experience: "3-6 Years"
    },
    {
        id: 17, title: "L1 SOC Analyst (Night Shift)", company: "Wipro", location: "Pune", salary: "₹4L - ₹7L",
        type: "Full-time", posted: "3 days ago", applicants: 110, category: "Night Shift",
        description: "Monitor global client networks for security threats as a Level 1 Security Operations Center Analyst. This role requires rotation entirely in the Night Shift to ensure 24/7 coverage for our European and American clients.\n\nInvestigate alerts, triage incidents, and escalate to L2 teams when required.",
        requirements: ["Cybersecurity", "SIEM Tools", "Network Security", "Incident Triage"], industry: "IT Services", department: "Cybersecurity", roleCategory: "Security Operations", education: "B.Tech IT/CS", experience: "1-3 Years"
    },
    {
        id: 18, title: "US IT Recruiter (Night Shift)", company: "Collabera", location: "Baroda", salary: "₹5L - ₹8L + Incentives",
        type: "Full-time", posted: "10 hours ago", applicants: 85, category: "Night Shift",
        description: "Source and recruit IT professionals for Fortune 500 clients in the United States. You will work the core US Night Shift (6:30 PM - 3:30 AM IST). Source candidates via Dice, Monster, and LinkedIn, and manage W2/C2C negotiations.\n\nUncapped incentives for every placement made. Best-in-class night shift facilities provided.",
        requirements: ["US IT Recruitment", "W2 / C2C / 1099", "Dice / Monster", "Sourcing"], industry: "Staffing & Recruiting", department: "Human Resources", roleCategory: "Talent Acquisition", education: "Any Graduate", experience: "1-4 Years"
    }
];

const MOCK_RESUMES = [
    {
        id: 1, name: "Arjun Sharma", title: "Senior React Developer", location: "Bangalore",
        experience: "6 Years", skills: ["React", "TypeScript", "Node.js", "AWS"],
        lastCompany: "TechFlow", education: "B.Tech Computer Science",
        summary: "Passionate frontend engineer with expertise in building scalable web applications. Strong focus on performance and user experience."
    },
    {
        id: 2, name: "Priya Patel", title: "Product Manager", location: "Mumbai",
        experience: "4 Years", skills: ["Product Strategy", "Agile", "SQL", "Jira"],
        lastCompany: "Growth Labs", education: "MBA Marketing",
        summary: "Data-driven product manager with a track record of launching successful mobile apps in the fintech space."
    },
    {
        id: 3, name: "Rahul Verma", title: "DevOps Engineer", location: "Remote",
        experience: "5 Years", skills: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
        lastCompany: "CloudScale", education: "B.E. Electronics",
        summary: "Specializing in infrastructure automation and cloud-native architectures. Experienced in managing large-scale k8s clusters."
    },
    {
        id: 4, name: "Ananya Iyer", title: "UI/UX Designer", location: "Hyderabad",
        experience: "3 Years", skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
        lastCompany: "DesignSync", education: "B.Des Visual Communication",
        summary: "Creative designer focused on creating intuitive and accessible digital experiences. Strong portfolio in B2B SaaS design."
    },
    {
        id: 5, name: "Vikram Singh", title: "Backend Developer (Go)", location: "Pune",
        experience: "7 Years", skills: ["Go", "PostgreSQL", "Redis", "Microservices", "gRPC"],
        lastCompany: "FinVault", education: "M.Tech Software Systems",
        summary: "High-performance backend engineer with deep knowledge of distributed systems and financial messaging protocols."
    },
    {
        id: 6, name: "Sanya Gupta", title: "Digital Marketing Specialist", location: "Delhi NCR",
        experience: "4 Years", skills: ["SEO", "Google Ads", "Content Marketing", "Analytics"],
        lastCompany: "AdRise", education: "B.A. Mass Communication",
        summary: "Growth-oriented marketer with expertise in driving organic and paid acquisition for e-commerce brands."
    }
];

const MOCK_VERSION = 'v5'; // Bumped for resumes

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState(() => {
        try {
            const savedVersion = localStorage.getItem('jb_jobs_version');
            if (savedVersion !== MOCK_VERSION) {
                localStorage.removeItem('jb_jobs');
                localStorage.setItem('jb_jobs_version', MOCK_VERSION);
                return MOCK_JOBS;
            }
            const savedJobs = localStorage.getItem('jb_jobs');
            if (savedJobs) {
                const parsed = JSON.parse(savedJobs);
                return parsed.length > 0 ? parsed : MOCK_JOBS;
            }
            return MOCK_JOBS;
        } catch (e) {
            localStorage.removeItem('jb_jobs');
            localStorage.setItem('jb_jobs_version', MOCK_VERSION);
            return MOCK_JOBS;
        }
    });

    const [resumes, setResumes] = useState(() => {
        const savedResumes = localStorage.getItem('jb_resumes');
        return savedResumes ? JSON.parse(savedResumes) : MOCK_RESUMES;
    });

    const [applications, setApplications] = useState(() => {
        const savedApps = localStorage.getItem('jb_applications');
        return savedApps ? JSON.parse(savedApps) : [];
    });

    const [locations, setLocations] = useState(() => {
        const savedLocations = localStorage.getItem('jb_locations');
        return savedLocations ? JSON.parse(savedLocations) : [
            'Remote', 'Bangalore', 'Mumbai', 'Delhi NCR', 'Pune',
            'Hyderabad', 'Chennai', 'Gurgaon', 'Noida', 'Kolkata', 'Ahmedabad',
            'Chandigarh', 'Jaipur', 'Kochi', 'Thiruvananthapuram', 'Indore',
            'Coimbatore', 'Mysore', 'Bhubaneswar', 'Nagpur', 'Lucknow',
            'Navi Mumbai', 'Surat', 'Vadodara', 'Visakhapatnam'
        ];
    });

    const [searchFilter, setSearchFilter] = useState({
        keyword: '',
        location: '',
        category: ''
    });

    useEffect(() => {
        localStorage.setItem('jb_jobs', JSON.stringify(jobs));
    }, [jobs]);

    useEffect(() => {
        localStorage.setItem('jb_applications', JSON.stringify(applications));
    }, [applications]);

    useEffect(() => {
        localStorage.setItem('jb_locations', JSON.stringify(locations));
    }, [locations]);

    useEffect(() => {
        localStorage.setItem('jb_resumes', JSON.stringify(resumes));
    }, [resumes]);

    const addJob = (newJob) => {
        const jobWithId = {
            ...newJob,
            id: Date.now(),
            postedDate: 'Just now',
            applicants: 0
        };
        setJobs(prev => [jobWithId, ...prev]);
    };

    const updateJob = (id, updatedData) => {
        setJobs(prev => prev.map(job =>
            job.id === id ? { ...job, ...updatedData } : job
        ));
    };

    const deleteJob = (id) => {
        setJobs(prev => prev.filter(job => job.id !== id));
        setApplications(prev => prev.filter(app => app.jobId !== id));
    };

    const applyToJob = (application) => {
        const newApp = {
            ...application,
            id: Date.now(),
            appliedDate: new Date().toISOString(),
            status: 'new'
        };
        setApplications(prev => [...prev, newApp]);

        setJobs(prev => prev.map(job =>
            job.id === application.jobId
                ? { ...job, applicants: (job.applicants || 0) + 1 }
                : job
        ));

        return true;
    };

    const getApplicationsForJob = (jobId) => {
        return applications.filter(app => app.jobId === jobId);
    };

    const addLocation = (newLocation) => {
        const normalizedLocation = newLocation.trim();
        if (normalizedLocation) {
            setLocations(prev => {
                const lowerNewLocation = normalizedLocation.toLowerCase();
                if (!prev.some(loc => loc.toLowerCase() === lowerNewLocation)) {
                    return [...prev, normalizedLocation].sort((a, b) => {
                        if (a === 'Remote') return -1;
                        if (b === 'Remote') return 1;
                        return a.localeCompare(b);
                    });
                }
                return prev;
            });
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesKeyword = job.title.toLowerCase().includes(searchFilter.keyword.toLowerCase()) ||
            job.company.toLowerCase().includes(searchFilter.keyword.toLowerCase()) ||
            (job.requirements && job.requirements.some(req => req.toLowerCase().includes(searchFilter.keyword.toLowerCase())));

        const matchesLocation = job.location.toLowerCase().includes(searchFilter.location.toLowerCase());
        const matchesCategory = !searchFilter.category || job.category === searchFilter.category;

        return matchesKeyword && matchesLocation && matchesCategory;
    });

    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('jb_user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (e) {
            localStorage.removeItem('jb_user');
            return null;
        }
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('jb_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('jb_user');
        }
    }, [user]);

    const login = (userData) => {
        setUser(userData);
        return true;
    };

    const logout = () => {
        setUser(null);
    };

    const updateUser = (updatedData) => {
        setUser(prev => ({ ...prev, ...updatedData }));
    };

    // Profile Performance Metrics (Simulated Live Data)
    const [profileMetrics, setProfileMetrics] = useState(() => {
        try {
            const savedMetrics = localStorage.getItem('jb_metrics');
            return savedMetrics ? JSON.parse(savedMetrics) : { searchAppearances: 12, recruiterActions: 3 };
        } catch (e) {
            return { searchAppearances: 12, recruiterActions: 3 };
        }
    });

    useEffect(() => {
        localStorage.setItem('jb_metrics', JSON.stringify(profileMetrics));
    }, [profileMetrics]);

    // Simulate Live Traffic
    useEffect(() => {
        if (!user || user.role !== 'job_seeker') return;

        const intervalId = setInterval(() => {
            setProfileMetrics(prev => {
                // Adjust increment chances to look natural over time
                const addAppearance = Math.random() > 0.6; // 40% chance every interval
                const addAction = Math.random() > 0.9;     // 10% chance every interval

                if (addAppearance || addAction) {
                    return {
                        searchAppearances: prev.searchAppearances + (addAppearance ? 1 : 0),
                        recruiterActions: prev.recruiterActions + (addAction ? 1 : 0)
                    };
                }
                return prev;
            });
        }, 8000); // Check every 8 seconds

        return () => clearInterval(intervalId);
    }, [user]);

    return (
        <JobContext.Provider value={{
            jobs,
            filteredJobs,
            applications,
            locations,
            searchFilter,
            setSearchFilter,
            addJob,
            updateJob,
            deleteJob,
            applyToJob,
            getApplicationsForJob,
            addLocation,
            user,
            login,
            logout,
            updateUser,
            profileMetrics,
            resumes,
            setResumes
        }}>
            {children}
        </JobContext.Provider>
    );
};
