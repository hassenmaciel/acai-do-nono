import './SeletorTamanho.css'
import { formatarPreco } from '../../utils/precos'
import { listarTamanhos } from '../../services/cardapioService'

function SeletorTamanho({ tamanhoSelecionado, onSelecionarTamanho }) {
  const tamanhos = listarTamanhos()

  return (
    <section className="seletor-tamanho">
      <h2 className="seletor-tamanho__title">Escolha o tamanho</h2>
      <p className="seletor-tamanho__subtitle">
        Selecione o tamanho do seu Açaí
      </p>

      <div className="seletor-tamanho__grid">
        {tamanhos.map((tamanho) => (
          <button
            key={tamanho.id}
            type="button"
            className={
              tamanhoSelecionado?.id === tamanho.id
                ? 'tamanho-card tamanho-card--selected'
                : 'tamanho-card'
            }
            aria-pressed={tamanhoSelecionado?.id === tamanho.id}
            onClick={() => onSelecionarTamanho(tamanho)}
          >
            <span className="tamanho-card__nome">{tamanho.nome}</span>
            <span className="tamanho-card__preco">
              {formatarPreco(tamanho.preco)}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default SeletorTamanho
