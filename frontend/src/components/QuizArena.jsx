import React, { useState, useEffect, useCallback } from 'react';
import { Timer, ArrowLeft, Send } from 'lucide-react';

function QuizArena({ category, difficulty, onFinish, onBack }) {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(15);
    const [loading, setLoading] = useState(true);

    const fetchQuestions = useCallback(async () => {
        try {
            const resp = await fetch(`http://localhost:5000/api/questions?category=${encodeURIComponent(category)}&difficulty=${encodeURIComponent(difficulty)}`);
            const data = await resp.json();
            setQuestions(data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch questions", err);
            // Fallback for demo
            setQuestions([
                { id: 1, question: "Sample Question 1?", options: ["A", "B", "C", "D"], correct_answer: "A" },
                { id: 2, question: "Sample Question 2?", options: ["X", "Y", "Z", "W"], correct_answer: "Y" }
            ]);
            setLoading(false);
        }
    }, [category, difficulty]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    useEffect(() => {
        if (timeLeft > 0 && !loading) {
            const timer = setTimeout(() => setTimeLeft(prev => prev - 0.1), 100);
            return () => clearTimeout(timer);
        } else if (timeLeft <= 0) {
            handleAnswer(null); // Time out
        }
    }, [timeLeft, loading]);

    const handleAnswer = (selectedOption) => {
        const currentQ = questions[currentIndex];
        const isCorrect = selectedOption === currentQ.correct_answer;

        // Time-based intelligence scoring
        let points = 0;
        if (isCorrect) {
            points = Math.ceil(timeLeft * 10); // More points for faster answers
        }

        const newAnswers = [...answers, { q: currentQ.question, selected: selectedOption, correct: currentQ.correct_answer, isCorrect, timeTaken: 15 - timeLeft }];
        setAnswers(newAnswers);
        setScore(prev => prev + points);

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(prev => prev + 1);
            setTimeLeft(15);
        } else {
            // Calculate final accuracy
            const correctCount = newAnswers.filter(a => a.isCorrect).length;
            const finalResults = {
                score: score + points,
                accuracy: (correctCount / questions.length) * 100,
                breakdown: newAnswers,
                category,
                difficulty,
                username: 'Guest User' // This could be dynamic if we add a login
            };

            // Submit to backend
            fetch('http://localhost:5000/api/scores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalResults)
            }).catch(err => console.error("Failed to save score", err));

            onFinish(finalResults);
        }
    };

    if (loading) return <div>Loading Challenges...</div>;
    if (questions.length === 0) return <div>No questions found for this category.</div>;

    const currentQ = questions[currentIndex];

    return (
        <div className="quiz-arena">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ArrowLeft size={18} /> Quit
                </button>
                <span style={{ color: 'var(--text-dim)' }}>Category: {category} ({difficulty})</span>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Q {currentIndex + 1}/{questions.length}</span>
            </div>

            <div className="timer-bar">
                <div className="timer-fill" style={{ width: `${(timeLeft / 15) * 100}%` }}></div>
            </div>

            <div className="glass-card" style={{ padding: '32px', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', lineHeight: '1.4', marginBottom: '32px' }}>{currentQ.question}</h2>

                <div className="options-list">
                    {currentQ.options.map((option, idx) => (
                        <div key={idx} className="option-card" onClick={() => handleAnswer(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ textAlign: 'center', color: 'var(--text-dim)' }}>
                <Timer size={16} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                Time Remaining: {Math.max(0, timeLeft).toFixed(1)}s
            </div>
        </div>
    );
}

export default QuizArena;
