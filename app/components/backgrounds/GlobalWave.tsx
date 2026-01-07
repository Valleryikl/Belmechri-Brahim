'use client'

export default function GlobalWave() {
  return (
    <svg
      className="
        fixed inset-0
        w-[200%] h-full
        pointer-events-none
        opacity-40
        z-0
        transition-transform duration-700 ease-in-out
        lg:rotate-0
      "
      viewBox="0 0 2000 1000" 
      preserveAspectRatio="xMidYMid slice" 
    >
      <defs>
        <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" /> 
        </filter>
      </defs>

      <path
        filter="url(#blurFilter)" 
        d="M 0 500 C 250 200, 500 800, 750 500 S 1250 200, 1500 500 S 1750 800, 2000 500"
        fill="none"
        stroke="white"
        strokeWidth="10" 
      >
        <animate
          attributeName="d"
          dur="35s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0; 0.5; 1"
          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
          values="
            M 0 500 C 250 200, 500 800, 750 500 S 1250 200, 1500 500 S 1750 800, 2000 500;
            M 0 500 C 250 800, 500 200, 750 500 S 1250 800, 1500 500 S 1750 200, 2000 500;
            M 0 500 C 250 200, 500 800, 750 500 S 1250 200, 1500 500 S 1750 800, 2000 500
          "
        />
      </path>
    </svg>
  )
}