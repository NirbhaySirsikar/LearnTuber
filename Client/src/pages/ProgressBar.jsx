import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const ProgressBar = ({ percentage }) => {
  const progressBarClasses = classNames({
    "h-2 rounded-full bg-red-500": percentage < 75,
    "h-2 rounded-full bg-green-500": percentage >= 75,
    "w-full": true
  });

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="text-sm font-bold text-gray-600">{percentage}% Correct</div>
      <div className="relative w-full bg-gray-300 rounded-full">
        <div
          className={progressBarClasses}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default ProgressBar;
