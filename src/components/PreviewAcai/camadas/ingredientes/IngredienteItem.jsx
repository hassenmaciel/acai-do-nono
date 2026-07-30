import { useState } from 'react'
import { useTransicaoPresenca } from '../../../../hooks/useTransicaoPresenca'
import { escolherLayoutAleatorio } from './utils'
import './IngredienteItem.css'

const ATRASO_ENTRE_PECAS_MS = 40

function IngredienteItem({ selecionado, Forma, layouts, duracaoMs = 200 }) {
  const { montado, entrando, saindo } = useTransicaoPresenca(
    selecionado,
    duracaoMs,
  )
  const [layout] = useState(() => escolherLayoutAleatorio(layouts))

  if (!montado) {
    return null
  }

  const oculta = entrando || saindo

  return (
    <g style={{ '--transicao-duracao': `${duracaoMs}ms` }}>
      {layout.map((posicao, indice) => (
        <g
          key={indice}
          transform={`translate(${posicao.x} ${posicao.y}) rotate(${
            posicao.rotacao ?? 0
          }) scale(${posicao.escala ?? 1})`}
        >
          <g
            className={
              oculta
                ? 'ingrediente-item__peca ingrediente-item__peca--oculta'
                : 'ingrediente-item__peca'
            }
            style={{ transitionDelay: `${indice * ATRASO_ENTRE_PECAS_MS}ms` }}
          >
            <Forma />
          </g>
        </g>
      ))}
    </g>
  )
}

export default IngredienteItem
