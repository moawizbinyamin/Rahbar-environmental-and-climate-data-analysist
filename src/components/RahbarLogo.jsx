import React from 'react';

const RahbarLogo = ({ size = 'default', className = '', showText = true, textStyle = 'solid' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-12 h-12',
    large: 'w-16 h-16',
    xlarge: 'w-20 h-20'
  };

  const textSizeClasses = {
    small: 'text-lg',
    default: 'text-2xl',
    large: 'text-3xl',
    xlarge: 'text-4xl'
  };

  const textStyleClasses = {
    solid: 'font-bold',
    outline: 'font-extrabold',
    gradient: 'font-bold bg-gradient-to-r from-earth-500 to-sky-500 bg-clip-text text-transparent'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo SVG */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer circular border */}
          <circle
            cx="60"
            cy="60"
            r="58"
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="4"
            className="drop-shadow-lg"
          />
          
          {/* Inner green border */}
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
          />
          
          {/* Triangular pattern in upper half */}
          <g className="opacity-60">
            {[...Array(8)].map((_, i) => (
              <polygon
                key={i}
                points="45,25 50,35 40,35"
                fill="#60a5fa"
                transform={`rotate(${i * 45} 60 30)`}
              />
            ))}
          </g>
          
          {/* Top leaf icon */}
          <g transform="translate(60, 15)">
            <path
              d="M-3,0 Q0,-4 3,0 Q0,4 -3,0"
              fill="#10b981"
              stroke="#10b981"
              strokeWidth="1"
            />
          </g>
          
          {/* Side leaf icons */}
          <g transform="translate(15, 60)">
            <path
              d="M-2,0 Q0,-3 2,0 Q0,3 -2,0"
              fill="#10b981"
            />
          </g>
          <g transform="translate(105, 60)">
            <path
              d="M-2,0 Q0,-3 2,0 Q0,3 -2,0"
              fill="#10b981"
            />
          </g>
          
          {/* Central shield with curved corners */}
          <defs>
            <clipPath id="shieldClip">
              <path d="M30,20 L90,20 Q95,20 95,25 L95,75 Q95,80 90,80 L30,80 Q25,80 25,75 L25,25 Q25,20 30,20 Z" />
            </clipPath>
          </defs>
          
          {/* Shield background */}
          <path
            d="M30,20 L90,20 Q95,20 95,25 L95,75 Q95,80 90,80 L30,80 Q25,80 25,75 L25,25 Q25,20 30,20 Z"
            fill="none"
            stroke="#374151"
            strokeWidth="2"
            className="drop-shadow-md"
          />
          
          {/* Left half - Technology/Digital */}
          <g clipPath="url(#shieldClip)">
            {/* Dark blue background for left half */}
            <rect x="25" y="20" width="35" height="60" fill="#1e3a8a" />
            
            {/* Globe with satellite lines */}
            <g transform="translate(42, 32)">
              <circle cx="0" cy="0" r="8" fill="#10b981" stroke="#0ea5e9" strokeWidth="1" />
              <path d="M-8,0 Q0,-2 8,0" stroke="#0ea5e9" strokeWidth="1" fill="none" />
              <path d="M-8,0 Q0,2 8,0" stroke="#0ea5e9" strokeWidth="1" fill="none" />
              <path d="M0,-8 Q2,0 0,8" stroke="#0ea5e9" strokeWidth="1" fill="none" />
              <path d="M0,-8 Q-2,0 0,8" stroke="#0ea5e9" strokeWidth="1" fill="none" />
            </g>
            
            {/* Large R letter */}
            <g transform="translate(35, 45)">
              <path
                d="M0,0 L0,25 M0,0 L12,0 Q15,0 15,3 L15,8 Q15,11 12,11 L6,11 M6,11 L15,25"
                stroke="#0ea5e9"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            
            {/* Circuit board lines */}
            <g stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.6">
              <path d="M30,50 L40,50 M35,45 L35,55" />
              <path d="M45,60 L55,60 M50,55 L50,65" />
              <circle cx="40" cy="55" r="1" fill="#ffffff" />
              <circle cx="50" cy="65" r="1" fill="#ffffff" />
            </g>
            
            {/* Green hexagonal element */}
            <g transform="translate(45, 65)">
              <polygon
                points="-3,-2 3,-2 4,0 3,2 -3,2 -4,0"
                fill="#10b981"
                stroke="#10b981"
                strokeWidth="0.5"
              />
            </g>
          </g>
          
          {/* Right half - Nature/Environment */}
          <g clipPath="url(#shieldClip)">
            {/* Green background for right half */}
            <rect x="60" y="20" width="35" height="60" fill="#10b981" />
            
            {/* Tree */}
            <g transform="translate(75, 45)">
              {/* Tree trunk */}
              <rect x="-1" y="15" width="2" height="15" fill="#8b4513" />
              {/* Tree canopy */}
              <circle cx="0" cy="10" r="8" fill="#22c55e" />
              <circle cx="-3" cy="8" r="6" fill="#16a34a" />
              <circle cx="3" cy="8" r="6" fill="#16a34a" />
            </g>
            
            {/* River */}
            <path
              d="M65,35 Q70,40 75,45 Q80,50 85,55 Q90,60 95,65"
              stroke="#0ea5e9"
              strokeWidth="2"
              fill="none"
              opacity="0.8"
            />
            
            {/* Hill/mountain background */}
            <path
              d="M60,70 L70,60 L80,65 L90,55 L95,60 L95,80 L60,80 Z"
              fill="#16a34a"
              opacity="0.7"
            />
            
            {/* Orange hexagonal shapes */}
            <g transform="translate(85, 30)">
              <polygon
                points="-2,-1 2,-1 3,0 2,1 -2,1 -3,0"
                fill="#f97316"
                stroke="#ea580c"
                strokeWidth="0.5"
              />
            </g>
            <g transform="translate(88, 32)">
              <polygon
                points="-1.5,-1 1.5,-1 2,0 1.5,1 -1.5,1 -2,0"
                fill="none"
                stroke="#f97316"
                strokeWidth="0.5"
              />
            </g>
            <g transform="translate(90, 34)">
              <polygon
                points="-1,-0.5 1,-0.5 1.5,0 1,0.5 -1,0.5 -1.5,0"
                fill="#f97316"
                stroke="#ea580c"
                strokeWidth="0.3"
              />
            </g>
            
            {/* Plus signs in hexagons */}
            <g transform="translate(88, 32)" stroke="#ffffff" strokeWidth="0.5">
              <path d="M-0.5,0 L0.5,0 M0,-0.5 L0,0.5" />
            </g>
          </g>
          
          {/* Cloud icon outside shield */}
          <g transform="translate(95, 35)">
            <path
              d="M-8,0 Q-10,-2 -8,-4 Q-6,-6 -4,-4 Q-2,-6 0,-4 Q2,-6 4,-4 Q6,-6 8,-4 Q10,-2 8,0 Q6,2 4,0 Q2,2 0,0 Q-2,2 -4,0 Q-6,2 -8,0 Z"
              fill="#ffffff"
              stroke="#0ea5e9"
              strokeWidth="1"
            />
          </g>
          
          {/* Satellite dish above shield */}
          <g transform="translate(60, 15)">
            <circle cx="0" cy="0" r="3" fill="#1e3a8a" />
            <path d="M-6,0 L6,0" stroke="#1e3a8a" strokeWidth="2" />
          </g>
          
          {/* Compass rose at bottom */}
          <g transform="translate(60, 105)">
            <circle cx="0" cy="0" r="8" fill="#ffffff" stroke="#374151" strokeWidth="1" />
            <text x="0" y="-3" textAnchor="middle" fontSize="6" fill="#374151" fontWeight="bold">N</text>
            <text x="5" y="2" textAnchor="middle" fontSize="5" fill="#374151" fontWeight="bold">E</text>
            <text x="0" y="7" textAnchor="middle" fontSize="6" fill="#374151" fontWeight="bold">S</text>
            <text x="-5" y="2" textAnchor="middle" fontSize="5" fill="#374151" fontWeight="bold">W</text>
            <path d="M0,-6 L0,6 M-6,0 L6,0" stroke="#374151" strokeWidth="0.5" />
          </g>
        </svg>
      </div>
      
      {/* Text */}
      {showText && (
        <span className={`${textSizeClasses[size]} ${textStyleClasses[textStyle]} text-gray-800 dark:text-white transition-colors duration-300`}>
          Rahbar
        </span>
      )}
    </div>
  );
};

export default RahbarLogo;
