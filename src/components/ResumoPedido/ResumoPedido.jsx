import { VALOR_INGREDIENTE_EXTRA, formatarPreco } from '../../utils/precos'
import './ResumoPedido.css'

function ResumoPedido({
  tamanho,
  base,
  ingredientes = [],
  limite = 5,
  podeFinalizar = false,
  onFinalizar = () => {},
  onAdicionarOutro = () => {},
}) {
  const ingredientesGratis = ingredientes.slice(0, limite)
  const ingredientesExtras = ingredientes.slice(limite)

  return (
    <section className="resumo-pedido">
      <div className="resumo-pedido__card">
        <h2 className="resumo-pedido__title">Resumo do Pedido</h2>

        <div className="resumo-pedido__row">
          <span className="resumo-pedido__label">Tamanho:</span>
          <span className="resumo-pedido__value">
            {tamanho ? tamanho.nome : 'Não selecionado'}
          </span>
        </div>

        <div className="resumo-pedido__row">
          <span className="resumo-pedido__label">Base:</span>
          <span className="resumo-pedido__value">
            {base ? base.nome : 'Não selecionada'}
          </span>
        </div>

        <div className="resumo-pedido__row resumo-pedido__row--column">
          <span className="resumo-pedido__label">Ingredientes:</span>
          <span className="resumo-pedido__value">
            {ingredientesGratis.length > 0
              ? ingredientesGratis
                  .map((ingrediente) => ingrediente.nome)
                  .join(', ')
              : 'Nenhum ingrediente selecionado'}
          </span>
        </div>

        {ingredientesExtras.length > 0 && (
          <div className="resumo-pedido__row resumo-pedido__row--column">
            <span className="resumo-pedido__label">Ingredientes Extras:</span>
            <span className="resumo-pedido__value">
              {ingredientesExtras.map((ingrediente) => ingrediente.nome).join(', ')}
              {' — '}
              {ingredientesExtras.length}{' '}
              {ingredientesExtras.length === 1 ? 'item' : 'itens'} (+
              {formatarPreco(ingredientesExtras.length * VALOR_INGREDIENTE_EXTRA)})
            </span>
          </div>
        )}

        <p className="resumo-pedido__count">
          {ingredientesGratis.length} de {limite} ingredientes selecionados
        </p>

        <button
          type="button"
          className="resumo-pedido__cta resumo-pedido__cta--secundario"
          disabled={!podeFinalizar}
          onClick={onAdicionarOutro}
        >
          + Adicionar outro açaí
        </button>

        <button
          type="button"
          className="resumo-pedido__cta"
          disabled={!podeFinalizar}
          onClick={onFinalizar}
        >
          Finalizar Pedido
        </button>
      </div>
    </section>
  )
}

export default ResumoPedido
