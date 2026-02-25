import React, { useState } from 'react';
import { Search, Clock, ArrowRight, TrendingUp, BookOpen, ChevronRight, Bookmark, Share2, Eye, Heart, MessageCircle, Filter, X } from 'lucide-react';

const categories = ['All', 'Career Tips', 'Resume Guide', 'Interview Prep', 'Job Search', 'Workplace'];

const authors = [
    { name: 'Sarah Mitchell', role: 'Career Coach', avatar: '👩‍💼' },
    { name: 'James Chen', role: 'HR Director', avatar: '👨‍💼' },
    { name: 'Emily Parker', role: 'Resume Expert', avatar: '👩‍🏫' },
    { name: 'David Kim', role: 'Tech Recruiter', avatar: '👨‍💻' },
    { name: 'Rachel Torres', role: 'Career Strategist', avatar: '👩‍🎓' },
];

const posts = [
    {
        title: 'How to Write a Resume That Gets You Hired in 2025',
        excerpt: 'Learn the top strategies hiring managers look for in a modern resume, from ATS keywords to formatting best practices. We break down every section with expert examples.',
        category: 'Resume Guide', readTime: '5 min read',
        date: 'Feb 20, 2025', featured: true,
        image: '/blog_resume.png',
        author: authors[2],
        views: '12.4K', likes: 847, comments: 63,
        tags: ['Resume', 'ATS', 'Tips']
    },
    {
        title: '10 Common Interview Questions and How to Answer Them',
        excerpt: 'Master the most frequently asked interview questions with expert-crafted responses and frameworks. Includes real examples from hiring managers at top companies.',
        category: 'Interview Prep', readTime: '8 min read',
        date: 'Feb 18, 2025', featured: true,
        image: '/blog_interview.png',
        author: authors[1],
        views: '9.8K', likes: 634, comments: 45,
        tags: ['Interview', 'Preparation', 'Career']
    },
    {
        title: 'Remote Work: Best Practices for Staying Productive',
        excerpt: 'Discover proven techniques to maintain focus and productivity while working from home. Time management strategies used by top remote professionals.',
        category: 'Workplace', readTime: '4 min read',
        date: 'Feb 15, 2025', featured: false,
        image: '/blog_remote.png',
        author: authors[0],
        views: '7.2K', likes: 512, comments: 38,
        tags: ['Remote', 'Productivity']
    },
    {
        title: 'Top Skills Employers Are Looking For in 2025',
        excerpt: 'Stay ahead of the curve by developing the skills that are in highest demand across industries. Based on analysis of 50,000+ job postings.',
        category: 'Career Tips', readTime: '6 min read',
        date: 'Feb 12, 2025', featured: false,
        image: '/blog_skills.png',
        author: authors[3],
        views: '15.1K', likes: 923, comments: 71,
        tags: ['Skills', 'Trends', '2025']
    },
    {
        title: 'How to Negotiate Your Salary: A Complete Guide',
        excerpt: 'Get the compensation you deserve with these proven salary negotiation strategies, scripts, and real-world examples from successful negotiations.',
        category: 'Career Tips', readTime: '7 min read',
        date: 'Feb 10, 2025', featured: false,
        image: '/blog_salary.png',
        author: authors[4],
        views: '11.3K', likes: 789, comments: 56,
        tags: ['Salary', 'Negotiation']
    },
    {
        title: 'Cover Letter vs Resume: What\'s the Difference?',
        excerpt: 'Understand when and why you need both, and how to make each document work in your favor. With side-by-side comparisons and templates.',
        category: 'Resume Guide', readTime: '4 min read',
        date: 'Feb 8, 2025', featured: false,
        image: '/blog_coverletter.png',
        author: authors[2],
        views: '6.5K', likes: 421, comments: 29,
        tags: ['Cover Letter', 'Resume']
    },
    {
        title: 'How to Find Hidden Job Opportunities',
        excerpt: 'Most jobs are never posted online. Learn how to tap into the hidden job market effectively through networking, referrals, and strategic outreach.',
        category: 'Job Search', readTime: '5 min read',
        date: 'Feb 5, 2025', featured: false,
        image: '/blog_hidden_jobs.png',
        author: authors[0],
        views: '8.7K', likes: 567, comments: 42,
        tags: ['Job Search', 'Networking']
    },
    {
        title: 'Building a Personal Brand on LinkedIn',
        excerpt: 'Optimize your LinkedIn profile and activity to attract recruiters and opportunities. Step-by-step guide with before-and-after profile examples.',
        category: 'Job Search', readTime: '6 min read',
        date: 'Feb 3, 2025', featured: false,
        image: '/blog_linkedin.png',
        author: authors[3],
        views: '10.2K', likes: 698, comments: 51,
        tags: ['LinkedIn', 'Personal Brand']
    },
];

const categoryColors = {
    'Resume Guide': { color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
    'Interview Prep': { color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
    'Career Tips': { color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' },
    'Workplace': { color: '#EA580C', bg: '#FFF7ED', border: '#FED7AA' },
    'Job Search': { color: '#0891B2', bg: '#ECFEFF', border: '#A5F3FC' },
};

const popularTags = ['Resume Tips', 'Interview', 'Remote Work', 'Career Growth', 'Salary', 'LinkedIn', 'ATS', 'Networking', 'Skills 2025'];

function FeaturedCard({ post, isLarge }) {
    const [hovered, setHovered] = useState(false);
    const catStyle = categoryColors[post.category] || categoryColors['Career Tips'];

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'relative', borderRadius: '20px', overflow: 'hidden',
                cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.15)' : '0 4px 20px rgba(0,0,0,0.06)',
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                gridColumn: isLarge ? 'span 2' : 'span 1',
                minHeight: isLarge ? '420px' : '380px',
            }}
        >
            {/* Image */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `url(${post.image})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }} />
            {/* Overlay gradient */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: isLarge
                    ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 100%)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 100%)',
            }} />

            {/* Top badges */}
            <div style={{
                position: 'absolute', top: '1.25rem', left: '1.25rem', right: '1.25rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2
            }}>
                <span style={{
                    fontSize: '0.68rem', fontWeight: 700, color: catStyle.color,
                    background: 'rgba(255,255,255,0.92)', padding: '0.3rem 0.75rem',
                    borderRadius: '100px', backdropFilter: 'blur(8px)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>{post.category}</span>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <span style={{
                        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                        borderRadius: '50%', width: '32px', height: '32px', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.2s', border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <Bookmark size={14} color="white" />
                    </span>
                    <span style={{
                        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                        borderRadius: '50%', width: '32px', height: '32px', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <Share2 size={14} color="white" />
                    </span>
                </div>
            </div>

            {/* Content */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: isLarge ? '2.5rem' : '1.5rem',
                zIndex: 2
            }}>
                <h3 style={{
                    fontSize: isLarge ? '1.6rem' : '1.15rem', fontWeight: 800, color: 'white',
                    margin: '0 0 0.6rem', lineHeight: 1.3,
                    textShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }}>{post.title}</h3>
                <p style={{
                    fontSize: isLarge ? '0.88rem' : '0.8rem', color: 'rgba(255,255,255,0.8)',
                    margin: '0 0 1rem', lineHeight: 1.6,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>{post.excerpt}</p>

                {/* Author row */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{
                            width: '36px', height: '36px', borderRadius: '50%',
                            background: 'rgba(255,255,255,0.15)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
                            border: '2px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(4px)'
                        }}>{post.author.avatar}</div>
                        <div>
                            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'white' }}>{post.author.name}</div>
                            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)' }}>{post.date} · {post.readTime}</div>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)'
                    }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Eye size={13} /> {post.views}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Heart size={13} /> {post.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArticleCard({ post }) {
    const [hovered, setHovered] = useState(false);
    const catStyle = categoryColors[post.category] || categoryColors['Career Tips'];

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex', background: 'white', borderRadius: '16px',
                overflow: 'hidden', border: '1px solid #E2E8F0', cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
                transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
            }}
        >
            {/* Thumbnail */}
            <div style={{
                width: '260px', minHeight: '200px', position: 'relative', overflow: 'hidden', flexShrink: 0
            }}>
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                    transform: hovered ? 'scale(1.08)' : 'scale(1)',
                }} />
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.05), rgba(0,0,0,0.15))',
                }} />
                {/* Read time badge */}
                <div style={{
                    position: 'absolute', bottom: '0.75rem', left: '0.75rem',
                    background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                    padding: '0.25rem 0.6rem', borderRadius: '100px',
                    fontSize: '0.62rem', fontWeight: 600, color: 'white',
                    display: 'flex', alignItems: 'center', gap: '0.25rem'
                }}>
                    <Clock size={10} /> {post.readTime}
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                        <span style={{
                            fontSize: '0.62rem', fontWeight: 700, color: catStyle.color,
                            background: catStyle.bg, padding: '0.2rem 0.6rem',
                            borderRadius: '100px', border: `1px solid ${catStyle.border}`
                        }}>{post.category}</span>
                        {post.tags && post.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} style={{
                                fontSize: '0.58rem', fontWeight: 600, color: '#94A3B8',
                                background: '#F8FAFC', padding: '0.15rem 0.45rem',
                                borderRadius: '4px', border: '1px solid #F1F5F9'
                            }}>#{tag}</span>
                        ))}
                    </div>
                    <h3 style={{
                        fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.5rem',
                        lineHeight: 1.4, transition: 'color 0.2s',
                        ...(hovered ? { color: '#2563EB' } : {})
                    }}>{post.title}</h3>
                    <p style={{
                        fontSize: '0.82rem', color: '#64748B', margin: 0, lineHeight: 1.6,
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                    }}>{post.excerpt}</p>
                </div>

                {/* Footer */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem',
                    paddingTop: '0.85rem', borderTop: '1px solid #F1F5F9'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                            width: '28px', height: '28px', borderRadius: '50%',
                            background: `${catStyle.bg}`, display: 'flex',
                            alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem',
                            border: `1px solid ${catStyle.border}`
                        }}>{post.author.avatar}</div>
                        <div>
                            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1E293B' }}>{post.author.name}</div>
                            <div style={{ fontSize: '0.6rem', color: '#94A3B8' }}>{post.date}</div>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.85rem',
                        fontSize: '0.68rem', color: '#94A3B8'
                    }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Eye size={12} /> {post.views}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Heart size={12} /> {post.likes}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><MessageCircle size={12} /> {post.comments}</span>
                        <div style={{
                            background: hovered ? '#2563EB' : '#F1F5F9',
                            borderRadius: '50%', width: '28px', height: '28px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s'
                        }}>
                            <ArrowRight size={13} color={hovered ? 'white' : '#94A3B8'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Blog() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);

    const filtered = posts.filter(p => {
        const matchesCat = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });

    const featuredPosts = posts.filter(p => p.featured);
    const regularPosts = filtered.filter(p => !p.featured || activeCategory !== 'All');

    return (
        <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#F8FAFC', minHeight: '100vh' }}>
            {/* Hero */}
            <section style={{
                background: 'linear-gradient(135deg, #1D4ED8 0%, #1E3A8A 30%, #172554 65%, #0F172A 100%)',
                padding: '6rem 2rem 4.5rem', textAlign: 'center', color: 'white',
                position: 'relative', overflow: 'hidden'
            }}>
                {/* Animated grid pattern */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.06,
                    backgroundImage: 'radial-gradient(circle at 15% 45%, white 1px, transparent 1px), radial-gradient(circle at 85% 25%, white 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
                {/* Decorative blobs */}
                <div style={{
                    position: 'absolute', top: '-80px', right: '-60px', width: '300px', height: '300px',
                    borderRadius: '50%', background: 'rgba(59,130,246,0.15)', filter: 'blur(60px)'
                }} />
                <div style={{
                    position: 'absolute', bottom: '-60px', left: '10%', width: '250px', height: '250px',
                    borderRadius: '50%', background: 'rgba(147,197,253,0.08)', filter: 'blur(50px)'
                }} />

                <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                            background: 'rgba(255,255,255,0.12)', padding: '0.35rem 1rem',
                            borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700,
                            backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)'
                        }}>📚 Expert Insights</span>
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                            background: 'rgba(16,185,129,0.2)', padding: '0.35rem 0.9rem',
                            borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700,
                            border: '1px solid rgba(16,185,129,0.3)', color: '#A7F3D0'
                        }}>Updated Weekly</span>
                    </div>
                    <h1 style={{
                        fontSize: '3rem', fontWeight: 800, margin: '0 0 0.6rem', lineHeight: 1.15,
                        background: 'linear-gradient(90deg, #93C5FD, #BFDBFE, #DBEAFE)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Career Blog
                    </h1>
                    <p style={{ fontSize: '1.05rem', opacity: 0.75, marginBottom: '2rem', lineHeight: 1.7, fontWeight: 400 }}>
                        Expert tips, guides, and insights to help you land your dream job
                    </p>

                    {/* Search */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.6rem',
                        background: searchFocused ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                        borderRadius: '14px', padding: '0.7rem 1.2rem', maxWidth: '480px', margin: '0 auto',
                        backdropFilter: 'blur(12px)',
                        border: searchFocused ? '1.5px solid rgba(255,255,255,0.35)' : '1.5px solid rgba(255,255,255,0.15)',
                        transition: 'all 0.3s', boxShadow: searchFocused ? '0 8px 30px rgba(0,0,0,0.15)' : 'none'
                    }}>
                        <Search size={18} style={{ opacity: 0.6, flexShrink: 0 }} />
                        <input
                            type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                            placeholder="Search articles, tips, guides..."
                            style={{
                                background: 'transparent', border: 'none', outline: 'none',
                                color: 'white', fontSize: '0.88rem', flex: 1, fontFamily: 'inherit',
                            }}
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} style={{
                                background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
                                width: '24px', height: '24px', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', cursor: 'pointer', flexShrink: 0
                            }}>
                                <X size={12} color="white" />
                            </button>
                        )}
                    </div>

                    {/* Quick stats */}
                    <div style={{
                        display: 'flex', justifyContent: 'center', gap: '2.5rem', marginTop: '2rem'
                    }}>
                        {[
                            { num: '120+', label: 'Articles' },
                            { num: '50K+', label: 'Readers' },
                            { num: '4.9', label: 'Avg Rating' },
                        ].map((s, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>{s.num}</div>
                                <div style={{ fontSize: '0.68rem', opacity: 0.5, marginTop: '0.1rem', fontWeight: 500 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Bar */}
            <section style={{ maxWidth: '1000px', margin: '-1.5rem auto 0', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
                <div style={{
                    display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
                    background: 'white', borderRadius: '16px', padding: '0.6rem 1.25rem',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0'
                }}>
                    <Filter size={15} color="#94A3B8" style={{ marginRight: '0.3rem' }} />
                    {categories.map(cat => {
                        const isActive = activeCategory === cat;
                        const catStyle = categoryColors[cat] || {};
                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    padding: '0.45rem 1.1rem', borderRadius: '10px', border: 'none',
                                    background: isActive
                                        ? (cat === 'All' ? 'linear-gradient(135deg, #1D4ED8, #2563EB)' : catStyle.bg || '#EFF6FF')
                                        : '#F8FAFC',
                                    color: isActive
                                        ? (cat === 'All' ? 'white' : catStyle.color || '#2563EB')
                                        : '#64748B',
                                    fontWeight: isActive ? 700 : 600, fontSize: '0.78rem', cursor: 'pointer',
                                    transition: 'all 0.2s', fontFamily: 'inherit',
                                    border: isActive && cat !== 'All' ? `1px solid ${catStyle.border || '#BFDBFE'}` : '1px solid transparent',
                                    boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
                                }}
                            >{cat}</button>
                        );
                    })}
                </div>
            </section>

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
                {/* Featured Posts */}
                {activeCategory === 'All' && !searchQuery && (
                    <section style={{ marginTop: '2.5rem' }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem'
                        }}>
                            <h2 style={{
                                fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', margin: 0,
                                display: 'flex', alignItems: 'center', gap: '0.5rem'
                            }}>
                                <span style={{
                                    background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
                                    padding: '0.35rem', borderRadius: '8px', display: 'inline-flex',
                                    border: '1px solid #BFDBFE'
                                }}>
                                    <TrendingUp size={18} color="#2563EB" />
                                </span>
                                Featured Articles
                            </h2>
                            <span style={{
                                fontSize: '0.75rem', fontWeight: 600, color: '#2563EB',
                                display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer'
                            }}>
                                View all <ChevronRight size={14} />
                            </span>
                        </div>

                        <div style={{
                            display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem'
                        }}>
                            {featuredPosts.map((post, i) => (
                                <FeaturedCard key={i} post={post} isLarge={i === 0} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Main content – two-column layout */}
                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem',
                    marginTop: '2.5rem', alignItems: 'start'
                }}>
                    {/* Article list */}
                    <section>
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem'
                        }}>
                            <h2 style={{
                                fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', margin: 0,
                                display: 'flex', alignItems: 'center', gap: '0.5rem'
                            }}>
                                <span style={{
                                    background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
                                    padding: '0.35rem', borderRadius: '8px', display: 'inline-flex',
                                    border: '1px solid #BFDBFE'
                                }}>
                                    <BookOpen size={18} color="#2563EB" />
                                </span>
                                {activeCategory === 'All' ? 'Latest Articles' : activeCategory}
                                <span style={{
                                    fontSize: '0.7rem', color: '#94A3B8', fontWeight: 500,
                                    background: '#F1F5F9', padding: '0.15rem 0.5rem', borderRadius: '100px'
                                }}>
                                    {(activeCategory === 'All' ? regularPosts : filtered).length}
                                </span>
                            </h2>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {(activeCategory === 'All' ? regularPosts : filtered).map((post, i) => (
                                <ArticleCard key={i} post={post} />
                            ))}
                        </div>

                        {(activeCategory === 'All' ? regularPosts : filtered).length === 0 && (
                            <div style={{
                                textAlign: 'center', padding: '4rem 2rem', color: '#94A3B8',
                                background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0'
                            }}>
                                <BookOpen size={48} style={{ marginBottom: '0.75rem', opacity: 0.4 }} />
                                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#475569' }}>No articles found</div>
                                <div style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>Try a different category or search term</div>
                            </div>
                        )}
                    </section>

                    {/* Sidebar */}
                    <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'sticky', top: '2rem' }}>
                        {/* Newsletter */}
                        <div style={{
                            background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #3B82F6 100%)',
                            borderRadius: '16px', padding: '1.75rem', color: 'white', position: 'relative', overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px',
                                borderRadius: '50%', background: 'rgba(255,255,255,0.08)', filter: 'blur(20px)'
                            }} />
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✉️</div>
                                <div style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.3rem' }}>Stay Updated</div>
                                <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '1rem', lineHeight: 1.5 }}>
                                    Get weekly career tips and job search strategies delivered to your inbox.
                                </div>
                                <input type="email" placeholder="Your email address"
                                    style={{
                                        width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px',
                                        border: '1.5px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.12)',
                                        color: 'white', fontSize: '0.8rem', fontFamily: 'inherit', outline: 'none',
                                        marginBottom: '0.6rem', boxSizing: 'border-box', backdropFilter: 'blur(4px)'
                                    }}
                                />
                                <button style={{
                                    width: '100%', padding: '0.65rem', borderRadius: '10px', border: 'none',
                                    background: 'white', color: '#1D4ED8', fontWeight: 700, fontSize: '0.82rem',
                                    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                }}>Subscribe Free →</button>
                            </div>
                        </div>

                        {/* Popular Tags */}
                        <div style={{
                            background: 'white', borderRadius: '16px', padding: '1.5rem',
                            border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                        }}>
                            <div style={{
                                fontSize: '0.88rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.85rem',
                                display: 'flex', alignItems: 'center', gap: '0.35rem'
                            }}>
                                🏷️ Popular Tags
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                {popularTags.map((tag, i) => (
                                    <span key={i} style={{
                                        fontSize: '0.7rem', fontWeight: 600, color: '#475569',
                                        background: '#F8FAFC', padding: '0.3rem 0.7rem', borderRadius: '8px',
                                        border: '1px solid #E2E8F0', cursor: 'pointer', transition: 'all 0.2s'
                                    }}
                                        onMouseOver={e => { e.currentTarget.style.background = '#EFF6FF'; e.currentTarget.style.color = '#2563EB'; e.currentTarget.style.borderColor = '#BFDBFE'; }}
                                        onMouseOut={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
                                    >#{tag}</span>
                                ))}
                            </div>
                        </div>

                        {/* Top Authors */}
                        <div style={{
                            background: 'white', borderRadius: '16px', padding: '1.5rem',
                            border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                        }}>
                            <div style={{
                                fontSize: '0.88rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.85rem',
                                display: 'flex', alignItems: 'center', gap: '0.35rem'
                            }}>
                                ✍️ Top Writers
                            </div>
                            {authors.slice(0, 4).map((author, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                                    padding: '0.55rem 0',
                                    borderBottom: i < 3 ? '1px solid #F1F5F9' : 'none',
                                    cursor: 'pointer', transition: 'all 0.15s'
                                }}>
                                    <div style={{
                                        width: '34px', height: '34px', borderRadius: '50%',
                                        background: '#F1F5F9', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', fontSize: '1rem', flexShrink: 0,
                                        border: '1px solid #E2E8F0'
                                    }}>{author.avatar}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1E293B' }}>{author.name}</div>
                                        <div style={{ fontSize: '0.65rem', color: '#94A3B8' }}>{author.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Reading Stats */}
                        <div style={{
                            background: 'linear-gradient(135deg, #F0FDF4, #ECFDF5)', borderRadius: '16px',
                            padding: '1.5rem', border: '1px solid #A7F3D0'
                        }}>
                            <div style={{
                                fontSize: '0.88rem', fontWeight: 700, color: '#166534', marginBottom: '0.75rem',
                                display: 'flex', alignItems: 'center', gap: '0.35rem'
                            }}>
                                📊 This Month
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                {[
                                    { num: '12', label: 'New Articles' },
                                    { num: '23K', label: 'Total Reads' },
                                    { num: '1.2K', label: 'New Subscribers' },
                                    { num: '4.9★', label: 'Reader Rating' },
                                ].map((stat, i) => (
                                    <div key={i} style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669' }}>{stat.num}</div>
                                        <div style={{ fontSize: '0.6rem', color: '#047857', fontWeight: 600 }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <div style={{ height: '3rem' }} />
        </div>
    );
}
