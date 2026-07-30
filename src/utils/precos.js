export function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function calcularTotal({ tamanho, ingredientes = [] } = {}) {
  const precoBase = tamanho?.preco ?? 0
  const precoIngredientes = ingredientes.reduce(
    (soma, ingrediente) => soma + (ingrediente?.preco ?? 0),
    0,
  )

  return precoBase + precoIngredientes
}
