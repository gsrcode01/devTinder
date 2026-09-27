import React from "react";

const DevTinderLogo = ({
  width = 240,
  height = 64,
  showTagline = false,
  animated = true,
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={showTagline ? height + 28 : height}
      viewBox="0 0 430 125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="DevTinder logo"
      className={className}
      style={{
        overflow: "visible",
      }}
    >
      <defs>
        {/* Main flame gradient */}
        <linearGradient
          id="flameGradient"
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

        {/* Wordmark gradient */}
        <linearGradient
          id="tinderGradient"
          x1="205"
          y1="30"
          x2="410"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFB52E" />
          <stop offset="35%" stopColor="#FF714A" />
          <stop offset="68%" stopColor="#F84291" />
          <stop offset="100%" stopColor="#A94BFF" />
        </linearGradient>

        {/* Small flame gradient */}
        <linearGradient
          id="miniFlameGradient"
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

        {/* Glow */}
        <filter
          id="flameGlow"
          x="-80%"
          y="-80%"
          width="260%"
          height="260%"
        >
          <feGaussianBlur
            stdDeviation="4"
            result="blur"
          />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="
              1 0 0 0 0.4
              0 0.3 0 0 0.1
              0 0 1 0 0.9
              0 0 0 0.8 0
            "
          />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter
          id="textGlow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feGaussianBlur
            stdDeviation="1.5"
            result="blur"
          />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ========================= */}
      {/* FLAME LOGO */}
      {/* ========================= */}

      <g
        filter="url(#flameGlow)"
        className={animated ? "devtinder-flame" : ""}
      >
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
          fill="url(#flameGradient)"
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
          fill="url(#miniFlameGradient)"
          opacity="0.9"
        />

        {/* Code symbol background */}
        <circle
          cx="68"
          cy="73"
          r="24"
          fill="#090B18"
          fillOpacity="0.78"
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

      {/* ========================= */}
      {/* dev */}
      {/* ========================= */}

      <text
        x="106"
        y="80"
        fontFamily="Plus Jakarta Sans, Inter, sans-serif"
        fontSize="58"
        fontWeight="700"
        letterSpacing="-1.5"
        fill="#FFFFFF"
      >
        dev
      </text>

      {/* ========================= */}
      {/* Tinder */}
      {/* ========================= */}

      <text
        x="204"
        y="80"
        fontFamily="Plus Jakarta Sans, Inter, sans-serif"
        fontSize="58"
        fontWeight="800"
        letterSpacing="-1.5"
        fill="url(#tinderGradient)"
        filter="url(#textGlow)"
      >
        Tinder
      </text>

      {/* ========================= */}
      {/* Small flame above i */}
      {/* ========================= */}

      <g className={animated ? "devtinder-mini-flame" : ""}>
        <path
          d="
            M242 34
            C237 28 239 20 246 14
            C245 21 252 24 253 30
            C255 38 250 43 245 45
            C242 42 241 38 242 34
            Z
          "
          fill="url(#miniFlameGradient)"
        />
      </g>

      {/* ========================= */}
      {/* Decorative sparkles */}
      {/* ========================= */}

      <g
        fill="#FF5D87"
        className={animated ? "devtinder-sparkle" : ""}
      >
        <path
          d="M22 50L25 57L32 60L25 63L22 70L19 63L12 60L19 57Z"
        />

        <path
          d="M98 42L100 47L105 49L100 51L98 56L96 51L91 49L96 47Z"
          opacity="0.8"
        />
      </g>

      {/* ========================= */}
      {/* Tagline */}
      {/* ========================= */}

      {showTagline && (
        <>
          <line
            x1="205"
            y1="102"
            x2="242"
            y2="102"
            stroke="url(#tinderGradient)"
            strokeWidth="2"
          />

          <text
            x="250"
            y="107"
            fontFamily="Plus Jakarta Sans, Inter, sans-serif"
            fontSize="13"
            fontWeight="600"
            letterSpacing="2.5"
            fill="#CBD5E1"
          >
            FIND YOUR CODING MATCH
          </text>

          <line
            x1="410"
            y1="102"
            x2="430"
            y2="102"
            stroke="url(#tinderGradient)"
            strokeWidth="2"
          />
        </>
      )}


      {/* ========================= */}
      {/* SVG ANIMATION */}
      {/* ========================= */}

      {animated && (
        <style>
          {`
            .devtinder-flame {
              transform-origin: 68px 72px;
              animation: devtinderPulse 2.8s ease-in-out infinite;
            }

            .devtinder-mini-flame {
              transform-origin: 288px 27px;
              animation: devtinderMiniFlame 1.8s ease-in-out infinite;
            }

            .devtinder-sparkle {
              animation: devtinderSparkle 2.4s ease-in-out infinite;
            }

            @keyframes devtinderPulse {
              0%, 100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.035);
              }
            }

            @keyframes devtinderMiniFlame {
              0%, 100% {
                transform: translateY(0) scale(1);
              }
              50% {
                transform: translateY(-2px) scale(1.08);
              }
            }

            @keyframes devtinderSparkle {
              0%, 100% {
                opacity: 0.45;
                transform: scale(0.9);
              }
              50% {
                opacity: 1;
                transform: scale(1.15);
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .devtinder-flame,
              .devtinder-mini-flame,
              .devtinder-sparkle {
                animation: none;
              }
            }
          `}
        </style>
      )}
    </svg>
  );
};

export default DevTinderLogo;
