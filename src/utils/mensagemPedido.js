import { formatarPreco } from './precos'

function formatarIngredientes(ingredientes) {
  if (!ingredientes || ingredientes.length === 0) {
    return 'Nenhum'
  }

  return ingredientes.map((ingrediente) => ingrediente.nome).join(', ')
}

function formatarEntrega(cliente) {
  if (cliente.formaEntrega !== 'delivery') {
    return ['Entrega: Retirada no local']
  }

  const enderecoCompleto = [
    `${cliente.endereco}, ${cliente.numero}`,
    cliente.complemento,
    cliente.bairro,
  ]
    .filter((parte) => parte && parte.trim())
    .join(' - ')

  const linhas = ['Entrega: Delivery', `Endereço: ${enderecoCompleto}`]

  if (cliente.observacoes && cliente.observacoes.trim()) {
    linhas.push(`Observações: ${cliente.observacoes.trim()}`)
  }

  return linhas
}

export function gerarMensagemPedido({ pedido, cliente }) {
  const { produto, tamanho, base, ingredientes, total } = pedido

  const linhas = [
    `*Novo pedido — ${produto?.nome ?? ''}*`,
    '',
    `Tamanho: ${tamanho?.nome ?? '-'}`,
    `Base: ${base?.nome ?? '-'}`,
    `Ingredientes: ${formatarIngredientes(ingredientes)}`,
    `Total: ${formatarPreco(total)}`,
    '',
    `Nome: ${cliente.nome}`,
    `Telefone: ${cliente.telefone}`,
    ...formatarEntrega(cliente),
  ]

  return linhas.join('\n')
}

export function gerarLinkWhatsapp(numero, mensagem) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
}
