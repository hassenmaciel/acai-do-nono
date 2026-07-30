import { useId } from 'react'
import { CUP_CLIP_ID } from './CupLayer'
import { getBasePorId, ID_TRADICIONAL } from '../../../data/bases'
import './AcaiLayer.css'

const NIVEL_PREENCHIDO = 0.82
const NIVEL_VAZIO = 0

const SUPERFICIE_ACAI =
  'M 20 132 L 20 26 C 32 20 45 28 60 24 C 75 20 88 28 100 23 L 100 132 Z'

function AcaiLayer({ baseId }) {
  const gradientId = useId()
  const base = getBasePorId(baseId)
  const cores = base ?? getBasePorId(ID_TRADICIONAL)
  const preenchido = Boolean(base)

  return (
    <g clipPath={`url(#${CUP_CLIP_ID})`}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            className="acai-layer__stop"
            style={{ stopColor: cores.corPrincipal }}
          />
          <stop
            offset="100%"
            className="acai-layer__stop"
            style={{ stopColor: cores.corSecundaria }}
          />
        </linearGradient>
      </defs>

      <path
        d={SUPERFICIE_ACAI}
        className="acai-layer"
        style={{
          fill: `url('#${gradientId}')`,
          '--acai-nivel': preenchido ? NIVEL_PREENCHIDO : NIVEL_VAZIO,
        }}
      />
    </g>
  )
}

export default AcaiLayer
