import React from 'react';
import { CheckCircle, XCircle, RefreshCw, BarChart3, Clock } from 'lucide-react';

function AccuracyReport({ results, onRestart }) {
    return (
        <div className="accuracy-report">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '8px', background: 'linear-gradient(to right, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {results.score}
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)' }}>Final Score Achieved</p>
            </div>

            <div className="stat-grid" style={{ marginBottom: '40px' }}>
                <div className="glass-card stat-item">
                    <BarChart3 size={24} style={{ color: 'var(--success)', marginBottom: '8px' }} />
                    <h3>{results.accuracy.toFixed(1)}%</h3>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Accuracy</p>
                </div>
                <div className="glass-card stat-item">
                    <Clock size={24} style={{ color: 'var(--primary)', marginBottom: '8px' }} />
                    <h3>{results.breakdown.reduce((acc, curr) => acc + curr.timeTaken, 0).toFixed(1)}s</h3>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Total Time</p>
                </div>
                <div className="glass-card stat-item">
                    <CheckCircle size={24} style={{ color: 'var(--secondary)', marginBottom: '8px' }} />
                    <h3>{results.breakdown.filter(a => a.isCorrect).length}</h3>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Correct</p>
                </div>
            </div>

            <h3 style={{ marginBottom: '20px' }}>Performance Analysis</h3>
            <div className="glass-card" style={{ padding: '24px', marginBottom: '32px' }}>
                {results.breakdown.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: idx < results.breakdown.length - 1 ? '1px solid var(--glass-border)' : 'none' }}>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{item.q}</p>
                            <p style={{ fontSize: '0.8rem', color: item.isCorrect ? 'var(--success)' : 'var(--accent)' }}>
                                {item.isCorrect ? '✓ Spot on!' : `✗ Correct: ${item.correct}`}
                            </p>
                        </div>
                        <div style={{ textAlign: 'right', minWidth: '80px' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{item.timeTaken.toFixed(1)}s</span>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center' }}>
                <button className="btn-primary" onClick={onRestart} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}>
                    <RefreshCw size={18} /> Start Another Challenge
                </button>
            </div>
        </div>
    );
}

export default AccuracyReport;
