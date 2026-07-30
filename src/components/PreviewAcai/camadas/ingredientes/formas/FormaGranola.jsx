import './FormaGranola.css'

function FormaGranola() {
  return (
    <g className="forma-granola">
      <ellipse
        className="forma-granola__sombra"
        cx="0"
        cy="1"
        rx="4.2"
        ry="1.6"
      />
      <path
        className="forma-granola__grao forma-granola__grao--1"
        d="M -2.6 -1 L -1.2 -1.8 L 0 -1.1 L -0.6 0.4 L -2.2 0.5 Z"
      />
      <path
        className="forma-granola__grao forma-granola__grao--2"
        d="M 0.4 -1.6 L 1.8 -1.9 L 2.6 -0.6 L 1.6 0.6 L 0.2 0.1 Z"
      />
      <path
        className="forma-granola__grao forma-granola__grao--3"
        d="M -0.8 0.6 L 0.4 0.2 L 1.1 1.2 L 0.1 1.9 L -1 1.5 Z"
      />
    </g>
  )
}

export default FormaGranola
