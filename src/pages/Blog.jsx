import React, { useState } from 'react';
import { Search, Clock, ArrowRight, Tag, TrendingUp, BookOpen, User } from 'lucide-react';

const categories = ['All', 'Career Tips', 'Resume Guide', 'Interview Prep', 'Job Search', 'Workplace'];

const posts = [
    {
        title: 'How to Write a Resume That Gets You Hired in 2025',
        excerpt: 'Learn the top strategies hiring managers look for in a modern resume, from ATS keywords to formatting best practices.',
        category: 'Resume Guide', readTime: '5 min read',
        date: 'Feb 20, 2025', featured: true
    },
    {
        title: '10 Common Interview Questions and How to Answer Them',
        excerpt: 'Master the most frequently asked interview questions with expert-crafted responses and frameworks.',
        category: 'Interview Prep', readTime: '8 min read',
        date: 'Feb 18, 2025', featured: true
    },
    {
        title: 'Remote Work: Best Practices for Staying Productive',
        excerpt: 'Discover proven techniques to maintain focus and productivity while working from home.',
        category: 'Workplace', readTime: '4 min read',
        date: 'Feb 15, 2025', featured: false
    },
    {
        title: 'Top Skills Employers Are Looking For in 2025',
        excerpt: 'Stay ahead of the curve by developing the skills that are in highest demand across industries.',
        category: 'Career Tips', readTime: '6 min read',
        date: 'Feb 12, 2025', featured: false
    },
    {
        title: 'How to Negotiate Your Salary: A Complete Guide',
        excerpt: 'Get the compensation you deserve with these proven salary negotiation strategies and scripts.',
        category: 'Career Tips', readTime: '7 min read',
        date: 'Feb 10, 2025', featured: false
    },
    {
        title: 'Cover Letter vs Resume: What\'s the Difference?',
        excerpt: 'Understand when and why you need both, and how to make each document work in your favor.',
        category: 'Resume Guide', readTime: '4 min read',
        date: 'Feb 8, 2025', featured: false
    },
    {
        title: 'How to Find Hidden Job Opportunities',
        excerpt: 'Most jobs are never posted online. Learn how to tap into the hidden job market effectively.',
        category: 'Job Search', readTime: '5 min read',
        date: 'Feb 5, 2025', featured: false
    },
    {
        title: 'Building a Personal Brand on LinkedIn',
        excerpt: 'Optimize your LinkedIn profile and activity to attract recruiters and opportunities.',
        category: 'Job Search', readTime: '6 min read',
        date: 'Feb 3, 2025', featured: false
    },
];

const categoryColors = {
    'Resume Guide': '#2563EB',
    'Interview Prep': '#7C3AED',
    'Career Tips': '#059669',
    'Workplace': '#EA580C',
    'Job Search': '#0891B2',
};

export default function Blog() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = posts.filter(p => {
        const matchesCat = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });

    const featuredPosts = posts.filter(p => p.featured);
    const regularPosts = filtered.filter(p => !p.featured || activeCategory !== 'All');

    return (
        <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#FAFBFC', minHeight: '100vh' }}>
            {/* Hero */}
            <section style={{
                background: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 50%, #3B82F6 100%)',
                padding: '4rem 2rem 3rem', textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1,
                    backgroundImage: 'radial-gradient(circle at 15% 45%, white 1px, transparent 1px), radial-gradient(circle at 85% 25%, white 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: 800, margin: '0.5rem 0', lineHeight: 1.15 }}>
                        Career Blog
                    </h1>
                    <p style={{ fontSize: '1.15rem', opacity: 0.9, marginBottom: '1.5rem', lineHeight: 1.6 }}>
                        Expert tips, guides, and insights to help you land your dream job
                    </p>
                    {/* Search */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        background: 'rgba(255,255,255,0.15)', borderRadius: '12px',
                        padding: '0.5rem 1rem', maxWidth: '400px', margin: '0 auto',
                        backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <Search size={18} style={{ opacity: 0.7 }} />
                        <input
                            type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search articles..."
                            style={{
                                background: 'transparent', border: 'none', outline: 'none',
                                color: 'white', fontSize: '0.9rem', flex: 1, fontFamily: 'inherit',
                                '::placeholder': { color: 'rgba(255,255,255,0.6)' }
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section style={{ maxWidth: '900px', margin: '-1.5rem auto 0', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
                <div style={{
                    display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center',
                    background: 'white', borderRadius: '14px', padding: '0.75rem 1rem',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0'
                }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '0.45rem 1rem', borderRadius: '8px', border: 'none',
                                background: activeCategory === cat ? 'linear-gradient(135deg, #2563EB, #3B82F6)' : 'transparent',
                                color: activeCategory === cat ? 'white' : '#64748B',
                                fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer',
                                transition: 'all 0.2s', fontFamily: 'inherit'
                            }}
                        >{cat}</button>
                    ))}
                </div>
            </section>

            {/* Featured Posts */}
            {activeCategory === 'All' && !searchQuery && (
                <section style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1.5rem' }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1E293B', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <TrendingUp size={20} color="#2563EB" /> Featured Articles
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                        {featuredPosts.map((post, i) => (
                            <div key={i} style={{
                                background: 'white', borderRadius: '14px', padding: '1.5rem',
                                border: '1px solid #E2E8F0', cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.2s',
                                position: 'relative', overflow: 'hidden'
                            }}
                                onMouseOver={e => { e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseOut={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                                    background: `linear-gradient(90deg, ${categoryColors[post.category] || '#2563EB'}, ${categoryColors[post.category] || '#2563EB'}88)`
                                }} />
                                <span style={{
                                    display: 'inline-block', fontSize: '0.65rem', fontWeight: 700,
                                    color: categoryColors[post.category] || '#2563EB',
                                    background: `${categoryColors[post.category] || '#2563EB'}12`,
                                    padding: '0.2rem 0.6rem', borderRadius: '100px', marginBottom: '0.75rem'
                                }}>{post.category}</span>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1E293B', margin: '0 0 0.5rem', lineHeight: 1.4 }}>
                                    {post.title}
                                </h3>
                                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                                    {post.excerpt}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', fontSize: '0.7rem', color: '#94A3B8' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <Clock size={12} /> {post.readTime}
                                    </span>
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* All Posts */}
            <section style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1.5rem 3rem' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1E293B', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <BookOpen size={20} color="#2563EB" /> {activeCategory === 'All' ? 'Latest Articles' : activeCategory}
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}>({(activeCategory === 'All' ? regularPosts : filtered).length})</span>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {(activeCategory === 'All' ? regularPosts : filtered).map((post, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '1.25rem',
                            background: 'white', borderRadius: '12px', padding: '1.25rem 1.5rem',
                            border: '1px solid #E2E8F0', cursor: 'pointer', transition: 'all 0.2s'
                        }}
                            onMouseOver={e => { e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = '#CBD5E1'; }}
                            onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
                        >
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                                    <span style={{
                                        fontSize: '0.6rem', fontWeight: 700,
                                        color: categoryColors[post.category] || '#2563EB',
                                        background: `${categoryColors[post.category] || '#2563EB'}12`,
                                        padding: '0.15rem 0.5rem', borderRadius: '100px'
                                    }}>{post.category}</span>
                                    <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{post.date}</span>
                                </div>
                                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1E293B', margin: '0 0 0.3rem' }}>
                                    {post.title}
                                </h3>
                                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                                    {post.excerpt}
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                                <span style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <Clock size={12} /> {post.readTime}
                                </span>
                                <ArrowRight size={16} color="#CBD5E1" />
                            </div>
                        </div>
                    ))}
                </div>
                {(activeCategory === 'All' ? regularPosts : filtered).length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
                        <BookOpen size={40} style={{ marginBottom: '0.5rem' }} />
                        <div style={{ fontWeight: 600 }}>No articles found</div>
                        <div style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>Try a different category or search term</div>
                    </div>
                )}
            </section>
        </div>
    );
}
