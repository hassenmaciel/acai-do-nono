import { useEffect, useState } from 'react'
import { formatarPreco } from '../../utils/precos'
import {
  gerarMensagemPedido,
  gerarMensagemPedidoMultiplo,
  gerarLinkWhatsapp,
} from '../../utils/mensagemPedido'
import { obterNumeroWhatsapp } from '../../services/cardapioService'
import './ModalFinalizarPedido.css'

const FORMA_ENTREGA = {
  RETIRADA: 'retirada',
  DELIVERY: 'delivery',
}

const CAMPOS_INICIAIS = {
  nome: '',
  telefone: '',
  formaEntrega: FORMA_ENTREGA.RETIRADA,
  endereco: '',
  numero: '',
  complemento: '',
  bairro: '',
  observacoes: '',
}

function validarCliente(cliente) {
  const erros = {}

  if (!cliente.nome.trim()) {
    erros.nome = 'Informe seu nome.'
  }

  if (!cliente.telefone.trim()) {
    erros.telefone = 'Informe seu telefone.'
  }

  if (cliente.formaEntrega === FORMA_ENTREGA.DELIVERY) {
    if (!cliente.endereco.trim()) {
      erros.endereco = 'Informe o endereço.'
    }
    if (!cliente.numero.trim()) {
      erros.numero = 'Informe o número.'
    }
    if (!cliente.bairro.trim()) {
      erros.bairro = 'Informe o bairro.'
    }
  }

  return erros
}

function ModalFinalizarPedido({
  aberto,
  onFechar,
  onEnviado,
  produto,
  itens = [],
  total,
}) {
  const [cliente, setCliente] = useState(CAMPOS_INICIAIS)
  const [erros, setErros] = useState({})

  useEffect(() => {
    if (!aberto) {
      return undefined
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onFechar()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [aberto, onFechar])

  if (!aberto) {
    return null
  }

  const handleCampoChange = (campo) => (event) => {
    setCliente((atual) => ({ ...atual, [campo]: event.target.value }))
  }

  const handleFormaEntregaChange = (formaEntrega) => {
    setCliente((atual) => ({ ...atual, formaEntrega }))
  }

  const handleEnviar = (event) => {
    event.preventDefault()

    const novosErros = validarCliente(cliente)
    setErros(novosErros)

    if (Object.keys(novosErros).length > 0) {
      return
    }

    const item = itens[0]

    const mensagem =
      itens.length <= 1
        ? gerarMensagemPedido({
            pedido: {
              produto,
              tamanho: item?.tamanho,
              base: item?.base,
              ingredientes: [
                ...(item?.ingredientes ?? []),
                ...(item?.ingredientesExtras ?? []),
              ],
              total: item?.total ?? total,
            },
            cliente,
          })
        : gerarMensagemPedidoMultiplo({ itens, cliente, total })

    const link = gerarLinkWhatsapp(obterNumeroWhatsapp(), mensagem)
    window.open(link, '_blank', 'noopener,noreferrer')
    onEnviado()
  }

  return (
    <div className="modal-pedido__overlay" onClick={onFechar}>
      <div
        className="modal-pedido__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-pedido-titulo"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-pedido__header">
          <h2 id="modal-pedido-titulo" className="modal-pedido__title">
            Finalizar Pedido
          </h2>
          <button
            type="button"
            className="modal-pedido__fechar"
            onClick={onFechar}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <section className="modal-pedido__resumo">
          <div className="modal-pedido__row">
            <span className="modal-pedido__label">Produto:</span>
            <span className="modal-pedido__value">{produto?.nome}</span>
          </div>

          {itens.map((item, indice) => (
            <div className="modal-pedido__item" key={item.id}>
              <p className="modal-pedido__item-titulo">
                Açaí {indice + 1} — {item.tamanho?.nome}
              </p>

              <div className="modal-pedido__row">
                <span className="modal-pedido__label">Base:</span>
                <span className="modal-pedido__value">{item.base?.nome}</span>
              </div>

              <div className="modal-pedido__row modal-pedido__row--column">
                <span className="modal-pedido__label">Ingredientes:</span>
                <span className="modal-pedido__value">
                  {item.ingredientes.length > 0
                    ? item.ingredientes
                        .map((ingrediente) => ingrediente.nome)
                        .join(', ')
                    : 'Nenhum ingrediente selecionado'}
                </span>
              </div>

              {item.ingredientesExtras.length > 0 && (
                <div className="modal-pedido__row modal-pedido__row--column">
                  <span className="modal-pedido__label">Extras:</span>
                  <span className="modal-pedido__value">
                    {item.ingredientesExtras
                      .map((ingrediente) => ingrediente.nome)
                      .join(', ')}
                  </span>
                </div>
              )}

              <div className="modal-pedido__row">
                <span className="modal-pedido__label">Valor:</span>
                <span className="modal-pedido__value">
                  {formatarPreco(item.total)}
                </span>
              </div>
            </div>
          ))}

          <div className="modal-pedido__row modal-pedido__row--total">
            <span className="modal-pedido__label">Total:</span>
            <span className="modal-pedido__value modal-pedido__value--total">
              {formatarPreco(total)}
            </span>
          </div>
        </section>

        <form className="modal-pedido__form" onSubmit={handleEnviar} noValidate>
          <label className="modal-pedido__field">
            <span>Nome</span>
            <input
              type="text"
              value={cliente.nome}
              onChange={handleCampoChange('nome')}
            />
            {erros.nome && (
              <span className="modal-pedido__erro">{erros.nome}</span>
            )}
          </label>

          <label className="modal-pedido__field">
            <span>Telefone</span>
            <input
              type="tel"
              value={cliente.telefone}
              onChange={handleCampoChange('telefone')}
              placeholder="(00) 00000-0000"
            />
            {erros.telefone && (
              <span className="modal-pedido__erro">{erros.telefone}</span>
            )}
          </label>

          <div className="modal-pedido__field">
            <span>Forma de entrega</span>
            <div className="modal-pedido__entrega-opcoes">
              <button
                type="button"
                className={
                  cliente.formaEntrega === FORMA_ENTREGA.RETIRADA
                    ? 'modal-pedido__entrega-opcao modal-pedido__entrega-opcao--selecionada'
                    : 'modal-pedido__entrega-opcao'
                }
                aria-pressed={cliente.formaEntrega === FORMA_ENTREGA.RETIRADA}
                onClick={() => handleFormaEntregaChange(FORMA_ENTREGA.RETIRADA)}
              >
                Retirada no local
              </button>
              <button
                type="button"
                className={
                  cliente.formaEntrega === FORMA_ENTREGA.DELIVERY
                    ? 'modal-pedido__entrega-opcao modal-pedido__entrega-opcao--selecionada'
                    : 'modal-pedido__entrega-opcao'
                }
                aria-pressed={cliente.formaEntrega === FORMA_ENTREGA.DELIVERY}
                onClick={() => handleFormaEntregaChange(FORMA_ENTREGA.DELIVERY)}
              >
                Delivery
              </button>
            </div>
          </div>

          {cliente.formaEntrega === FORMA_ENTREGA.DELIVERY && (
            <>
              <label className="modal-pedido__field">
                <span>Endereço</span>
                <input
                  type="text"
                  value={cliente.endereco}
                  onChange={handleCampoChange('endereco')}
                />
                {erros.endereco && (
                  <span className="modal-pedido__erro">{erros.endereco}</span>
                )}
              </label>

              <label className="modal-pedido__field">
                <span>Número</span>
                <input
                  type="text"
                  value={cliente.numero}
                  onChange={handleCampoChange('numero')}
                />
                {erros.numero && (
                  <span className="modal-pedido__erro">{erros.numero}</span>
                )}
              </label>

              <label className="modal-pedido__field">
                <span>Complemento</span>
                <input
                  type="text"
                  value={cliente.complemento}
                  onChange={handleCampoChange('complemento')}
                />
              </label>

              <label className="modal-pedido__field">
                <span>Bairro</span>
                <input
                  type="text"
                  value={cliente.bairro}
                  onChange={handleCampoChange('bairro')}
                />
                {erros.bairro && (
                  <span className="modal-pedido__erro">{erros.bairro}</span>
                )}
              </label>

              <label className="modal-pedido__field">
                <span>Observações (opcional)</span>
                <textarea
                  value={cliente.observacoes}
                  onChange={handleCampoChange('observacoes')}
                  rows={3}
                />
              </label>
            </>
          )}

          <button type="submit" className="modal-pedido__enviar">
            Enviar Pedido pelo WhatsApp
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalFinalizarPedido
