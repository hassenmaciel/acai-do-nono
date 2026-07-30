import './SeletorBase.css'
import { listarBases } from '../../services/cardapioService'

function SeletorBase({ baseSelecionada, onSelecionarBase }) {
  const bases = listarBases()

  return (
    <section className="seletor-base">
      <h2 className="seletor-base__title">Escolha a base</h2>
      <p className="seletor-base__subtitle">
        Selecione a base do seu açaí.
      </p>

      <div className="seletor-base__grid">
        {bases.map((base) => (
          <button
            key={base.id}
            type="button"
            className={
              baseSelecionada?.id === base.id
                ? 'base-card base-card--selected'
                : 'base-card'
            }
            aria-pressed={baseSelecionada?.id === base.id}
            onClick={() => onSelecionarBase(base)}
          >
            <span className="base-card__nome">{base.nome}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default SeletorBase
