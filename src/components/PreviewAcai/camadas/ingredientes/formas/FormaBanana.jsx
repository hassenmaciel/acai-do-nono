import './FormaBanana.css'

function FormaBanana() {
  return (
    <g className="forma-banana">
      <ellipse
        className="forma-banana__sombra"
        cx="0"
        cy="1.6"
        rx="6.6"
        ry="3.2"
      />
      <ellipse className="forma-banana__corpo" cx="0" cy="0" rx="6.6" ry="4" />
      <ellipse className="forma-banana__anel" cx="0" cy="0" rx="6.6" ry="4" />
      <circle className="forma-banana__semente" cx="-2.2" cy="0" r="0.45" />
      <circle className="forma-banana__semente" cx="0" cy="0" r="0.45" />
      <circle className="forma-banana__semente" cx="2.2" cy="0" r="0.45" />
    </g>
  )
}

export default FormaBanana
