import React from 'react';

const ProgressBar = ({ 
  progress, 
  total = 100, 
  height = 'h-2', 
  showPercentage = true, 
  showLabel = false,
  label,
  color = 'blue',
  animated = true,
  className = ''
}) => {
  const percentage = Math.min(Math.max((progress / total) * 100, 0), 100);
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    gray: 'bg-gray-500'
  };

  const bgColorClasses = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    red: 'bg-red-100',
    yellow: 'bg-yellow-100',
    purple: 'bg-purple-100',
    gray: 'bg-gray-100'
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {label || 'Progress'}
          </span>
          {showPercentage && (
            <span className="text-sm text-gray-500">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      {/* Progress Bar */}
      <div className={`w-full ${height} ${bgColorClasses[color]} rounded-full overflow-hidden`}>
        <div
          className={`${height} ${colorClasses[color]} rounded-full transition-all duration-500 ease-out ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{ 
            width: `${percentage}%`,
            transition: 'width 0.5s ease-out'
          }}
        />
      </div>
      
      {/* Progress Text (if no label) */}
      {!showLabel && showPercentage && (
        <div className="mt-1 text-right">
          <span className="text-xs text-gray-500">
            {progress} / {total}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
