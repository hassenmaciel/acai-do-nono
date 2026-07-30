import './ResumoPedido.css'

function ResumoPedido({
  tamanho,
  base,
  ingredientes = [],
  limite = 5,
  podeFinalizar = false,
  onFinalizar = () => {},
}) {
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
            {ingredientes.length > 0
              ? ingredientes.map((ingrediente) => ingrediente.nome).join(', ')
              : 'Nenhum ingrediente selecionado'}
          </span>
        </div>

        <p className="resumo-pedido__count">
          {ingredientes.length} de {limite} ingredientes selecionados
        </p>

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
