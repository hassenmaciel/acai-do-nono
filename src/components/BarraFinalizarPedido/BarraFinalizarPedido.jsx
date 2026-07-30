import { formatarPreco } from '../../utils/precos'
import './BarraFinalizarPedido.css'

function BarraFinalizarPedido({ visivel, total, onFinalizar }) {
  return (
    <div
      className={
        visivel
          ? 'barra-finalizar barra-finalizar--visivel'
          : 'barra-finalizar'
      }
      aria-hidden={!visivel}
    >
      <div className="barra-finalizar__conteudo">
        <div className="barra-finalizar__total">
          <span className="barra-finalizar__total-label">Total</span>
          <span className="barra-finalizar__total-valor">
            {formatarPreco(total)}
          </span>
        </div>
        <button
          type="button"
          className="barra-finalizar__cta"
          onClick={onFinalizar}
          tabIndex={visivel ? 0 : -1}
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  )
}

export default BarraFinalizarPedido
