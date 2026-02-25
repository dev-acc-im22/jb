import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Wand2, Download, CheckCircle, ArrowRight, Star, Upload, Eye, Palette, LayoutTemplate, ChevronRight, X, Plus } from 'lucide-react';

const templates = [
    { name: 'Modern Professional', color: '#2563EB', tag: 'Popular', preview: 'Clean lines, modern typography' },
    { name: 'Creative Designer', color: '#7C3AED', tag: 'New', preview: 'Bold colors, unique layouts' },
    { name: 'Executive Classic', color: '#059669', tag: 'Premium', preview: 'Timeless elegance, traditional' },
    { name: 'Minimalist', color: '#0891B2', tag: null, preview: 'Less is more, whitespace' },
    { name: 'Tech Starter', color: '#EA580C', tag: 'Hot', preview: 'ATS-friendly, developer focused' },
];

const steps = [
    { icon: <LayoutTemplate size={24} />, title: 'Pick a Template', desc: 'Choose from 20+ ATS-friendly templates', num: '01' },
    { icon: <FileText size={24} />, title: 'Fill Your Details', desc: 'AI auto-fills sections from your profile', num: '02' },
    { icon: <Wand2 size={24} />, title: 'AI Enhances It', desc: 'Smart suggestions for better wording', num: '03' },
    { icon: <Download size={24} />, title: 'Download PDF', desc: 'Export in PDF, DOCX, or share a link', num: '04' },
];

function TemplatePreview({ color, name }) {
    const dummyData = {
        name: 'John Doe',
        role: 'Software Engineer',
        email: 'john@email.com',
        summary: 'Results-driven software engineer with 3+ years of experience building scalable applications.',
        expCompany: 'TechNova',
        expRole: 'Senior Dev',
        expDate: '2021-Present',
        expDesc1: 'Led team of 5 engineers to deliver APIs.',
        expDesc2: 'Improved system performance by 40%.',
        eduDegree: 'B.S. Computer Science',
        eduSchool: 'State University',
        eduDate: '2017-2021'
    };

    const containerStyle = {
        width: '100%', height: '180px', borderRadius: '10px', overflow: 'hidden',
        background: 'white', border: `1px solid ${color}30`, position: 'relative',
        boxSizing: 'border-box', fontFamily: 'sans-serif'
    };

    if (name === 'Modern Professional') {
        return (
            <div style={{ ...containerStyle, padding: '12px 14px' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: color }} />
                <div style={{ paddingLeft: '8px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1E293B', marginBottom: '2px' }}>{dummyData.name}</div>
                    <div style={{ fontSize: '0.45rem', color: '#94A3B8', marginBottom: '8px' }}>{dummyData.role} • {dummyData.email}</div>
                    <div style={{ height: '1px', background: '#F1F5F9', marginBottom: '6px' }} />
                    <div style={{ fontSize: '0.5rem', fontWeight: 700, color: color, textTransform: 'uppercase', marginBottom: '3px' }}>Professional Summary</div>
                    <div style={{ fontSize: '0.45rem', color: '#64748B', lineHeight: 1.3, marginBottom: '8px' }}>{dummyData.summary}</div>
                    <div style={{ fontSize: '0.5rem', fontWeight: 700, color: color, textTransform: 'uppercase', marginBottom: '3px' }}>Experience</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <div style={{ fontSize: '0.5rem', fontWeight: 700, color: '#1E293B' }}>{dummyData.expRole}</div>
                        <div style={{ fontSize: '0.45rem', color: '#94A3B8' }}>{dummyData.expDate}</div>
                    </div>
                    <div style={{ fontSize: '0.45rem', color: '#1E293B', marginBottom: '2px' }}>{dummyData.expCompany}</div>
                    <div style={{ fontSize: '0.45rem', color: '#64748B', lineHeight: 1.3 }}>• {dummyData.expDesc1}<br />• {dummyData.expDesc2}</div>
                </div>
            </div>
        );
    }

    if (name === 'Creative Designer') {
        return (
            <div style={{ ...containerStyle, display: 'flex' }}>
                <div style={{ width: '35%', background: `${color}10`, padding: '10px 8px', height: '100%' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '15px', background: color, margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 'bold' }}>JD</div>
                    <div style={{ fontSize: '0.45rem', fontWeight: 700, color: color, textTransform: 'uppercase', marginBottom: '4px', marginTop: '12px' }}>Contact</div>
                    <div style={{ fontSize: '0.4rem', color: '#475569', marginBottom: '2px' }}>{dummyData.email}</div>
                    <div style={{ fontSize: '0.4rem', color: '#475569' }}>New York, NY</div>
                </div>
                <div style={{ width: '65%', padding: '12px 10px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1E293B', marginBottom: '2px' }}>{dummyData.name}</div>
                    <div style={{ fontSize: '0.5rem', color: color, fontWeight: 600, marginBottom: '8px' }}>{dummyData.role}</div>
                    <div style={{ fontSize: '0.45rem', color: '#64748B', lineHeight: 1.3, marginBottom: '8px' }}>{dummyData.summary}</div>
                    <div style={{ height: '1px', background: '#E2E8F0', marginBottom: '6px' }} />
                    <div style={{ fontSize: '0.5rem', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>EXPERIENCE</div>
                    <div style={{ fontSize: '0.45rem', fontWeight: 600, color: '#1E293B' }}>{dummyData.expRole}</div>
                    <div style={{ fontSize: '0.4rem', color: color, marginBottom: '2px' }}>{dummyData.expCompany} | {dummyData.expDate}</div>
                    <div style={{ fontSize: '0.4rem', color: '#64748B', lineHeight: 1.3 }}>• {dummyData.expDesc1}</div>
                </div>
            </div>
        );
    }

    if (name === 'Executive Classic') {
        return (
            <div style={{ ...containerStyle, padding: '12px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1E293B', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '1px' }}>{dummyData.name}</div>
                <div style={{ fontSize: '0.45rem', color: '#64748B', marginBottom: '6px' }}>{dummyData.email} | New York, NY | (555) 123-4567</div>
                <div style={{ height: '2px', background: color, width: '100%', marginBottom: '8px' }} />
                <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.5rem', fontWeight: 800, color: '#1E293B', borderBottom: '1px solid #E2E8F0', paddingBottom: '2px', marginBottom: '4px' }}>EXECUTIVE SUMMARY</div>
                    <div style={{ fontSize: '0.45rem', color: '#475569', lineHeight: 1.4, marginBottom: '8px' }}>{dummyData.summary}</div>
                    <div style={{ fontSize: '0.5rem', fontWeight: 800, color: '#1E293B', borderBottom: '1px solid #E2E8F0', paddingBottom: '2px', marginBottom: '4px' }}>PROFESSIONAL EXPERIENCE</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <div style={{ fontSize: '0.5rem', fontWeight: 700, color: '#1E293B' }}>{dummyData.expCompany}</div>
                        <div style={{ fontSize: '0.45rem', fontWeight: 600, color: '#1E293B' }}>{dummyData.expDate}</div>
                    </div>
                    <div style={{ fontSize: '0.45rem', fontStyle: 'italic', color: '#475569', marginBottom: '2px' }}>{dummyData.expRole}</div>
                    <div style={{ fontSize: '0.45rem', color: '#475569', lineHeight: 1.3 }}>• {dummyData.expDesc1}</div>
                </div>
            </div>
        );
    }

    if (name === 'Minimalist') {
        return (
            <div style={{ ...containerStyle, padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 300, color: '#0F172A', letterSpacing: '-0.5px' }}>{dummyData.name}</div>
                    <div style={{ fontSize: '0.4rem', color: '#94A3B8', textAlign: 'right' }}>{dummyData.email}<br />{dummyData.role}</div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '25%', fontSize: '0.45rem', fontWeight: 600, color: color, textTransform: 'lowercase' }}>profile</div>
                    <div style={{ width: '75%', fontSize: '0.45rem', color: '#64748B', lineHeight: 1.4 }}>{dummyData.summary}</div>
                </div>
                <div style={{ height: '1px', background: '#F1F5F9', margin: '8px 0' }} />
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '25%', fontSize: '0.45rem', fontWeight: 600, color: color, textTransform: 'lowercase' }}>experience</div>
                    <div style={{ width: '75%' }}>
                        <div style={{ fontSize: '0.5rem', fontWeight: 600, color: '#1E293B' }}>{dummyData.expRole}</div>
                        <div style={{ fontSize: '0.45rem', color: '#94A3B8', marginBottom: '4px' }}>{dummyData.expCompany}, {dummyData.expDate}</div>
                        <div style={{ fontSize: '0.45rem', color: '#64748B', lineHeight: 1.3 }}>• {dummyData.expDesc1}</div>
                    </div>
                </div>
            </div>
        );
    }

    // Tech Starter
    return (
        <div style={{ ...containerStyle, padding: '12px', background: '#1E293B', color: '#E2E8F0', border: `1px solid ${color}` }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white', marginBottom: '2px', fontFamily: 'monospace' }}>{'>'} {dummyData.name}</div>
            <div style={{ fontSize: '0.45rem', color: color, marginBottom: '8px', fontFamily: 'monospace' }}>// {dummyData.role}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <div style={{ background: '#0F172A', padding: '6px', borderRadius: '4px' }}>
                    <div style={{ fontSize: '0.4rem', color: '#64748B', marginBottom: '2px', textTransform: 'uppercase' }}>skills</div>
                    <div style={{ fontSize: '0.45rem', color: '#94A3B8' }}>React, Node, TypeScript, AWS</div>
                </div>
                <div style={{ background: '#0F172A', padding: '6px', borderRadius: '4px' }}>
                    <div style={{ fontSize: '0.4rem', color: '#64748B', marginBottom: '2px', textTransform: 'uppercase' }}>contact</div>
                    <div style={{ fontSize: '0.45rem', color: '#94A3B8' }}>{dummyData.email}</div>
                </div>
            </div>
            <div style={{ fontSize: '0.5rem', fontWeight: 700, color: 'white', borderBottom: '1px solid #334155', paddingBottom: '2px', marginBottom: '4px' }}>EXPERIENCE</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <div style={{ fontSize: '0.5rem', fontWeight: 600, color: color }}>{dummyData.expCompany}</div>
                <div style={{ fontSize: '0.45rem', color: '#64748B' }}>{dummyData.expDate}</div>
            </div>
            <div style={{ fontSize: '0.45rem', color: '#94A3B8', marginBottom: '2px' }}>{dummyData.expRole}</div>
            <div style={{ fontSize: '0.45rem', color: '#CBD5E1', lineHeight: 1.3 }}>- {dummyData.expDesc1}</div>
        </div>
    );
}

function LivePreview({ data, templateColor, templateName }) {
    const containerStyle = {
        background: 'white', borderRadius: '12px', border: '1px solid #E2E8F0',
        height: '100%', minHeight: '380px', position: 'relative', overflow: 'hidden',
        boxSizing: 'border-box', fontFamily: 'sans-serif'
    };

    if (templateName === 'Modern Professional') {
        return (
            <div style={{ ...containerStyle, padding: '1.5rem 1.8rem' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '100%', background: templateColor }} />
                <div style={{ paddingLeft: '12px' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B', marginBottom: '4px' }}>{data.name || 'Your Name'}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '12px' }}>
                        {[data.role || 'Professional Title', data.email, data.phone].filter(Boolean).join(' • ')}
                    </div>

                    <div style={{ height: '1px', background: '#F1F5F9', marginBottom: '10px' }} />

                    {data.summary && (
                        <>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: templateColor, textTransform: 'uppercase', marginBottom: '4px' }}>Professional Summary</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.4, marginBottom: '12px' }}>{data.summary}</div>
                        </>
                    )}

                    {data.experiences.length > 0 && (
                        <>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: templateColor, textTransform: 'uppercase', marginBottom: '6px' }}>Experience</div>
                            {data.experiences.map((exp, i) => (
                                <div key={i} style={{ marginBottom: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1E293B' }}>{exp.title || 'Job Title'}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{exp.startDate || 'Start'} - {exp.currentlyWorking ? 'Present' : (exp.endDate || 'End')}</div>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#1E293B', marginBottom: '4px' }}>{exp.company || 'Company'}{exp.location ? ` | ${exp.location}` : ''}</div>
                                    {exp.description && <div style={{ fontSize: '0.7rem', color: '#64748B', lineHeight: 1.4, whiteSpace: 'pre-line' }}>{exp.description}</div>}
                                </div>
                            ))}
                        </>
                    )}

                    {data.education.length > 0 && (
                        <>
                            <div style={{ height: '1px', background: '#F1F5F9', margin: '10px 0' }} />
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: templateColor, textTransform: 'uppercase', marginBottom: '6px' }}>Education</div>
                            {data.education.map((edu, i) => (
                                <div key={i} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1E293B' }}>{edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{edu.school || 'University'}{edu.gpa ? ` (GPA: ${edu.gpa})` : ''}</div>
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{edu.startYear || 'Start'} - {edu.endYear || 'End'}</div>
                                </div>
                            ))}
                        </>
                    )}

                    {data.skills.length > 0 && (
                        <>
                            <div style={{ height: '1px', background: '#F1F5F9', margin: '10px 0' }} />
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: templateColor, textTransform: 'uppercase', marginBottom: '6px' }}>Skills</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.5 }}>{data.skills.join(', ')}</div>
                        </>
                    )}
                </div>
            </div>
        );
    }

    if (templateName === 'Creative Designer') {
        return (
            <div style={{ ...containerStyle, display: 'flex' }}>
                <div style={{ width: '35%', background: `${templateColor}08`, padding: '1.5rem 1rem', borderRight: `1px solid ${templateColor}20` }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '25px', background: templateColor, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
                        {data.name ? data.name.charAt(0).toUpperCase() : 'Y'}
                    </div>

                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: templateColor, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>Contact</div>
                    <div style={{ fontSize: '0.7rem', color: '#475569', marginBottom: '6px', wordBreak: 'break-all' }}>{data.email || 'Email'}</div>
                    <div style={{ fontSize: '0.7rem', color: '#475569', marginBottom: '6px' }}>{data.phone || 'Phone'}</div>
                    <div style={{ fontSize: '0.7rem', color: '#475569', marginBottom: '16px' }}>{data.location || 'Location'}</div>

                    {data.skills.length > 0 && (
                        <>
                            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: templateColor, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>Skills</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {data.skills.map((skill, i) => (
                                    <div key={i} style={{ fontSize: '0.7rem', color: '#475569' }}>• {skill}</div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <div style={{ width: '65%', padding: '1.5rem 1.25rem' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1E293B', marginBottom: '4px' }}>{data.name || 'Your Name'}</div>
                    <div style={{ fontSize: '0.8rem', color: templateColor, fontWeight: 600, marginBottom: '12px' }}>Professional Title</div>

                    {data.summary && (
                        <div style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.4, marginBottom: '16px' }}>{data.summary}</div>
                    )}

                    {data.experiences.length > 0 && (
                        <>
                            <div style={{ height: '2px', background: '#E2E8F0', marginBottom: '10px' }} />
                            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '10px', letterSpacing: '1px' }}>EXPERIENCE</div>
                            {data.experiences.map((exp, i) => (
                                <div key={i} style={{ marginBottom: '12px' }}>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1E293B' }}>{exp.title || 'Job Title'}</div>
                                    <div style={{ fontSize: '0.7rem', color: templateColor, marginBottom: '4px', fontWeight: 500 }}>
                                        {exp.company || 'Company'} | {exp.startDate || 'Start'} - {exp.currentlyWorking ? 'Present' : (exp.endDate || 'End')}
                                    </div>
                                    {exp.description && <div style={{ fontSize: '0.7rem', color: '#64748B', lineHeight: 1.4, whiteSpace: 'pre-line' }}>{exp.description}</div>}
                                </div>
                            ))}
                        </>
                    )}

                    {data.education.length > 0 && (
                        <>
                            <div style={{ height: '2px', background: '#E2E8F0', marginBottom: '10px' }} />
                            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '10px', letterSpacing: '1px' }}>EDUCATION</div>
                            {data.education.map((edu, i) => (
                                <div key={i} style={{ marginBottom: '8px' }}>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1E293B' }}>{edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}</div>
                                    <div style={{ fontSize: '0.7rem', color: templateColor, marginBottom: '2px' }}>{edu.school || 'University'}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{edu.startYear || 'Start'} - {edu.endYear || 'End'}</div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        );
    }

    if (templateName === 'Executive Classic') {
        return (
            <div style={{ ...containerStyle, padding: '1.5rem 2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1E293B', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '2px' }}>{data.name || 'Your Name'}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '12px' }}>
                    {[data.email, data.location, data.phone].filter(Boolean).join(' | ') || 'Email | Location | Phone'}
                </div>
                <div style={{ height: '3px', background: templateColor, width: '100%', marginBottom: '16px' }} />

                <div style={{ textAlign: 'left' }}>
                    {data.summary && (
                        <>
                            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E293B', borderBottom: '1px solid #E2E8F0', paddingBottom: '4px', marginBottom: '8px', letterSpacing: '1px' }}>EXECUTIVE SUMMARY</div>
                            <div style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.5, marginBottom: '16px' }}>{data.summary}</div>
                        </>
                    )}

                    {data.experiences.length > 0 && (
                        <>
                            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E293B', borderBottom: '1px solid #E2E8F0', paddingBottom: '4px', marginBottom: '10px', letterSpacing: '1px' }}>PROFESSIONAL EXPERIENCE</div>
                            {data.experiences.map((exp, i) => (
                                <div key={i} style={{ marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B' }}>{exp.company || 'Company'}</div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1E293B' }}>{exp.startDate || 'Start'} - {exp.currentlyWorking ? 'Present' : (exp.endDate || 'End')}</div>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', fontStyle: 'italic', color: '#475569', marginBottom: '6px' }}>{exp.title || 'Job Title'}{exp.location ? ` - ${exp.location}` : ''}</div>
                                    {exp.description && <div style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.4, whiteSpace: 'pre-line' }}>{exp.description}</div>}
                                </div>
                            ))}
                        </>
                    )}

                    {data.education.length > 0 && (
                        <>
                            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E293B', borderBottom: '1px solid #E2E8F0', paddingBottom: '4px', marginBottom: '10px', marginTop: '16px', letterSpacing: '1px' }}>EDUCATION</div>
                            {data.education.map((edu, i) => (
                                <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <div>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1E293B' }}>{edu.school || 'University'}</span>
                                        <span style={{ fontSize: '0.75rem', color: '#475569' }}> - {edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}</span>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#475569' }}>{edu.startYear || 'Start'} - {edu.endYear || 'End'}</div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        );
    }

    if (templateName === 'Minimalist') {
        return (
            <div style={{ ...containerStyle, padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 300, color: '#0F172A', letterSpacing: '-0.5px' }}>{data.name || 'Your Name'}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94A3B8', textAlign: 'right', lineHeight: 1.4 }}>
                        {data.email || 'Email'}<br />
                        {data.phone || 'Phone'}<br />
                        {data.location || 'Location'}
                    </div>
                </div>

                {data.summary && (
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
                        <div style={{ width: '20%', fontSize: '0.75rem', fontWeight: 600, color: templateColor, textTransform: 'lowercase' }}>profile</div>
                        <div style={{ width: '80%', fontSize: '0.75rem', color: '#64748B', lineHeight: 1.5 }}>{data.summary}</div>
                    </div>
                )}

                <div style={{ height: '1px', background: '#F1F5F9', margin: '16px 0' }} />

                {data.experiences.length > 0 && (
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
                        <div style={{ width: '20%', fontSize: '0.75rem', fontWeight: 600, color: templateColor, textTransform: 'lowercase' }}>experience</div>
                        <div style={{ width: '80%' }}>
                            {data.experiences.map((exp, i) => (
                                <div key={i} style={{ marginBottom: '16px' }}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B' }}>{exp.title || 'Job Title'}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '6px' }}>{exp.company || 'Company'}, {exp.startDate || 'Start'} - {exp.currentlyWorking ? 'Present' : (exp.endDate || 'End')}</div>
                                    {exp.description && <div style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.4, whiteSpace: 'pre-line' }}>{exp.description}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {data.education.length > 0 && (
                    <>
                        <div style={{ height: '1px', background: '#F1F5F9', margin: '16px 0' }} />
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ width: '20%', fontSize: '0.75rem', fontWeight: 600, color: templateColor, textTransform: 'lowercase' }}>education</div>
                            <div style={{ width: '80%' }}>
                                {data.education.map((edu, i) => (
                                    <div key={i} style={{ marginBottom: '12px' }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B' }}>{edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{edu.school || 'University'}, {edu.startYear || 'Start'} - {edu.endYear || 'End'}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }

    // Tech Starter
    return (
        <div style={{ ...containerStyle, padding: '1.5rem', background: '#0F172A', color: '#E2E8F0', border: `2px solid ${templateColor}50` }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'white', marginBottom: '4px', fontFamily: 'monospace' }}>
                <span style={{ color: templateColor }}>{'>'}</span> {data.name || 'Your Name'}
            </div>
            <div style={{ fontSize: '0.75rem', color: templateColor, marginBottom: '16px', fontFamily: 'monospace', opacity: 0.9 }}>
                // Professional Title
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div style={{ background: '#1E293B', padding: '12px', borderRadius: '6px', borderLeft: `2px solid ${templateColor}` }}>
                    <div style={{ fontSize: '0.65rem', color: '#94A3B8', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>contact</div>
                    <div style={{ fontSize: '0.75rem', color: '#E2E8F0', fontFamily: 'monospace' }}>
                        {data.email || 'Email'}<br />
                        {data.phone || 'Phone'}<br />
                        {data.location || 'Location'}
                    </div>
                </div>
                <div style={{ background: '#1E293B', padding: '12px', borderRadius: '6px', borderLeft: `2px solid ${templateColor}` }}>
                    <div style={{ fontSize: '0.65rem', color: '#94A3B8', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>skills</div>
                    <div style={{ fontSize: '0.75rem', color: '#E2E8F0', fontFamily: 'monospace', lineHeight: 1.4 }}>
                        {data.skills.join(', ') || 'Your skills'}
                    </div>
                </div>
            </div>

            {data.summary && (
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white', borderBottom: '1px solid #334155', paddingBottom: '4px', marginBottom: '8px', letterSpacing: '1px' }}>SUMMARY</div>
                    <div style={{ fontSize: '0.75rem', color: '#CBD5E1', lineHeight: 1.5 }}>{data.summary}</div>
                </div>
            )}

            {data.experiences.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white', borderBottom: '1px solid #334155', paddingBottom: '4px', marginBottom: '12px', letterSpacing: '1px' }}>EXPERIENCE</div>
                    {data.experiences.map((exp, i) => (
                        <div key={i} style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', alignItems: 'baseline' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: templateColor }}>{exp.company || 'Company'}</div>
                                <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'monospace' }}>{exp.startDate || 'Start'} - {exp.currentlyWorking ? 'Present' : (exp.endDate || 'End')}</div>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#E2E8F0', marginBottom: '6px' }}>{exp.title || 'Job Title'}</div>
                            {exp.description && <div style={{ fontSize: '0.75rem', color: '#94A3B8', lineHeight: 1.4, whiteSpace: 'pre-line' }}>{exp.description}</div>}
                        </div>
                    ))}
                </div>
            )}

            {data.education.length > 0 && (
                <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white', borderBottom: '1px solid #334155', paddingBottom: '4px', marginBottom: '10px', letterSpacing: '1px' }}>EDUCATION</div>
                    {data.education.map((edu, i) => (
                        <div key={i} style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', alignItems: 'baseline' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#E2E8F0' }}>{edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}</div>
                                <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'monospace' }}>{edu.startYear || 'Start'} - {edu.endYear || 'End'}</div>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: templateColor }}>{edu.school || 'University'}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function ResumeBuilder() {
    const [selectedTemplate, setSelectedTemplate] = useState(0);
    const [activeSection, setActiveSection] = useState('personal');
    const [formData, setFormData] = useState({
        name: 'Allen', email: 'informationmania22@gmail.com', phone: '09150860014', location: 'Chennai', linkedin: 'dfndfndn.com', portfolio: 'bdfndnd.com',
        summary: '',
        skills: ['JavaScript', 'React', 'Python', 'SQL', 'Git'],
        experiences: [
            { title: 'Software Engineer', company: 'Company Name', startDate: '2023-01', endDate: '', currentlyWorking: true, location: '', description: 'Describe your role and achievements...' }
        ],
        education: [
            { degree: 'Bachelor of Technology', school: 'University Name', field: '', startYear: '', endYear: '', gpa: '' }
        ]
    });
    const [newSkill, setNewSkill] = useState('');

    const sections = [
        { id: 'personal', label: 'Personal Info', icon: '👤' },
        { id: 'experience', label: 'Experience', icon: '💼' },
        { id: 'education', label: 'Education', icon: '🎓' },
        { id: 'skills', label: 'Skills', icon: '⚡' },
        { id: 'summary', label: 'Summary', icon: '📝' },
    ];

    const currentSectionIndex = sections.findIndex(s => s.id === activeSection);
    const goToNextSection = () => {
        if (currentSectionIndex < sections.length - 1) setActiveSection(sections[currentSectionIndex + 1].id);
    };
    const goToPrevSection = () => {
        if (currentSectionIndex > 0) setActiveSection(sections[currentSectionIndex - 1].id);
    };

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateExperience = (index, field, value) => {
        setFormData(prev => {
            const updated = [...prev.experiences];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, experiences: updated };
        });
    };

    const updateEducation = (index, field, value) => {
        setFormData(prev => {
            const updated = [...prev.education];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, education: updated };
        });
    };

    const addSkill = () => {
        if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
            setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
            setNewSkill('');
        }
    };

    const removeSkill = (skill) => {
        setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
    };

    const addExperience = () => {
        setFormData(prev => ({
            ...prev,
            experiences: [...prev.experiences, { title: '', company: '', startDate: '', endDate: '', currentlyWorking: false, location: '', description: '' }]
        }));
    };

    const deleteExperience = (index) => {
        setFormData(prev => ({ ...prev, experiences: prev.experiences.filter((_, i) => i !== index) }));
    };

    const addEducation = () => {
        setFormData(prev => ({
            ...prev,
            education: [...prev.education, { degree: '', school: '', field: '', startYear: '', endYear: '', gpa: '' }]
        }));
    };

    const deleteEducation = (index) => {
        setFormData(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));
    };

    const templateColor = templates[selectedTemplate].color;

    return (
        <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#FAFBFC', minHeight: '100vh' }}>
            {/* Hero */}
            <section style={{
                background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 30%, #2563EB 70%, #3B82F6 100%)',
                padding: '5rem 2rem 4.5rem', textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.08,
                    backgroundImage: 'radial-gradient(circle at 20% 50%, white 1.5px, transparent 1.5px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
                    <span style={{
                        display: 'inline-block', background: 'rgba(255,255,255,0.15)', padding: '0.35rem 1.2rem',
                        borderRadius: '100px', fontSize: '0.78rem', fontWeight: 700, marginBottom: '1.2rem',
                        backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)'
                    }}>✨ 100% FREE</span>
                    <h1 style={{ fontSize: '3.2rem', fontWeight: 800, margin: '0.5rem 0', lineHeight: 1.1, color: 'white' }}>
                        AI Resume Builder
                    </h1>
                    <p style={{ fontSize: '1.15rem', opacity: 0.85, lineHeight: 1.7, maxWidth: '600px', margin: '0.8rem auto 2.5rem' }}>
                        Build a professional, ATS-optimized resume in minutes. Choose a template, fill in your details, and let AI do the heavy lifting.
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                        <button style={{
                            background: 'white', color: '#2563EB', border: 'none', padding: '0.85rem 2.2rem',
                            borderRadius: '12px', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.15)', transition: 'transform 0.2s',
                            display: 'flex', alignItems: 'center', gap: '0.4rem'
                        }}
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Build My Resume <ArrowRight size={16} />
                        </button>
                        <button style={{
                            background: 'transparent', color: 'white', border: '1.5px solid rgba(255,255,255,0.4)',
                            padding: '0.85rem 1.8rem', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 600,
                            cursor: 'pointer', transition: 'all 0.2s', backdropFilter: 'blur(4px)'
                        }}
                            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; }}
                        >
                            <Eye size={16} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                            View Examples
                        </button>
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginTop: '2.5rem' }}>
                        {[
                            { num: '50K+', label: 'Resumes Created' },
                            { num: '20+', label: 'Templates' },
                            { num: '95%', label: 'ATS Pass Rate' },
                        ].map((s, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{s.num}</div>
                                <div style={{ fontSize: '0.72rem', opacity: 0.7, marginTop: '0.1rem' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Template Picker */}
            <section style={{ maxWidth: '1300px', margin: '4rem auto', padding: '0 3rem' }}>
                <div style={{
                    background: 'white', borderRadius: '24px', padding: '3.5rem',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: '1px solid #CBD5E1'
                }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', textAlign: 'center', margin: '0 0 0.5rem 0' }}>
                        STEP 1 : Choose Your Template
                    </h2>
                    <p style={{ textAlign: 'center', color: '#94A3B8', marginBottom: '2rem', fontSize: '0.9rem' }}>
                        All templates are ATS-friendly and recruiter-approved
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
                        {templates.map((template, index) => {
                            const isSelected = selectedTemplate === index;
                            return (
                                <div
                                    key={template.name}
                                    onClick={() => setSelectedTemplate(index)}
                                    style={{
                                        border: isSelected ? `2px solid ${template.color}` : '2px solid transparent',
                                        borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s ease',
                                        padding: '4px',
                                        background: isSelected ? '#F8FAFC' : 'white',
                                        boxShadow: isSelected ? `0 10px 25px -5px ${template.color}40, 0 8px 10px -6px ${template.color}20` : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                                        transform: isSelected ? 'translateY(-4px)' : 'translateY(0)',
                                        position: 'relative'
                                    }}
                                    onMouseEnter={e => {
                                        if (!isSelected) {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                                            e.currentTarget.style.border = '2px solid #E2E8F0';
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if (!isSelected) {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)';
                                            e.currentTarget.style.border = '2px solid transparent';
                                        }
                                    }}
                                >
                                    {isSelected && (
                                        <div style={{
                                            position: 'absolute', top: '12px', left: '12px', zIndex: 10,
                                            width: '24px', height: '24px', borderRadius: '50%',
                                            background: template.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        }}>
                                            <CheckCircle size={14} color="white" />
                                        </div>
                                    )}
                                    <div style={{
                                        position: 'relative', height: '220px', borderRadius: '12px',
                                        overflow: 'hidden', border: '1px solid #E2E8F0',
                                        background: '#F8FAFC', padding: '16px', display: 'flex', flexDirection: 'column'
                                    }}>
                                        <TemplatePreview color={template.color} name={template.name} />
                                    </div>
                                    <div style={{ padding: '0.5rem 0.25rem 0.25rem' }}>
                                        <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '0.9rem' }}>{template.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.15rem' }}>{template.preview}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Builder Section */}
            <section style={{ maxWidth: '1300px', margin: '4rem auto', padding: '0 3rem' }}>
                <div style={{
                    background: 'white', borderRadius: '24px', padding: '3.5rem',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: '1px solid #CBD5E1'
                }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', textAlign: 'center', marginBottom: '0.5rem' }}>
                        STEP 2 : Build Your Resume
                    </h2>
                    <p style={{ textAlign: 'center', color: '#94A3B8', marginBottom: '2rem', fontSize: '0.9rem' }}>
                        Fill in your details and see a live preview update in real time
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 320px', gap: '1.5rem' }}>
                        {/* Sidebar */}
                        <div style={{
                            background: 'white', borderRadius: '14px', padding: '1.25rem',
                            border: '1px solid #E2E8F0', alignSelf: 'start', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                        }}>
                            {sections.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => setActiveSection(s.id)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        width: '100%', padding: '0.65rem 0.7rem', borderRadius: '8px',
                                        border: 'none', cursor: 'pointer', marginBottom: '0.2rem',
                                        background: activeSection === s.id ? '#EFF6FF' : 'transparent',
                                        color: activeSection === s.id ? '#2563EB' : '#64748B',
                                        fontWeight: 600, fontSize: '0.8rem', textAlign: 'left',
                                        transition: 'all 0.15s', fontFamily: 'inherit'
                                    }}
                                >
                                    <span style={{ fontSize: '1rem' }}>{s.icon}</span>
                                    {s.label}
                                    {activeSection === s.id && <ChevronRight size={12} style={{ marginLeft: 'auto' }} />}
                                </button>
                            ))}
                            <div style={{ height: '1px', background: '#F1F5F9', margin: '0.75rem 0' }} />
                            <div style={{ padding: '0.6rem', borderRadius: '8px', background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#166534' }}>💡 AI Tip</div>
                                <div style={{ fontSize: '0.65rem', color: '#15803D', marginTop: '0.2rem', lineHeight: 1.4 }}>
                                    Add at least 3 bullet points per role to stand out
                                </div>
                            </div>
                        </div>

                        {/* Form Area */}
                        <div style={{
                            background: 'white', borderRadius: '14px', padding: '2rem',
                            border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B', margin: 0 }}>
                                    {sections.find(s => s.id === activeSection)?.icon} {sections.find(s => s.id === activeSection)?.label}
                                </h3>
                                <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600 }}>
                                    {currentSectionIndex + 1} / {sections.length}
                                </span>
                            </div>

                            {activeSection === 'personal' && (
                                <div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        {[
                                            { label: 'Full Name', field: 'name', placeholder: 'e.g. John Doe' },
                                            { label: 'Email Address', field: 'email', placeholder: 'e.g. john@gmail.com' },
                                            { label: 'Phone Number', field: 'phone', placeholder: 'e.g. +91 98765 43210' },
                                            { label: 'Location', field: 'location', placeholder: 'e.g. Mumbai, India' },
                                            { label: 'LinkedIn URL', field: 'linkedin', placeholder: 'e.g. linkedin.com/in/johndoe' },
                                            { label: 'Portfolio / Website', field: 'portfolio', placeholder: 'e.g. johndoe.dev' }
                                        ].map((item, i) => (
                                            <div key={i}>
                                                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.3rem' }}>{item.label}</label>
                                                <input
                                                    type="text"
                                                    value={formData[item.field]}
                                                    onChange={e => updateField(item.field, e.target.value)}
                                                    placeholder={item.placeholder}
                                                    style={{
                                                        width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px',
                                                        border: '1.5px solid #E2E8F0', fontSize: '0.82rem',
                                                        fontFamily: 'inherit', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box'
                                                    }}
                                                    onFocus={e => e.target.style.borderColor = '#2563EB'}
                                                    onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeSection === 'experience' && (
                                <div>
                                    {formData.experiences.length > 0 ? formData.experiences.map((exp, i) => (
                                        <div key={i} style={{
                                            padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0',
                                            marginBottom: '1rem', background: '#FAFBFC', position: 'relative'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>Experience {i + 1}</span>
                                                <button onClick={() => deleteExperience(i)} style={{
                                                    background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA',
                                                    padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem',
                                                    fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem'
                                                }}><X size={11} /> Remove</button>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                                <div>
                                                    <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.2rem' }}>Job Title *</label>
                                                    <input value={exp.title} onChange={e => updateExperience(i, 'title', e.target.value)} placeholder="e.g. Software Engineer" style={{
                                                        width: '100%', padding: '0.5rem 0.6rem', borderRadius: '6px',
                                                        border: '1px solid #E2E8F0', fontSize: '0.8rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                                                    }} />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.2rem' }}>Company *</label>
                                                    <input value={exp.company} onChange={e => updateExperience(i, 'company', e.target.value)} placeholder="e.g. Google" style={{
                                                        width: '100%', padding: '0.5rem 0.6rem', borderRadius: '6px',
                                                        border: '1px solid #E2E8F0', fontSize: '0.8rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                                                    }} />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.2rem' }}>Location</label>
                                                    <input value={exp.location} onChange={e => updateExperience(i, 'location', e.target.value)} placeholder="e.g. Bengaluru, India" style={{
                                                        width: '100%', padding: '0.5rem 0.6rem', borderRadius: '6px',
                                                        border: '1px solid #E2E8F0', fontSize: '0.8rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                                                    }} />
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <div style={{ flex: 1 }}>
                                                        <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.2rem' }}>Start Date</label>
                                                        <input type="month" value={exp.startDate} onChange={e => updateExperience(i, 'startDate', e.target.value)} style={{
                                                            width: '100%', padding: '0.5rem 0.6rem', borderRadius: '6px',
                                                            border: '1px solid #E2E8F0', fontSize: '0.78rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                                                        }} />
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.2rem' }}>End Date</label>
                                                        {exp.currentlyWorking ? (
                                                            <div style={{ padding: '0.5rem 0.6rem', fontSize: '0.78rem', color: '#16A34A', fontWeight: 600 }}>Present</div>
                                                        ) : (
                                                            <input type="month" value={exp.endDate} onChange={e => updateExperience(i, 'endDate', e.target.value)} style={{
                                                                width: '100%', padding: '0.5rem 0.6rem', borderRadius: '6px',
                                                                border: '1px solid #E2E8F0', fontSize: '0.78rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                                                            }} />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem', fontSize: '0.72rem', color: '#64748B', cursor: 'pointer' }}>
                                                <input type="checkbox" checked={exp.currentlyWorking} onChange={e => updateExperience(i, 'currentlyWorking', e.target.checked)} style={{ accentColor: '#2563EB' }} />
                                                I currently work here
                                            </label>
                                            <div style={{ marginTop: '0.75rem' }}>
                                                <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.2rem' }}>Description / Key Achievements</label>
                                                <textarea rows={3} value={exp.description} onChange={e => updateExperience(i, 'description', e.target.value)} placeholder="• Led a team of 5 engineers to deliver a new microservice&#10;• Improved API response time by 40%&#10;• Built CI/CD pipeline reducing deployment time by 60%" style={{
                                                    width: '100%', padding: '0.6rem 0.7rem', borderRadius: '8px',
                                                    border: '1px solid #E2E8F0', fontSize: '0.8rem', fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.5
                                                }} />
                                            </div>
                                        </div>
                                    )) : (
                                        <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#94A3B8', border: '2px dashed #E2E8F0', borderRadius: '12px' }}>
                                            <FileText size={36} style={{ marginBottom: '0.5rem' }} />
                                            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#64748B' }}>No work experience added yet</div>
                                            <div style={{ fontSize: '0.78rem', marginTop: '0.25rem' }}>Click the button below to add your first role</div>
                                        </div>
                                    )}
                                    <button onClick={addExperience} style={{
                                        marginTop: '0.75rem', background: '#2563EB', color: 'white',
                                        border: 'none', padding: '0.55rem 1.4rem', borderRadius: '8px',
                                        fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem',
                                        display: 'flex', alignItems: 'center', gap: '0.3rem'
                                    }}><Plus size={14} /> Add Experience</button>
                                </div>
                            )}

                            {activeSection === 'education' && (
                                <div>
                                    {formData.education.length > 0 ? formData.education.map((edu, i) => (
                                        <div key={i} style={{
                                            padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0',
                                            marginBottom: '1rem', background: '#FAFBFC', position: 'relative'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>Education {i + 1}</span>
                                                <button onClick={() => deleteEducation(i)} style={{
                                                    background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA',
                                                    padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem',
                                                    fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem'
                                                }}><X size={11} /> Remove</button>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                                <div>
                                                    <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.2rem' }}>Degree *</label>
                                                    <input value={edu.degree} onChange={e => updateEducation(i, 'degree', e.target.value)} placeholder="e.g. Bachelor of Technology" style={{
                                                        width: '100%', padding: '0.5rem 0.6rem', borderRadius: '6px',
                                                        border: '1px solid #E2E8F0', fontSize: '0.8rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                                                    }} />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.2rem' }}>School / University *</label>
                                                    <input value={edu.school} onChange={e => updateEducation(i, 'school', e.target.value)} placeholder="e.g. IIT Bombay" style={{
                                                        width: '100%', padding: '0.5rem 0.6rem', borderRadius: '6px',
                                                        border: '1px solid #E2E8F0', fontSize: '0.8rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                                                    }} />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.2rem' }}>Field of Study</label>
                                                    <input value={edu.field} onChange={e => updateEducation(i, 'field', e.target.value)} placeholder="e.g. Computer Science" style={{
                                                        width: '100%', padding: '0.5rem 0.6rem', borderRadius: '6px',
                                                        border: '1px solid #E2E8F0', fontSize: '0.8rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                                                    }} />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.2rem' }}>GPA / Percentage</label>
                                                    <input value={edu.gpa} onChange={e => updateEducation(i, 'gpa', e.target.value)} placeholder="e.g. 8.5 / 10" style={{
                                                        width: '100%', padding: '0.5rem 0.6rem', borderRadius: '6px',
                                                        border: '1px solid #E2E8F0', fontSize: '0.8rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                                                    }} />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.2rem' }}>Start Year</label>
                                                    <input value={edu.startYear} onChange={e => updateEducation(i, 'startYear', e.target.value)} placeholder="e.g. 2019" style={{
                                                        width: '100%', padding: '0.5rem 0.6rem', borderRadius: '6px',
                                                        border: '1px solid #E2E8F0', fontSize: '0.8rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                                                    }} />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.2rem' }}>End Year</label>
                                                    <input value={edu.endYear} onChange={e => updateEducation(i, 'endYear', e.target.value)} placeholder="e.g. 2023" style={{
                                                        width: '100%', padding: '0.5rem 0.6rem', borderRadius: '6px',
                                                        border: '1px solid #E2E8F0', fontSize: '0.8rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                                                    }} />
                                                </div>
                                            </div>
                                        </div>
                                    )) : (
                                        <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#94A3B8', border: '2px dashed #E2E8F0', borderRadius: '12px' }}>
                                            <FileText size={36} style={{ marginBottom: '0.5rem' }} />
                                            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#64748B' }}>No education added yet</div>
                                            <div style={{ fontSize: '0.78rem', marginTop: '0.25rem' }}>Click the button below to add your qualifications</div>
                                        </div>
                                    )}
                                    <button onClick={addEducation} style={{
                                        marginTop: '0.75rem', background: '#2563EB', color: 'white',
                                        border: 'none', padding: '0.55rem 1.4rem', borderRadius: '8px',
                                        fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem',
                                        display: 'flex', alignItems: 'center', gap: '0.3rem'
                                    }}><Plus size={14} /> Add Education</button>
                                </div>
                            )}

                            {activeSection === 'skills' && (
                                <div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                                        {formData.skills.map((s, i) => (
                                            <span key={i} style={{
                                                background: '#EFF6FF', color: '#2563EB', padding: '0.3rem 0.7rem',
                                                borderRadius: '100px', fontSize: '0.78rem', fontWeight: 600,
                                                display: 'flex', alignItems: 'center', gap: '0.3rem'
                                            }}>
                                                {s}
                                                <X size={12} style={{ cursor: 'pointer', opacity: 0.6 }} onClick={() => removeSkill(s)} />
                                            </span>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            value={newSkill}
                                            onChange={e => setNewSkill(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && addSkill()}
                                            placeholder="Type a skill and press Enter..."
                                            style={{
                                                flex: 1, padding: '0.6rem 0.75rem', borderRadius: '8px',
                                                border: '1.5px solid #E2E8F0', fontSize: '0.82rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                                            }}
                                            onFocus={e => e.target.style.borderColor = '#2563EB'}
                                            onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                                        />
                                        <button onClick={addSkill} style={{
                                            background: '#2563EB', color: 'white', border: 'none',
                                            padding: '0 0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem'
                                        }}>Add</button>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'summary' && (
                                <div>
                                    <p style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: 0, marginBottom: '0.75rem' }}>
                                        Write a 2-3 sentence summary highlighting your key strengths, experience, and career goals.
                                    </p>
                                    <textarea
                                        value={formData.summary}
                                        onChange={e => updateField('summary', e.target.value)}
                                        placeholder="e.g. Results-driven software engineer with 3+ years of experience building scalable web applications. Proficient in React, Node.js, and cloud technologies. Passionate about creating impactful user experiences."
                                        rows={6}
                                        style={{
                                            width: '100%', padding: '0.8rem', borderRadius: '10px',
                                            border: '1.5px solid #E2E8F0', fontSize: '0.85rem',
                                            fontFamily: 'inherit', resize: 'vertical', outline: 'none', boxSizing: 'border-box', lineHeight: 1.6
                                        }}
                                        onFocus={e => e.target.style.borderColor = '#2563EB'}
                                        onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                                    />
                                    <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '0.4rem', textAlign: 'right' }}>
                                        {formData.summary.length} / 500 characters
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #F1F5F9'
                            }}>
                                <button
                                    onClick={goToPrevSection}
                                    disabled={currentSectionIndex === 0}
                                    style={{
                                        background: currentSectionIndex === 0 ? '#F8FAFC' : 'white',
                                        color: currentSectionIndex === 0 ? '#CBD5E1' : '#475569',
                                        border: `1.5px solid ${currentSectionIndex === 0 ? '#F1F5F9' : '#E2E8F0'}`,
                                        padding: '0.55rem 1.4rem', borderRadius: '8px',
                                        fontSize: '0.82rem', fontWeight: 600, cursor: currentSectionIndex === 0 ? 'not-allowed' : 'pointer',
                                        display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'inherit'
                                    }}
                                >
                                    ← Previous
                                </button>
                                <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                                    {sections[currentSectionIndex]?.label}
                                </span>
                                <button
                                    onClick={goToNextSection}
                                    disabled={currentSectionIndex === sections.length - 1}
                                    style={{
                                        background: currentSectionIndex === sections.length - 1 ? '#F8FAFC' : 'linear-gradient(135deg, #2563EB, #3B82F6)',
                                        color: currentSectionIndex === sections.length - 1 ? '#CBD5E1' : 'white',
                                        border: currentSectionIndex === sections.length - 1 ? '1.5px solid #F1F5F9' : 'none',
                                        padding: '0.55rem 1.4rem', borderRadius: '8px',
                                        fontSize: '0.82rem', fontWeight: 600, cursor: currentSectionIndex === sections.length - 1 ? 'not-allowed' : 'pointer',
                                        display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'inherit'
                                    }}
                                >
                                    Next →
                                </button>
                            </div>
                        </div>

                        {/* Live Preview */}
                        <div style={{ alignSelf: 'start' }}>
                            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', textAlign: 'center' }}>
                                <Eye size={12} style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} />
                                Live Preview
                            </div>
                            <LivePreview
                                data={formData}
                                templateColor={templateColor}
                                templateName={templates[selectedTemplate].name}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Download CTA */}
            <section style={{
                textAlign: 'center', padding: '0 3rem 5rem',
                background: 'linear-gradient(180deg, transparent, #F0F7FF)'
            }}>
                <div style={{
                    background: 'white', borderRadius: '24px', padding: '3.5rem',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: '1px solid #CBD5E1',
                    maxWidth: '1300px', margin: '0 auto'
                }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.5rem' }}>
                        STEP 3 : Ready to Download?
                    </h2>
                    <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                        Export your polished, ATS-optimized resume in seconds
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                        <button style={{
                            background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: 'white',
                            border: 'none', padding: '0.9rem 2.5rem', borderRadius: '12px', fontSize: '0.95rem',
                            fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 25px rgba(37,99,235,0.3)',
                            transition: 'transform 0.2s', display: 'flex', alignItems: 'center', gap: '0.4rem'
                        }}
                            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <Download size={16} /> Download PDF
                        </button>
                        <button style={{
                            background: 'white', color: '#64748B', border: '1.5px solid #E2E8F0',
                            padding: '0.9rem 1.8rem', borderRadius: '12px', fontSize: '0.95rem',
                            fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
                        }}>
                            Download DOCX
                        </button>
                    </div>
                    <p style={{ color: '#CBD5E1', fontSize: '0.75rem', marginTop: '1rem' }}>No sign-up needed • Export unlimited resumes • 100% free</p>
                </div>
            </section>
        </div>
    );
}
