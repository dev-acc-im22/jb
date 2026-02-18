import React from 'react';
import { Calendar, Code, BarChart3, Palette } from 'lucide-react';

const events = [
    { title: 'Code for Future Hackathon', icon: Code, gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', date: 'Mar 15, 2026', type: 'Contest' },
    { title: 'Data Science Summit 2026', icon: BarChart3, gradient: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)', date: 'Apr 02, 2026', type: 'Webinar' },
    { title: 'Product Design Workshop', icon: Palette, gradient: 'linear-gradient(135deg, #334155 0%, #475569 100%)', date: 'Mar 28, 2026', type: 'Workshop' },
];

const UpcomingEvents = () => {
    return (
        <section style={{ padding: '2rem 4rem', width: '100%', maxWidth: '1400px', margin: '0 auto', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', marginBottom: '2rem' }}>
                Upcoming events and challenges
            </h2>

            <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none' }}>
                {events.map((event, index) => {
                    const IconComponent = event.icon;
                    return (
                        <div key={index} style={{
                            minWidth: '320px',
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            border: '1px solid #E5E7EB',
                            overflow: 'hidden',
                            cursor: 'pointer'
                        }}>
                            <div style={{
                                height: '140px',
                                background: event.gradient,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                gap: '0.75rem'
                            }}>
                                <IconComponent size={40} color="rgba(255,255,255,0.85)" strokeWidth={1.5} />
                                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                    {event.type}
                                </span>
                            </div>
                            <div style={{ padding: '1.25rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2563EB', backgroundColor: '#EFF6FF', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{event.type}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: '#6B7280' }}>
                                        <Calendar size={14} /> {event.date}
                                    </span>
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>{event.title}</h3>
                                <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>Register to participate</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default UpcomingEvents;
