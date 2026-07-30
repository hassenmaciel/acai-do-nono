import './TotalPedido.css'

function TotalPedido({ total }) {
  return (
    <section className="total-pedido">
      <div className="total-pedido__card">
        <span className="total-pedido__label">Total</span>
        <span className="total-pedido__value">{total}</span>
      </div>
    </section>
  )
}

export default TotalPedido
