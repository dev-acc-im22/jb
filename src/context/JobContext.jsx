import React, { createContext, useContext, useState, useEffect } from 'react';

const JobContext = createContext();

export const useJobs = () => {
    const context = useContext(JobContext);
    if (!context) throw new Error('useJobs must be used within a JobProvider');
    return context;
};

const MOCK_JOBS = [
    // ========== Remote (3) ==========
    {
        id: 1, title: "Remote React Developer", company: "DistributeHQ", location: "Remote", salary: "₹14L - ₹22L",
        type: "Full-time", posted: "2 hours ago", applicants: 8, category: "Remote",
        description: "Join our fully remote team building modern web apps with React. We offer flexible hours, async-first communication, and a culture built on trust.\n\nYou'll work on our flagship SaaS platform used by 10,000+ companies worldwide. We value clean code, thoughtful architecture, and continuous learning.",
        requirements: ["React", "TypeScript", "GraphQL", "Remote Collaboration"], industry: "SaaS / Internet", department: "Engineering", roleCategory: "Software Development", education: "B.Tech/B.E.", experience: "2-5 Years"
    },
    {
        id: 2, title: "Remote Content Strategist", company: "WriteSphere", location: "Remote", salary: "₹8L - ₹14L",
        type: "Full-time", posted: "1 day ago", applicants: 22, category: "Remote",
        description: "Craft compelling content strategies for global B2B clients from anywhere in the world. Lead content calendars, SEO strategy, and editorial direction.\n\nThis role is 100% remote with quarterly team meetups in exciting locations.",
        requirements: ["Content Strategy", "SEO", "Copywriting", "Analytics"], industry: "Digital Media", department: "Marketing", roleCategory: "Content Strategy", education: "Any Graduate", experience: "3-5 Years"
    },
    {
        id: 3, title: "Remote DevOps Engineer", company: "CloudFirst", location: "Remote", salary: "₹18L - ₹28L",
        type: "Full-time", posted: "3 days ago", applicants: 14, category: "Remote",
        description: "Manage and optimize our cloud infrastructure across AWS and GCP. Automate deployments, monitor systems, and ensure 99.99% uptime for our global platform.\n\nFully remote role with a team spread across 5 time zones.",
        requirements: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"], industry: "Cloud Computing", department: "Infrastructure", roleCategory: "DevOps", education: "B.Tech/B.E.", experience: "3-6 Years"
    },

    // ========== MNC (3) ==========
    {
        id: 4, title: "Software Engineer II", company: "Google", location: "Bangalore", salary: "₹25L - ₹45L",
        type: "Full-time", posted: "1 day ago", applicants: 120, category: "MNC",
        description: "Build and maintain large-scale distributed systems at Google. Work on products used by billions of people worldwide.\n\nYou'll collaborate with world-class engineers, contribute to open-source projects, and have access to cutting-edge technology and resources.",
        requirements: ["Java", "Distributed Systems", "Data Structures", "System Design"], industry: "Internet / Technology", department: "Engineering", roleCategory: "Software Development", education: "B.Tech/M.Tech in CS", experience: "3-7 Years"
    },
    {
        id: 5, title: "Business Analyst", company: "Deloitte", location: "Mumbai", salary: "₹12L - ₹20L",
        type: "Full-time", posted: "4 hours ago", applicants: 55, category: "MNC",
        description: "Drive digital transformation for Fortune 500 clients. Analyze business processes, gather requirements, and deliver data-driven recommendations.\n\nJoin Deloitte's Consulting practice and work on high-impact projects across industries.",
        requirements: ["Business Analysis", "SQL", "Stakeholder Management", "Agile"], industry: "Consulting", department: "Advisory", roleCategory: "Business Analysis", education: "MBA / B.Tech", experience: "2-5 Years"
    },
    {
        id: 6, title: "Cloud Solutions Architect", company: "Microsoft", location: "Hyderabad", salary: "₹30L - ₹50L",
        type: "Full-time", posted: "2 days ago", applicants: 38, category: "MNC",
        description: "Design and implement cloud solutions on Azure for enterprise customers. Lead technical workshops, create reference architectures, and drive cloud adoption.\n\nBe part of Microsoft's mission to empower every person and organization on the planet.",
        requirements: ["Azure", "Cloud Architecture", "Microservices", "Enterprise Solutions"], industry: "Technology", department: "Cloud & AI", roleCategory: "Solutions Architecture", education: "B.Tech/M.Tech", experience: "5-10 Years"
    },

    // ========== Internship (3) ==========
    {
        id: 7, title: "Software Development Intern", company: "Flipkart", location: "Bangalore", salary: "₹40K - ₹60K /month",
        type: "Internship", posted: "Just now", applicants: 3, category: "Internship",
        description: "6-month internship with Flipkart's engineering team. Work on real production features used by millions of customers.\n\nGet mentored by senior engineers, participate in code reviews, and gain hands-on experience with large-scale systems. PPO available for top performers.",
        requirements: ["Java/Python", "Data Structures", "Problem Solving", "Git"], industry: "E-Commerce", department: "Engineering", roleCategory: "Software Development", education: "B.Tech (ongoing)", experience: "0-1 Years"
    },
    {
        id: 8, title: "Marketing Intern", company: "Zomato", location: "Gurgaon", salary: "₹25K - ₹35K /month",
        type: "Internship", posted: "5 hours ago", applicants: 18, category: "Internship",
        description: "Join Zomato's marketing team and help craft campaigns that reach millions of food lovers. Work on social media, influencer partnerships, and growth experiments.\n\nThis is a 3-month paid internship with the possibility of a full-time offer.",
        requirements: ["Social Media", "Content Creation", "Canva", "Communication"], industry: "Food Tech", department: "Marketing", roleCategory: "Digital Marketing", education: "Any Graduate (ongoing)", experience: "0 Years"
    },
    {
        id: 9, title: "Data Analytics Intern", company: "KPMG", location: "Mumbai", salary: "₹30K - ₹45K /month",
        type: "Internship", posted: "2 days ago", applicants: 25, category: "Internship",
        description: "Assist the analytics team in building dashboards, cleaning datasets, and creating reports for clients across industries.\n\nGain exposure to real consulting engagements and learn from industry professionals. Duration: 6 months.",
        requirements: ["Excel", "SQL", "Tableau", "Python Basics"], industry: "Consulting / KPO", department: "Analytics", roleCategory: "Data Analytics", education: "Any Graduate (ongoing)", experience: "0 Years"
    },

    // ========== Sales (3) ==========
    {
        id: 10, title: "Enterprise Sales Executive", company: "Salesforce", location: "Mumbai", salary: "₹15L - ₹25L + Commission",
        type: "Full-time", posted: "3 hours ago", applicants: 16, category: "Sales",
        description: "Own the full sales cycle for enterprise accounts. Build relationships with C-level executives, conduct product demos, and close deals worth ₹1Cr+.\n\nJoin Salesforce, the world's #1 CRM, and be part of a high-performance sales culture.",
        requirements: ["Enterprise Sales", "CRM", "Negotiation", "SaaS"], industry: "SaaS / Technology", department: "Sales", roleCategory: "Enterprise Sales", education: "MBA preferred", experience: "4-8 Years"
    },
    {
        id: 11, title: "Inside Sales Representative", company: "Razorpay", location: "Bangalore", salary: "₹6L - ₹10L + Incentives",
        type: "Full-time", posted: "1 day ago", applicants: 30, category: "Sales",
        description: "Drive new business through outbound prospecting and inbound lead qualification. Manage the entire sales process from prospecting to closure.\n\nWork with India's leading fintech company and help businesses accept payments seamlessly.",
        requirements: ["Cold Calling", "Lead Generation", "B2B Sales", "Communication"], industry: "Fintech", department: "Sales", roleCategory: "Inside Sales", education: "Any Graduate", experience: "1-3 Years"
    },
    {
        id: 12, title: "Regional Sales Manager", company: "HUL", location: "Delhi NCR", salary: "₹18L - ₹28L",
        type: "Full-time", posted: "4 days ago", applicants: 22, category: "Sales",
        description: "Lead a team of 15+ sales representatives across the North India region. Drive revenue targets, manage distributor relationships, and launch new products.\n\nJoin Hindustan Unilever and shape the future of India's largest FMCG company.",
        requirements: ["Team Leadership", "FMCG Sales", "Distribution Management", "P&L"], industry: "FMCG", department: "Sales & Marketing", roleCategory: "Sales Management", education: "MBA", experience: "6-10 Years"
    },

    // ========== Startup (3) ==========
    {
        id: 13, title: "Founding Engineer", company: "NeoBank", location: "Bangalore", salary: "₹20L - ₹35L + ESOPs",
        type: "Full-time", posted: "Just now", applicants: 4, category: "Startup",
        description: "Be among the first 5 engineers at a Y Combinator-backed fintech startup. Build the core banking platform from scratch.\n\nThis is a once-in-a-career opportunity to shape the architecture, culture, and product of a company that will serve millions. Generous ESOP package included.",
        requirements: ["Node.js", "React", "PostgreSQL", "System Design", "Fintech"], industry: "Fintech", department: "Engineering", roleCategory: "Full Stack Development", education: "B.Tech/B.E.", experience: "3-7 Years"
    },
    {
        id: 14, title: "Growth Product Manager", company: "Meesho", location: "Bangalore", salary: "₹22L - ₹38L",
        type: "Full-time", posted: "2 days ago", applicants: 42, category: "Startup",
        description: "Own the growth funnel for India's fastest-growing social commerce platform. Run experiments, analyze data, and drive user acquisition and retention.\n\nWork directly with the founders and lead a cross-functional squad of engineers, designers, and analysts.",
        requirements: ["Growth Hacking", "A/B Testing", "SQL", "Product Analytics"], industry: "E-Commerce", department: "Product", roleCategory: "Product Management", education: "MBA / B.Tech", experience: "3-6 Years"
    },
    {
        id: 15, title: "UI/UX Designer", company: "CRED", location: "Bangalore", salary: "₹16L - ₹26L",
        type: "Full-time", posted: "1 day ago", applicants: 28, category: "Startup",
        description: "Design delightful experiences for CRED's premium user base. From concept to pixel-perfect execution, you'll own the design of features used by millions.\n\nWe're obsessed with craft and details. If you are too, we'd love to talk.",
        requirements: ["Figma", "Interaction Design", "Design Systems", "Prototyping"], industry: "Fintech", department: "Design", roleCategory: "Product Design", education: "Degree in Design", experience: "2-5 Years"
    },

    // ========== Fresher (3) ==========
    {
        id: 16, title: "Graduate Trainee Engineer", company: "TCS", location: "Multiple Cities", salary: "₹3.6L - ₹7L",
        type: "Full-time", posted: "6 hours ago", applicants: 200, category: "Fresher",
        description: "Join TCS as a Graduate Trainee and kickstart your career in technology. Undergo an intensive training program and get placed in projects across domains.\n\nTCS offers a structured learning path, mentorship, and global career opportunities for fresh graduates.",
        requirements: ["Any Programming Language", "Problem Solving", "Communication", "Willingness to Learn"], industry: "IT Services", department: "Engineering", roleCategory: "Software Development", education: "B.Tech/B.E./MCA (2025/2026 batch)", experience: "0 Years"
    },
    {
        id: 17, title: "Junior Business Analyst", company: "Accenture", location: "Pune", salary: "₹4.5L - ₹6.5L",
        type: "Full-time", posted: "1 day ago", applicants: 85, category: "Fresher",
        description: "Begin your career in consulting with Accenture. Work alongside experienced consultants, learn industry best practices, and grow rapidly.\n\nFresh graduates with strong analytical skills and communication abilities are encouraged to apply.",
        requirements: ["Excel", "Presentation Skills", "Analytical Thinking", "Communication"], industry: "IT Consulting", department: "Consulting", roleCategory: "Business Analysis", education: "Any Graduate (2025/2026)", experience: "0 Years"
    },
    {
        id: 18, title: "Associate Software Engineer", company: "Infosys", location: "Mysore", salary: "₹3.6L - ₹5L",
        type: "Full-time", posted: "3 days ago", applicants: 150, category: "Fresher",
        description: "Start your IT career with Infosys. Attend the flagship training program at Mysore campus, learn cutting-edge technologies, and work on global projects.\n\nOpen to fresh graduates from all engineering branches. No prior experience required.",
        requirements: ["Logical Reasoning", "Basic Programming", "Aptitude", "Teamwork"], industry: "IT Services", department: "Engineering", roleCategory: "Software Development", education: "B.Tech/B.E. (2025/2026)", experience: "0 Years"
    },

    // ========== Data Science (3) ==========
    {
        id: 19, title: "Senior Data Scientist", company: "Flipkart", location: "Bangalore", salary: "₹25L - ₹40L",
        type: "Full-time", posted: "2 days ago", applicants: 35, category: "Data Science",
        description: "Build recommendation engines, search ranking algorithms, and personalization systems for India's largest e-commerce platform.\n\nWork with petabytes of data, cutting-edge ML infrastructure, and a team of world-class scientists.",
        requirements: ["Python", "Machine Learning", "Deep Learning", "Spark", "A/B Testing"], industry: "E-Commerce", department: "Data Science", roleCategory: "Data Science", education: "M.Tech/PhD in CS/Stats", experience: "4-8 Years"
    },
    {
        id: 20, title: "ML Engineer", company: "Ola", location: "Bangalore", salary: "₹18L - ₹30L",
        type: "Full-time", posted: "5 days ago", applicants: 20, category: "Data Science",
        description: "Build and deploy machine learning models for ride pricing, ETA prediction, and demand forecasting. Work on ML systems that serve millions of requests in real-time.\n\nCollaborate with product and engineering teams to take models from research to production.",
        requirements: ["Python", "TensorFlow/PyTorch", "MLOps", "SQL", "Statistics"], industry: "Mobility", department: "AI & Data", roleCategory: "Machine Learning", education: "M.Tech/M.S. in CS/ML", experience: "3-6 Years"
    },
    {
        id: 21, title: "Data Analyst", company: "Swiggy", location: "Bangalore", salary: "₹10L - ₹16L",
        type: "Full-time", posted: "1 day ago", applicants: 28, category: "Data Science",
        description: "Analyse operational and business data to help Swiggy make better decisions. Build dashboards, run deep-dives, and present insights to leadership.\n\nIdeal for someone who loves turning messy data into clear stories.",
        requirements: ["SQL", "Python", "Tableau/PowerBI", "Statistical Analysis"], industry: "Food Tech", department: "Business Intelligence", roleCategory: "Data Analytics", education: "Any Graduate", experience: "1-3 Years"
    },

    // ========== Finance / Banking (3) ==========
    {
        id: 22, title: "Investment Banking Analyst", company: "Goldman Sachs", location: "Mumbai", salary: "₹18L - ₹30L",
        type: "Full-time", posted: "3 days ago", applicants: 45, category: "Finance",
        description: "Join Goldman Sachs' IBD team and work on M&A, IPOs, and capital markets transactions. Prepare pitchbooks, financial models, and client presentations.\n\nThis is a high-intensity, high-reward role with unmatched exposure to global finance.",
        requirements: ["Financial Modeling", "Valuation", "Excel", "PowerPoint", "Accounting"], industry: "Investment Banking", department: "IBD", roleCategory: "Investment Banking", education: "MBA Finance / CA / CFA", experience: "1-4 Years"
    },
    {
        id: 23, title: "Credit Risk Analyst", company: "HDFC Bank", location: "Mumbai", salary: "₹10L - ₹16L",
        type: "Full-time", posted: "1 week ago", applicants: 30, category: "Finance",
        description: "Evaluate credit risk for retail and corporate lending portfolios. Build risk models, assess loan applications, and ensure compliance with RBI guidelines.\n\nJoin India's leading private bank and grow your career in risk management.",
        requirements: ["Credit Analysis", "Risk Modeling", "SQL", "Basel Norms", "SAS"], industry: "Banking", department: "Risk Management", roleCategory: "Credit Risk", education: "MBA Finance / B.Com", experience: "2-5 Years"
    },
    {
        id: 24, title: "Wealth Management Associate", company: "Morgan Stanley", location: "Mumbai", salary: "₹15L - ₹24L",
        type: "Full-time", posted: "4 days ago", applicants: 18, category: "Finance",
        description: "Manage investment portfolios for high-net-worth clients. Provide financial planning advice, execute trades, and build long-term client relationships.\n\nWork at one of the world's most prestigious financial institutions.",
        requirements: ["Portfolio Management", "Financial Planning", "Equity Research", "CFA"], industry: "Wealth Management", department: "Private Wealth", roleCategory: "Wealth Management", education: "MBA / CFA", experience: "3-6 Years"
    },

    // ========== Engineering (3) ==========
    {
        id: 25, title: "Mechanical Design Engineer", company: "Tata Motors", location: "Pune", salary: "₹8L - ₹14L",
        type: "Full-time", posted: "2 days ago", applicants: 32, category: "Engineering",
        description: "Design and develop automotive components for next-generation electric vehicles. Use CAD/CAE tools for modeling, simulation, and optimization.\n\nBe part of Tata Motors' ambitious EV journey and contribute to sustainable mobility.",
        requirements: ["SolidWorks", "CATIA", "FEA Analysis", "Automotive Design"], industry: "Automotive", department: "R&D", roleCategory: "Mechanical Engineering", education: "B.Tech/M.Tech Mechanical", experience: "2-5 Years"
    },
    {
        id: 26, title: "Civil Site Engineer", company: "L&T Construction", location: "Delhi NCR", salary: "₹6L - ₹10L",
        type: "Full-time", posted: "5 days ago", applicants: 40, category: "Engineering",
        description: "Oversee construction activities for large-scale infrastructure projects. Manage contractors, ensure quality standards, and maintain project timelines.\n\nWork on landmark projects like metro rail, highways, and commercial complexes.",
        requirements: ["AutoCAD", "Site Management", "Quality Control", "Project Planning"], industry: "Construction", department: "Project Execution", roleCategory: "Civil Engineering", education: "B.Tech Civil", experience: "1-4 Years"
    },
    {
        id: 27, title: "Electronics Hardware Engineer", company: "Samsung R&D", location: "Noida", salary: "₹12L - ₹20L",
        type: "Full-time", posted: "1 day ago", applicants: 15, category: "Engineering",
        description: "Design PCBs and embedded systems for Samsung's next-generation consumer electronics. Work on cutting-edge hardware with global R&D teams.\n\nOpportunity to file patents and present at international conferences.",
        requirements: ["PCB Design", "Embedded C", "VHDL/Verilog", "Signal Processing"], industry: "Consumer Electronics", department: "R&D - Hardware", roleCategory: "Electronics Engineering", education: "B.Tech/M.Tech ECE/EEE", experience: "2-6 Years"
    },

    // ========== Development / Software (3) ==========
    {
        id: 28, title: "Senior Frontend Developer", company: "TechFlow", location: "Bangalore", salary: "₹12L - ₹18L",
        type: "Full-time", posted: "2 days ago", applicants: 45, category: "Development",
        description: "We are looking for an experienced Frontend Developer with React expertise to join our fast-paced product team. You will be responsible for building high-performance web applications.\n\nKey Responsibilities:\n• Develop new user-facing features using React.js\n• Build reusable components and libraries\n• Optimize components for maximum performance",
        requirements: ["React", "TypeScript", "Tailwind CSS", "Redux"], industry: "IT Services & Consulting", department: "Engineering - Software & QA", roleCategory: "Software Development", education: "B.Tech/B.E. in Computer Science", experience: "3-5 Years"
    },
    {
        id: 29, title: "Backend Engineer (Go)", company: "Zerodha", location: "Bangalore", salary: "₹20L - ₹35L",
        type: "Full-time", posted: "3 hours ago", applicants: 12, category: "Development",
        description: "Build and maintain Zerodha's high-throughput trading systems that process millions of orders daily. Work with Go, PostgreSQL, and real-time data streams.\n\nWe are a bootstrapped, profitable company with a small engineering team. Every engineer has massive impact.",
        requirements: ["Go", "PostgreSQL", "Redis", "WebSockets", "System Design"], industry: "Fintech", department: "Engineering", roleCategory: "Backend Development", education: "B.Tech/B.E.", experience: "3-7 Years"
    },
    {
        id: 30, title: "Full Stack Developer", company: "WebSolutions", location: "Remote", salary: "₹20L - ₹35L",
        type: "Full-time", posted: "Just now", applicants: 5, category: "Development",
        description: "Work on both client-side and server-side of our applications. You will be responsible for the full software development lifecycle, from conception to deployment.\n\nWe are looking for a highly skilled Full Stack Developer who is comfortable with both front and back end programming.",
        requirements: ["Node.js", "React", "MongoDB", "AWS", "Docker"], industry: "Internet / Web Services", department: "Engineering - Full Stack", roleCategory: "Software Development", education: "B.Tech/B.E.", experience: "4-8 Years"
    },

    // ========== Marketing (3) ==========
    {
        id: 31, title: "Digital Marketing Manager", company: "Growth Hackers", location: "Chennai", salary: "₹10L - ₹16L",
        type: "Full-time", posted: "1 day ago", applicants: 28, category: "Marketing",
        description: "Lead our digital marketing initiatives and drive growth through multiple channels. You will be responsible for strategy, execution, and optimization of marketing campaigns.\n\nResponsibilities:\n• Plan and execute all digital marketing, including SEO/SEM, email, social media and display advertising campaigns",
        requirements: ["SEO", "SEM", "Google Analytics", "Content Strategy"], industry: "Marketing & Advertising", department: "Marketing & Communication", roleCategory: "Digital Marketing", education: "MBA in Marketing preferred", experience: "4-6 Years"
    },
    {
        id: 32, title: "Brand Manager", company: "Mamaearth", location: "Gurgaon", salary: "₹14L - ₹22L",
        type: "Full-time", posted: "2 days ago", applicants: 35, category: "Marketing",
        description: "Own the brand strategy for one of India's fastest-growing D2C brands. Lead product launches, manage brand communications, and drive consumer engagement.\n\nWork in a fast-paced, entrepreneurial environment where your ideas directly impact millions of consumers.",
        requirements: ["Brand Strategy", "Consumer Insights", "P&L Management", "Campaign Planning"], industry: "FMCG / D2C", department: "Marketing", roleCategory: "Brand Management", education: "MBA Marketing", experience: "3-6 Years"
    },
    {
        id: 33, title: "Performance Marketing Specialist", company: "PhonePe", location: "Bangalore", salary: "₹12L - ₹18L",
        type: "Full-time", posted: "4 hours ago", applicants: 10, category: "Marketing",
        description: "Scale user acquisition campaigns across Google, Meta, and programmatic channels. Optimize CAC, manage multi-crore budgets, and run creative experiments.\n\nJoin India's leading digital payments company and drive growth at scale.",
        requirements: ["Google Ads", "Facebook Ads", "App Install Campaigns", "Attribution", "SQL"], industry: "Fintech", department: "Growth Marketing", roleCategory: "Performance Marketing", education: "Any Graduate", experience: "2-4 Years"
    },

    // ========== Digital Marketing (10 new) ==========
    {
        id: 34, title: "SEO Specialist", company: "Nykaa", location: "Mumbai", salary: "₹8L - ₹14L",
        type: "Full-time", posted: "3 hours ago", applicants: 15, category: "Marketing",
        description: "Own the organic search strategy for India's leading beauty and fashion e-commerce platform. Conduct keyword research, on-page optimization, technical SEO audits, and link-building campaigns.\n\nKey Responsibilities:\n• Develop and execute comprehensive SEO strategies\n• Perform technical SEO audits and implement fixes\n• Build high-quality backlink profiles\n• Track and report on KPIs including organic traffic, rankings, and conversions",
        requirements: ["SEO", "Google Search Console", "Ahrefs/SEMrush", "Technical SEO", "Content Strategy"], industry: "E-Commerce / Beauty", department: "Marketing", roleCategory: "SEO & Organic Growth", education: "Any Graduate", experience: "2-4 Years"
    },
    {
        id: 35, title: "Social Media Manager", company: "Swiggy", location: "Bangalore", salary: "₹10L - ₹16L",
        type: "Full-time", posted: "Just now", applicants: 8, category: "Marketing",
        description: "Lead Swiggy's social media presence across Instagram, Twitter, LinkedIn, and YouTube. Create viral content strategies, manage community engagement, and build a brand voice loved by millions.\n\nKey Responsibilities:\n• Plan and publish content across all social platforms\n• Monitor trends and execute real-time marketing\n• Manage community engagement and crisis communications\n• Report on social KPIs and optimize strategy accordingly",
        requirements: ["Social Media Strategy", "Content Creation", "Community Management", "Instagram & Twitter", "Analytics"], industry: "Food Tech", department: "Brand Marketing", roleCategory: "Social Media", education: "Any Graduate", experience: "3-5 Years"
    },
    {
        id: 36, title: "Content Marketing Lead", company: "Razorpay", location: "Bangalore", salary: "₹14L - ₹22L",
        type: "Full-time", posted: "1 day ago", applicants: 22, category: "Marketing",
        description: "Build and lead Razorpay's content marketing engine. Develop thought leadership content, whitepapers, case studies, and blog articles that position Razorpay as the go-to fintech platform.\n\nKey Responsibilities:\n• Develop and execute a B2B content strategy\n• Create long-form content: guides, whitepapers, case studies\n• Lead a team of content writers and editors\n• Measure content performance and iterate on strategy",
        requirements: ["Content Marketing", "B2B Writing", "SEO", "Editorial Management", "HubSpot"], industry: "Fintech", department: "Marketing", roleCategory: "Content Marketing", education: "MBA / Any Graduate", experience: "4-7 Years"
    },
    {
        id: 37, title: "PPC Campaign Manager", company: "MakeMyTrip", location: "Gurgaon", salary: "₹12L - ₹20L",
        type: "Full-time", posted: "2 days ago", applicants: 18, category: "Marketing",
        description: "Manage high-budget PPC campaigns across Google Ads, Bing Ads, and Meta for India's leading travel platform. Optimize keyword bidding, ad copy, landing pages and targeting to maximize ROI.\n\nKey Responsibilities:\n• Plan, execute and optimize PPC campaigns across search and display\n• Manage multi-crore monthly ad budgets\n• A/B test ad creatives, landing pages, and bidding strategies\n• Build weekly/monthly performance reports with actionable insights",
        requirements: ["Google Ads", "Meta Ads", "PPC Strategy", "A/B Testing", "Google Analytics"], industry: "Travel & Tourism", department: "Performance Marketing", roleCategory: "PPC / Paid Media", education: "Any Graduate", experience: "3-5 Years"
    },
    {
        id: 38, title: "Email Marketing Specialist", company: "Myntra", location: "Bangalore", salary: "₹7L - ₹12L",
        type: "Full-time", posted: "5 hours ago", applicants: 12, category: "Marketing",
        description: "Design and execute email marketing campaigns that drive engagement, retention, and revenue for Myntra's 50M+ user base. Build automated email journeys for onboarding, cart abandonment, and seasonal promotions.\n\nKey Responsibilities:\n• Design and send marketing emails and newsletters\n• Build automated lifecycle email campaigns\n• Segment audiences and personalize messaging\n• Analyze email performance and optimize continuously",
        requirements: ["Email Marketing", "Marketing Automation", "CleverTap/MoEngage", "HTML Email", "A/B Testing"], industry: "E-Commerce / Fashion", department: "CRM & Lifecycle Marketing", roleCategory: "Email & CRM", education: "Any Graduate", experience: "2-4 Years"
    },
    {
        id: 39, title: "Growth Marketing Manager", company: "CRED", location: "Bangalore", salary: "₹18L - ₹30L",
        type: "Full-time", posted: "1 day ago", applicants: 25, category: "Marketing",
        description: "Drive user acquisition and retention for CRED's premium user base. Design and execute growth experiments across paid, organic, and referral channels. Own the full marketing funnel.\n\nKey Responsibilities:\n• Design and run growth experiments across channels\n• Own key metrics: CAC, LTV, activation rate, retention\n• Build referral and viral growth loops\n• Collaborate with product and engineering on growth features",
        requirements: ["Growth Hacking", "Data Analysis", "SQL", "A/B Testing", "Product Marketing"], industry: "Fintech", department: "Growth", roleCategory: "Growth Marketing", education: "MBA / B.Tech", experience: "4-7 Years"
    },
    {
        id: 40, title: "Influencer Marketing Coordinator", company: "boAt", location: "Delhi NCR", salary: "₹6L - ₹10L",
        type: "Full-time", posted: "2 days ago", applicants: 30, category: "Marketing",
        description: "Manage influencer partnerships and creator collaborations for India's #1 audio brand. Identify, negotiate, and onboard influencers across Instagram, YouTube, and emerging platforms.\n\nKey Responsibilities:\n• Scout and onboard influencers across multiple platforms\n• Manage end-to-end influencer campaigns\n• Negotiate contracts and manage partnerships\n• Track ROI and report on influencer campaign metrics",
        requirements: ["Influencer Marketing", "Instagram", "YouTube", "Negotiation", "Campaign Management"], industry: "Consumer Electronics / D2C", department: "Brand Marketing", roleCategory: "Influencer Marketing", education: "Any Graduate", experience: "1-3 Years"
    },
    {
        id: 41, title: "Marketing Analytics Manager", company: "Paytm", location: "Noida", salary: "₹16L - ₹24L",
        type: "Full-time", posted: "3 days ago", applicants: 14, category: "Marketing",
        description: "Build the marketing analytics infrastructure for one of India's largest digital payment platforms. Create dashboards, attribution models, and customer segmentation frameworks.\n\nKey Responsibilities:\n• Build marketing attribution models (multi-touch, incrementality)\n• Create dashboards and automated reports for marketing teams\n• Analyze customer journeys and identify optimization opportunities\n• Manage the marketing analytics tech stack",
        requirements: ["SQL", "Python", "Tableau/PowerBI", "Marketing Attribution", "Google Analytics"], industry: "Fintech", department: "Marketing Analytics", roleCategory: "Marketing Analytics", education: "B.Tech / MBA Analytics", experience: "4-6 Years"
    },
    {
        id: 42, title: "Brand Strategist", company: "Zomato", location: "Gurgaon", salary: "₹14L - ₹22L",
        type: "Full-time", posted: "1 day ago", applicants: 20, category: "Marketing",
        description: "Shape the future of one of India's most iconic consumer brands. Develop brand guidelines, positioning frameworks, and creative strategies that keep Zomato top-of-mind for 200M+ users.\n\nKey Responsibilities:\n• Develop and maintain brand identity and guidelines\n• Lead ideation and execution of brand campaigns\n• Manage creative and media agency relationships\n• Conduct consumer research and competitive analysis",
        requirements: ["Brand Strategy", "Campaign Planning", "Creative Direction", "Consumer Insights", "Agency Management"], industry: "Food Tech", department: "Brand Marketing", roleCategory: "Brand Strategy", education: "MBA Marketing", experience: "4-7 Years"
    },
    {
        id: 43, title: "Digital Marketing Director", company: "Flipkart", location: "Bangalore", salary: "₹35L - ₹55L",
        type: "Full-time", posted: "Just now", applicants: 5, category: "Marketing",
        description: "Lead the entire digital marketing function for one of India's largest e-commerce companies. Own strategy, team leadership, and P&L for digital channels including search, social, email, app marketing, and programmatic.\n\nKey Responsibilities:\n• Set digital marketing strategy and annual budgets\n• Lead and mentor a 20+ person marketing team\n• Drive innovation in martech and AI-powered marketing\n• Own digital channel P&L and report to CMO",
        requirements: ["Digital Strategy", "Team Leadership", "P&L Management", "MarTech", "Data-Driven Marketing"], industry: "E-Commerce", department: "Marketing", roleCategory: "Marketing Leadership", education: "MBA", experience: "10-15 Years"
    }
];

const MOCK_VERSION = 'v4'; // Bump this when MOCK_JOBS changes to invalidate stale cache

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
            updateUser
        }}>
            {children}
        </JobContext.Provider>
    );
};
