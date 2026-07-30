export const CUP_CLIP_ID = 'copo-acai-clip'

const CUP_POINTS = '26,22 94,22 84,132 36,132'

function CupLayer() {
  return (
    <g className="copo-acai__cup-layer">
      <defs>
        <clipPath id={CUP_CLIP_ID}>
          <polygon points={CUP_POINTS} />
        </clipPath>
      </defs>

      <polygon
        points={CUP_POINTS}
        className="copo-acai__cup-body"
        strokeLinejoin="round"
      />

      <g clipPath={`url(#${CUP_CLIP_ID})`}>
        <rect
          x="30"
          y="26"
          width="14"
          height="100"
          transform="skewX(-8)"
          className="copo-acai__cup-highlight"
        />
      </g>

      <ellipse
        cx="60"
        cy="132"
        rx="24"
        ry="4"
        className="copo-acai__cup-base"
      />

      <ellipse
        cx="60"
        cy="22"
        rx="34"
        ry="6"
        className="copo-acai__cup-rim-outer"
      />
      <ellipse
        cx="60"
        cy="22"
        rx="28"
        ry="4"
        className="copo-acai__cup-rim-inner"
      />
    </g>
  )
}

export default CupLayer
