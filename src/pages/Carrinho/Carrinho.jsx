import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CarrinhoItem from '../../components/CarrinhoItem/CarrinhoItem'
import TotalPedido from '../../components/TotalPedido/TotalPedido'
import ModalFinalizarPedido from '../../components/ModalFinalizarPedido/ModalFinalizarPedido'
import ModalAviso from '../../components/ModalAviso/ModalAviso'
import { useCart } from '../../hooks/useCart'
import { obterProduto } from '../../services/cardapioService'
import { ID_PRODUTO_ACAI } from '../../data/produtos'
import { formatarPreco } from '../../utils/precos'
import { scrollParaTopo } from '../../utils/scroll'
import './Carrinho.css'

function Carrinho() {
  const cart = useCart()
  const navigate = useNavigate()
  const produto = obterProduto(ID_PRODUTO_ACAI)

  const [modalEnviarAberto, setModalEnviarAberto] = useState(false)
  const [modalEnviadoAberto, setModalEnviadoAberto] = useState(false)

  const carrinhoVazio = cart.itens.length === 0

  const handleEditar = (id) => {
    cart.iniciarEdicao(id)
    navigate('/configurador')
  }

  const handleEnviado = () => {
    setModalEnviarAberto(false)
    setModalEnviadoAberto(true)
  }

  const handleFazerOutroPedido = () => {
    cart.limparCarrinho()
    setModalEnviadoAberto(false)
    navigate('/configurador')
    scrollParaTopo()
  }

  const handleVoltarInicio = () => {
    cart.limparCarrinho()
    setModalEnviadoAberto(false)
    navigate('/')
    scrollParaTopo()
  }

  return (
    <section className="carrinho-page">
      <h1 className="carrinho-page__title">Seu Carrinho</h1>

      {carrinhoVazio ? (
        <div className="carrinho-vazio">
          <p className="carrinho-vazio__texto">
            Seu carrinho está vazio. Monte seu primeiro açaí!
          </p>
          <Link to="/configurador" className="carrinho-vazio__cta">
            Montar meu Açaí
          </Link>
        </div>
      ) : (
        <>
          <ul className="carrinho-page__lista">
            {cart.itens.map((item) => (
              <CarrinhoItem
                key={item.id}
                item={item}
                onEditar={handleEditar}
                onDuplicar={cart.duplicarItem}
                onRemover={cart.removerItem}
              />
            ))}
          </ul>

          <TotalPedido total={formatarPreco(cart.total)} />

          <button
            type="button"
            className="carrinho-page__enviar"
            onClick={() => setModalEnviarAberto(true)}
          >
            Enviar Pedido
          </button>
        </>
      )}

      <ModalFinalizarPedido
        aberto={modalEnviarAberto}
        onFechar={() => setModalEnviarAberto(false)}
        onEnviado={handleEnviado}
        produto={produto}
        itens={cart.itens}
        total={cart.total}
      />

      <ModalAviso
        aberto={modalEnviadoAberto}
        icone="🎉"
        titulo="Pedido enviado!"
        acaoSecundaria={{
          label: '🏠 Voltar ao início',
          onClick: handleVoltarInicio,
        }}
        acaoPrimaria={{
          label: '🍧 Fazer outro pedido',
          onClick: handleFazerOutroPedido,
        }}
      >
        Obrigado! Seu pedido já chegou até nossa equipe.
        <br />
        Agora é só aguardar nossa confirmação.
      </ModalAviso>
    </section>
  )
}

export default Carrinho
