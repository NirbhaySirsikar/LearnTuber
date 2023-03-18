import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import ResultDashboard from "./ResultDashboard";
import Confetti from "react-confetti";

const QuizPage = ({ questions }) => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleAnswerSubmit = (isCorrect) => {
        if (isCorrect) {
            setCorrectAnswers((prev) => prev + 1);
        }
        if (currentQuestion === questions.length - 1) {
            setShowResult(true);
        } else {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const percentage = Math.round((correctAnswers / questions.length) * 100);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Quiz Time!</h1>
            {!showResult ? (
                <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
                    <ProgressBar percentage={percentage} />
                    <div className="text-gray-900 font-bold text-lg mb-4">{questions[currentQuestion].question}</div>
                    <div className="space-y-4">
                        {questions[currentQuestion].answers.map((answer, index) => (
                            <button
                                key={index}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 w-full"
                                onClick={() => handleAnswerSubmit(answer.isCorrect)}
                            >
                                {answer.answer}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8 text-center">
                    {percentage >= 75 ? (
                        <>
                            <h2 className="text-2xl font-bold text-green-500 mb-4">Congratulations!</h2>
                            <p className="text-gray-900 text-lg mb-4">You scored {percentage}% on the quiz!</p>
                            <Confetti />
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-red-500 mb-4">Better luck next time!</h2>
                            <p className="text-gray-900 text-lg mb-4">You scored {percentage}% on the quiz.</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuizPage;
