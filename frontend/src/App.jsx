import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import QuizArena from './components/QuizArena';
import AccuracyReport from './components/AccuracyReport';
import Leaderboard from './components/Leaderboard';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const [view, setView] = useState('dashboard'); // dashboard, quiz, report
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [lastResults, setLastResults] = useState(null);
    const [userStats, setUserStats] = useState({
        username: 'Guest User',
        level: 'Beginner',
        totalScore: 0,
        quizzesPlayed: 0
    });

    const startQuiz = (category) => {
        setSelectedCategory(category);
        setView('quiz');
    };

    const finishQuiz = (results) => {
        setLastResults(results);
        setUserStats(prev => ({
            ...prev,
            totalScore: prev.totalScore + results.score,
            quizzesPlayed: prev.quizzesPlayed + 1,
            // Logic to upgrade level
            level: (prev.totalScore + results.score) > 500 ? 'Advanced' :
                (prev.totalScore + results.score) > 200 ? 'Intermediate' : 'Beginner'
        }));
        setView('report');
    };

    return (
        <div className="App">
            <div className="animated-bg">
                <div className="blob"></div>
                <div className="blob" style={{ animationDelay: '-5s', background: 'rgba(244, 63, 94, 0.1)', left: '60%' }}></div>
            </div>

            <main className="quiz-container">
                <AnimatePresence mode="wait">
                    {view === 'dashboard' && (
                        <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <Dashboard
                                userStats={userStats}
                                onStart={startQuiz}
                                onViewLeaderboard={() => setView('leaderboard')}
                            />
                        </motion.div>
                    )}

                    {view === 'quiz' && (
                        <motion.div key="quiz" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <QuizArena
                                category={selectedCategory}
                                difficulty={userStats.level}
                                onFinish={finishQuiz}
                                onBack={() => setView('dashboard')}
                            />
                        </motion.div>
                    )}

                    {view === 'report' && (
                        <motion.div key="report" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}>
                            <AccuracyReport results={lastResults} onRestart={() => setView('dashboard')} />
                        </motion.div>
                    )}

                    {view === 'leaderboard' && (
                        <motion.div key="leaderboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <Leaderboard onBack={() => setView('dashboard')} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

export default App;
