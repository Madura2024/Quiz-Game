import React, { useState, useEffect } from 'react';
import { Trophy, ArrowLeft, Medal } from 'lucide-react';

function Leaderboard({ onBack }) {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/leaderboard')
            .then(res => res.json())
            .then(data => {
                setLeaders(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch leaderboard", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="leaderboard">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ArrowLeft size={18} /> Back to Dashboard
                </button>
                <h1 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Trophy style={{ color: '#f59e0b' }} /> Hall of Fame
                </h1>
                <div style={{ width: '100px' }}></div> {/* Spacer */}
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>Loading Legends...</div>
            ) : (
                <div className="glass-card" style={{ padding: '0' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-dim)' }}>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Rank</th>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Player</th>
                                <th style={{ padding: '16px', textAlign: 'right' }}>Top Score</th>
                                <th style={{ padding: '16px', textAlign: 'right' }}>Accuracy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaders.map((player, idx) => (
                                <tr key={idx} style={{ borderBottom: idx < leaders.length - 1 ? '1px solid var(--glass-border)' : 'none' }}>
                                    <td style={{ padding: '16px' }}>
                                        {idx === 0 ? <Medal style={{ color: '#ffd700' }} /> :
                                            idx === 1 ? <Medal style={{ color: '#c0c0c0' }} /> :
                                                idx === 2 ? <Medal style={{ color: '#cd7f32' }} /> :
                                                    `#${idx + 1}`}
                                    </td>
                                    <td style={{ padding: '16px', fontWeight: 'bold' }}>{player.username}</td>
                                    <td style={{ padding: '16px', textAlign: 'right', color: 'var(--primary)', fontWeight: 'bold' }}>{player.highscore}</td>
                                    <td style={{ padding: '16px', textAlign: 'right' }}>{player.best_accuracy.toFixed(1)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Leaderboard;
