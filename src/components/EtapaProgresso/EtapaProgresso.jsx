import './EtapaProgresso.css'

const ETAPAS = [
  { numero: 1, label: 'Tamanho' },
  { numero: 2, label: 'Base' },
  { numero: 3, label: 'Ingredientes' },
  { numero: 4, label: 'Revisão' },
]

function EtapaProgresso({ etapaAtual }) {
  const etapaAtualInfo = ETAPAS.find((etapa) => etapa.numero === etapaAtual)

  return (
    <div
      className="etapa-progresso"
      role="progressbar"
      aria-valuenow={etapaAtual}
      aria-valuemin={1}
      aria-valuemax={ETAPAS.length}
      aria-label="Progresso da montagem do açaí"
    >
      <div className="etapa-progresso__trilha">
        {ETAPAS.map((etapa) => {
          const concluida = etapa.numero < etapaAtual
          const ativa = etapa.numero === etapaAtual
          const alcancada = etapa.numero <= etapaAtual

          return (
            <div key={etapa.numero} className="etapa-progresso__item">
              <span
                className={
                  alcancada
                    ? 'etapa-progresso__linha etapa-progresso__linha--preenchida'
                    : 'etapa-progresso__linha'
                }
              />
              <span
                className={
                  concluida
                    ? 'etapa-progresso__passo etapa-progresso__passo--concluida'
                    : ativa
                      ? 'etapa-progresso__passo etapa-progresso__passo--ativa'
                      : 'etapa-progresso__passo'
                }
              >
                {concluida ? '✓' : etapa.numero}
              </span>
            </div>
          )
        })}
      </div>

      <span className="etapa-progresso__label">{etapaAtualInfo?.label}</span>
    </div>
  )
}

export default EtapaProgresso
