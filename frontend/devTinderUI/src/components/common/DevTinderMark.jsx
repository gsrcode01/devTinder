import React from "react";

const DevTinderMark = ({ size = 48, animated = true, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 125 125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="DevTinder mark"
      className={className}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient
          id="markFlameGradient"
          x1="25"
          y1="10"
          x2="120"
          y2="125"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFD54A" />
          <stop offset="25%" stopColor="#FF8A3D" />
          <stop offset="52%" stopColor="#FF3D81" />
          <stop offset="78%" stopColor="#9B4DFF" />
          <stop offset="100%" stopColor="#3278FF" />
        </linearGradient>

        <linearGradient
          id="markMiniFlameGradient"
          x1="0"
          y1="0"
          x2="30"
          y2="45"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD44D" />
          <stop offset="0.45" stopColor="#FF7043" />
          <stop offset="1" stopColor="#FF2D78" />
        </linearGradient>

        <filter
          id="markFlameGlow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#markFlameGlow)" className={animated ? "devtinder-flame-mark" : ""}>
        {/* Outer flame */}
        <path
          d="
            M82 7
            C88 28 78 42 67 55
            C57 68 51 79 57 94
            C62 107 74 116 86 119
            C71 120 55 115 45 105
            C30 91 28 72 35 55
            C42 39 58 28 66 10
            C69 5 73 2 76 0
            C78 2 80 4 82 7
            Z
          "
          fill="url(#markFlameGradient)"
        />

        {/* Inner flame */}
        <path
          d="
            M70 31
            C74 44 66 53 60 61
            C54 70 53 79 59 87
            C64 94 71 99 79 101
            C70 105 59 101 53 94
            C45 85 45 74 49 65
            C53 55 62 48 66 36
            C67 33 68 31 70 31
            Z
          "
          fill="url(#markMiniFlameGradient)"
          opacity="0.9"
        />

        {/* Code symbol background */}
        <circle
          cx="68"
          cy="73"
          r="24"
          fill="#090B18"
          fillOpacity="0.82"
        />

        {/* < */}
        <path
          d="M59 65L50 73L59 81"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* / */}
        <path
          d="M70 61L64 85"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* > */}
        <path
          d="M77 65L86 73L77 81"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default DevTinderMark;
