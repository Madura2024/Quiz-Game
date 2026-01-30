import React from 'react';
import { LayoutGrid, Brain, Landmark, Globe, Atom, Newspaper, Trophy } from 'lucide-react';

const categories = [
    { id: 'Current Affairs', icon: <Newspaper size={24} />, color: '#6366f1' },
    { id: 'Logical GK', icon: <Brain size={24} />, color: '#a855f7' },
    { id: 'Indian History & Polity', icon: <Landmark size={24} />, color: '#f59e0b' },
    { id: 'World GK', icon: <Globe size={24} />, color: '#10b981' },
    { id: 'Science & Tech', icon: <Atom size={24} />, color: '#f43f5e' },
    { id: 'Daily News Quiz', icon: <Trophy size={24} />, color: '#ec4899' },
];

function Dashboard({ userStats, onStart, onViewLeaderboard }) {
    return (
        <div className="dashboard">
            <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Hello, {userStats.username} 👋</h1>
                    <p style={{ color: 'var(--text-dim)' }}>Ready to test your awareness today?</p>
                </div>
                <button
                    onClick={onViewLeaderboard}
                    className="glass-card"
                    style={{
                        padding: '12px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        color: '#f59e0b',
                        border: '1px solid #f59e0b'
                    }}
                >
                    <Trophy size={18} /> Leaderboard
                </button>
            </header>

            <div className="glass-card" style={{ padding: '24px', marginBottom: '32px', display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Level</p>
                    <h3 style={{ color: 'var(--secondary)' }}>{userStats.level}</h3>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Total Score</p>
                    <h3 style={{ color: 'var(--primary)' }}>{userStats.totalScore}</h3>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Quizzes</p>
                    <h3 style={{ color: 'var(--success)' }}>{userStats.quizzesPlayed}</h3>
                </div>
            </div>

            <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LayoutGrid size={24} /> Select Category
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                {categories.map(cat => (
                    <div
                        key={cat.id}
                        className="glass-card"
                        style={{
                            padding: '24px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            borderLeft: `4px solid ${cat.color}`
                        }}
                        onClick={() => onStart(cat.id)}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <div style={{ color: cat.color, marginBottom: '16px' }}>{cat.icon}</div>
                        <h3 style={{ fontSize: '1.1rem' }}>{cat.id}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
