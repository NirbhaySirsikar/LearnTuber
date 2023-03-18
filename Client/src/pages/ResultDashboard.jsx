import React from "react";
import PropTypes from "prop-types";
import Confetti from "react-confetti";

const ResultDashboard = ({ score, totalQuestions, restartQuiz }) => {
  const percentage = (score / totalQuestions) * 100;

  const confettiConfig = {
    angle: "90",
    spread: "180",
    startVelocity: "50",
    elementCount: "200",
    dragFriction: "0.12",
    duration: "2000",
    stagger: "0",
    width: "10px",
    height: "10px",
    colors: ["#ff0000", "#00ff00", "#0000ff"]
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {percentage >= 75 && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
          {...confettiConfig}
        />
      )}

      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Results
        </h2>
        <div className="mb-4">
          <ProgressBar percentage={percentage} />
        </div>
        <div className="text-center">
          <p className="text-xl font-bold mb-4">
            You scored {score} out of {totalQuestions}
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
            onClick={restartQuiz}
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

ResultDashboard.propTypes = {
  score: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  restartQuiz: PropTypes.func.isRequired
};

export default ResultDashboard;
