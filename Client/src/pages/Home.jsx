import React, { useEffect, useState } from 'react';
import ProgressBar from "./ProgressBar";

import Confetti from "react-confetti";

const QuizPage = ({ quiz }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleAnswerSubmit = (isCorrect) => {
        if (isCorrect) {
            setCorrectAnswers((prev) => prev + 1);
        }
        if (currentQuestion === quiz.questions.length - 1) {
            setShowResult(true);
        } else {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const percentage = Math.round((correctAnswers / quiz.questions.length) * 100);

    return (
        <div className="pt-10 flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">{quiz.title}</h1>
            {!showResult ? (
                <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
                    <ProgressBar percentage={percentage} />
                    <div className="text-gray-900 font-bold text-lg mb-4">
                        {quiz.questions[currentQuestion].question}
                    </div>
                    <div className="space-y-4">
                        {quiz.questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 w-full"
                                onClick={() => handleAnswerSubmit(option === quiz.questions[currentQuestion].answer)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8 text-center">
                    {percentage >= 50 ? (
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


export default function App() {

    const [message, setMessage] = useState('');
    const [data, setData] = useState(null);
    const [quizData, setQuiz] = useState(null);
    const [videoEmbed, setVideoEmbed] = useState("");

    const handleMessageChage = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const videoId = message.split("v=")[1];
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        setVideoEmbed(embedUrl);
        const response = await fetch('http://localhost:3000/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message
            })
        })

        const res = await response.json();
        console.log(res.message)
        setData(res.message);
        var temp = res.quiz;
        console.log(temp);
        var temp2 = JSON.parse(temp);
        var temp3 = temp2.quiz;
        console.log(temp3);
        setQuiz(temp3);
        console.log(quizData);
    }
    return (
        <div>
            {/* title bar */}


            {/* Main heading */}
            <div className="pl-5 pr-5">
                <div className=" flex justify-center items-center pt-6">
                    <div className="flex flex-row items-center">
                        <div className="pl-4 font-bold text-5xl">Learn</div>
                        <div className=" font-bold text-5xl text-[#4169E1]">Tuber</div>
                    </div>
                </div>
                <div className='text-center text-xl pt-10'>
                    AI Powered Transcriber, Summarization, Quiz Generator
                </div>

                <div className="flex justify-center items-center pt-2 ">
                    <div className="w-full max-w-md px-4 py-6 bg-slate-300 shadow-md rounded-md">
                        <form onSubmit={handleSubmit}>
                            <div className="flex items-center">
                                <input
                                    type='text'
                                    value={message}
                                    onChange={handleMessageChage}
                                    className="rounded-md bg-gray-100 py-2 px-4 w-full"
                                />
                            </div>
                            <div className="flex justify-center pt-4">
                                <button className="text-center bg-indigo-500 w-28 h-10 text-white rounded "
                                    type='submit'>
                                    Summarize
                                </button>
                            </div>
                            <div className='pt-5 relative overflow-hidden pb-[56.25%]'>
                                {videoEmbed && (
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full pt-5"
                                        src={videoEmbed}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                )}
                            </div>
                        </form>

                    </div>


                </div>

                {data ? (
                    <div className="bg-gray-100 rounded-md p-4 mt-4">
                        <div className="text-lg font-semibold">Summary:</div>
                        <div className="whitespace-pre-wrap">{data}</div>

                        <QuizPage quiz={quizData} />


                    </div>
                ) : (
                    <div className="bg-gray-100 rounded-md p-4 mt-4">
                        <div className="text-lg font-semibold mb-2">Note:</div>
                        <p>
                            This app is just a prototype so please test it with smaller videos. It might take
                            more than a few minutes to give an output, so please be patient.
                        </p>
                    </div>
                )}
            </div>

        </div>

    )
}