import { formatarPreco, VALOR_INGREDIENTE_EXTRA } from './precos'

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

function formatarListaIngredientes(ingredientes) {
  if (!ingredientes || ingredientes.length === 0) {
    return ['Ingredientes: Nenhum']
  }

  return [
    'Ingredientes:',
    ...ingredientes.map((ingrediente) => `• ${ingrediente.nome}`),
  ]
}

function formatarItemPedido(item, indice) {
  const { tamanho, base, ingredientes, ingredientesExtras = [], total } = item

  const linhas = [
    `AÇAÍ ${indice + 1}`,
    `Tamanho: ${tamanho?.nome ?? '-'}`,
    `Base: ${base?.nome ?? '-'}`,
    ...formatarListaIngredientes(ingredientes),
  ]

  if (ingredientesExtras.length > 0) {
    const nomesExtras = ingredientesExtras
      .map((ingrediente) => ingrediente.nome)
      .join(', ')
    const valorExtras = formatarPreco(
      ingredientesExtras.length * VALOR_INGREDIENTE_EXTRA,
    )
    linhas.push(`Ingredientes extras: ${nomesExtras} (+${valorExtras})`)
  }

  linhas.push(`Valor: ${formatarPreco(total)}`)

  return linhas
}

export function gerarMensagemPedidoMultiplo({ itens, cliente, total }) {
  const separador = '----------------'

  const blocosItens = itens.flatMap((item, indice) => [
    separador,
    '',
    ...formatarItemPedido(item, indice),
    '',
  ])

  const linhas = [
    'Olá!',
    'Gostaria de fazer o seguinte pedido.',
    '',
    ...blocosItens,
    separador,
    '',
    'TOTAL',
    formatarPreco(total),
    '',
    `Nome: ${cliente.nome}`,
    `Telefone: ${cliente.telefone}`,
    ...formatarEntrega(cliente),
    '',
    'Obrigado.',
  ]

  return linhas.join('\n')
}

export function gerarLinkWhatsapp(numero, mensagem) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
}
